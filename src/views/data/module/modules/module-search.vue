<script setup lang="ts">
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'ModuleSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.Data.ModuleSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse :default-expanded-names="['table-search']">
      <NCollapseItem :title="$t('common.search')" name="table-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.data.module.name')" path="name" class="pr-24px">
              <NInput v-model:value="model.name" :placeholder="$t('page.data.module.form.name')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.data.module.code')" path="code" class="pr-24px">
              <NInput v-model:value="model.code" :placeholder="$t('page.data.module.form.code')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.data.module.path')" path="path" class="pr-24px">
              <NInput v-model:value="model.path" :placeholder="$t('page.data.module.form.path')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.data.module.status')" path="status" class="pr-24px">
              <NSelect
                v-model:value="model.status"
                :placeholder="$t('page.data.module.form.status')"
                :options="translateOptions(enableStatusOptions)"
                clearable
              />
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
