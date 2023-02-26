<template>
  <div class="page-search">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Поиск</h1>

        <h2 class="is-size-5 has-text-gray">Результат поиска: "{{ query }}"</h2>

        <ProductBox
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '@/components/ProductBox.vue';

export default {
  name: 'SearchView',
  data() {
    return {
      products: [],
      query: '',
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    document.title = 'Поиск | Название Магазина';

    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);

    if (params.get('query')) {
      this.query = params.get('query').toLowerCase();

      this.performSearch();
    }
  },
  methods: {
    async performSearch() {
      this.$store.commit('setIsLoading', true);

      await axios
        .post('/api/v1/products/search/', { query: this.query })
        .then((response) => (this.products = response.data))
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit('setIsLoading', false);
    },
  },
};
</script>

<style></style>
