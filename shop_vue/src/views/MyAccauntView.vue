<template>
  <div class="page-my-accaunt">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Профиль</h1>
      </div>

      <div class="column is-12">
        <button class="button is-danger" @click="logout()">Выйти</button>
      </div>

      <hr />

      <div class="column is-12">
        <h2 class="subtitle">Мои заказы</h2>

        <OrderSummary v-for="order in orders" :key="order.id" :order="order" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import OrderSummary from '@/components/OrderSummary.vue';

export default {
  name: 'MyAccauntView',
  data() {
    return {
      orders: [],
    };
  },
  components: {
    OrderSummary,
  },
  mounted() {
    document.title = 'Профиль | Название Магазина';

    this.getMyOrders();
  },
  methods: {
    logout() {
      axios.defaults.headers.common['Authorization'] = '';

      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userid');

      this.$store.commit('removeToken');

      this.$router.push({ name: 'home' });
    },

    async getMyOrders() {
      this.$store.commit('setIsLoading', true);

      await axios
        .get('/api/v1/orders/')
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit('setIsLoading', false);
    },
  },
};
</script>

<style></style>
