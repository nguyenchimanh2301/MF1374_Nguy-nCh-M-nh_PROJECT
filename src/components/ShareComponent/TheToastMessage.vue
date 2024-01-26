<template>
    <div class="toast--container">
    <!-- <div class="form--toast">
        <div class="toast__icon icon--question"></div>
        <div class="toast--content">Đây là nội dung của toast</div>
        <div class="toast--btn"></div>
    </div>
    <div class="form--toast">
        <div class="toast__icon icon--danger"></div>
        <div class="toast--content">Lỗi</div>
        <div class="toast--btn"></div>
    </div>
    <div class="form--toast">
        <div class="toast__icon icon--warning"></div>
        <div class="toast--content">Cảnh báo</div>
        <div class="toast--btn"></div>
    </div>
    <div class="form--toast">
        <div class="toast__icon icon--info"></div>
        <div class="toast--content">Thông tin</div>
        <div class="toast--btn"></div>
    </div> -->
    <div class="form--toast">
        <div class="toast__icon "
        :class="
        {
            'icon--info': icon == 'information',
            'icon--question': icon == 'question',
            'icon--danger': icon == 'error',
            'icon--warning': icon == 'warning',
            'icon--success': icon == 'success',
        }"></div>
        <div class="toast--content" >
        <ul v-for="(item, index) in msgToast" :key="index">
            <li>{{ item }}</li>
        </ul></div>
        <div class="toast--btn"></div>
    </div>
   </div>
</template>

<script>
export default {
    name :"MToast",
    props:{
       
        icon:{
            type: String,
            default: "",
        },
        msgToast:{
            type:Array,
            default: ()=> [],
        }
    }
}
</script>
<style scoped>
li{
    list-style: none;
}

</style>