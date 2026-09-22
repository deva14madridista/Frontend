<template>
  <div class="summary-card">

    <div class="card-icon">
      {{ icon }}
    </div>

    <div class="card-content">
      <p class="card-title">
        {{ title }}
      </p>

      <h2 class="card-value">
        {{ value }}
      </h2>
    </div>

  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },

  value: {
    type: Number,
    required: true
  },

  icon: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;

  min-height: 92px;
  padding: 20px;

  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

/* ICON */

.card-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: #edf3ff;
  border-radius: 10px;

  font-size: 20px;
}

/* TEXT */

.card-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.card-title {
  margin: 0;

  font-size: 12px;
  color: var(--text-muted);
}

.card-value {
  margin: 0;

  font-size: 28px;
  line-height: 1;

  font-weight: 700;
  color: var(--text);
}
</style>