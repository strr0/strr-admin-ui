<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { request } from '@/service/request';
import { $t } from '@/locales';

defineOptions({
  name: 'ModelOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: any | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const moduleName = defineModel<string>('moduleName', { required: true });

const modulePath = defineModel<string>('modulePath', { required: true });

const formCols = defineModel<Api.Data.Column[]>('formCols', { required: true });

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('common.add') + moduleName.value,
    edit: $t('common.edit') + moduleName.value
  };
  return titles[props.operateType];
});

const model: any = reactive({});

const rules: Record<string, App.Global.FormRule> = {
};

const roleId = computed(() => props.rowData?.id || -1);

function handleInitModel() {
  Object.assign(model, {});

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
  const { error, _ } = await request<void>({
    url: `/data/${modulePath.value}`,
    method: model.id ? 'put' : 'post',
    data: model
  })
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
        <NFormItem v-for="item in formCols" :label="item.comment" :path="item.name">
          <NInput v-model:value="model[item.name]" :placeholder="$t('common.enter') + item.comment" />
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
