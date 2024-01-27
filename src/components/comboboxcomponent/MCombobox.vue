<template>
    <div class="combobox"   :class="{
        'border-error': hasError,
      }">
    <input type="text" class="combobox_input" 
     :value="itemSelected" 
    >
    <button class="combobox__button" @click="showDataClick"><div class="icon-combobox"></div></button>
    <div class="combobox_data"  v-if="showData">
    <a class="combobox-item" 
    v-for="(item,index) in dataApi" :key="index" 
    :class="{'item-selected':item[propText] ==itemSelected}"
    @click="Selectitem(item)"
    > <div v-if="item!==null">{{ item[propText] }}</div></a>
    </div>
    </div>
</template>
<script>
export default {
props:["dataApi","propText","propValue","hasError"],
methods:{
  
  created() {
    console.log(this.propValue);
  },
  mounted() {
    this.arrays = this.api;
  },
  showDataClick(){
    this.showData=!this.showData;
  },
  Selectitem(item){
    this.itemSelected = item[this.propText];
     this.showData=false;
    this.$emit('update:modelValue',item[this.propValue])
  }
},
data(){
    return{
       showData:false,
       arrays : [],
       itemSelected:"",
    }
},
}
</script>
<style>

</style>