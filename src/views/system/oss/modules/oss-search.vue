<script setup lang="ts">
import { $t } from '@/locales';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'OssSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.System.OssSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['oss-search']">
      <NCollapseItem :title="$t('common.search')" name="oss-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.oss.fileName')" path="fileName" class="pr-24px">
              <NInput v-model:value="model.fileName" :placeholder="$t('page.system.oss.form.fileName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.oss.originalName')" path="originalName" class="pr-24px">
              <NInput v-model:value="model.originalName" :placeholder="$t('page.system.oss.form.originalName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.oss.fileSuffix')" path="fileSuffix" class="pr-24px">
              <NInput v-model:value="model.fileSuffix" :placeholder="$t('page.system.oss.form.fileSuffix')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.system.oss.service')" path="service" class="pr-24px">
              <NInput v-model:value="model.service" :placeholder="$t('page.system.oss.form.service')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
