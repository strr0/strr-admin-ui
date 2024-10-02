<script setup lang="ts">
defineOptions({
  name: 'TableHeaderOperation'
});

interface Props {
  itemAlign?: NaiveUI.Align;
}

defineProps<Props>();
</script>

<template>
  <NSpace :align="itemAlign" wrap justify="end" class="lt-sm:w-200px">
    <slot></slot>
  </NSpace>
</template>

<style scoped></style>
