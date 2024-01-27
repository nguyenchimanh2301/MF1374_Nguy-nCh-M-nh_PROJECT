<template>
  <div>
    <!-- <the-header></the-header> -->
    <div class="layout">
     <the-sidebar></the-sidebar>
    <!-- end sidebar -->
     <router-view></router-view>
     <!-- <the-content></the-content> -->
   
  </div>
  </div>
</template>

<script>
import TheSidebar from './components/pages/TheSidebar.vue';
export default {
  name: 'App',
  components: {
    TheSidebar,
    // TheContent,
  }
}
</script>

<style>
   @import url(./css/main.css);
</style>
