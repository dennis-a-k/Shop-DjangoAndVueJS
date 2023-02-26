<template>
  <tr>
    <td>
      <router-link :to="item.product.get_absolute_url">
        {{ item.product.name }}
      </router-link>
    </td>
    <td>{{ item.product.price }} ₽</td>
    <td>
      <a>
        <span class="tag is-light" @click="decrementQuantity(item)">-</span>
      </a>

      {{ item.quantity }}

      <a>
        <span class="tag is-light" @click="incrementQuantity(item)">+</span>
      </a>
    </td>
    <td>{{ getItemTotal(item).toFixed(2) }} ₽</td>
    <td><button class="delete" @click="removeFromcart(item)"></button></td>
  </tr>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    decrementQuantity(item) {
      item.quantity -= 1;

      if (item.quantity === 0) {
        this.$emit('removeFromcart', item);
      }

      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity += 1;

      this.updateCart();
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
    },
    removeFromcart(item) {
      this.$emit('removeFromcart', item);

      this.updateCart();
    },
  },
};
</script>

<style></style>
