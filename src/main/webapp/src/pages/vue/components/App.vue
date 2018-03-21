<template>
  <div>
    <app-header></app-header>
    <img src="/assets/image/vue-logo.png">
    <div>Vue Application Page</div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from "/components/AppHeader"
  import AppFooter from "/components/AppFooter"

  export default {
    components: {
      AppHeader,
      AppFooter
    },
    name: "App"
  }
</script>

<style scoped>
</style>
