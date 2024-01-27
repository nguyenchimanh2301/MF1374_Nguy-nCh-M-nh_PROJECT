<template>
    <div class=" form-excel-title">
        <div class="title"></div>
            <div class="input-file">
              <input type="text" id="filename"> 
               <button class="button btn-second btn-add btn-second">Chọn</button>
              <input type="file" ref="fileInput" @change="handleFileChange" />
            </div>
            <div class="text"></div>
    </div>
</template>

<script>
export default{
    name: "the-choosefile"
} 
</script>