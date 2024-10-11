<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import type { UploadFileInfo, UploadInst, UploadCustomRequestOptions } from 'naive-ui'
import { fetchUploadFile } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'OssOperateModal'
});

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('page.system.oss.uploadFile'));

const fileListLengthRef = ref(0)
const uploadRef = ref<UploadInst | null>(null)

function handleChange(options: { fileList: UploadFileInfo[] }) {
  fileListLengthRef.value = options.fileList.length
}

function customRequest({ file, data, headers, withCredentials, action, onFinish, onError, onProgress }: UploadCustomRequestOptions) {
  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(
        key,
        data[key as keyof UploadCustomRequestOptions['data']]
      )
    })
  }
  formData.append('file', file.file as File)

  // request
  fetchUploadFile(formData)
}

async function handleSubmit() {
  // request
  uploadRef.value?.submit()

  window.$message?.success?.($t('page.system.oss.uploadFileSuccess'));

  closeModal();
  emit('submitted');
}

function init() {
}

watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <n-upload
      ref="uploadRef"
      :default-upload="false"
      @change="handleChange"
      :custom-request="customRequest"
    >
      <n-button>{{ $t('page.system.oss.chooseFile') }}</n-button>
    </n-upload>
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-16px" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton :disabled="!fileListLengthRef" type="primary" size="small" class="mt-16px" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
