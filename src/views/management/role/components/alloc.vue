<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-tree block-line :data="treeData" :default-expanded-keys="expandedKeys" checkable :checked-keys="checkedKeys" :on-update:checked-keys="setCheckedKeys" expand-on-click />
    <n-space class="w-full pt-16px" :size="24" justify="end">
      <n-button class="w-72px" @click="closeModal">取消</n-button>
      <n-button class="w-72px" type="primary" @click="handleSubmit">确定</n-button>
    </n-space>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import type { FormInst, FormItemRule, TreeOption } from 'naive-ui';
import { useLoading } from '@/hooks';
import { fetchResourceList, fetchResourceIds, updateRoleRel } from '@/service'

const { startLoading, endLoading } = useLoading(false);

export interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /** 编辑的表格行数据 */
  roleId?: number | null;
}

defineOptions({ name: 'RoleAlloc' });

const props = withDefaults(defineProps<Props>(), {
  roleId: null
});

const treeData = ref<TreeOption[]>([]);
const expandedKeys = ref<number[]>([]);
function setTreeData(data: ApiManagement.Resource[]) {
  treeData.value = formatTreeOptions(data);
  expandedKeys.value = data.map(item => item.id);
}

function formatTreeOptions(data: ApiManagement.Resource[]): TreeOption[] {
  return data.map(item => {
    return {
      key: item.id,
      label: item.title,
      children: item.children ? formatTreeOptions(item.children) : null
    } as TreeOption
  })
}

async function getTreeData() {
  startLoading();
  const { data } = await fetchResourceList({});
  if (data) {
    setTimeout(() => {
      setTreeData(data);
      endLoading();
    }, 1000);
  }
}

const checkedKeys = ref<number[] | null>([])
function setCheckedKeys(data: number[] | null) {
  checkedKeys.value = data;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = '资源分配'

async function handleSubmit() {
  const { success } = await updateRoleRel({
    roleId: props.roleId,
    resourceIds: checkedKeys.value
  })
  if (!success) {
    window.$message?.error('更新失败');
    return
  }
  window.$message?.success('更新成功!');
  closeModal();
}

async function getCheckedKeys(roleId: number) {
  const { data } = await fetchResourceIds(roleId)
  setCheckedKeys(data)
}

watch(
  () => props.visible,
  newValue => {
    if (newValue && props.roleId) {
      getCheckedKeys(props.roleId)
    } else {
      setCheckedKeys(null)
    }
  }
);

function init() {
  getTreeData();
}

// 初始化
init();
</script>

<style scoped></style>
