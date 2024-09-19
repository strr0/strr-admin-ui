<script setup lang="ts">
import { ref } from 'vue'
import { $t } from '@/locales';
import { fetchGetModule } from '@/service/api';
import ModuleItemTab from './modules/module-item-tab.vue';
import TableItemTab from './modules/table-item-tab.vue';
import ColumnItemTab from './modules/column-item-tab.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

type Model = Pick<Api.Data.Module, 'id' | 'tableId' | 'name' | 'code' | 'path' | 'remark' | 'status'> & {
  table: Pick<Api.Data.Table, 'id' | 'name' | 'comment' | 'remark' | 'status'>,
  columns: (Pick<Api.Data.Column, 'id' | 'tableId' | 'name' | 'comment' | 'pk' | 'form' | 'visible' | 'order' | 'status'> & { 'index': number })[]
}

const model = ref<Model>({
  id: null,
  tableId: null,
  name: '',
  code: '',
  path: '',
  remark: '',
  status: '0',
  table: {
    id: null,
    name: '',
    comment: '',
    remark: '',
    status: '0'
  },
  columns: []
});

async function init() {
  if (!props.id) {
    return;
  }
  // request
  const { error, data } = await fetchGetModule(props.id)
  if (error) {
    return;
  }
  const { columns, ...rest } = data
  model.value = {
    ...rest,
    columns: columns.map((item, index) => {
      item.index = index + 1;
      return item;
    })
  }
}

init()
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <NTabs type="line" animated>
        <NTabPane name="moduleInfo" :tab="$t('page.data.table.moduleInfo')">
          <ModuleItemTab v-model:model="model" />
        </NTabPane>
        <NTabPane name="tableInfo" :tab="$t('page.data.table.tableInfo')">
          <TableItemTab v-model:model="model.table" />
        </NTabPane>
        <NTabPane name="columnInfo" :tab="$t('page.data.table.columnInfo')">
          <ColumnItemTab v-model:model="model.columns" />
        </NTabPane>
      </NTabs>
      <template #footer>
        <NSpace justify="end">
          <NButton size="small" class="mt-16px">
            {{ $t('common.cancel') }}
          </NButton>
          <NButton type="primary" size="small" class="mt-16px">
            {{ $t('common.confirm') }}
          </NButton>
        </NSpace>
      </template>
    </NCard>
  </div>
</template>

<style scoped></style>
