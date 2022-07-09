<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('auth.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('auth.form.subTitle') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('auth.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('auth.form.userName.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('auth.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('auth.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
<!--          <a-checkbox-->
<!--            checked="rememberPassword"-->
<!--            :model-value="loginConfig.rememberPassword"-->
<!--            @change="setRememberPassword;"-->
<!--          >-->
<!--            {{ $t('auth.form.rememberPassword') }}-->
<!--          </a-checkbox>-->
          <a-link>{{ $t('auth.form.forgetPassword') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('auth.form.login') }}
        </a-button>
        <a-button
          type="outline"
          long
          class="login-form-register-btn"
          @click="register"
        >
          {{ $t('auth.form.register') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { AuthData } from '@/api/user';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  const emit = defineEmits(['toggleRegister']);

  // const loginConfig = useStorage('auth-config', {
  //   // 需要clear localstorage
  //   rememberPassword: true,
  //   username: 'zerk', // 演示默认值
  //   password: '123456', // demo default value
  //   // password_confirm:'admin'
  // });
  const userInfo = reactive({
    // username: loginConfig.value.username,
    // password: loginConfig.value.password,
    username: 'zerk',
    password: '123456',
    // password_confirm: loginConfig.value.password_confirm
    // username:'zerkvii'
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (!errors) {
      setLoading(true);
      try {
        await userStore.login(values as AuthData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        await router
          .push({
            name: (redirect as string) || 'Workplace',
            query: {
              ...othersQuery,
            },
          });
        Message.success(t('auth.form.login.success'));
        // const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        // loginConfig.value.username = rememberPassword ? username : '';
        // loginConfig.value.password = rememberPassword ? password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    // loginConfig.value.rememberPassword = value;
  };

  const register = () => {
    emit('toggleRegister');
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
