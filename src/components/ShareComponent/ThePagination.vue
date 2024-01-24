<template>
    <div class="PageNumber">
      <ul>
        <li @click="changePage('previous')">Trước</li>
        <li
          v-for="(item, index) in Pages"
          :key="index"
          @click="changePage(item)"
          :class="{ 'page--active': item === pageNumber }"
        >
          {{ item }}
        </li>
        <li @click="changePage('n')">Tiếp</li>
      </ul>
    </div>
  </template>
  <script>
  export default {
    name: "ThePagination",

    created() {},
    data() {
    },
    computed: {
      TotalPage(){
        // Trả về số trang có thể chia
        return  Math.ceil(this.totalRecords / this.pageSize);
      },
     //Hàm custom hiển thị số trang  
      //Created by NCMANH(20/1/2024)
      Pages() {
        let pages = [];
        for (let i = 1; i <= this.TotalPage; i++) {
          if (
            i == 1 ||
            i == this.TotalPage ||
            (i <= this.pageNumber + 2 && i >= this.pageNumber - 2)
          ) {
            pages.push(i);
          } else if (i == this.pageNumber + 3 || i == this.pageNumber - 3) {
            pages.push("...");
          }
        }
        return pages;
      },
      VpageSize:{
        Get(){
           return this.pageSize;
        },
        set(value){
        this.$emit('update:pageSize',value)
          return 
        }
      },
    },
    methods: {
      //Hàm thay đổi số trang 
      //Created by NCMANH(20/1/2024)
      changePage(page) {
        if (page == "previous" && this.pageNumber <=1) {
          return;
        }
        if (page == "n" && this.pageNumber >=this.TotalPage) {
          return;
        }
        if (page == "previous") {
          page = this.pageNumber - 1;
        }
        if (page == "n") {
          page = this.pageNumber + 1;
        }
        if (page == "...") {
          return;
        }
        this.$emit('update:pageNumber',page);
        this.$emit('dataFilter');
        // this.$emit('dataFilter',this.pageSize,page)
      },
    },
    props: {
      pageNumber: {
        type:Number,
        default: 1
      },pageSize: {
        type:Number,
        default: 10
      },
      totalRecords: {
        type:Number,
        default: 100
      },
     
    }
  };
  </script>
  <style>
 .PageNumber ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
  }
  .PageNumber li{
    text-align: center;
    margin: 5px
  }
  .PageNumber  li:not(:first-child,:last-child){
    width: 20px;
  }
  .PageNumber li:hover{
    background-color: #E0E0E0;
  }
  .PageNumber li:active{
    background-color: green;
  }
  .page--active {
    border: 1px solid;
    border-radius: 4px;
  }
  .PageNumber{
    width: 370px;
    margin-right: 12px;
  }
  </style>
  