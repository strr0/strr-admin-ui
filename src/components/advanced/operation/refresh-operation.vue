<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'RefreshOperation'
});

interface Props {
  loading?: boolean;
}

defineProps<Props>();

interface Emits {
  (e: 'refresh'): void;
}

const emit = defineEmits<Emits>();

function refresh() {
  emit('refresh');
}
</script>

<template>
  <NButton size="small" @click="refresh">
    <template #icon>
      <icon-mdi-refresh class="text-icon" :class="{ 'animate-spin': loading }" />
    </template>
    {{ $t('common.refresh') }}
  </NButton>
</template>

<style scoped></style>
