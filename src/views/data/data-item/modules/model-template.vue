<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { request } from '@/service/request';
import { useAppStore } from '@/stores/modules/app';
import { useTable, useTableOperate } from '@/hooks/modules/table';
import { $t } from '@/locales';
import ModelOperateDrawer from './model-operate-drawer.vue';
import ModelSearch from './model-search.vue';

defineOptions({
  name: 'ModelTemplate'
});

interface Props {
  /** the edit row data */
  model: Api.Data.ModuleInfo;
}

const props = defineProps<Props>();

const moduleName = props.model.name;
const modulePath = props.model.path;
const tableCols = props.model.columns.filter(col => '1' === col.visible);
const formCols = props.model.columns.filter(col => '1' === col.form);
const tableParam = getTableParam(tableCols);

function getTableParam(cols: Api.Data.Column) {
  let param = {};
  cols.forEach(col => param[col.name] = null)
  return param;
}

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  loading,
  getData,
  getDataByPage,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: (params: any) => request<Api.Common.PaginatingQueryRecord<any>>({
    url: `/data/${modulePath}/page`,
    method: 'get',
    params
  }),
  apiParams: {
    ...tableParam,
    page: 1,
    size: 10
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
      width: 64,
      align: 'center'
    },
    ...tableCols.map(col => {
      return {
        key: col.name,
        title: col.comment,
        align: 'center',
        minWidth: 120
      }
    }),
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
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
  const { error, _ } = await request<Api.Common.PaginatingQueryRecord<any>>({
    url: `/data/${modulePath}/${id}`,
    method: 'delete'
  })
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
    <ModelSearch v-model:tableCols="tableCols" v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.system.role.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="702"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <ModelOperateDrawer
        v-model:moduleName="moduleName"
        v-model:modulePath="modulePath"
        v-model:formCols="formCols"
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
