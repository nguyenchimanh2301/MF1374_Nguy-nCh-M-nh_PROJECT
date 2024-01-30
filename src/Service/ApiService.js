import axios from "axios";
const  MISAApi ="https://localhost:7096/api/v1/Employees";
const  Api ="https://localhost:7096/api/v1/";

const ApiService={
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
   //Api Service phân trang
      //CreatedBy NCMANH(23/1/2024)
 async loadFilter(text, pageSize, numberPage) {
    let url = MISAApi+`/getpagingdto?searchText=${text}&pageSize=${pageSize}&numberPage= ${numberPage}`;
      try {
    return await axios
        .get(
        url
        )
        .then((response) => {
         return  response.data;
        })
        .catch((e) => {
          if(e){
            console.log(e);
          }
        });
    } catch (error) {
      console.log(error);
     }
    },
     //Api Service Xuất tệp
      //CreatedBy NCMANH(23/1/2024)
  async exportFile(){
      let url =  MISAApi +`/Export`;
     return await axios
      .get(url)
      .then((response) => {
        console.log(response);
        window.open(url);
      });
    }
}

export default ApiService;
