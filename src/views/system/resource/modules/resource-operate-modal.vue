<script setup lang="tsx">
import { computed, reactive, ref, watch } from 'vue';
import type { SelectOption } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/modules/form';
import { fetchSaveResource, fetchUpdateResource } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions, resourceIconTypeOptions, resourceTypeOptions } from '@/constants/business';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { getLocalIcons } from '@/utils/icon';

defineOptions({
  name: 'ResourceOperateModal'
});

export type OperateType = NaiveUI.TableOperateType | 'addChild';

interface Props {
  /** the type of operation */
  operateType: OperateType;
  /** the edit resource data or the parent resource data when adding a child resource */
  rowData?: Api.System.Resource | null;
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
  const titles: Record<OperateType, string> = {
    add: $t('page.system.resource.addResource'),
    addChild: $t('page.system.resource.addChildResource'),
    edit: $t('page.system.resource.editResource')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.System.Resource,
  | 'id'
  | 'type'
  | 'name'
  | 'path'
  | 'component'
  | 'i18nKey'
  | 'sort'
  | 'cache'
  | 'frame'
  | 'icon'
  | 'iconType'
  | 'visible'
  | 'perms'
  | 'remark'
  | 'status'
  | 'parentId'
> & {
  query: NonNullable<Api.System.Resource['query']>;
  param: string;
};

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: null,
    type: 'D',
    name: '',
    path: '',
    param: '',
    component: '',
    i18nKey: null,
    icon: '',
    iconType: '1',
    cache: '0',
    frame: '0',
    sort: 0,
    visible: '1',
    perms: '',
    status: '1',
    parentId: 0,
    query: []
  };
}

type RuleKey = Extract<keyof Model, 'title' | 'status' | 'name' | 'path'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  status: defaultRequiredRule,
  name: defaultRequiredRule,
  path: defaultRequiredRule
};

const disabledResourceType = computed(() => props.operateType === 'edit');

const localIcons = getLocalIcons();
const localIconOptions = localIcons.map<SelectOption>(item => ({
  label: () => (
    <div class="flex-y-center gap-16px">
      <SvgIcon localIcon={item} class="text-icon" />
      <span>{item}</span>
    </div>
  ),
  value: item
}));

const menuProps = computed(() => model.type === 'M');

const buttonProps = computed(() => model.type === 'B');

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (!props.rowData) return;

  if (props.operateType === 'addChild') {
    const { id } = props.rowData;

    Object.assign(model, { parentId: id });
  }

  if (props.operateType === 'edit') {
    const { path: routePath, ...rest } = props.rowData
    const [ path, param = '' ] = routePath.split('/:');

    Object.assign(model, rest, { path, param });
  }

  if (!model.query) {
    model.query = [];
  }
}

function closeDrawer() {
  visible.value = false;
}

function handleUpdateComponentByFrame() {
  if (model.frame === '1') {
    model.component = '_builtin/iframe-page/[url]';
  } else {
    model.component = ''
  }
}

function getSubmitParams() {
  if (model.type === 'B') {
    return {
      type: model.type,
      name: model.name,
      iconType: model.iconType,
      icon: model.icon,
      status: model.status,
      perms: model.perms,
      parentId: model.parentId
    }
  }

  const { param, frame, component, ...params } = model;
  const routePath = param.trim() ? `${model.path}/:${param}` : model.path;
  params.path = routePath;

  if (model.type === 'D') {
    return params;
  }

  return {
    ...params,
    frame,
    component
  };
}

async function handleSubmit() {
  await validate();

  const params = getSubmitParams();

  // request
  const { error, _ } = model.id ? await fetchUpdateResource(params as Api.System.Resource) : await fetchSaveResource(params as Api.System.Resource)
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

watch(
  () => model.frame,
  () => {
    handleUpdateComponentByFrame();
  }
);
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-800px">
    <NScrollbar class="h-480px pr-20px">
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
        <NGrid responsive="screen" item-responsive>
          <NFormItemGi span="24 m:12" :label="$t('page.system.resource.type')" path="type">
            <NRadioGroup v-model:value="model.type" :disabled="disabledResourceType">
              <NRadio v-for="item in resourceTypeOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.resource.name')" path="name">
            <NInput v-model:value="model.name" :placeholder="$t('page.system.resource.form.name')" />
          </NFormItemGi>
          <NFormItemGi v-if="!buttonProps" span="24 m:12" :label="model.frame === '1' ? $t('page.system.resource.href') : $t('page.system.resource.path')" path="path">
            <NInput v-model:value="model.path" :placeholder="model.frame === '1' ? $t('page.system.resource.form.href') : $t('page.system.resource.form.path')" />
          </NFormItemGi>
          <NFormItemGi v-if="!buttonProps" span="24 m:12" :label="$t('page.system.resource.param')" path="param">
            <NInput v-model:value="model.param" :placeholder="$t('page.system.resource.form.param')" />
          </NFormItemGi>
          <NFormItemGi v-if="!buttonProps" span="24 m:12" :label="$t('page.system.resource.i18nKey')" path="i18nKey">
            <NInput v-model:value="model.i18nKey" :placeholder="$t('page.system.resource.form.i18nKey')" />
          </NFormItemGi>
          <NFormItemGi v-if="!buttonProps" span="24 m:12" :label="$t('page.system.resource.sort')" path="sort">
            <NInputNumber v-model:value="model.sort" class="w-full" :placeholder="$t('page.system.resource.form.sort')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.resource.iconTypeTitle')" path="iconType">
            <NRadioGroup v-model:value="model.iconType">
              <NRadio
                v-for="item in resourceIconTypeOptions"
                :key="item.value"
                :value="item.value"
                :label="$t(item.label)"
              />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.resource.icon')" path="icon">
            <template v-if="model.iconType === '1'">
              <NInput v-model:value="model.icon" :placeholder="$t('page.system.resource.form.icon')" class="flex-1">
                <template #suffix>
                  <SvgIcon v-if="model.icon" :icon="model.icon" class="text-icon" />
                </template>
              </NInput>
            </template>
            <template v-if="model.iconType === '2'">
              <NSelect
                v-model:value="model.icon"
                :placeholder="$t('page.system.resource.form.localIcon')"
                :options="localIconOptions"
              />
            </template>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.resource.status')" path="status">
            <NRadioGroup v-model:value="model.status">
              <NRadio
                v-for="item in enableStatusOptions"
                :key="item.value"
                :value="item.value"
                :label="$t(item.label)"
              />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi v-if="!buttonProps" span="24 m:12" :label="$t('page.system.resource.cache')" path="cache">
            <NRadioGroup v-model:value="model.cache">
              <NRadio value="1" :label="$t('common.yesOrNo.yes')" />
              <NRadio value="0" :label="$t('common.yesOrNo.no')" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi v-if="!buttonProps" span="24 m:12" :label="$t('page.system.resource.visible')" path="visible">
            <NRadioGroup v-model:value="model.visible">
              <NRadio value="1" :label="$t('common.yesOrNo.yes')" />
              <NRadio value="0" :label="$t('common.yesOrNo.no')" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi v-if="menuProps" span="24 m:12" :label="$t('page.system.resource.frame')" path="frame">
            <NRadioGroup v-model:value="model.frame">
              <NRadio value="1" :label="$t('common.yesOrNo.yes')" />
              <NRadio value="0" :label="$t('common.yesOrNo.no')" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi v-if="menuProps" span="24 m:12" :label="$t('page.system.resource.component')" path="component">
            <NInput v-model:value="model.component" :placeholder="$t('page.system.resource.form.component')" />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.system.resource.perms')" path="perms">
            <NInput v-model:value="model.perms" :placeholder="$t('page.system.resource.form.perms')" />
          </NFormItemGi>
          <NFormItemGi v-if="!buttonProps" span="24" :label="$t('page.system.resource.query')">
            <NDynamicInput
              v-model:value="model.query"
              preset="pair"
              :key-placeholder="$t('page.system.resource.form.queryKey')"
              :value-placeholder="$t('page.system.resource.form.queryValue')"
            >
              <template #action="{ index, create, remove }">
                <NSpace class="ml-12px">
                  <NButton size="medium" @click="() => create(index)">
                    <icon-ic:round-plus class="text-icon" />
                  </NButton>
                  <NButton size="medium" @click="() => remove(index)">
                    <icon-ic-round-remove class="text-icon" />
                  </NButton>
                </NSpace>
              </template>
            </NDynamicInput>
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NScrollbar>
    <template #footer>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
