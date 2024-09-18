<script setup lang="ts">
import { defineAsyncComponent, h } from 'vue';
import { $t } from '@/locales';
import { fetchGetModule } from '@/service/api';
import NotFound from '@/views/_builtin/404/index.vue';
import ServerError from '@/views/_builtin/500/index.vue'
import ModelTemplate from './modules/model-template.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const CustomModelTemplate = defineAsyncComponent({
  loader: async () => {
    if (!props.id) {
      return () => h(NotFound)
    }
    // request
    const { error, data } = await fetchGetModule(props.id)

    if (error) {
      return () => h(ServerError)
    }

    if (!data) {
      return () => h(NotFound)
    }

    return () => h(ModelTemplate, {
      model: data
    })
  }
});
</script>

<template>
  <CustomModelTemplate />
</template>

<style scoped></style>
