<script setup lang="tsx">
import { watch } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { $t } from '@/locales';

defineOptions({
  name: 'ColumnItemTab'
});

const data = defineModel<Api.Data.Column[]>('data', { required: true });

interface Emits {
  (e: 'update'): void;
}

const emit = defineEmits<Emits>();

const columns: DataTableColumns<Api.Data.Column> = [
  {
    key: 'index',
    title: $t('common.index'),
    align: 'center',
    width: 64
  },
  {
    key: 'name',
    title: $t('page.data.column.name'),
    align: 'center',
    minWidth: 100
  },
  {
    key: 'comment',
    title: $t('page.data.column.comment'),
    align: 'center',
    minWidth: 100,
    render: (row, index) => {
      return <NInput value={row.comment} onUpdateValue={val => data.value[index].comment = val} />
    }
  },
  {
    key: 'pk',
    title: $t('page.data.column.pk'),
    align: 'center',
    minWidth: 100,
    render: (row, index) => {
      return <NCheckbox checked={row.pk} checked-value="1" unchecked-value="0" on-update:checked={checked => data.value[index].pk = checked} />
    }
  },
  {
    key: 'form',
    title: $t('page.data.column.form'),
    align: 'center',
    minWidth: 100,
    render: (row, index) => {
      return <NCheckbox checked={row.form} checked-value="1" unchecked-value="0" on-update:checked={checked => data.value[index].form = checked} />
    }
  },
  {
    key: 'visible',
    title: $t('page.data.column.visible'),
    align: 'center',
    minWidth: 100,
    render: (row, index) => {
      return <NCheckbox checked={row.visible} checked-value="1" unchecked-value="0" on-update:checked={checked => data.value[index].visible = checked} />
    }
  }
]

watch(data, val => {
  if (val) {
    emit('update', val);
  }
});
</script>

<template>
  <NScrollbar class="h-480px pr-20px">
    <NDataTable
      :columns="columns"
      :data="data"
      size="small"
      :scroll-x="962"
      class="sm:h-full"
    />
  </NScrollbar>
</template>

<style scoped></style>
