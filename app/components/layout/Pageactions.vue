<template>
  <div class="page-actions">

    <!-- Notification -->
    <button
      class="action-button"
      type="button"
      aria-label="Notifikasi"
    >
      <svg viewBox="0 0 24 24" class="action-icon">
        <path
          d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6v-5a7 7 0 0 0-5.5-6.83V3a1.5 1.5 0 0 0-3 0v1.17A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"
        />
      </svg>
    </button>

    <!-- Help -->
    <button
      class="action-button"
      type="button"
      aria-label="Bantuan"
    >
      <svg viewBox="0 0 24 24" class="action-icon">
        <path
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-5h2v2h-2v-2Zm1-9a4 4 0 0 0-4 4h2a2 2 0 1 1 3.41 1.41C12.64 12.06 11 12.9 11 15h2c0-1.16.48-1.55 1.41-2.34A3.99 3.99 0 0 0 12 6Z"
        />
      </svg>
    </button>

  </div>
</template>

<style scoped>
.page-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-button {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  border: 1px solid var(--border);
  border-radius: 50%;

  background: var(--white);
  color: var(--text);

  cursor: pointer;

  transition: 0.2s ease;
}

.action-button:hover {
  background: #f5f6f8;
}

.action-icon {
  width: 15px;
  height: 15px;

  fill: currentColor;
}
</style>