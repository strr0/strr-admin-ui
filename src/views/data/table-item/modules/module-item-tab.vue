<script setup lang="tsx">
import type { SelectOption } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'ModuleItemTab'
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const model = defineModel<Api.Data.Module>('model', { required: true });

type RuleKey = Extract<keyof Api.Data.Module, 'name' | 'code' | 'path' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultRequiredRule,
  path: defaultRequiredRule,
  status: defaultRequiredRule
};
</script>

<template>
  <NScrollbar class="h-480px pr-20px">
    <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24 m:12" :label="$t('page.data.module.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.data.module.form.name')" />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" :label="$t('page.data.module.code')" path="code">
          <NInput v-model:value="model.code" :placeholder="$t('page.data.module.form.code')" />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" :label="$t('page.data.module.path')" path="path">
          <NInput v-model:value="model.path" :placeholder="$t('page.data.module.form.path')" />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" :label="$t('page.data.module.status')" path="status">
          <NRadioGroup v-model:value="model.status">
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
