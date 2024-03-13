import { createRouter , createWebHistory } from 'vue-router';
import TableEmployee from '../view/employee/TableEmployee.vue'
import TheLayout from '../view/layout/TheLayout.vue'
import TheUnauthorize from '../view/unauthorize/TheUnauthorize.vue'
import TheLogin from '../view/login/TheLogin'

const routes = [
//  {path:'/login', name:'login' , component:TheLogin},
 {path:'/', name:'login' , component:TheLogin},

//  {path:'/data', name:'data' , component:DataImport},
//  {path:'/choosefile', name:'setting' , component:ChooseFile},
//  {path:'/result', name:'report' , component:ImportResult},
 {path:'/unauthorized', name:'unauthorize' , component:TheUnauthorize },

 {path:'/layout', name:'layout' , component:TheLayout,
 
   children: [
   // Các route cho phần nội dung sau khi đăng nhập
   {
     path: 'employees',
     component: TableEmployee, meta: { requiresAdmin: true },
   },
   // {
   //   path: '/profile',
   //   component: ProfileComponent
   // },
   // {
   //   path: '/settings',
   //   component: SettingsComponent
   // }
 ]

},

]

 const router = createRouter({
    history :createWebHistory(),
    routes,

 })
 router.beforeEach((to, from, next) => {
   // Kiểm tra xem route có yêu cầu quyền admin không
   if (to.meta.requiresAdmin) {
     // Kiểm tra xem người dùng đã đăng nhập chưa
     if (userIsAuthenticated()) {
       // Kiểm tra xem người dùng có quyền admin không
       if (userHasAdminRole()) {
         next(); // Cho phép chuyển hướng nếu người dùng có quyền admin
       } else {
         next('/unauthorized'); // Chuyển hướng đến trang không có quyền truy cập nếu người dùng không có quyền admin
       }
     } else {
       next('/'); // Chuyển hướng đến trang đăng nhập nếu người dùng chưa đăng nhập
     }
   } else {
     next(); // Cho phép chuyển hướng cho các route khác không yêu cầu quyền admin
   }
 });
 
 function userIsAuthenticated() {
   // Thực hiện logic để kiểm tra xem người dùng đã đăng nhập chưa và trả về true nếu đã đăng nhập, false nếu chưa
   // Đây chỉ là một hàm giả định, bạn cần thay thế nó bằng cách kiểm tra đăng nhập thực tế
   return checkAuthenticationStatus();
 }
 
 async function userHasAdminRole() {
   // Kiểm tra token role của người dùng ở đây, và trả về true nếu có quyền admin, false nếu không
  //  // Đây chỉ là một hàm giả định, bạn cần thay thế nó bằng cách kiểm tra token role thực tế
   const jwt = localStorage.getItem('token');
   if (jwt) {
     // Giải mã JWT
     const decodedToken = decodeJWT(jwt);
    //  console.log(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
     if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
       // Người dùng là admin, cho phép truy cập vào router
       return true
     } else {
       // Người dùng không phải là admin, chuyển hướng hoặc xử lý lỗi 403
       router.push('/unauthorized')
       return false
     }
   } else {
     // JWT không tồn tại, xử lý lỗi hoặc chuyển hướng đến trang đăng nhập
     router.push('/')
   }
  //  return  api.response.status !==401;
 }
 
 function checkAuthenticationStatus() {
   // Thực hiện logic để kiểm tra xem người dùng đã đăng nhập chưa và trả về true nếu đã đăng nhập, false nếu chưa
   // Đây chỉ là một hàm giả định, bạn cần thay thế nó bằng cách kiểm tra đăng nhập thực tế
   // Giả sử người dùng đã đăng nhập
   if(localStorage.getItem('token')==null && sessionStorage.getItem('token')==null){
      return false;
   }
   else{
    return true;
   }
 }
 //Hàm giải mã token
 function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}


export default router;