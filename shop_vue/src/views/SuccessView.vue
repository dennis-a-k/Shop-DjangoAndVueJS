<template>
  <div class="page-success">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Спасибо!</h1>

        <p>Ваш заказ оформлен</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessView',
  mounted() {
    document.title = 'Заказ успешно оформлен | Название Магазина';
  },
};
</script>

<style></style>
