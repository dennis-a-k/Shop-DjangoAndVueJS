<template>
  <div class="home">
    <!-- <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Банер</p>
        <p class="suptitle">информационный</p>
      </div>
    </section> -->

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Товары</h2>
      </div>

      <ProductBox
        v-for="product in latestProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '@/components/ProductBox.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      latestProducts: [],
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getLatestProducts();

    document.title = 'Главная | Название Магазина';
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true);

      await axios
        .get('/api/v1/latest-products/')
        .then((response) => {
          this.latestProducts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit('setIsLoading', false);
    },
  },
};
</script>

<style scoped></style>
