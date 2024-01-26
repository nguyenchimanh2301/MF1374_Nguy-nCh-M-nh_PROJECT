<template>
   <div class="dialog--background" >
    <div class="dialog">
        <div class="dialog--title">
        </div>
       <div class="dialog--content">
        <div class="toast__icon " 
        :class="{
        'icon--question': type =='question',
        'icon--warning': type =='warning',
        'icon--danger': type =='error',
        'icon--info': type =='information',
        }"></div>
        <div class="dialog--text">
          <ul v-for="(item, index) in msgError" :key="index">
            <li>{{item }}</li>
          </ul>
        </div>
       </div>
       <hr style="height: 1px; float: bottom;margin: 0px 24px 0px 24px;">
       <div class="dialog__btn">
        <button class="button btn-cancel" @click="hideDlg">Hủy</button>
        <button class="button btn-main" @click="addData">Đồng Ý</button>
       </div>
    </div> 
</div>
    <!-- <div class="dialog--background" >
    <div class="dialog">
        <div class="dialog--title">
            <h3>{{ titleDialog }} DỮ LIỆU</h3>
            <div class="toast--btn"></div>
        </div>
       <div class="dialog--content">
        <div class="toast__icon " 
        :class="{
        'icon--question': type =='question',
        'icon--warning': type =='warning',
        'icon--danger': type =='error',
        'icon--info': type =='info',
        }"></div>
        <div class="dialog--text">Bạn có chắc muốn <p style="color: red;">{{ titleDialog }}</p> {{text}}?</div>
       </div>
       <div class="dialog__btn">
        <button class="button btn--cancel" id="closedialog" @click="hideDlg">Hủy</button>
        <button class="button btn-main" @click="addData">Đồng Ý</button>
       </div>
    </div> 
</div> -->
</template>
<script>
export default{
   name :"the-dialog",
   props:{
    title:{
        type : String,
        default : " ",
        required : true
      },
      msgError:{
        type :Array,
        default : ()=>[]
      },
      employeeIdRemove:{
        type : Object,
        default : ()=> {},
        required : true
      },
      type:{
        type : String,
        default : "question",
        required : true
      }
   },
   created(){
      this.titleDialog = this.title;
      this.employeeId = this.employeeIdRemove;
      if(this.titleDialog!=='Xóa'){
        this.text = "Không";
      }
       else{
            this.text = this.employeeId.Fullname;
      }
   },
   mounted(){

   },
   methods:{
    hideDlg(){
       this.$emit('hideDlg');
    },
    addData(){
       if(this.titleDialog==='Xóa'){
        this.$emit('removeData', this.employeeId.EmployeeId);
       }
       else{
        // this.$emit('addData');
        this.hideDlg();
   
       }
       this.$emit('Reload');
    },
    data() {
        return {
            titleDialog: '',
            employeeId  :{},
            text : ""
        }
    },
   }    
   
}
</script>
<style scoped>
.dialog--text li{
  list-style: none;
}

.dialog__btn .btn-cancel:hover{
   background-color: #E0E0E0;
}
</style>