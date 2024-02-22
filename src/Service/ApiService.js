import axios from "axios";
// Hàm để thêm token vào tiêu đề Authorization của một yêu cầu Axios
async function addTokenToRequest(config) {
  let token = localStorage.getItem('token');
  if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}

// Khởi tạo interceptor để thực hiện thêm token vào tiêu đề Authorization cho mỗi yêu cầu
axios.interceptors.request.use(addTokenToRequest);

const  MISAApi ="https://localhost:7096/api/v1/Employees";
const  Api ="https://localhost:7096/api/v1/";
const ApiService={
  async loadFilter(text, pageSize, numberPage) {
    let url = MISAApi + `/getpagingdto?searchText=${text}&pageSize=${pageSize}&numberPage=${numberPage}`;
    
    try {
        const response = await axios.get(url);
        
        // Trả về dữ liệu từ response
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
},
    //Api Service lấy dữ liệu theo tên 
    //CreatedBy(23/1/2024)
  async GetDataName(name){
    try {
      return await axios
    .get(
      Api+name
    )
    .then((response) => {
      return response.data;
    }).catch((e) => {
      console.log(e);
    });
    } catch (error) {
      console.log(error);
    }
   } ,
    //DeleteData Service
   //CreatedBy NCMANH(23/1/2024)
  async DeleteData(id){
    try {
      return await axios.delete(MISAApi +`/${id}`)
      .then((response) => {
        response.data;
      })
      .catch((e) => {
        console.log(e);
      });
    } catch (error) {
      console.log(error);
      
    }
   }, 
   async DeleteDataMultiple(data){
   try {
    return await axios.delete(MISAApi,{data})
    .then((response) => {
      response.data;
    })
    .catch((e) => {
      console.log(e);
    });
   } catch (error) {
    console.log(error);
    
   }
   }, 
    //Api Service lấy dữ liệu theo Url 
    //CreatedBy(23/1/2024)
   async GetDataUrl(url){
  try {
    return await axios
    .get(
      url
    )
    .then((response) => {
      return response.data;
    }).catch((e) => {
      console.log(e);
    });
  } catch (error) {
    console.log(error);
    
  }
   } ,
   
    //GetData Service
   //CreatedBy NCMANH(23/1/2024)
   async GetData(){
    try {
      return await axios
      .get(
        MISAApi
      )
      .then((response) => {
        return response.data;
      }).catch((e) => {
        console.log(e);
      });
    } catch (error) {
      console.log(error);
    }
   } ,
   //Import Service
   //CreatedBy NCMANH(23/1/2024)
   async uploadFile(file) {
    // Tạo một FormData object để gửi dữ liệu là tệp tin
    try {
      const formData = new FormData();
      formData.append('file',file);
  
      // Gọi API với yêu cầu POST và FormData object
      return await axios.post(MISAApi+'/Import', formData)
        .then(response => {
          // Xử lý phản hồi từ API
        return response.data;
        })
        .catch(error => {
          // Xử lý lỗi
          console.error('Error uploading file:', error);
        });
    } catch (error) {
      console.log(error);
    }
  },
  // async  refreshToken() {
  //   try {
  //     const accessToken = localStorage.getItem('token');
  //     const refreshToken = localStorage.getItem("refresh");
  //      console.log(accessToken,refreshToken);
  //     if (!refreshToken) {
  //       // Xử lý nếu không có refreshToken
  //       return Promise.reject("Không có refreshToken trong local storage");
  //     }
  
  //     // Gửi yêu cầu làm mới token
  //     const response = await axios.post(Api+"Authenticate/refresh-token", {
  //       AccessToken: accessToken, RefreshToken: refreshToken
  //     });
  
  //     // Lưu token mới vào local storage
  //     localStorage.setItem("token", response.data.accessToken);
  //     localStorage.setItem("refresh", response.data.refreshToken);
  
  //     // Trả về accessToken mới
  //     return response.data.Token;
  //   } catch (error) {
  //     // Xử lý lỗi khi làm mới token
  //     return Promise.reject(error);
  //   }
  // },
  //  Api Service phân trang
  //     CreatedBy NCMANH(23/1/2024)


    
// async loadFilter(text, pageSize, numberPage) {

//   let url = MISAApi+`/getpagingdto?searchText=${text}&pageSize=${pageSize}&numberPage=${numberPage}`;
//   try {
//       // Gửi yêu cầu với token hiện tại
//       const response = await axios.get(url);
//       return response.data;
//   } catch (error) {
//       // Nếu gặp lỗi, kiểm tra xem lỗi có phải do token hết hạn không
//       if (error.response && error.response.status === 401) {
//           try {
//               // Nếu lỗi 401, thử làm mới token
//               const newToken = await this.refreshToken();
//               // Nếu làm mới token thành công, thử gửi lại yêu cầu
//               const response = await axios.get(url, {
//                   headers: {
//                       Authorization: `Bearer ${newToken}`
//                   }
//               });
//               // Trả về dữ liệu từ yêu cầu mới
//               return response.data;
//           } catch (refreshError) {
//               // Nếu làm mới token không thành công, xử lý lỗi
//               console.error('Làm mới token không thành công:', refreshError);
//               throw refreshError;
//           }
//       } else {
//           // Nếu lỗi không phải do token hết hạn, xử lý lỗi
//           console.error('Lỗi khi gửi yêu cầu:', error);
//           throw error;
//       }
//   }
// },
// async refreshToken() {
//   try {
      
//       let object ={
//         "AccessToken": accessToken,
//         "RefreshToken":refreshToken
//       }

//    console.log(object);
//       // Gửi yêu cầu làm mới token đến máy chủ
//       const response = await axios.post('https://localhost:7096/api/Authenticate/refresh-token',object)
//       // Trả về token mới từ phản hồi của máy chủ
//       localStorage.setItem('token',response.data.Token);
//       localStorage.setItem('refresh',response.data.RefreshToken);
//       return response.data.Token;
//   }  catch (refreshError) {
//       // Xử lý lỗi nếu không thể làm mới token
//       console.error('Lỗi khi làm mới token:', refreshError);
//       throw refreshError;
//   }
// },
// Hàm kiểm tra và làm mới token


// Hàm gửi yêu cầu với token

     //Api Service Xuất tệp
      //CreatedBy NCMANH(23/1/2024)
  async exportFile(){
      let url =  MISAApi +`/Export`;
     
     try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (!token) {
          throw new Error('Token không tồn tại');
      }
      return await axios
      .get(url,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then((response) => {
        console.log(response);
        window.open(url);
      });
     } catch (error) {
       console.log(error);
     }
    }
}

export default ApiService;
