<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Корзина</h1>
      </div>

      <div class="column is-12" v-if="cartTotalLength">
        <div class="box">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Товар</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <CartItem
                v-for="item in cart.items"
                :key="item.product.id"
                :initialItem="item"
                v-on:removeFromcart="removeFromcart"
              />
            </tbody>
          </table>
        </div>

        <div class="box">
          <h2 class="subtitle">Итого:</h2>

          <strong>{{ cartTotalPrice.toFixed(2) }} ₽</strong>, количество
          {{ cartTotalLength }} шт.

          <hr />

          <router-link class="button is-dark" :to="{ name: 'checkout' }">
            Оформить заказ!
          </router-link>
        </div>
      </div>

      <div class="column is-12 box" v-else>
        <p>Корзина пуста</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CartItem from '@/components/CartItem.vue';

export default {
  name: 'CartView',
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  components: {
    CartItem,
  },
  mounted() {
    document.title = 'Корзина | Название Магазина';

    this.cart = this.$store.state.cart;
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity * curVal.product.price);
      }, 0);
    },
  },
  methods: {
    removeFromcart(item) {
      this.cart.items = this.cart.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
};
</script>

<style></style>
