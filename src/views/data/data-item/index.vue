<script setup lang="tsx">
import { defineComponent, h, ref } from 'vue'
import { $t } from '@/locales';
import { fetchGetModule } from '@/service/api';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const ModelTemplate = defineComponent({
  name: 'ModelTemplate',
  setup() {
    if (!props.id) {
      return () => (
        <div>Id is empty!</div>
      )
    }
    // request
    const { error, data } = fetchGetModule(props.id)

    if (error) {
      return () => (
        <div>Fetch data error</div>
      )
    }

    return () => (
      <div>Hello world</div>
    )
  }
});
</script>

<template>
  <ModelTemplate />
</template>

<style scoped></style>
