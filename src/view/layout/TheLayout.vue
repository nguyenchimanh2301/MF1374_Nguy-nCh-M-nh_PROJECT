<template>
    <div>
      <the-header></the-header>
      <div class="layout">
       <the-sidebar></the-sidebar>
      <!-- end sidebar -->
       <router-view></router-view>
       <the-content></the-content>
    </div>
    </div>
  </template>
  
  <script>
  import TheSidebar from './TheSidebar.vue';
  export default {
    name: 'App',
    components: {
      TheSidebar,
      // TheContent,
    }
  }
  </script>
  
  <style>
  </style>
  