<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetDictDataList, fetchRemoveDictData } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/stores/modules/app';
import { enableStatusRecord } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/modules/table';
import DictDataOperateDrawer from './modules/dict-data-operate-drawer.vue';
import DictDataSearch from './modules/dict-data-search.vue';

interface Props {
  type: string;
}

const props = defineProps<Props>();

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetDictDataList,
  showTotal: true,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    dictType: props.type,
    label: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'label',
      title: $t('page.system.dictData.label'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'value',
      title: $t('page.system.dictData.value'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'sort',
      title: $t('page.system.dictData.sort'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'status',
      title: $t('page.system.dictData.status'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          0: 'warning'
        };

        const label = $t(enableStatusRecord[row.status]);

        return <NTag type={tagMap[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton v-perms="system:dict:update" type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <div v-perms="system:dict:remove">
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          </div>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  const { error, _ } = await fetchRemoveDictData(id)
  if (error) {
    return;
  }

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <DictDataSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.system.dictType.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation>
          <AddOperation v-perms="'system:dict:save'" @add="handleAdd" />
          <DeleteOperation v-perms="'system:dict:remove'" :disabled-delete="checkedRowKeys.length === 0" @delete="handleBatchDelete" />
          <RefreshOperation :loading="loading" @refresh="getData" />
          <TableColumnSetting v-model:columns="columnChecks" />
        </TableHeaderOperation>
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <DictDataOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        :dictType="props.type"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
