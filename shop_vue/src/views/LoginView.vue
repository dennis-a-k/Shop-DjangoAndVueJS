<template>
  <div class="page-login">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Вход</h1>

        <form action="" @submit.prevent="submitForm">
          <div class="field">
            <label>Логин</label>
            <div class="control">
              <input class="input" type="text" v-model="username" />
            </div>
          </div>

          <div class="field">
            <label>Пароль</label>
            <div class="control">
              <input class="input" type="password" v-model="password" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" :key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Войти</button>
            </div>
          </div>

          <hr />
          или
          <router-link :to="{ name: 'singUp' }">зарегистрироваться</router-link>
          на сайте
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },
  mounted() {
    document.title = 'Вход | Название Магазина';
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common['Authorization'] = '';

      localStorage.removeItem('token');

      const formData = {
        username: this.username,
        password: this.password,
      };

      await axios
        .post('/api/v1/token/login/', formData)
        .then((response) => {
          const token = response.data.auth_token;

          this.$store.commit('setToken', token);

          axios.defaults.headers.common['Authorization'] = 'Token ' + token;

          localStorage.setItem('token', token);

          const toPath = this.$route.query.to || '/cart';

          this.$router.push(toPath);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }

            console.log(JSON.stringify(error.response.data));
          } else {
            this.errors.push('Что-то пошло не так, повторите попытку');

            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>

<style></style>
