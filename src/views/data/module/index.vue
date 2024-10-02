<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetModuleList, fetchRemoveModule, fetchRegisterModule } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/stores/modules/app';
import { enableStatusRecord } from '@/constants/business';
import { useBoolean } from '@/hooks/common';
import { useRouterPush } from '@/hooks/modules/router'
import { useTable, useTableOperate } from '@/hooks/modules/table';
import ModuleSearch from './modules/module-search.vue';
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
  apiFn: fetchGetModuleList,
  showTotal: true,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    name: null,
    code: null,
    path: null,
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
      title: $t('page.data.module.name'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'code',
      title: $t('page.data.module.code'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'path',
      title: $t('page.data.module.path'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'status',
      title: $t('page.data.module.status'),
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
          <NButton v-perms="data:module:register" type="warning" ghost size="small" onClick={() => register(row.id)}>
            {$t('common.register')}
          </NButton>
          <NButton v-perms="data:module:update" type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <div v-perms="data:module:remove">
            <NPopconfirm onPositiveClick={() => handleDelete(row.tableId)}>
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

async function handleDelete(tableId: number) {
  // request
  const { error, _ } = await fetchRemoveModule(tableId)
  if (error) {
    return;
  }

  onDeleted();
}

function edit(id: number) {
  routerPushByKey('moduleItem', {
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
  const { error, _ } = await fetchRegisterModule(id)
  if (error) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ModuleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.data.module.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation>
          <AddOperation v-perms="'data:module:import'" @add="openTableImportModal" />
          <DeleteOperation v-perms="'data:module:remove'" :disabled-delete="checkedRowKeys.length === 0" @delete="handleBatchDelete" />
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
    </NCard>
    <TableImportModal v-model:visible="tableImportVisible" />
  </div>
</template>

<style scoped></style>
