<script setup lang="ts">
import { ref } from 'vue'
import { $t } from '@/locales';
import { fetchGetModule, fetchUpdateModuleInfo } from '@/service/api';
import ModuleItemTab from './modules/module-item-tab.vue';
import TableItemTab from './modules/table-item-tab.vue';
import ColumnItemTab from './modules/column-item-tab.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

type ModuleModel = Pick<Api.Data.Module, 'id' | 'tableId' | 'name' | 'code' | 'path' | 'remark' | 'status'>;
type TableModel = Pick<Api.Data.Table, 'id' | 'name' | 'comment' | 'remark' | 'status'>;
type ColumnModel = Pick<Api.Data.Column, 'id' | 'tableId' | 'name' | 'comment' | 'pk' | 'form' | 'visible' | 'order' | 'status'> & { 'index': number };

type Model = ModuleModel & {
  table: TableModel,
  columns: ColumnModel[]
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

function updateModule(module: ModuleModel) {
  Object.assign(model, module);
}

function updateTable(table: TableModel) {
  Object.assign(model.table, table);
}

function updateColumns(columns: ColumnModel[]) {
  Object.assign(model.columns, columns);
}

function closeTab() {
}

async function handleSubmit() {
  // request
  const { error, _ } = await fetchUpdateModuleInfo(model as Api.Data.ModuleInfo)
  if (error) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeTab();
}

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
          <ModuleItemTab v-model:data="model" @update="updateModule" />
        </NTabPane>
        <NTabPane name="tableInfo" :tab="$t('page.data.table.tableInfo')">
          <TableItemTab v-model:data="model.table" @update="updateTable" />
        </NTabPane>
        <NTabPane name="columnInfo" :tab="$t('page.data.table.columnInfo')">
          <ColumnItemTab v-model:data="model.columns" @update="updateColumns" />
        </NTabPane>
      </NTabs>
      <template #footer>
        <NSpace justify="end">
          <NButton size="small" class="mt-16px" @click="closeTab">
            {{ $t('common.cancel') }}
          </NButton>
          <NButton type="primary" size="small" class="mt-16px" @click="handleSubmit">
            {{ $t('common.confirm') }}
          </NButton>
        </NSpace>
      </template>
    </NCard>
  </div>
</template>

<style scoped></style>
