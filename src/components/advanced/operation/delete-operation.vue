<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'DeleteOperation'
});

interface Props {
  disabledDelete?: boolean;
}

defineProps<Props>();

interface Emits {
  (e: 'delete'): void;
}

const emit = defineEmits<Emits>();

function batchDelete() {
  emit('delete');
}
</script>

<template>
  <div>
    <NPopconfirm @positive-click="batchDelete">
      <template #trigger>
        <NButton size="small" ghost type="error" :disabled="disabledDelete">
          <template #icon>
            <icon-ic-round-delete class="text-icon" />
          </template>
          {{ $t('common.batchDelete') }}
        </NButton>
      </template>
      {{ $t('common.confirmDelete') }}
    </NPopconfirm>
  </div>
</template>

<style scoped></style>
