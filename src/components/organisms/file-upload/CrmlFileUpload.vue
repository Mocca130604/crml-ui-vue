<template>
  <div :class="['crml-file-upload-group', `crml-file-upload-group--${variant}`, { 'crml-file-upload-group--disabled': disabled }]">
    <label v-if="label" class="crml-file-upload__label">{{ label }}</label>

    <div
      :class="['crml-file-upload-dropzone', { 'crml-file-upload--dragging': isDragging }]"
      @dragover.prevent="!disabled && (isDragging = true)"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInputRef"
        type="file"
        :multiple="multiple"
        :accept="accept"
        class="file-input-hidden"
        @change="handleFileSelect"
      />

      <div class="dropzone-center-content">
        <div :class="['floppy-icon-box', `floppy-icon-box--${variant}`]">
          <slot name="icon">
            <span class="icon-symbol">{{ icon }}</span>
          </slot>
        </div>
        <h4 class="upload-title">
          <slot name="title">{{ title }}</slot>
        </h4>
        <p class="upload-desc">
          <slot name="description">{{ description }}</slot>
        </p>

        <!-- Upload Progress Bar -->
        <div class="upload-progress-container" v-if="showProgress">
          <div class="progress-info-row">
            <span class="progress-filename-text">{{ progressFileName }}</span>
            <span class="progress-percent-text">{{ progressPercent }}%</span>
          </div>
          <div class="progress-track-brutal">
            <div :class="['progress-fill', `progress-fill--${variant}`]" :style="{ width: `${progressPercent}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Max size hint -->
    <span v-if="maxSizeLabel" class="crml-file-upload__hint">{{ maxSizeLabel }}</span>

    <!-- Selected files preview list -->
    <div v-if="selectedFiles.length > 0" class="file-preview-list">
      <div v-for="(file, index) in selectedFiles" :key="index" class="file-preview-item">
        <span :class="['file-check-icon', `file-check-icon--${variant}`]">{{ fileCheckIcon }}</span>
        <div class="file-item-info">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatBytes(file.size) }}</span>
        </div>
        <button type="button" class="file-remove-btn" @click.stop="removeFile(index)">{{ removeIcon }}</button>
      </div>
    </div>

    <span v-if="error" class="crml-file-upload__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface CrmlFileUploadProps {
  /** Form label */
  label?: string;
  /** Dropzone title text */
  title?: string;
  /** Dropzone description text */
  description?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Accepted file types */
  accept?: string;
  /** Show upload progress */
  showProgress?: boolean;
  /** Progress file name display */
  progressFileName?: string;
  /** Progress percentage (0-100) */
  progressPercent?: number;
  /** Color variant */
  variant?: 'blue' | 'primary' | 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Dropzone icon (or use #icon slot) */
  icon?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Max file size in bytes */
  maxSize?: number;
  /** Max size display label */
  maxSizeLabel?: string;
  /** Error text */
  error?: string;
  /** File check icon in list */
  fileCheckIcon?: string;
  /** Remove button icon */
  removeIcon?: string;
}

const props = withDefaults(defineProps<CrmlFileUploadProps>(), {
  title: 'DRAG & DROP ASSETS HERE',
  description: 'SUPPORTED: .FIG, .JSON, .PNG, .SVG (MAX 50MB)',
  multiple: false,
  showProgress: false,
  progressFileName: 'uploading...',
  progressPercent: 0,
  variant: 'lime',
  icon: '💾',
  disabled: false,
  fileCheckIcon: '✓',
  removeIcon: '✕',
});

const emit = defineEmits<{
  (e: 'change', files: File[]): void;
  (e: 'error', message: string): void;
}>();

const isDragging = ref(false);
const selectedFiles = ref<File[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  if (props.disabled) return;
  fileInputRef.value?.click();
};

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    addFiles(Array.from(target.files));
  }
};

const handleDrop = (e: DragEvent) => {
  if (props.disabled) return;
  isDragging.value = false;
  if (e.dataTransfer?.files) {
    addFiles(Array.from(e.dataTransfer.files));
  }
};

const addFiles = (files: File[]) => {
  // Validate max size
  if (props.maxSize) {
    const oversized = files.filter(f => f.size > props.maxSize!);
    if (oversized.length > 0) {
      emit('error', `File(s) too large: ${oversized.map(f => f.name).join(', ')}`);
      files = files.filter(f => f.size <= props.maxSize!);
    }
  }

  if (props.multiple) {
    selectedFiles.value.push(...files);
  } else {
    selectedFiles.value = files.slice(0, 1);
  }
  emit('change', selectedFiles.value);
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
  emit('change', selectedFiles.value);
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
</script>

<style scoped>
.crml-file-upload-group {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
  font-family: var(--crml-font-body);
}

.crml-file-upload-group--disabled { opacity: 0.5; pointer-events: none; }

.crml-file-upload__label {
  font-size: 0.875rem;
  font-weight: 800;
  font-family: var(--crml-font-heading);
  color: var(--crml-text-main);
}

.crml-file-upload-dropzone {
  border: 3px dashed var(--crt-obsidian);
  border-radius: var(--crml-radius-xl);
  background-color: var(--crml-bg-elevated, rgba(0,0,0,0.02));
  padding: 1.5rem 1.25rem;
  cursor: pointer;
  text-align: center;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.crml-file-upload-dropzone:hover,
.crml-file-upload--dragging {
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  transform: translate(-1px, -1px);
}

.crml-file-upload-group--lime .crml-file-upload--dragging { background-color: rgba(204, 255, 0, 0.15); }
.crml-file-upload-group--pink .crml-file-upload--dragging { background-color: rgba(255, 0, 127, 0.1); }
.crml-file-upload-group--cyan .crml-file-upload--dragging { background-color: rgba(0, 240, 255, 0.1); }
.crml-file-upload-group--yellow .crml-file-upload--dragging { background-color: rgba(255, 214, 0, 0.1); }

.file-input-hidden { display: none; }

.dropzone-center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.floppy-icon-box {
  width: 3rem;
  height: 3rem;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-3deg);
  margin-bottom: 0.25rem;
}

.floppy-icon-box--lime { background-color: var(--crt-electric-lime, #CCFF00); }
.floppy-icon-box--blue, .floppy-icon-box--primary { background-color: var(--crt-ryo-blue-500, #1B6FFF); }
.floppy-icon-box--pink { background-color: var(--crt-hot-pink); }
.floppy-icon-box--cyan { background-color: var(--crt-cyber-cyan); }
.floppy-icon-box--yellow { background-color: var(--crt-sunburst-yellow); }

.icon-symbol { font-size: 1.5rem; }

.upload-title {
  font-family: var(--crml-font-heading);
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  color: var(--crml-text-main);
  text-transform: uppercase;
}

.upload-desc {
  font-size: 0.725rem;
  color: var(--crml-text-muted);
  font-family: var(--crml-font-mono);
  font-weight: 700;
}

.upload-progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  max-width: 280px;
  margin-top: 0.65rem;
}

.progress-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.7rem;
}

.progress-filename-text { color: var(--crml-text-main); }
.progress-percent-text { color: var(--crt-hot-pink); }

.progress-track-brutal {
  height: 10px;
  background-color: var(--crml-bg-elevated, #e0e0e0);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 999px;
  overflow: hidden;
  padding: 1px;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  border: 1px solid var(--crml-border-ink, #0D0D0D);
  transition: width 0.3s ease;
}

.progress-fill--lime { background-color: var(--crt-electric-lime, #CCFF00); }
.progress-fill--blue, .progress-fill--primary { background-color: var(--crt-ryo-blue-500, #1B6FFF); }
.progress-fill--pink { background-color: var(--crt-hot-pink); }
.progress-fill--cyan { background-color: var(--crt-cyber-cyan); }
.progress-fill--yellow { background-color: var(--crt-sunburst-yellow); }

.crml-file-upload__hint {
  font-size: 0.7rem;
  color: var(--crml-text-muted);
  font-family: var(--crml-font-mono);
}

.file-preview-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.file-preview-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-sm);
}

.file-check-icon {
  font-size: 0.85rem;
  font-weight: 900;
  color: var(--crt-obsidian);
  border: 1px solid var(--crml-border-ink, #0D0D0D);
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-check-icon--lime { background-color: var(--crt-electric-lime, #CCFF00); }
.file-check-icon--blue, .file-check-icon--primary { background-color: var(--crt-ryo-blue-500, #1B6FFF); color: white; }
.file-check-icon--pink { background-color: var(--crt-hot-pink); color: white; }
.file-check-icon--cyan { background-color: var(--crt-cyber-cyan); }
.file-check-icon--yellow { background-color: var(--crt-sunburst-yellow); }

.file-item-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.file-name {
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--crt-obsidian);
}

.file-size {
  font-size: 0.7rem;
  color: var(--crml-text-muted);
}

.file-remove-btn {
  background: none;
  border: none;
  font-family: var(--crml-font-heading);
  font-weight: 900;
  font-size: 0.85rem;
  cursor: pointer;
  color: var(--crt-hot-pink);
}

.crml-file-upload__error {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--crt-hot-pink);
}
</style>
