<template>
  <div class="page-about">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Информаия о магазине</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  mounted() {
    document.title = 'О магазине | Название Магазина';
  },
};
</script>

<style scoped></style>
