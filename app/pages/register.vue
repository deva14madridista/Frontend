<template>
  <div class="register-page">

    <!-- =========================
         LEFT BRAND SECTION
    ========================== -->
    <section class="brand-section">

      <div class="brand-content">

        <img
          src="~/assets/image/eduabsen.png"
          alt="Eduabsen"
          class="brand-image"
        />

        <p class="brand-description">
          Kelola perjalanan dinas menjadi lebih
          mudah, cepat, dan terorganisir.
        </p>

      </div>

      <p class="copyright">
        © 2026 CTMS. All rights reserved.
      </p>

    </section>


    <!-- =========================
         RIGHT REGISTER SECTION
    ========================== -->
    <section class="form-section">

      <div class="register-form">

        <!-- HEADER -->
        <div class="form-header">

          <h2>Buat Akun Baru</h2>

          <p>
            Daftar untuk mulai mengelola perjalanan dinas
          </p>

        </div>


        <!-- FORM -->
        <form @submit.prevent="register">

          <!-- NAMA LENGKAP -->
          <div class="form-group">

            <label>
              Nama Lengkap
              <span>*</span>
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="masukkan nama lengkap"
            />

          </div>


          <!-- EMAIL -->
          <div class="form-group">

            <label>
              Email
              <span>*</span>
            </label>

            <input
              v-model="form.email"
              type="email"
              placeholder="masukkan email"
            />

          </div>


          <!-- NOMOR TELEPON -->
          <div class="form-group">

            <label>
              Nomor Telepon
              <span>*</span>
            </label>

            <input
              v-model="form.phone"
              type="tel"
              placeholder="masukkan nomor telepon"
            />

          </div>


          <!-- DEPARTEMEN -->
          <div class="form-group">

            <label>
              Departemen
              <span>*</span>
            </label>

            <select v-model="form.department">

              <option
                value=""
                disabled
              >
                Pilih departemen
              </option>

              <option value="Marketing">
                Marketing
              </option>

              <option value="Sales">
                Sales
              </option>

              <option value="HRD">
                HRD
              </option>

              <option value="Finance">
                Finance
              </option>

              <option value="IT">
                IT
              </option>

            </select>

          </div>


          <!-- PASSWORD -->
          <div class="form-group">

            <label>
              Password
              <span>*</span>
            </label>

            <div class="password-input">

              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="buat password"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '◉' : '◌' }}
              </button>

            </div>

          </div>


          <!-- KONFIRMASI PASSWORD -->
          <div class="form-group">

            <label>
              Konfirmasi Password
              <span>*</span>
            </label>

            <div class="password-input">

              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="ulangi password"
              />

              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? '◉' : '◌' }}
              </button>

            </div>

          </div>


          <!-- SYARAT DAN KETENTUAN -->
          <label class="agreement">

            <input
              v-model="form.agreement"
              type="checkbox"
            />

            <span>
              Saya menyetujui
              <a href="#">
                Syarat & Ketentuan
              </a>
            </span>

          </label>


          <!-- BUTTON DAFTAR -->
          <button
            type="submit"
            class="register-button"
          >
            Daftar
          </button>


          <!-- DIVIDER -->
          <div class="divider">

            <span></span>

            <p>atau daftar dengan</p>

            <span></span>

          </div>


          <!-- GOOGLE -->
          <button
            type="button"
            class="google-button"
            @click="registerWithGoogle"
          >

            <strong>G</strong>

            Daftar dengan Google

          </button>


          <!-- LOGIN -->
          <p class="login-text">

            Sudah punya akun?

            <NuxtLink to="/login">
              Masuk
            </NuxtLink>

          </p>

        </form>

      </div>

    </section>

  </div>
</template>


<script setup>

definePageMeta({
  layout: 'auth'
})

import { reactive, ref } from 'vue'


/* =========================
   FORM DATA
========================= */

const form = reactive({
  name: '',
  email: '',
  phone: '',
  department: '',
  password: '',
  confirmPassword: '',
  agreement: false
})


/* =========================
   PASSWORD VISIBILITY
========================= */

const showPassword = ref(false)

const showConfirmPassword = ref(false)


/* =========================
   REGISTER
========================= */

const register = () => {

  if (!form.name) {
    alert('Nama lengkap wajib diisi.')
    return
  }

  if (!form.email) {
    alert('Email wajib diisi.')
    return
  }

  if (!form.phone) {
    alert('Nomor telepon wajib diisi.')
    return
  }

  if (!form.department) {
    alert('Departemen wajib dipilih.')
    return
  }

  if (!form.password) {
    alert('Password wajib diisi.')
    return
  }

  if (!form.confirmPassword) {
    alert('Konfirmasi password wajib diisi.')
    return
  }

  if (form.password !== form.confirmPassword) {
    alert('Konfirmasi password tidak sesuai.')
    return
  }

  if (!form.agreement) {
    alert('Silakan setujui Syarat & Ketentuan terlebih dahulu.')
    return
  }

  console.log('Data Register:', form)

  alert('Registrasi berhasil!')
}


/* =========================
   GOOGLE REGISTER
========================= */

const registerWithGoogle = () => {

  console.log('Register dengan Google')

}

</script>


<style scoped>

/* =========================
   REGISTER PAGE
========================= */

.register-page {
  width: 100%;
  min-height: 100vh;

  display: flex;

  background: #ffffff;
}


/* =========================
   LEFT BRAND SECTION
========================= */

.brand-section {
  width: 42%;

  min-height: 100vh;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #10192d;

  color: #ffffff;

  box-sizing: border-box;
}


.brand-content {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  padding: 30px;
}


/* =========================
   EDUABSEN IMAGE
========================= */

.brand-image {
  width: 270px;
  height: auto;

  display: block;

  object-fit: contain;
}


/* =========================
   DESCRIPTION
========================= */

.brand-description {
  max-width: 280px;

  margin: 25px 0 0;

  color: #ffffff;

  font-size: 11px;

  line-height: 1.6;

  text-align: center;
}


/* =========================
   COPYRIGHT
========================= */

.copyright {
  position: absolute;

  bottom: 18px;

  left: 0;
  right: 0;

  margin: 0;

  text-align: center;

  color: #68748b;

  font-size: 7px;
}


/* =========================
   RIGHT FORM SECTION
========================= */

.form-section {
  flex: 1;

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 30px;

  box-sizing: border-box;
}


.register-form {
  width: 100%;

  max-width: 390px;
}


/* =========================
   FORM HEADER
========================= */

.form-header {
  margin-bottom: 18px;
}


.form-header h2 {
  margin: 0 0 4px;

  color: #263248;

  font-size: 28px;

  font-weight: 700;
}


.form-header p {
  margin: 0;

  color: #8a96a8;

  font-size: 13px;
}


/* =========================
   FORM GROUP
========================= */

.form-group {
  margin-bottom: 10px;
}


.form-group label {
  display: block;

  margin-bottom: 5px;

  color: #263248;

  font-size: 12px;

  font-weight: 600;
}


.form-group label span {
  color: #ef4444;
}


/* =========================
   INPUT & SELECT
========================= */

.form-group input,
.form-group select {

  width: 100%;
  height: 30px;

  box-sizing: border-box;

  padding: 0 9px;

  border: 1px solid #dce3ec;

  border-radius: 5px;

  outline: none;

  background: #ffffff;

  color: #263248;

  font-family: inherit;

  font-size: 11px;
}


.form-group input::placeholder {
  color: #a4afbe;
}


.form-group input:focus,
.form-group select:focus {
  border-color: #2d6df6;
}


/* =========================
   PASSWORD
========================= */

.password-input {
  position: relative;
}


.password-input input {
  padding-right: 35px;
}


.password-input button {
  position: absolute;

  top: 50%;
  right: 8px;

  transform: translateY(-50%);

  padding: 0;

  border: none;

  background: transparent;

  color: #8b98aa;

  cursor: pointer;

  font-size: 11px;
}


/* =========================
   AGREEMENT
========================= */

.agreement {

  display: flex;

  align-items: center;

  gap: 6px;

  margin: 3px 0 12px;

  color: #718096;

  font-size: 10px;

  cursor: pointer;
}


.agreement input {

  width: 10px;
  height: 10px;

  margin: 0;

}


/* =========================
   AGREEMENT LINK
========================= */

.agreement a {

  color: #2d6df6;

  text-decoration: none;

  font-weight: 600;

}


/* =========================
   REGISTER BUTTON
========================= */

.register-button {

  width: 100%;
  height: 31px;

  border: none;

  border-radius: 5px;

  background: #2d6df6;

  color: #ffffff;

  font-family: inherit;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}


.register-button:hover {
  background: #2460df;
}


/* =========================
   DIVIDER
========================= */

.divider {

  display: flex;

  align-items: center;

  gap: 8px;

  margin: 12px 0;
}


.divider span {

  flex: 1;

  height: 1px;

  background: #e5e9ef;

}


.divider p {

  margin: 0;

  color: #a0aaba;

  font-size: 10px;

}


/* =========================
   GOOGLE BUTTON
========================= */

.google-button {

  width: 100%;
  height: 30px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  border: 1px solid #e1e5eb;

  border-radius: 5px;

  background: #ffffff;

  color: #566274;

  font-family: inherit;

  font-size: 12px;

  cursor: pointer;

  transition: 0.2s;
}


.google-button:hover {
  background: #f8fafc;
}


.google-button strong {

  color: #4285f4;

  font-size: 12px;

}


/* =========================
   LOGIN
========================= */

.login-text {

  margin: 12px 0 0;

  text-align: center;

  color: #8b96a7;

  font-size: 10px;

}


.login-text a {

  color: #2d6df6;

  text-decoration: none;

  font-weight: 600;

}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 800px) {

  .register-page {
    flex-direction: column;
  }


  .brand-section {

    width: 100%;

    min-height: 250px;

  }


  .brand-image {
    width: 210px;
  }


  .brand-description {
    margin-top: 15px;
  }


  .copyright {
    display: none;
  }


  .form-section {

    min-height: auto;

    padding: 30px 20px;

  }

}


@media (max-width: 480px) {

  .brand-section {
    min-height: 220px;
  }


  .brand-image {
    width: 180px;
  }


  .brand-description {
    font-size: 10px;
  }


  .form-section {
    padding: 25px 18px;
  }


  .register-form {
    max-width: 100%;
  }

}

</style>