<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetTableList, fetchRemoveTable, fetchRegisterTable } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/stores/modules/app';
import { enableStatusRecord } from '@/constants/business';
import { useBoolean } from '@/hooks/common';
import { useRouterPush } from '@/hooks/modules/router'
import { useTable, useTableOperate } from '@/hooks/modules/table';
import TableSearch from './modules/table-search.vue';
import TableImportModal from './modules/table-import-modal.vue';

const appStore = useAppStore();
const { routerPushByKey } = useRouterPush()
const { bool: tableImportVisible, setTrue: openTableImportModal } = useBoolean();

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
  apiFn: fetchGetTableList,
  showTotal: true,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    name: null,
    comment: null,
    status: null
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
      key: 'name',
      title: $t('page.data.table.name'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'comment',
      title: $t('page.data.table.comment'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'status',
      title: $t('page.data.table.status'),
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
      width: 240,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="success" ghost size="small" onClick={() => preview(row.id)}>
            {$t('common.preview')}
          </NButton>
          <NButton type="warning" ghost size="small" onClick={() => register(row.id)}>
            {$t('common.register')}
          </NButton>
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
  const { error, _ } = await fetchRemoveTable(id)
  if (error) {
    return;
  }

  onDeleted();
}

function edit(id: number) {
  routerPushByKey('tableItem', {
    params: {
      id: String(id)
    }
  })
}

function preview(id: number) {
  routerPushByKey('dataItem', {
    params: {
      id: String(id)
    }
  })
}

async function register(id: number) {
  // request
  const { error, _ } = await fetchRegisterTable(id)
  if (error) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <TableSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.data.table.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="openTableImportModal"
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
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
    <TableImportModal v-model:visible="tableImportVisible" />
  </div>
</template>

<style scoped></style>
