<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Оформление заказа</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Товар</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Итого</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in cart.items" :key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>{{ item.product.price }} ₽</td>
              <td>{{ item.quantity }}</td>
              <td>{{ getItemTotal(item).toFixed(2) }} ₽</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="2">Итого:</td>
              <td>{{ cartTotalLength }}</td>
              <td>{{ cartTotalPrice.toFixed(2) }} ₽</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Детали заказа</h2>

        <p class="has-text-gray mb-4">* обязательные поля для заполнения</p>

        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label>Имя*</label>
              <div class="comtrol">
                <input class="input" type="text" v-model="first_name" />
              </div>
            </div>

            <div class="field">
              <label>Фамилия*</label>
              <div class="comtrol">
                <input class="input" type="text" v-model="last_name" />
              </div>
            </div>

            <div class="field">
              <label>Почта*</label>
              <div class="comtrol">
                <input class="input" type="email" v-model="email" />
              </div>
            </div>

            <div class="field">
              <label>Телефон*</label>
              <div class="comtrol">
                <input class="input" type="text" v-model="phone" />
              </div>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label>Город*</label>
              <div class="comtrol">
                <input class="input" type="text" v-model="place" />
              </div>
            </div>

            <div class="field">
              <label>Индекс*</label>
              <div class="comtrol">
                <input class="input" type="text" v-model="zipcode" />
              </div>
            </div>

            <div class="field">
              <label>Адрес*</label>
              <div class="comtrol">
                <input class="input" type="email" v-model="address" />
              </div>
            </div>
          </div>
        </div>

        <div class="notification is-danger mt-4" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <hr />

        <div class="mb-5" id="card-element"></div>

        <template v-if="cartTotalLength">
          <hr />

          <button class="button is-dark" @click="submitForm">Оплатить</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CheckoutView',
  data() {
    return {
      cart: {
        items: [],
      },
      stripe: {},
      card: {},
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      zipcode: '',
      place: '',
      errors: [],
    };
  },
  mounted() {
    document.title = 'Оформление заказа | Название Магазина';

    this.cart = this.$store.state.cart;

    // if (this.cartTotalLength > 0) {
    // this.stripe = Stripe('токен');
    // const elements = this.stripe.elements();
    // this.card = elements.create('card', { hidePostalCode: true });

    // this.card.mount('#card-element');
    // }
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];

      if (this.first_name === '') {
        this.errors.push('Укажите ваше имя');
      }

      if (this.last_name === '') {
        this.errors.push('Укажите вашу фамилию');
      }

      if (this.email === '') {
        this.errors.push('Укажите вашу почту');
      }

      if (this.phone === '') {
        this.errors.push('Укажите ваш телефон');
      }

      if (this.place === '') {
        this.errors.push('Укажите город доставки');
      }

      if (this.address === '') {
        this.errors.push('Укажите адрес доставки');
      }

      if (this.zipcode === '') {
        this.errors.push('Укажите почтовый индекс');
      }

      if (!this.errors.length) {
        this.$store.commit('setIsLoading', true);

        // создание токена с платежной системы Stripe.com
        // this.stripe.createToken(this.card).then((result) => {
        //   if (result.error) {
        //     this.$store.commit('setIsLoading', false);

        //     this.errors.push('Что-то пошло не так, повторите попытку');

        //     console.log(result.error.message);
        //   } else {
        //      this.stripeTokenHandler(result.token);
        const token1 = 'токен'; //удалить когда будет создана платежная с-ма
        this.stripeTokenHandler(token1); //удалить когда будет создана платежная с-ма
        //   }
        // });
      }
    },
    async stripeTokenHandler(token) {
      const items = [];

      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i];
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        };

        items.push(obj);
      }

      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        zipcode: this.zipcode,
        place: this.place,
        phone: this.phone,
        items: items,
        // stripe_token: token.id,
        stripe_token: token,
      };

      await axios
        .post('/api/v1/checkout/', data)
        .then((response) => {
          this.$store.commit('clearCart');
          this.$router.push({ name: 'success' });
        })
        .catch((error) => {
          this.errors.push('Что-то пошло не так, повторите попытку');

          console.log(error);
        });

      this.$store.commit('setIsLoading', false);
    },
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
};
</script>

<style></style>
