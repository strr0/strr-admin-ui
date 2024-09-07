<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { fetchGetAllRoles, fetchGetRoleId, fetchSaveUser } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.System.User | null;
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
    add: $t('page.system.user.addUser'),
    edit: $t('page.system.user.editUser')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.System.User,
  'username' | 'nickname' | 'phone' | 'email' | 'roleIds' | 'status'
>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    username: '',
    nickname: '',
    phone: '',
    email: '',
    roleIds: [],
    status: null
  };
}

type RuleKey = Extract<keyof Model, 'username' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  username: defaultRequiredRule,
  status: defaultRequiredRule
};

/** the enabled role options */
const roleOptions = ref<CommonType.Option<string>[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetAllRoles();

  if (!error) {
    const options = data.map(item => ({
      label: item.name,
      value: item.id
    }));

    roleOptions.value = [...options];
  }
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

async function getRoleId() {
  if (!(props.operateType === 'edit') || !props.rowData) {
    return;
  }
  
  const { error, data } = await fetchGetRoleId(props.rowData.id);

  if (!error) {
    Object.assign(model, {roleIds: data});
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  const { error, _ } = await fetchSaveUser(model as Api.System.User);
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
    getRoleId();
  }
});

function init() {
  getRoleOptions();
}

// init
init();
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.system.user.username')" path="username">
          <NInput v-model:value="model.username" :placeholder="$t('page.system.user.form.username')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.user.nickname')" path="nickname">
          <NInput v-model:value="model.nickname" :placeholder="$t('page.system.user.form.nickname')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.user.phone')" path="phone">
          <NInput v-model:value="model.phone" :placeholder="$t('page.system.user.form.phone')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.user.email')" path="email">
          <NInput v-model:value="model.email" :placeholder="$t('page.system.user.form.email')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.user.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.system.user.role')" path="roleIds">
          <NSelect
            v-model:value="model.roleIds"
            multiple
            :options="roleOptions"
            :placeholder="$t('page.system.user.form.role')"
          />
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
