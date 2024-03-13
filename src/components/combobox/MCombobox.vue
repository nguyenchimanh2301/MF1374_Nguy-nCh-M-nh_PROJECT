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
    ><div class='icon-combobox-select' v-show=" item[propText]==itemSelected"></div>  <div>{{ item[propText] }}</div></a>
    </div>
    </div>
</template>
<script>
export default {
props:["dataApi","propText","propValue","hasError"],
created() {
  },
  mounted() {

  },
methods:{
  showDataClick(){
    this.showData=!this.showData;
    this.arrays = this.dataApi; 
  },
  Selectitem(item){
    this.itemSelected = item[this.propText];
     this.showData=false;
    this.$emit('update:modelValue',item[this.propValue])
  },
  FilterData(){
    this.showData=true,
    this.txtCombobox = event.target.value.toLowerCase();
    this.arrays = this.arrays.filter(item => item[this.propText].toLowerCase().includes(this.txtCombobox));
      
  }
},
data(){
    return{
       showData:false,
       arrays : [],
       itemSelected:"",
       txtCombobox:""
    }
},
}
</script>
<style>

</style>