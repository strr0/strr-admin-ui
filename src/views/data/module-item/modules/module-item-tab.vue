<script setup lang="tsx">
import { watch } from 'vue';
import type { SelectOption } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'ModuleItemTab'
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const data = defineModel<Api.Data.Module>('data', { required: true });

interface Emits {
  (e: 'update'): void;
}

const emit = defineEmits<Emits>();

type RuleKey = Extract<keyof Api.Data.Module, 'name' | 'code' | 'path' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultRequiredRule,
  path: defaultRequiredRule,
  status: defaultRequiredRule
};

watch(data, val => {
  if (val) {
    emit('update', val);
  }
});
</script>

<template>
  <NScrollbar class="h-480px pr-20px">
    <NForm ref="formRef" :model="data" :rules="rules" label-placement="left" :label-width="100">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24 m:12" :label="$t('page.data.module.name')" path="name">
          <NInput v-model:value="data.name" :placeholder="$t('page.data.module.form.name')" />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" :label="$t('page.data.module.code')" path="code">
          <NInput v-model:value="data.code" :placeholder="$t('page.data.module.form.code')" />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" :label="$t('page.data.module.path')" path="path">
          <NInput v-model:value="data.path" :placeholder="$t('page.data.module.form.path')" />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" :label="$t('page.data.module.status')" path="status">
          <NRadioGroup v-model:value="data.status">
            <NRadio
              v-for="item in enableStatusOptions"
              :key="item.value"
              :value="item.value"
              :label="$t(item.label)"
            />
          </NRadioGroup>
        </NFormItemGi>
      </NGrid>
    </NForm>
  </NScrollbar>
</template>

<style scoped></style>
