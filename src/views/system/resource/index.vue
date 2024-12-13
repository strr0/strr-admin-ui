<script setup lang="tsx">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useBoolean } from '@/hooks/common';
import { fetchGetResourceTree, fetchRemoveResource } from '@/service/api';
import { useAppStore } from '@/stores/modules/app';
import { useTable, useTableOperate } from '@/hooks/modules/table';
import { $t } from '@/locales';
import { yesOrNoRecord } from '@/constants/common';
import { enableStatusRecord, resourceTypeRecord } from '@/constants/business';
import SvgIcon from '@/components/custom/svg-icon.vue';
import ResourceOperateModal, { type OperateType } from './modules/resource-operate-modal.vue';

const appStore = useAppStore();

const { bool: visible, setTrue: openModal } = useBoolean();

const wrapperRef = ref<HTMLElement | null>(null);

const { columns, columnChecks, data, loading, getData } = useTable({
  apiFn: fetchGetResourceTree,
  columns: () => [
    {
      key: 'id',
      title: $t('page.system.resource.id'),
      align: 'center'
    },
    {
      key: 'type',
      title: $t('page.system.resource.type'),
      align: 'center',
      width: 80,
      render: row => {
        const tagMap: Record<Api.System.ResourceType, NaiveUI.ThemeColor> = {
          'D': 'default',
          'M': 'primary',
          'B': 'primary'
        };

        const label = $t(resourceTypeRecord[row.type]);

        return <NTag type={tagMap[row.type]}>{label}</NTag>;
      }
    },
    {
      key: 'name',
      title: $t('page.system.resource.name'),
      align: 'center',
      minWidth: 120,
      render: row => {
        const { i18nKey, name } = row;

        const label = i18nKey ? $t(i18nKey) : name;

        return <span>{label}</span>;
      }
    },
    {
      key: 'icon',
      title: $t('page.system.resource.icon'),
      align: 'center',
      width: 60,
      render: row => {
        const icon = row.iconType === '1' ? row.icon : undefined;

        const localIcon = row.iconType === '2' ? row.icon : undefined;

        return (
          <div class="flex-center">
            <SvgIcon icon={icon} localIcon={localIcon} class="text-icon" />
          </div>
        );
      }
    },
    {
      key: 'path',
      title: $t('page.system.resource.path'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'status',
      title: $t('page.system.resource.status'),
      align: 'center',
      width: 80,
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
      key: 'visible',
      title: $t('page.system.resource.visible'),
      align: 'center',
      width: 80,
      render: row => {
        const visilbe: CommonType.YesOrNo = row.visible === '1' ? 'Y' : 'N';

        const tagMap: Record<CommonType.YesOrNo, NaiveUI.ThemeColor> = {
          Y: 'default',
          N: 'error'
        };

        const label = $t(yesOrNoRecord[visilbe]);

        return <NTag type={tagMap[visilbe]}>{label}</NTag>;
      }
    },
    {
      key: 'parentId',
      title: $t('page.system.resource.parentId'),
      width: 90,
      align: 'center'
    },
    {
      key: 'sort',
      title: $t('page.system.resource.sort'),
      align: 'center',
      width: 60
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 230,
      render: row => (
        <div class="flex-center justify-end gap-8px">
          {row.type !== 'B' && (
            <NButton v-perms="system:resource:save" type="primary" ghost size="small" onClick={() => handleAddChildResource(row)}>
              {$t('page.system.resource.addChildResource')}
            </NButton>
          )}
          <NButton v-perms="system:resource:update" type="primary" ghost size="small" onClick={() => handleEdit(row)}>
            {$t('common.edit')}
          </NButton>
          <div v-perms="system:resource:remove">
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
  ],
  tree: true
});

const { checkedRowKeys, onBatchDeleted, onDeleted } = useTableOperate(data, getData);

const operateType = ref<OperateType>('add');

function handleAdd() {
  operateType.value = 'add';
  openModal();
}

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  const { error, _ } = await fetchRemoveResource(id)
  if (error) {
    return;
  }

  onDeleted();
}

/** the edit resource data or the parent resource data when adding a child resource */
const editingData: Ref<Api.System.Resource | null> = ref(null);

function handleEdit(item: Api.System.Resource) {
  operateType.value = 'edit';
  editingData.value = { ...item };

  openModal();
}

function handleAddChildResource(item: Api.System.Resource) {
  operateType.value = 'addChild';

  editingData.value = { ...item };

  openModal();
}
</script>

<template>
  <div ref="wrapperRef" class="flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard :title="$t('page.system.resource.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation>
          <AddOperation v-perms="'system:resource:save'" @add="handleAdd" />
          <DeleteOperation v-perms="'system:resource:remove'" :disabled-delete="checkedRowKeys.length === 0" @delete="handleBatchDelete" />
          <RefreshOperation :loading="loading" @refresh="getData" />
          <TableColumnSetting v-model:columns="columnChecks" />
        </TableHeaderOperation>
      </template>
      <NDataTable
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="1088"
        :loading="loading"
        :row-key="row => row.id"
        remote
        class="sm:h-full"
      />
      <ResourceOperateModal
        v-model:visible="visible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
