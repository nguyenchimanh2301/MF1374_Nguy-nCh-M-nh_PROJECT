<template>
    <div class="combobox">
    <input type="text" class="combobox_input" :value="itemSelected" >
    <button class="combobox__button" @click="showDataClick"><div class="icon-combobox"></div></button>
    <div class="combobox_data"  v-if="showData">
    <a class="combobox-item" 
    v-for="(item,index) in arrays" :key="index"
    :class="{'item-selected':item ==itemSelected}"
    @click="Selectitem(item)"
    > {{ item }}</a>
    </div>
    </div>
</template>
<script>
export default {
methods:{
  showDataClick(){
    this.showData=!this.showData;
  },
  Selectitem(item){
    this.itemSelected = item;
     this.showData=false;
  }
},
data(){
    return{
       showData:false,
       arrays :[0,1,2],
       itemSelected:""
    }
},
props:["api","propText"]
}
</script>
<style>

</style>