<template>
  <div class="outer-container">
    <div class="image-list">
      <ul>
        <li v-for="(img, index) in allImages" :key="index">
          <img :src="img" @click="selectImage(img)" alt="" />
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="image-container">
        <img ref="imageElement" :src="selectedImage" alt="Image to be cropped" @load="onImageLoad" />
      </div>
      <div>
        <div ref="preview" class="preview-container" @dblclick="addCroppedImage">
          <!-- Preview area for cropped image -->
        </div>
      </div>
    </div>
    <div class="cropped-images">
      <ul>
        <li v-for="(cropped, index) in croppedImages" :key="index">
          <img :src="cropped.url" alt="Cropped Image" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { PaperConfig } from '@/types'
import { onMounted, ref, watch } from 'vue'

const imageElement = ref<HTMLImageElement | null>(null)
const preview = ref<HTMLDivElement | null>(null)
const croppedImages = ref<{ url: string }[]>([])
// eslint-disable-next-line no-undef
const props = defineProps<{ item: PaperConfig }>()
const allImages = ref<string[]>([])
const selectedImage = ref<string>('')

let cropperInstance: Cropper | null = null

function splitPreviewImages (item: PaperConfig) {
  return item && item.previewimages ? item.previewimages.split(',') : []
}

function initializeCropper () {
  if (imageElement.value && preview.value) {
    if (cropperInstance) {
      cropperInstance.destroy()
    }
    cropperInstance = new Cropper(imageElement.value, {
      zoomable: false,
      movable: false,
      autoCrop: false,
      preview: preview.value
    })
  }
}

function selectImage (img: string) {
  if (img === selectedImage.value) return
  selectedImage.value = img
  initializeCropper()
}

function onImageLoad () {
  initializeCropper()
}

function addCroppedImage () {
  if (cropperInstance && imageElement.value) {
    const canvas = cropperInstance.getCroppedCanvas()
    canvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        croppedImages.value.push({ url })
      }
    }, 'image/png')
  }
}

watch(() => props.item, (newItem) => {
  allImages.value = splitPreviewImages(newItem)
  if (allImages.value.length > 0) {
    selectImage(allImages.value[0])
  }
}, { immediate: true })

onMounted(() => {
  initializeCropper()
})
</script>

<style scoped>
.outer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin: 20px 0;
}

.image-list {
  background: silver;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 10px 0;
}

.image-list ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: calc(100% - 40px);
}

.image-list li {
  flex: 0 0 auto;
  margin: 0 10px;
}

.image-list img {
  height: 100px;
  cursor: pointer;
}

.container {
  background: #FAAD15;
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
}

.image-container {
  flex: 1;
  max-height: 500px;
}

img {
  width: 100%;
  display: block;
}

.preview-container {
  width: 420px;
  height: 500px;
  border: 1px solid #ccc;
  overflow: hidden;
  position: relative;
}

.cropped-images {
  background: silver;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 10px 0;
}

.cropped-images ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.cropped-images li {
  flex: 0 0 auto;
  margin: 0 10px;
  text-align: center;
}

.cropped-images img {
  height: 100px;
}
</style>
