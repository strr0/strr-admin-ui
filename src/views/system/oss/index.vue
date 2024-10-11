<script setup lang="tsx">
import FileSaver from 'file-saver';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetOssList, fetchDownloadFile, fetchRemoveOss } from '@/service/api';
import { useAppStore } from '@/stores/modules/app';
import { useBoolean } from '@/hooks/common';
import { useRouterPush } from '@/hooks/modules/router';
import { useTable, useTableOperate } from '@/hooks/modules/table';
import { $t } from '@/locales';
import OssOperateModal from './modules/oss-operate-modal.vue';
import OssSearch from './modules/oss-search.vue';

const appStore = useAppStore();
const { routerPushByKey } = useRouterPush();
const { bool: modalVisible, setTrue: openModal } = useBoolean();

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
  apiFn: fetchGetOssList,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    fileName: null,
    originalName: null,
    fileSuffix: null,
    service: null
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
      key: 'fileName',
      title: $t('page.system.oss.fileName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'originalName',
      title: $t('page.system.oss.originalName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'fileSuffix',
      title: $t('page.system.oss.fileSuffix'),
      minWidth: 120
    },
    {
      key: 'url',
      title: $t('page.system.oss.url'),
      minWidth: 120
    },
    {
      key: 'service',
      title: $t('page.system.oss.service'),
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton v-perms="system:oss:download" type="primary" ghost size="small" onClick={() => download(row.id, row.originalName)}>
            {$t('page.system.oss.downloadFile')}
          </NButton>
          <div v-perms="system:oss:remove">
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
  const { error, _ } = await fetchRemoveOss(id)
  if (error) {
    return;
  }

  onDeleted();
}

async function download(id: number, filename: string) {
  // request
  const { error, data } = await fetchDownloadFile(id)
  if (error) {
    return;
  }
  
  FileSaver.saveAs(data, filename);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <OssSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.system.oss.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation>
          <NButton v-perms="'system:oss:upload'" type="primary" ghost size="small" @click="openModal">
            {{$t('page.system.oss.uploadFile')}}
          </NButton>
          <DeleteOperation v-perms="'system:oss:remove'" :disabled-delete="checkedRowKeys.length === 0" @delete="handleBatchDelete" />
          <NButton v-perms="'system:ossConfig:list'" type="primary" ghost size="small" @click="routerPushByKey('ossConfig')">
            {{$t('page.system.oss.ossConfig')}}
          </NButton>
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
      <OssOperateModal v-model:visible="modalVisible" @submitted="getData" />
    </NCard>
  </div>
</template>

<style scoped></style>
