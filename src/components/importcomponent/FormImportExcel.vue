<template>
    <div class="dark--screen">
      <div class="form-excel " :class="{'close-form': showForm===false,'show-form': showForm===true,} ">
        <div class="form-header"> </div> 
        <div class="form-excel-content">
          <div class="form-sidebar">
            <div>
              <ul class="menu-import">
              <router-link to="/choosefile">
                <li>1.Chọn tệp nguồn</li>
              </router-link>
              <router-link to="/employee">
                <li>2.Kiểm tra dữ liệu</li>
              </router-link>
                <router-link to="/result">
                <li>3.Kết quả nhập khẩu</li>
              </router-link>
              </ul>
            </div>
          </div>
         <div class="form-table">
         
            <router-view></router-view>
         </div>
        </div>
        <div class="form--footer">
            <button class="button btn-second btn-cancel" @click="closeForm">Giúp</button>
            <div>
              <button class="button btn-add btn-main " @click="addData">Tiếp tục</button>
              <button class="button btn-add btn-main" @click="addData">Hủy bỏ</button>
            </div>
          </div>
      </div>
    </div>
  
  </template>
  <script>
  export default {
      props: [],
      created() {
      }, 
    
      methods: {

      },
     mounted(){
  
     },
      data() {
          return {
             
          };
      },
  };
  </script>
  
  <style>
  .close-form{
    animation:  hide 2s ;
    position: absolute;
  }
  @keyframes hide{
      0% {
        transform: translateY(0%);
      }
      50% {
          transform: translateY(-130%);
      }
  }
  
  
  .show-form{
    animation:  show 1s ;
    position: absolute;
  }
  @keyframes show{
      0% {
        transform: translateY(-110%);
      }
      50% {
          transform: translateY(0%);
      }
  }
  .border-error {
    border: 1px solid red !important;
  }
  a{
    text-decoration: none;
  }
  </style>