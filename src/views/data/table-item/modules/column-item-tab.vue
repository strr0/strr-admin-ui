<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { $t } from '@/locales';

defineOptions({
  name: 'ColumnItemTab'
});

const model = defineModel<Api.Data.Column[]>('model', { required: true });

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
    minWidth: 100
  },
  {
    key: 'pk',
    title: $t('page.data.column.pk'),
    align: 'center',
    minWidth: 100
  },
  {
    key: 'form',
    title: $t('page.data.column.form'),
    align: 'center',
    minWidth: 100
  },
  {
    key: 'visible',
    title: $t('page.data.column.visible'),
    align: 'center',
    minWidth: 100
  }
]
</script>

<template>
  <NScrollbar class="h-480px pr-20px">
    <NDataTable
      :columns="columns"
      :data="model"
      size="small"
      :scroll-x="962"
      class="sm:h-full"
    />
  </NScrollbar>
</template>

<style scoped></style>
