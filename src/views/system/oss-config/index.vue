<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetOssConfigList, fetchRemoveOssConfig } from '@/service/api';
import { useAppStore } from '@/stores/modules/app';
import { useTable, useTableOperate } from '@/hooks/modules/table';
import { $t } from '@/locales';
import { accessPolicyRecord, enableStatusRecord } from '@/constants/business';
import OssConfigOperateDrawer from './modules/oss-config-operate-drawer.vue';
import OssConfigSearch from './modules/oss-config-search.vue';

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
  apiFn: fetchGetOssConfigList,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    configKey: null,
    bucketName: null
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
    {
      key: 'endpoint',
      title: $t('page.system.ossConfig.endpoint'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'domain',
      title: $t('page.system.ossConfig.domain'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'bucketName',
      title: $t('page.system.ossConfig.bucketName'),
      minWidth: 120
    },
    {
      key: 'prefix',
      title: $t('page.system.ossConfig.prefix'),
      minWidth: 120
    },
    {
      key: 'region',
      title: $t('page.system.ossConfig.region'),
      minWidth: 120
    },
    {
      key: 'accessPolicy',
      title: $t('page.system.ossConfig.accessPolicy'),
      minWidth: 120,
      render: row => {
        if (row.accessPolicy === null) {
          return null;
        }

        const tagMap: Record<Api.System.AccessPolicy, NaiveUI.ThemeColor> = {
          0: 'info',
          1: 'success',
          2: 'warning'
        };

        const label = $t(accessPolicyRecord[row.accessPolicy]);

        return <NTag type={tagMap[row.accessPolicy]}>{label}</NTag>;
      }
    },
    {
      key: 'status',
      title: $t('page.system.ossConfig.status'),
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
          <NButton v-perms="system:ossConfig:update" type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <div v-perms="system:ossConfig:remove">
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
  const { error, _ } = await fetchRemoveOssConfig(id)
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
    <OssConfigSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.system.ossConfig.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation>
          <AddOperation v-perms="'system:ossConfig:save'" @add="handleAdd" />
          <DeleteOperation v-perms="'system:ossConfig:remove'" :disabled-delete="checkedRowKeys.length === 0" @delete="handleBatchDelete" />
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
        :scroll-x="702"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <OssConfigOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
