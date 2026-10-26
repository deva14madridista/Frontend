<template>
  <div class="data-notice" role="status">
    <strong>Data belum tersedia</strong>
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<style scoped>
.data-notice {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 14px 16px;
  border: 1px solid #f1d6a8;
  border-radius: 8px;
  background: #fffaf0;
  color: #8a5a12;
  font-size: 12px;
  line-height: 1.5;
}

.data-notice strong {
  font-size: 12px;
}
</style>
