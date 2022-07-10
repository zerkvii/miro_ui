<template>
  <div class="container">
    <div class="logo">
      <img
        class="logo-img"
        alt="logo"
        src="https://qiniu.maktubtech.com/miro/logo.png"
      />
      <div class="logo-text">Miro</div>
    </div>
    <AuthBanner />
    <div class="content">
      <div class="content-inner">
        <AuthForm @toggleRegister="toggleRegisterAction" />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import { reactive } from 'vue';
  import AuthBanner from './components/banner.vue';
  import AuthForm from './components/auth-form.vue';

  const direction = reactive({ dir: 'row' });
  const toggleRegisterAction = () => {
    direction.dir = direction.dir === 'row-reverse' ? 'row' : 'row-reverse';
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;
    flex-direction: v-bind('direction.dir');
    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
  .logo-img {
    width: 5rem;
    height: 3rem;
  }
</style>
