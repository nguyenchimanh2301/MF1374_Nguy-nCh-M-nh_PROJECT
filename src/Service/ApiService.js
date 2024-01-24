import axios from "axios";
const  MISAApi ="https://localhost:7096/api/v1/";

const ApiService={
    //DeleteData Service
   //CreatedBy NCMANH(23/1/2024)
  async DeleteData(id){
    return await axios.delete(MISAApi + "Employees/" + id)
    .then((response) => {
      response.data;
    })
    .catch((e) => {
      console.log(e);
    });
   }, 
   async DeleteDataMultiple(data){
    return await axios.delete(MISAApi + "Employees",{data})
    .then((response) => {
      response.data;
    })
    .catch((e) => {
      console.log(e);
    });
   }, 
    //GetData Service
   //CreatedBy NCMANH(23/1/2024)
   async GetData(className){
    return await axios
    .get(
      MISAApi+className
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
    return await axios.post(MISAApi+'Employees/Import', formData)
      .then(response => {
        // Xử lý phản hồi từ API
      return response.data;
      })
      .catch(error => {
        // Xử lý lỗi
        console.error('Error uploading file:', error);
      });
  }
}

export default ApiService;
