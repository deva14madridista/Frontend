<template>
  <div class="booking-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <strong>Pemesanan</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Pemesanan Perjalanan</h1>

      <LayoutPageActions />
    </div>

    <!-- Booking Tabs -->
    <div class="booking-tabs">

      <button
        class="booking-tab"
        :class="{ active: activeTab === 'flight' }"
        @click="activeTab = 'flight'"
      >
        <span class="tab-icon">✈</span>
        Tiket Pesawat
      </button>

      <button
        class="booking-tab"
        :class="{ active: activeTab === 'hotel' }"
        @click="activeTab = 'hotel'"
      >
        <span class="tab-icon">▣</span>
        Hotel
      </button>

      <button
        class="booking-tab"
        :class="{ active: activeTab === 'transport' }"
        @click="activeTab = 'transport'"
      >
        <span class="tab-icon">✈</span>
        Transportasi
      </button>

    </div>

    <!-- =========================
         FLIGHT
    ========================= -->

    <template v-if="activeTab === 'flight'">

      <!-- Search Form -->
      <div class="search-card">

        <div class="form-group">
          <label>Dari</label>

          <input
            v-model="searchForm.from"
            type="text"
            placeholder="Kota asal"
          />
        </div>

        <div class="form-group">
          <label>Ke</label>

          <input
            v-model="searchForm.to"
            type="text"
            placeholder="Kota tujuan"
          />
        </div>

        <div class="form-group">
          <label>Tanggal Berangkat</label>

          <div class="date-input">
            <input
              v-model="searchForm.date"
              type="date"
            />

            <span>▣</span>
          </div>
        </div>

        <div class="form-group">
          <label>Penumpang</label>

          <select v-model="searchForm.passenger">
            <option>1 Dewasa</option>
            <option>2 Dewasa</option>
            <option>3 Dewasa</option>
            <option>4 Dewasa</option>
          </select>
        </div>

        <button
          class="search-button"
          @click="searchFlight"
        >
          Cari Penerbangan
        </button>

      </div>

      <!-- Flight Results -->
      <section class="flight-section">

        <h2>Pilihan Penerbangan</h2>

        <div class="flight-list">

          <div
            v-for="flight in flights"
            :key="flight.id"
            class="flight-item"
          >

            <!-- Airline -->
            <div class="airline-info">

              <div class="airline-icon">
                ✈
              </div>

              <strong>{{ flight.airline }}</strong>

            </div>

            <!-- Departure -->
            <div class="flight-time">
              <strong>{{ flight.departure }}</strong>
              <span>{{ flight.fromCode }}</span>
            </div>

            <!-- Duration -->
            <div class="flight-duration">
              <span>{{ flight.duration }}</span>
              <small>Langsung</small>
            </div>

            <!-- Arrival -->
            <div class="flight-time">
              <strong>{{ flight.arrival }}</strong>
              <span>{{ flight.toCode }}</span>
            </div>

            <!-- Price -->
            <div class="flight-price">
              {{ flight.price }}
            </div>

            <!-- Choose -->
            <button
              class="choose-button"
              @click="chooseFlight(flight)"
            >
              Pilih
            </button>

          </div>

        </div>

      </section>

      <!-- Note -->
      <p class="price-note">
        * Harga dapat berubah sewaktu-waktu
      </p>

    </template>

    <!-- =========================
         HOTEL
    ========================= -->

    <template v-else-if="activeTab === 'hotel'">

      <div class="empty-booking">

        <div class="empty-icon">
          ▣
        </div>

        <h2>Pemesanan Hotel</h2>

        <p>
          Fitur pemesanan hotel akan tersedia di sini.
        </p>

      </div>

    </template>

    <!-- =========================
         TRANSPORT
    ========================= -->

    <template v-else>

      <div class="empty-booking">

        <div class="empty-icon">
          ✈
        </div>

        <h2>Pemesanan Transportasi</h2>

        <p>
          Fitur pemesanan transportasi akan tersedia di sini.
        </p>

      </div>

    </template>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('flight')

const searchForm = ref({
  from: 'Jakarta (CGK)',
  to: 'Bandung (BDO)',
  date: '2026-05-12',
  passenger: '1 Dewasa'
})

const flights = ref([
  {
    id: 1,
    airline: 'Garuda Indonesia',
    departure: '08:00',
    arrival: '09:15',
    duration: '1j 15m',
    fromCode: 'CGK',
    toCode: 'BDO',
    price: 'Rp 1.250.000'
  },
  {
    id: 2,
    airline: 'Lion Air',
    departure: '10:30',
    arrival: '11:40',
    duration: '1j 10m',
    fromCode: 'CGK',
    toCode: 'BDO',
    price: 'Rp 950.000'
  },
  {
    id: 3,
    airline: 'Citilink',
    departure: '15:20',
    arrival: '16:30',
    duration: '1j 10m',
    fromCode: 'CGK',
    toCode: 'BDO',
    price: 'Rp 850.000'
  }
])

const searchFlight = () => {
  console.log('Mencari penerbangan:', searchForm.value)
}

const chooseFlight = (flight) => {
  console.log('Penerbangan dipilih:', flight)
}
</script>

<style scoped>
/* =========================
   PAGE
========================= */

.booking-page {
  min-height: 100vh;

  padding: 24px 28px;

  background: #f5f6f8;
}

/* =========================
   BREADCRUMB
========================= */

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 4px;

  font-size: 9px;

  color: #9aa4b5;
}

.breadcrumb a {
  color: #9aa4b5;
  text-decoration: none;
}

.breadcrumb strong {
  color: var(--text);
  font-weight: 600;
}

/* =========================
   HEADER
========================= */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;

  font-size: 23px;
  font-weight: 700;

  color: var(--text);
}

/* =========================
   TABS
========================= */

.booking-tabs {
  display: flex;
  align-items: center;

  gap: 18px;

  height: 38px;

  margin-bottom: 24px;

  border-bottom: 1px solid #dfe3ea;
}

.booking-tab {
  position: relative;

  height: 38px;

  display: flex;
  align-items: center;

  gap: 7px;

  padding: 0;

  border: none;

  background: transparent;

  color: #718096;

  font-family: inherit;
  font-size: 10px;

  cursor: pointer;
}

.booking-tab.active {
  color: var(--primary);

  font-weight: 600;
}

.booking-tab.active::after {
  content: "";

  position: absolute;

  left: 0;
  right: 0;
  bottom: -1px;

  height: 2px;

  background: var(--primary);
}

.tab-icon {
  font-size: 12px;
}

/* =========================
   SEARCH CARD
========================= */

.search-card {
  position: relative;

  display: grid;

  grid-template-columns:
    minmax(150px, 1fr)
    minmax(150px, 1fr)
    minmax(170px, 1fr)
    minmax(150px, 1fr);

  gap: 12px;

  padding: 18px;

  background: var(--white);

  border: 1px solid var(--border);
  border-radius: 10px;

  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;

  gap: 6px;
}

.form-group label {
  font-size: 9px;

  font-weight: 600;

  color: #667085;
}

.form-group input,
.form-group select {
  width: 100%;
  height: 32px;

  box-sizing: border-box;

  padding: 0 10px;

  border: 1px solid #dce2eb;
  border-radius: 6px;

  background: var(--white);

  color: var(--text);

  outline: none;

  font-family: inherit;
  font-size: 10px;
}

.form-group input:focus,
.form-group select:focus {
  border-color: var(--primary);
}

/* =========================
   DATE
========================= */

.date-input {
  position: relative;
}

.date-input input {
  padding-right: 30px;
}

.date-input span {
  position: absolute;

  top: 50%;
  right: 10px;

  transform: translateY(-50%);

  font-size: 11px;

  color: #718096;

  pointer-events: none;
}

/* =========================
   SEARCH BUTTON
========================= */

.search-button {
  grid-column: 1 / -1;

  justify-self: end;

  height: 32px;

  padding: 0 18px;

  border: none;

  border-radius: 6px;

  background: var(--primary);

  color: var(--white);

  font-family: inherit;

  font-size: 10px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.search-button:hover {
  opacity: 0.9;
}

/* =========================
   FLIGHT SECTION
========================= */

.flight-section {
  margin-bottom: 18px;
}

.flight-section h2 {
  margin: 0 0 10px;

  font-size: 14px;

  font-weight: 700;

  color: var(--text);
}

/* =========================
   FLIGHT LIST
========================= */

.flight-list {
  display: flex;

  flex-direction: column;

  gap: 10px;
}

.flight-item {
  min-height: 58px;

  display: grid;

  grid-template-columns:
    1.7fr
    0.7fr
    0.7fr
    0.7fr
    0.9fr
    60px;

  align-items: center;

  gap: 12px;

  padding: 0 16px;

  background: var(--white);

  border: 1px solid var(--border);

  border-radius: 8px;
}

/* =========================
   AIRLINE
========================= */

.airline-info {
  display: flex;
  align-items: center;

  gap: 12px;
}

.airline-icon {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  background: #eaf1ff;

  color: var(--primary);

  font-size: 15px;
}

.airline-info strong {
  font-size: 11px;

  color: var(--text);
}

/* =========================
   TIME
========================= */

.flight-time {
  display: flex;
  flex-direction: column;

  align-items: center;
}

.flight-time strong {
  font-size: 14px;

  color: var(--text);
}

.flight-time span {
  margin-top: 2px;

  font-size: 8px;

  color: #9aa4b5;
}

/* =========================
   DURATION
========================= */

.flight-duration {
  display: flex;
  flex-direction: column;

  align-items: center;

  color: #718096;
}

.flight-duration span {
  font-size: 8px;
}

.flight-duration small {
  margin-top: 3px;

  font-size: 7px;

  color: #9aa4b5;
}

/* =========================
   PRICE
========================= */

.flight-price {
  text-align: right;

  color: var(--primary);

  font-size: 11px;

  font-weight: 700;

  white-space: nowrap;
}

/* =========================
   CHOOSE BUTTON
========================= */

.choose-button {
  height: 28px;

  border: none;

  border-radius: 6px;

  background: var(--primary);

  color: var(--white);

  font-family: inherit;

  font-size: 9px;
  font-weight: 600;

  cursor: pointer;
}

.choose-button:hover {
  opacity: 0.9;
}

/* =========================
   NOTE
========================= */

.price-note {
  margin: 18px 0 0;

  font-size: 8px;

  color: #9aa4b5;
}

/* =========================
   EMPTY TAB
========================= */

.empty-booking {
  min-height: 250px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background: var(--white);

  border: 1px solid var(--border);

  border-radius: 10px;
}

.empty-icon {
  width: 45px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 12px;

  border-radius: 10px;

  background: #eaf1ff;

  color: var(--primary);

  font-size: 20px;
}

.empty-booking h2 {
  margin: 0;

  font-size: 16px;

  color: var(--text);
}

.empty-booking p {
  margin: 6px 0 0;

  font-size: 10px;

  color: var(--text-muted);
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {
  .search-card {
    grid-template-columns: 1fr 1fr;
  }

  .flight-item {
    min-width: 750px;
  }

  .flight-list {
    overflow-x: auto;
  }
}

@media (max-width: 600px) {
  .booking-page {
    padding: 16px;
  }

  .search-card {
    grid-template-columns: 1fr;
  }

  .search-button {
    grid-column: auto;

    justify-self: stretch;
  }
}
</style>