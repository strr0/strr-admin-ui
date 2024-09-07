<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useBoolean } from '@/hooks/common';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { fetchSaveRole, fetchUpdateRole } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import ResourceAuthModal from './resource-auth-modal.vue';

defineOptions({
  name: 'RoleOperateDrawer'
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
const { bool: resourceAuthVisible, setTrue: openResourceAuthModal } = useBoolean();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.system.role.addRole'),
    edit: $t('page.system.role.editRole')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.System.Role, 'id' | 'name' | 'code' | 'remark' | 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: null,
    name: '',
    code: '',
    remark: '',
    status: null
  };
}

type RuleKey = Exclude<keyof Model, 'roleDesc'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  code: defaultRequiredRule,
  status: defaultRequiredRule
};

const roleId = computed(() => props.rowData?.id || -1);

const isEdit = computed(() => props.operateType === 'edit');

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
  const { error, _ } = model.id ? await fetchUpdateRole(model as Api.System.Role) : await fetchSaveRole(model as Api.System.Role)
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
        <NFormItem :label="$t('page.system.role.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.system.role.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.role.code')" path="roleCode">
          <NInput v-model:value="model.code" :placeholder="$t('page.system.role.form.code')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.role.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.system.role.remark')" path="remark">
          <NInput v-model:value="model.remark" :placeholder="$t('page.system.role.form.remark')" />
        </NFormItem>
      </NForm>
      <NSpace v-if="isEdit">
        <NButton @click="openResourceAuthModal">{{ $t('page.system.role.resourceAuth') }}</NButton>
        <ResourceAuthModal v-model:visible="resourceAuthVisible" :role-id="roleId" />
      </NSpace>
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
