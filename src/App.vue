<template>
  <div>
    <!-- <the-header></the-header> -->
    <!-- <div class="layout">
     <the-sidebar></the-sidebar> -->
    <!-- end sidebar -->
    <!-- <table-employee></table-employee> -->
     <!-- <the-content></the-content> -->
   <the-login></the-login>
  <!-- </div> -->
  </div>
</template>

<script>
import TheLogin from './view/login/TheLogin.vue'
// import TheSidebar from './view/layout/TheSidebar.vue';
export default {
  name: 'App',
  components: {
    TheLogin
    // TheSidebar,
    // TheContent,
  }
}
</script>

<style>
   @import url(./css/main.css);
</style>
