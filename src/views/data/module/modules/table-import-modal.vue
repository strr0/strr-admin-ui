<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import type { Ref } from 'vue';
import { $t } from '@/locales';
import { fetchGetDbTableList, fetchImportTable } from '@/service/api';
import { useAppStore } from '@/stores/modules/app';
import { enableStatusRecord } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/modules/table';
import TableSearch from './table-search.vue';

defineOptions({
  name: 'TableImportModal'
});

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('page.data.table.tableImport'));

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
  apiFn: fetchGetDbTableList,
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
    }
  ]
});

/** the checked row keys of table */
const checkedRowKeys = ref<string[]>([]);

async function handleSubmit() {
  if (checkedRowKeys.value.length === 0) {
    window.$message?.error?.($t('page.data.table.form.tableImport'));
    return;
  }

  // request
  const { error, _ } = await fetchImportTable(checkedRowKeys.value)
  if (error) {
    return;
  }

  window.$message?.success?.($t('common.modifySuccess'));

  closeModal();
  emit('submitted');
}

watch(visible, val => {
  if (val) {
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-1000px">
    <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      <TableSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
      <NCard :title="$t('page.data.table.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
        <NDataTable
          v-model:checked-row-keys="checkedRowKeys"
          :columns="columns"
          :data="data"
          size="small"
          :flex-height="!appStore.isMobile"
          :loading="loading"
          remote
          :row-key="row => row.name"
          :pagination="mobilePagination"
          class="h-280px"
        />
      </NCard>
    </div>
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-16px" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" class="mt-16px" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
