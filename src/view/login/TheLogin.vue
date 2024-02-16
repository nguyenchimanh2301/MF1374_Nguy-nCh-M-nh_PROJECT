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
            <input type="text"  placeholder="Số điện thoại/email">
            <span class="error-text-message" v-if="validate">{{this.MISAResource["VN"].Login.UserNotEmpty }}</span>
            </div>
            <div class="form-password">
                <input type="text"  placeholder="Mật khẩu">
                 <i class="icon-toggle-password"></i>
                 <span class="error-text-message" v-if="validate">{{this.MISAResource["VN"].Login.PasswordNotEmpty }}</span>
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
</template>

<script>
export default {
    methods: {
      login(){
         this.validate = true;
      }
    },
    data(){
        return {
            validate : false
        }
    }
}
</script>