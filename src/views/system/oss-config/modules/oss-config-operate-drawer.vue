<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useBoolean } from '@/hooks/common';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { fetchSaveOssConfig, fetchUpdateOssConfig } from '@/service/api';
import { $t } from '@/locales';
import { accessPolicyOptions, enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'OssConfigOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.System.Role | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.system.ossConfig.addOssConfig'),
    edit: $t('page.system.ossConfig.editOssConfig')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.System.OssConfig,
  | 'id'
  | 'configKey'
  | 'accessKey'
  | 'secretKey'
  | 'bucketName'
  | 'prefix'
  | 'endpoint'
  | 'domain'
  | 'isHttps'
  | 'region'
  | 'accessPolicy'
  | 'remark'
  | 'status'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: null,
    configKey: '',
    accessKey: '',
    secretKey: '',
    bucketName: '',
    prefix: '',
    endpoint: '',
    domain: '',
    isHttps: '0',
    region: '',
    accessPolicy: '1',
    remark: '',
    status: null
  };
}

type RuleKey = Exclude<keyof Model, 'remark'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  configKey: defaultRequiredRule,
  endpoint: defaultRequiredRule,
  accessKey: defaultRequiredRule,
  secretKey: defaultRequiredRule,
  status: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  const { error, _ } = model.id ? await fetchUpdateOssConfig(model as Api.System.OssConfig) : await fetchSaveOssConfig(model as Api.System.OssConfig)
  if (error) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.system.ossConfig.configKey')" path="configKey">
          <NInput v-model:value="model.configKey" :placeholder="$t('page.system.ossConfig.form.configKey')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.endpoint')" path="endpoint">
          <NInput v-model:value="model.endpoint" :placeholder="$t('page.system.ossConfig.form.endpoint')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.domain')" path="domain">
          <NInput v-model:value="model.domain" :placeholder="$t('page.system.ossConfig.form.domain')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.accessKey')" path="accessKey">
          <NInput v-model:value="model.accessKey" :placeholder="$t('page.system.ossConfig.form.accessKey')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.secretKey')" path="secretKey">
          <NInput v-model:value="model.secretKey" type="password" show-password-on="click" :placeholder="$t('page.system.ossConfig.form.secretKey')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.bucketName')" path="bucketName">
          <NInput v-model:value="model.bucketName" :placeholder="$t('page.system.ossConfig.form.bucketName')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.prefix')" path="prefix">
          <NInput v-model:value="model.prefix" :placeholder="$t('page.system.ossConfig.form.prefix')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.isHttps')" path="isHttps">
          <NRadioGroup v-model:value="model.isHttps">
            <NRadio value="1" :label="$t('common.yesOrNo.yes')" />
            <NRadio value="0" :label="$t('common.yesOrNo.no')" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.accessPolicy')" path="accessPolicy">
          <NRadioGroup v-model:value="model.accessPolicy">
            <NRadio v-for="item in accessPolicyOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.region')" path="region">
          <NInput v-model:value="model.region" :placeholder="$t('page.system.ossConfig.form.region')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.system.ossConfig.remark')" path="remark">
          <NInput v-model:value="model.remark" :placeholder="$t('page.system.ossConfig.form.remark')" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
