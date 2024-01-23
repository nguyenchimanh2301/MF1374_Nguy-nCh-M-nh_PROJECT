<template>
    <div class="combobox">
    <input type="text" class="combobox_input" :value="itemSelected" >
    <button class="combobox__button" @click="showDataClick"><div class="icon-combobox"></div></button>
    <div class="combobox_data"  v-if="showData">
    <a class="combobox-item" 
    v-for="(item,index) in dataApi" :key="index" 
    :class="{'item-selected':item[propText] ==itemSelected}"
    @click="Selectitem(item[propText])"
    > {{ item[propText] }}</a>
    </div>
    </div>
</template>
<script>
export default {
props:["dataApi","propText","propValue"],
methods:{
  
  created() {
    console.log(this.api);
  },
  mounted() {
    this.arrays = this.api;
  },
  showDataClick(){
    this.showData=!this.showData;
  },
  Selectitem(item){
    this.itemSelected = item;
     this.showData=false;
    this.$emit('update:modelValue',item[this.propValue])
  }
},
data(){
    return{
       showData:false,
       arrays : [],
       itemSelected:""
    }
},
}
</script>
<style>

</style>