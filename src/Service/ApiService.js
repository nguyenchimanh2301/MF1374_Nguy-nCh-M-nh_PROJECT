import axios from "axios";
const  MISAApi ="https://localhost:7096/api/v1/Employees";
const  Api ="https://localhost:7096/api/v1/";

const ApiService={
    //Api Service lấy dữ liệu theo tên 
    //CreatedBy(23/1/2024)
  async GetDataName(name){
    return await axios
    .get(
      Api+name
    )
    .then((response) => {
      return response.data;
    }).catch((e) => {
      console.log(e);
    });
   } ,
    //DeleteData Service
   //CreatedBy NCMANH(23/1/2024)
  async DeleteData(id){
    return await axios.delete(MISAApi +`/${id}`)
    .then((response) => {
      response.data;
    })
    .catch((e) => {
      console.log(e);
    });
   }, 
   async DeleteDataMultiple(data){
    return await axios.delete(MISAApi,{data})
    .then((response) => {
      response.data;
    })
    .catch((e) => {
      console.log(e);
    });
   }, 
    //Api Service lấy dữ liệu theo Url 
    //CreatedBy(23/1/2024)
   async GetDataUrl(url){
    return await axios
    .get(
      url
    )
    .then((response) => {
      return response.data;
    }).catch((e) => {
      console.log(e);
    });
   } ,
   
    //GetData Service
   //CreatedBy NCMANH(23/1/2024)
   async GetData(){
    return await axios
    .get(
      MISAApi
    )
    .then((response) => {
      return response.data;
    }).catch((e) => {
      console.log(e);
    });
   } ,
   //Import Service
   //CreatedBy NCMANH(23/1/2024)
   async uploadFile(file) {
    // Tạo một FormData object để gửi dữ liệu là tệp tin
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
  },
   //Api Service phân trang
      //CreatedBy NCMANH(23/1/2024)
 async loadFilter(text, pageSize, numberPage) {
    let url = MISAApi+`/getpaging?searchText=${text}&pageSize=${pageSize}&numberPage= ${numberPage}`;
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
}

export default ApiService;
