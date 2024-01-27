import {  createApp } from 'vue'
import App from './App.vue'

import excel from 'vue-excel-export'

 import TheToastMessage from './components/sharecomponent/TheToastMessage.vue';
 import MInput from './components/sharecomponent/MInput.vue';
 import MLoader from './components/sharecomponent/MLoader.vue';
 import TheDialog from './components/sharecomponent/TheDialog.vue';
 import TableEmployee from './components/employee/TableEmployee.vue';
 import ThePagination from './components/sharecomponent/ThePagination.vue';
 import MCombobox from './components/sharecomponent/MCombobox.vue';
 import  MDropdownList from './components/sharecomponent/MDropdownList.vue';



 /* import font awesome icon component */
 

import MISAResource from './js/helper/resource';
import TheEmployee from './components/router/TheEmployee.vue';
import TheSetting from './components/router/TheSetting.vue';
import TheReport from './components/router/TheReport.vue';
import  axios  from 'axios';
import MISAEnum from './js/helper/enum';
import MISAErrorService from './service/errorservice';
import MISAApiService from './service/apiservice';
import DataService from './service/dataservice';
import FormEmployeeDetail from './components/employee/FormEmployeeDetail.vue';


import { createRouter , createWebHistory } from 'vue-router';

const routes = [
 {path:'/employee', name:'employee' , component:TableEmployee},
 {path:'/setting', name:'setting' , component:TheSetting},
 {path:'/report', name:'report' , component:TheReport},
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
app.component("the-setting",TheSetting)
app.component("the-report",TheReport)
app.component("ThePagination",ThePagination)
app.component("MCombobox",MCombobox)
app.component("MDropdownList",MDropdownList)
app.component("FormEmployeeDetail",FormEmployeeDetail)
app.component("TableEmployee",TableEmployee)

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
