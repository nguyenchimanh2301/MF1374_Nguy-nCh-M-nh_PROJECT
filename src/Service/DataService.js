const DataService = {


    
   GetMaxCode(data){
    try {
        let modifiedArray = 
        data.map((x) => 
        x.EmployeeCode!=null&&x.EmployeeCode.includes('NV-')==true?x.EmployeeCode.replace('NV-',''):null).map((i)=>Number(i));
        return Math.max(...modifiedArray)
    } catch (error) {
        console.log(error);
    }
   }

}

export default DataService;