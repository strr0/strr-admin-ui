<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'AddOperation'
});

interface Emits {
  (e: 'add'): void;
}

const emit = defineEmits<Emits>();

function add() {
  emit('add');
}
</script>

<template>
  <NButton size="small" ghost type="primary" @click="add">
    <template #icon>
      <icon-ic-round-plus class="text-icon" />
    </template>
    {{ $t('common.add') }}
  </NButton>
</template>

<style scoped></style>
