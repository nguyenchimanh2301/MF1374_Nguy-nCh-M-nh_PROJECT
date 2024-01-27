<template>
  <div>
    <!-- <the-header></the-header> -->
    <div class="layout">
     <the-sidebar></the-sidebar>
    <!-- end sidebar -->
    <table-employee></table-employee>
     <!-- <the-content></the-content> -->
   
  </div>
  </div>
</template>

<script>
import TheSidebar from './components/layoutcomponent/TheSidebar.vue';
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
