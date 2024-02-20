<template>
    <div class="sidebar">
        <div class="sidebar__icon">
          <div class="icon--menu"></div>
          <div class="icon--logo">
            <img
              src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
              alt="LOGO"
            />
          </div>
          <!-- <div><p>KẾ TOÁN</p></div> -->
        </div>
        <div class="list--item">
            <div class="item">
              <div class="icon--item icon--home"></div>
            <div>
           <router-link to="/layout/employees">Tổng quan</router-link>
            </div>
          </div>
          <div class="item">
            <div class="icon--item icon--cash"></div>
            <div>
            Tiền mặt
            </div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--credit"></div>
            <div> Tiền gửi</div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--shopping"></div>
            <div>Mua hàng</div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--sell"></div>
            <div>Bán hàng</div>
          </div>
          <div class="item">
            <div class="icon--item icon--bill"></div>
            <div>  Quản lý hóa đơn</div>
          </div>
          <div class="item">
            <div class="icon--item icon--warehouse"></div>
            <div>   Kho</div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--tool"></div>
            <div> Công cụ dụng cụ</div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--assets"></div>
            <div> Tài sản cố định</div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--home"></div>
            <div>  Thuế</div>
          </div>
          <div class="item"> 
            <div>
              <div class="icon--item icon--price"></div>
            </div>
            <div>Giá thành</div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--synthetic"></div>
            <div> Tổng hợp</div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--home"></div>
            <div> Ngân sách</div>
          </div>
          <div class="item">
            <div class="icon--item icon--report"></div>
            <div> Báo cáo</div>
          </div>
          <div class="item"> 
            <div class="icon--item icon--analysis"></div>
            <div>Phân tích tài chính</div>
          </div>
        </div>
        <!-- <div class="btn--sidebar-footer">
          <div id="btn--hide-sidebar">
           <div id="previous" onclick="collapseSidebar()">
           </div>
           <p> Thu gọn</p>
          </div>
          <div id="btn--show-sidebar">
           <div  id="sibar__icon--show" onclick="openSidebar()">    
           </div>
           <p> Mở rộng</p>
          </div>
         </div> -->
      </div>
       <!-- <div class="sidebar" :class="{'side':isExpanded}">
      <div class="list--item" :class="{'width':isExpanded}">
        <div class="item">
            <div class="icon--item icon--home"></div>
            <div class="text--sidebar"  v-if="!isExpanded"><p >Trang chủ</p></div>
        </div>
        <router-link to="/report" >
        <div class="item">
          <div class="icon--item icon--report"></div>
          <div class="text--sidebar"  v-if="!isExpanded"><p>Báo cáo</p></div>
        </div>
      </router-link>
        <router-link to="/">
        <div class="item">
          <div class="icon--item icon--customer"></div>
            <div class="text--sidebar"  v-if="!isExpanded"><p>Khách hàng</p></div>
        </div>
       </router-link>
        <router-link to="/setting" >
        <div class="item">
          <div class="icon--item icon--setting"></div>
           <div class="text--sidebar"  v-if="!isExpanded"><p>Cài đặt</p></div>
        </div>
      </router-link>
      </div>
      <div class="btn--sidebar-footer">
       <div id="btn--hide-sidebar" v-show="!isExpanded" @click="toggleSidebar">
        <div id="previous" >
        </div>
        <p> Thu gọn</p>
       </div>
       <div id="btn--show-sidebar" v-show="isExpanded"  @click="toggleSidebar">
        <div  id="sidebar__icon--show" >    
        </div>
       </div>
      </div>
    </div> -->
</template>

<script>
export default {
   methods:{
    collapse(){

    },
    open(){

    },
    toggleSidebar() {
      this.isExpanded = !this.isExpanded; // Toggle the expanded state
    }
   },data() {
    return {
      isExpanded: false
    };
  },

}
</script>
<style scoped>

.side{
  width: 76px;
  transition: linear ;
  -webkit-transition: all 0.5s linear;
  animation: animation 2s;

}

.item-collapse{
  transition: width 0.5s ease;
  width: 44px;
}
@keyframes animation{
  0% {transform: translateX(-0px);}
}
.width{
  transition: width 0.5s ease;
  width: 76px;
}
a{
  text-decoration: none;
}

</style>