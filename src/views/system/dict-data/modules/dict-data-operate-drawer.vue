<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { fetchSaveDictData, fetchUpdateDictData } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'DictDataOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.System.DictData | null;
  /** dict type */
  dictType: string;
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
    add: $t('page.system.dictData.addDictData'),
    edit: $t('page.system.dictData.editDictData')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.System.DictData, 'id' | 'label' | 'value' | 'sort' | 'dictType' | 'remark' | 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: null,
    label: '',
    value: '',
    sort: 0,
    dictType: props.dictType,
    remark: '',
    status: '1'
  };
}

type RuleKey = Exclude<keyof Model, 'remark'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  label: defaultRequiredRule,
  value: defaultRequiredRule,
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
  const { error, _ } = model.id ? await fetchUpdateDictData(model as Api.System.DictData) : await fetchSaveDictData(model as Api.System.DictData)
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
        <NFormItem :label="$t('page.system.dictData.label')" path="label">
          <NInput v-model:value="model.label" :placeholder="$t('page.system.dictData.form.label')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.dictData.value')" path="value">
          <NInput v-model:value="model.value" :placeholder="$t('page.system.dictData.form.value')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.dictData.sort')" path="sort">
          <NInput v-model:value="model.sort" :placeholder="$t('page.system.dictData.form.sort')" />
        </NFormItem>
        <NFormItem :label="$t('page.system.dictData.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.system.dictData.remark')" path="remark">
          <NInput v-model:value="model.remark" :placeholder="$t('page.system.dictData.form.remark')" />
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
