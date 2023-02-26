<template>
  <div class="wrapper shop-page">
    <header>
      <nav class="navbar is-light">
        <div class="navbar-brand">
          <router-link :to="{ name: 'home' }" class="navbar-item">
            <figure class="image mr-2">
              <img src="@/assets/logo.png" alt="logo" />
            </figure>
            <strong>Логоип Магазина</strong>
          </router-link>

          <button
            href="#"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu"
            @click="showMobileMenu = !showMobileMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div
          class="navbar-menu"
          id="navbar-menu"
          v-bind:class="{ 'is-active': showMobileMenu }"
        >
          <div class="navbar-start">
            <div class="navbar-item">
              <form action="/search" method="GET">
                <div class="field has-addons">
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      name="query"
                      placeholder="Поиск"
                    />
                  </div>

                  <div class="control">
                    <button class="button is-dark">
                      <span class="icon">
                        <i class="fas fa-search"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="navbar-end">
            <router-link to="/tennis" class="navbar-item">Теннис</router-link>
            <router-link to="/fitnes" class="navbar-item">Фитнес</router-link>
            <router-link to="/futbol" class="navbar-item">Футбол</router-link>
            <router-link :to="{ name: 'about' }" class="navbar-item">
              О магазине
            </router-link>

            <div class="navbar-item">
              <div class="buttons">
                <template v-if="$store.state.isAuthenticated">
                  <router-link
                    :to="{ name: 'myAccaunt' }"
                    class="button is-dark"
                  >
                    Профиль
                  </router-link>
                </template>

                <template v-else>
                  <router-link :to="{ name: 'login' }" class="button is-dark">
                    Войти
                  </router-link>
                </template>

                <router-link :to="{ name: 'cart' }" class="button is-warning">
                  <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                  <span>Корзина ({{ cartTotalLength }})</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <div
        class="is-loading-bar has-text-centered"
        :class="{ 'is-loading': $store.state.isLoading }"
      >
        <div class="lds-dual-ring"></div>
      </div>

      <section class="section">
        <router-view />
      </section>
    </main>

    <footer class="footer">
      <p class="has-text-centered">
        Все права защищены © Название Магазина 2023
      </p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      },
    };
  },
  beforeCreate() {
    this.$store.commit('initializeStore');

    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
    } else {
      axios.defaults.headers.common['Authorization'] = '';
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }

      return totalLength;
    },
  },
};
</script>

<style lang="scss">
@import '../node_modules/bulma';

.shop-page {
  min-height: 100vh;
  display: grid;
  grid-template: minmax(auto, auto) 1fr minmax(auto, auto) / 1fr;
  grid-template-areas:
    'header'
    'main'
    'footer';
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring::after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>
