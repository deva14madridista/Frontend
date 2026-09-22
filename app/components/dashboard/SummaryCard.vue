    <template>
    <div class="summary-card">
        <div class="icon-box">
        <span>{{ icon }}</span>
        </div>

        <div class="card-info">
        <p class="label">{{ title }}</p>
        <h2>{{ value }}</h2>
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
    type: [String, Number],
    required: true
  },

  icon: {
    type: String,
    default: '✈️'
  }
})
</script>

<style scoped>
.summary-card {
  flex: 1;
  min-height: 100px;
  padding: 18px;

  display: flex;
  align-items: center;
  gap: 14px;

  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.icon-box {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eef4ff;
  border-radius: 10px;

  font-size: 20px;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}

.card-info h2 {
  margin: 0;
  font-size: 24px;
  color: var(--text);
}
</style>