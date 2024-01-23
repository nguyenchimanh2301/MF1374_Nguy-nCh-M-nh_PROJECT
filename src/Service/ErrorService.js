
const ErrorService={

        GetErrorCode(error) {
            let msgError = [];
             switch (error.data.StatusCode || error.data.status) {
                 case 200:
                     return msgError.push(this.MISAResource.returnMessage.updateComplete);
                 case 201:
                       return msgError.push(this.MISAResource.returnMessage.addComplete);
                 case 400:
                     return msgError = ErrorService.GetMessageError(error.data.Errors ||error.data.errors );
                 case 404:
                      return msgError.push(this.MISAResource.returnMessage.notFoundUrl)
                 case 500:
                      return  msgError.push(this.MISAResource.returnMessage.severError)
                 default:
                     return " ";
             }
         },
        //hàm bắt lỗi trả về từ api
        //CreatedBy: NCManh
        //CreatedDate:20/12/2023
   
          //hàm bắt lỗi trả về từ api
        //CreatedBy: NCManh
        //CreatedDate:15/12/2023
         GetMessageError(entity){
            try{
                if(entity){
                    return Object.values(entity).reduce((x,y)=>x.concat(y))
                   }
                   else return ;
             }
             catch(e){
                console.log(e);
             }
         },

} 
  



export default ErrorService;
