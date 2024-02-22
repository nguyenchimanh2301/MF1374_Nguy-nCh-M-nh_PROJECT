<template>
    <div class="login">
     <div class="language">
        <i class="lang-icon"></i>
        <div class="selected-language">{{this.MISAResource["VN"].Login.VN }}</div>
        <div class="sub-language selected-language">
            <div class="sub-language-item">{{this.MISAResource["VN"].Login.VN }}</div>
            <div class="sub-language-item">{{this.MISAResource["VN"].Login.EN }}</div>
        </div>
     </div>
     <div class="form-login">
       <div class="form-login-validate">
        <div class="form-login-title"></div>
        <div class="form-login-body">
            <div class="form-user">
            <input type="text"  placeholder="Số điện thoại/email" v-model="state.account.username" >
            <span class="error-text-message" v-if="v$.account.username.$error">
                {{ v$.account.username.$errors[0].$message }}
            </span>
            </div>
            <div class="form-password">
              <input v-if="showPassword"  placeholder="Mật khẩu" type="text" class="input" v-model="state.account.password" />
             <input v-else type="password"  placeholder="Mật khẩu" class="input" v-model="state.account.password">  
                <!-- <input type="text"  placeholder="Mật khẩu" v-model="state.account.password"> -->
                 <i class="icon-toggle-password" @click="toggleShow"></i>
                 <span class="error-text-message" v-if="v$.account.password.$error">{{ v$.account.password.$errors[0].$message }}</span>
                 <span class="error-text-message" v-for="(item,index) in MsgValidate" :key="index">{{item}}</span>
            </div>
            <a href="" class="forgot-password">{{this.MISAResource["VN"].Login.ForgotPassword }}</a>
        </div>
        <button class="btn-login" @click="login">{{this.MISAResource["VN"].Login.Login }}</button>
        <div class="form-login-footer">
            <div class="method-login-title">
                <div class="method-line"></div>
                <div class="method-title">{{this.MISAResource["VN"].Login.LoginWith }}</div>
                <div class="method-line"></div>
            </div>
            <div class="method-login-icon">
                <div class="method-login-item method-icon-google"></div>
                <div class="method-login-item method-icon-apple"></div>
                <div class="method-login-item method-icon-microsoft"></div>
            </div>
        </div>
       </div>
        <div class="copy-right-text">{{this.MISAResource["VN"].Login.CopyWriterText }}</div>
     </div>
    </div>
    <MLoader v-if="loader"></MLoader>
</template>

<script>
import useValidate from "@vuelidate/core";
import router from '@/main';
import {
  required,
//   email,
  helpers,
} from "@vuelidate/validators";
import MISAResource from "../../js/helper/resource";
import { reactive, computed } from "vue";
export default {
    setup() {
    //reactive validate
    const state = reactive({
        account: {
        username: "",
        password: "",
      },
    });

    const rules = computed(() => {
      return {
        account: {
          username: {
            required: helpers.withMessage(
              MISAResource["VN"].Login.UserNotEmpty,
              required
            ),
          },
          password: {
            required: helpers.withMessage(
              MISAResource["VN"].Login.PasswordNotEmpty,
              required
            ),
          },
         
        },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
    methods: {
     async login(){
        if(this.v$.$validate()===false){
          return ;
        }
        console.log();
        try {
            await this.api.post('https://localhost:7096/api/v1/Authenticate/login',this.state.account)
           .then(res=>{
            this.loader= true;
            console.log(res),
            localStorage.setItem('token',res.data.Token);
            localStorage.setItem('refresh',res.data.RefreshToken);
            localStorage.setItem('expiration',res.data.Expiration);
            setTimeout(()=>{
              this.loader= false;
              router.push('/layout')},2000)
            }).catch(error=>{
              console.log(error);
              this.MsgValidate = this.MISAErrorService.GetErrorCode(
                  error.response
              );
              console.log(this.MsgValidate);
            }
         );
        } catch (error) {
            console.log(error);
           
        }
        //  this.validate = true;
      },
      toggleShow() {
      this.showPassword = !this.showPassword;
    }
    },
    data(){
        return {
            validate : false,
            loader : false,
            showPassword: false,
            MsgValidate:"",
        }
    }
}
</script>