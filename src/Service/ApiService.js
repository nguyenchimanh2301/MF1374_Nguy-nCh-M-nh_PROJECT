import axios from "axios";
const  MISAApi ="https://localhost:7096/api/v1/Employees";

const ApiService={
   
   
  async DeleteData(id){
    return await axios.delete(MISAApi + "/" + id)
    .then((response) => {
      response.data;
    })
    .catch((e) => {
      console.log(e);
    });
   }, 
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
   } 
}

export default ApiService;
