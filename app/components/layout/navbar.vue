<template>
  <header class="navbar">
    <div class="navbar-left">
      <h1>Dashboard</h1>
    </div>

    <div class="navbar-right">
      <button class="notification">
        🔔
      </button>

      <div class="profile">
        <div class="avatar">
          D
        </div>

        <div class="profile-info">
          <span class="name">Deva Fauzan</span>
          <span class="role">Administrator</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  height: 72px;
  padding: 0 28px;
  background: var(--white);
  border-bottom: 1px solid var(--border);

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-left h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.notification {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--primary);
  color: var(--white);
  font-weight: 600;
}

.profile-info {
  display: flex;
  flex-direction: column;
  margin-right: 80px;
}

.name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.role {
  font-size: 12px;
  color: var(--text-muted);
}
</style>