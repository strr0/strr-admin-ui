<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useBoolean } from '@/hooks/common';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { fetchSaveOauthClient, fetchUpdateOauthClient } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'OauthClientOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.System.OauthClient | null;
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
    add: $t('page.system.oauthClient.addOauthClient'),
    edit: $t('page.system.oauthClient.editOauthClient')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.System.OauthClient, 'id' | 'clientId' | 'clientSecret' | 'grantType' | 'scope' | 'redirectUri' | 'accessTimeout' | 'refreshTimeout' | 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: null,
    clientId: '',
    clientSecret: '',
    grantType: '',
    scope: '',
    redirectUri: '',
    accessTimeout: null,
    refreshTimeout: null,
    status: '1'
  };
}

type RuleKey = Exclude<keyof Model, 'remark'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  clientId: defaultRequiredRule,
  clientSecret: defaultRequiredRule,
  grantType: defaultRequiredRule,
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
  const { error, _ } = model.id ? await fetchUpdateOauthClient(model as Api.System.OauthClient) : await fetchSaveOauthClient(model as Api.System.OauthClient)
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
        <NFormItem :label="$t('page.system.oauthClient.clientId')" path="clientId">
          <NInput v-model:value="model.clientId" :placeholder="$t('page.system.oauthClient.form.clientId')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.oauthClient.clientSecret')" path="clientSecret">
          <NInput v-model:value="model.clientSecret" :placeholder="$t('page.system.oauthClient.form.clientSecret')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.oauthClient.grantType')" path="grantType">
          <NInput v-model:value="model.grantType" :placeholder="$t('page.system.oauthClient.form.grantType')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.oauthClient.scope')" path="scope">
          <NInput v-model:value="model.scope" :placeholder="$t('page.system.oauthClient.form.scope')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.oauthClient.redirectUri')" path="redirectUri">
          <NInput v-model:value="model.redirectUri" :placeholder="$t('page.system.oauthClient.form.redirectUri')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.oauthClient.accessTimeout')" path="accessTimeout">
          <NInputNumber v-model:value="model.accessTimeout" class="w-full" :placeholder="$t('page.system.oauthClient.form.accessTimeout')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.oauthClient.refreshTimeout')" path="refreshTimeout">
          <NInputNumber v-model:value="model.refreshTimeout" class="w-full" :placeholder="$t('page.system.oauthClient.form.refreshTimeout')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.oauthClient.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
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
