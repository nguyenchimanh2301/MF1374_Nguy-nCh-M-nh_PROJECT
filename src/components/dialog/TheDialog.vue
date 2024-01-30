<template>
   <div class="dialog--background" >
    <div class="dialog">
        <div class="dialog--title">
          <h3>{{ title }}</h3>
          <div class="toast--btn" @click="hideDlg"></div>
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
       <div class="dialog__btn" :class="{'position-item': classBinding===false,
       'position-item2': classBinding===true,
        }">
        <button class="btn-main btn-second btn-cancel" id="closedialog" v-if="classBinding===false"   @click="hideDlg">Hủy</button>
         <div style="column-gap: 8px;display: flex;">
          <button class="button  btn-second btn-cancel" @click="hideForm">{{ textBtn2 }}</button>
           <button class="button btn-main"  @click="addData"  >{{ textBtn }}</button>
         </div>
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
        default : "information",
        required : true
      },
      textBtn:{
        type : String,
        default : "Đồng ý",
        required : true
      },
      textBtn2:{
        type : String,
        default : "Không",
        required : true
      },
      button:{
        type : Boolean,
        default : false,
      },
      position:{
        type : String,
        default : "",
      },
      classBinding: {
        type : Boolean,
        default : true,
      }

   },
   created(){
      this.titleDialog = this.title;
      this.employeeId = this.employeeIdRemove;
      if(this.titleDialog!==this.MISAResource.NameMode.Delete){
        this.text = "Không";
      }
       else{
            this.text = this.employeeId.EmployeeCode;
      }
   },
   mounted(){

   },
   methods:{
    hideDlg(){
        this.$emit('hideDlg');
    },
    hideForm(){
      if(this.msgError[[0]]===this.MISAResource["VN"].HideDialogQuestion){
        this.$emit('hideForm');
      }
      else{
        this.hideDlg();
      }
    },
    addData(){
       if(this.titleDialog===this.MISAResource.NameMode.Delete){
        this.$emit('removeData', this.employeeId.EmployeeId);
       }
       if(this.titleDialog===this.MISAResource.NameMode.DeleteMultiple){
        this.$emit('deleteMultiple');
       }
       if(this.type === this.MISAResource.notice.warning){
        this.hideDlg();
       }
       else{
        this.$emit('addData');
        this.hideDlg();
       }
    },
    data() {
        return {
            titleDialog: '',
            employeeId  :{},
            text : "",
        }
    },
   }    
   
}
</script>
<style scoped>
.dialog--text li{
  list-style: none;
}
#btn-cancel{
  align-self: end;
}

.position-item{
  justify-content: space-between;
}
.position-item2{
  justify-content: flex-end
}
.dialog__btn .btn-cancel:hover{
   background-color: #E0E0E0;
}
</style>