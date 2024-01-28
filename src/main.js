import {  createApp } from 'vue'
import App from './App.vue'

import excel from 'vue-excel-export'

 import TheToastMessage from './components/toastmessage/TheToastMessage.vue';
 import MInput from './components/inputcomponent/MInput.vue';
 import MLoader from './components/pagingcomponent/MLoader.vue';
 import TheDialog from './components/dialogcomponent/TheDialog.vue';
 import TableEmployee from './components/employeecomponent/TableEmployee.vue'
 import ThePagination from './components/pagingcomponent/ThePagination.vue'
 import MCombobox from './components/comboboxcomponent/MCombobox.vue'
 import  MDropdownList from './components/dropdowncomponent/MDropdownList.vue';
 import FormExcel from './components/importcomponent/FormImportExcel.vue'


 /* import font awesome icon component */

import MISAResource from './js/helper/resource';
import TheEmployee from './components/routercomponent/TheEmployee.vue';
import ChooseFile from './components/routercomponent/ChooseFile.vue';
import ImportResult from './components/routercomponent/ImportResult.vue';
import DataImport from './components/routercomponent/DataImport.vue';

import  axios  from 'axios';
import MISAEnum from './js/helper/enum';
import MISAErrorService from './service/errorservice';
import MISAApiService from './service/apiservice';
import DataService from './service/dataservice';
import FormEmployeeDetail from './components/employeecomponent/FormEmployeeDetail.vue';


import { createRouter , createWebHistory } from 'vue-router';

const routes = [
 {path:'/data', name:'data' , component:DataImport},
 {path:'/choosefile', name:'setting' , component:ChooseFile},
 {path:'/result', name:'report' , component:ImportResult},
 {path:'/', name:'customer' , component:TableEmployee},

]

 const router = createRouter({
    history :createWebHistory(),
    routes,

 })

const app = createApp(App);
app.component("MToast",TheToastMessage)
app.component("MInput",MInput)
app.component("MLoader",MLoader)
app.component("the-dialog",TheDialog)
app.component("the-employee",TheEmployee)
app.component("the-result",ImportResult)
app.component("the-choosefile",ChooseFile)
app.component("the-data",DataImport)

app.component("ThePagination",ThePagination)
app.component("MCombobox",MCombobox)
app.component("MDropdownList",MDropdownList)
app.component("FormEmployeeDetail",FormEmployeeDetail)
app.component("TableEmployee",TableEmployee)
app.component("FormExcel",FormExcel)


app.use(excel)
app.use(router);
app.config.globalProperties.api = axios;
app.config.globalProperties.MISAEnum = MISAEnum;
app.config.globalProperties.MISAResource = MISAResource;
app.config.globalProperties.MISAErrorService = MISAErrorService;
app.config.globalProperties.MISAApiService= MISAApiService;
app.config.globalProperties.MISADataService= DataService;

app.config.globalProperties.MISAApi = "https://localhost:7096/api/v1/Employees";
app.mount('#app')
