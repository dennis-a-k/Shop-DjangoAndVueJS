<template>
  <div class="page-sing-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Регистрация</h1>

        <form @submit.prevent="submitForm">
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

          <div class="field">
            <label>Подтвердите пароль</label>
            <div class="control">
              <input class="input" type="password" v-model="password2" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" :key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Зарегистрироваться</button>
            </div>
          </div>

          <hr />
          или <router-link :to="{ name: 'login' }">войдите</router-link> на сайт
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

export default {
  name: 'SingUpView',
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      errors: [],
    };
  },
  mounted() {
    document.title = 'Регистация | Название Магазина';
  },
  methods: {
    submitForm() {
      this.errors = [];

      if (this.username === '') {
        this.errors.push('Введите логин');
      }

      if (this.password === '') {
        this.errors.push('Введите пароль');
      }

      if (this.password !== this.password2) {
        this.errors.push('Пароль не совпадает');
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };

        axios
          .post('/api/v1/users/', formData)
          .then((response) => {
            toast({
              message: 'Вы успешно зарегистрировались',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            });

            this.$router.push({ name: 'login' });
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }

              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push('Что-то пошло не так, повторите попытку');

              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
};
</script>

<style></style>
