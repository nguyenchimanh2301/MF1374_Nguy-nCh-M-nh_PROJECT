const MISAResource = {
  VN: {
      "CompanyName" : 'CÔNG TY CỔ PHẦN MISA',
      "UserName" : 'Nguyễn Chí Mạnh',
      "Employee" : 'Nhân viên',
      "AddNewTitle" : 'Thêm mới nhân viên',
      "Edit" : 'Sửa',
      "Copy" : 'Nhân bản',
     
      "EmployeeNotEmpty" : 'Mã nhân viên  không được để trống,',
      "DepartmentNotEmpty" :'Mời chọn phòng ban,',
      "FullNameNotEmpty" : 'Họ tên không được để trống,',
      "EmailNotEmpty" : 'Email không được để trống',
      "EmailNotValid" : 'Email không đúng định dạng',
      "PhoneIsNumeric" : 'Điện thoại phải là số',
      "PhoneIsNotEmpty" : 'Điện thoại không được để trống',
      "PhoneIsValid" : 'Điện thoại phải đủ 10 số',
      "DebitAmountIsNumeric" : 'Tiền nợ  phải là số',
      "EmployeeInformation"  : 'Thông tin nhân viên',
      "DateNotValid"  : 'Ngày sinh không hợp lệ',
      "DateNotGreater" : 'Ngày sinh không lớn hơn ngày hiện tại',
      "NotFoundRecord" : 'Không tồn tại bản ghi muốn tìm',
      "HideDialogQuestion" : 'Dữ liệu đã bị thay đổi bạn có muốn cất không ?',
      "EmployeeCode"  : 'Mã',
      "FullName" : 'Tên',
      "PhoneNumber" : 'ĐT di động',
      "Fax" : 'ĐT cố định',
      "DateOfBirth" : 'Ngày sinh',
      "Gender" : 'Giới tính',
      "IdentityNumber" : 'Số CMTND',
      "IdentityDate":'Ngày cấp',
      "IdentityPlace":'Nơi cấp',
      "DebitAmount":'Số tiền nợ',
      "ValueInput":'Giá trị nhập vào',
      "BankAddress":'Chi nhánh',
      "BankName":'Tên ngân hàng',
      "CreditNumber":'Tài khoản ngân hàng',
      "Address":'Địa chỉ',
      "PositionName" : "Chức danh",
      "DeleteQuestion" : "Bạn có thực sự muốn xóa nhân viên ",
      "DeleteMultipleQuestion" : "Bạn có thực sự muốn xóa những nhân viên đã chọn không ",
      "EmployeeCodeExist"  : 'Mã nhân viên',
      "IsExist"  : 'Đã tồn tại trong hệ thống',
      "Help"  : ' Giúp',
      "CancelBtn"  : 'Hủy bỏ',
      "Previous"  :'Quay lại',
      "Next"  : 'Tiếp tục',
      "StopUsing"  : 'Ngừng sử dụng',
      "MultipleCommand" : "Thực hiện hàng loạt",
      "AddAndNew" : "Cất và thêm mới",
      TableColumn:{
        EmployeeCode   :"MÃ NHÂN VIÊN",
        EmployeeName   : "TÊN NHÂN VIÊN",
        Gender:         "GIỚI TÍNH",
        DateOfBirth     :"NGÀY SINH",
        CreditNumber    :"SỐ TÀI KHOẢN",
        PositionName   :"CHỨC DANH",
        DepartmentName :"TÊN ĐƠN VỊ",
        BankName        :      "TÊN NGÂN HÀNG",
        BankAddress     :"CHI NHÁNH TK NGÂN HÀNG",
        Status         :"TÌNH TRẠNG",
        IdentityNumber : "Số CMND",
        Feature: "CHỨC NĂNG"
      },
      Import:{
        DownLoadHere   :"Tải tập tin chứa tệp nhập khẩu tại đây.",
        RowImportValid   : "Số dòng nhập khẩu thành công",
        RowImportNotValid:  "Số dòng nhập khẩu không thành công",
        ImportResult     :"Kết quả nhập khẩu",
        RowValid   : " dòng hợp lệ",
        RowNotValid   : " dòng không hợp lệ",
        ChoseFileImport   : "Chọn dữ liệu đã chuẩn bị để nhập khẩu vào phần mềm",
        DownLoadEmptyFile   : "Chưa có tệp mẫu để chuẩn bị dữ liệu? Tải tệp excel mẫu mà phần mềm cung cấp để chuẩn bị dữ liệu nhập khẩu tại đây",
        Step   : "Bước",

      },
      Login:{
        VN   :"Tiếng Việt",
        EN   :"English",
        UserNotEmpty   : "Tài khoản không được để trống",
        PasswordNotEmpty:  "Mật khẩu không được để trống",
        ForgotPassword     :"Quên mật khẩu?",
        Login   : " Đăng nhập",
        LoginWith   : "Hoặc đăng nhập với",
        CopyWriterText   : "Copyright © 2012 - 2024 MISA JSC",

      },
      
      GenderName:{
        Male:"Nam",
        Female:"Nữ",
        Other :"Khác"
      },
      GenderCode:{
        Male: 0,
        Female:1,
        Other :2
      },
      "Cancel":'Hủy',
      "Add":'Cất',
  },
  EN: {
    "EmployeeNotEmpty" : 'Mã nhân viên không được để trống,',
    "FullNameNotEmpty" : 'Họ tên không được để trống,',
    "EmailNotValid" :  'Email không đúng định dạng',
    
  },
  returnMessage: {
    addComplete: "THÊM MỚI THÀNH CÔNG",
    updateComplete: "THAY ĐỔI THÀNH CÔNG",
    deleteComplete: "Thành công! Nhân viên đã bị xóa",
    notFoundUrl: "Đường dẫn không chính xác",
    severError: "Lỗi hệ thống",
    HasError : 'Đã có lỗi xảy ra vui lòng liên Hệ MISA để được giải quyết',
    Unauthorized : 'Truy cập bị từ chối',
    Forbidden : "Bạn đã bị chặn truy cập vào đường dẫn",
  },
  notice: {
    question: "question",
    information: "information",
    error: "error",
    warning: "warning",
    success: "success",
  },
  NameMode:{
     AddNew:"THÊM MỚI",
     Change:"THAY ĐỔI",
     Delete :"Xóa",
     DeleteMultiple :"Xóa nhiều"

  },
  TextBtn:{
    Close:"Đóng",
    Accept:"Đồng ý",
 },
  //hàm format tiền
//CreadtedBy : NC Mạnh
//CreatedDate "5/12/2023"
  formatCurrency (amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount).replace("₫", "");
  },


   //hàm format ngày tháng
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    formatDate(dateString) {
        let date = new Date(dateString);
        // Lấy ngày, tháng và năm từ đối tượng Date
        let day = date.getDate(); // Ngày
        let month = date.getMonth() + 1; // Tháng (0-11, cần cộng thêm 1)
        let year = date.getFullYear(); // Năm
        // Định dạng lại theo dd/mm/yyyy
        return (this.formattedDate = `${day < 10 ? "0" + day : day}/${
          month < 10 ? "0" + month : month
        }/${year}`);
      },
  //hàm Định dạng tiền
  //cretedBy : NC Mạnh
  //CreatedAt : 5/12/2023
//   formatCurrency () {
//     // Xóa ký tự không phải số và chấp nhận số và dấu chấm
//     let value = this.state.EmployeeSelect.DebitAmount;
//     // Format giá trị số theo định dạng tiền tệ VND
//     value = parseFloat(value).toLocaleString("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     });
  
//     // Cập nhật giá trị đã định dạng vào biến formattedValue để hiển thị
//     this.state.EmployeeSelect.DebitAmount = value;
//   },
};



export default MISAResource;
