<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar__form--tool">
        <div class="navbar__icon">
          <div class="icon--navbar"></div>
          <div class="name--company">CÔNG TY CỔ PHẦN MISA</div>
        </div>
        <div class="navbar--name"></div>
        <div class="navbar__input"></div>
        <div class="navbar__icon--user">
          <div data-c-tooltip="Thông báo" tooltip-position ="left" class="icon--bell"></div>
          <div class="icon--user"></div>
          <div class="name--user">Nguyễn Chí Mạnh</div>
          <div class="icon-dropdown"></div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="layout-data">
        <div class="feature">
          <div class="title">
            <h2>Nhân Viên</h2>
          </div>
          <div class="btn--feature">
            <button class="button btn-main btn-title" @click="showForm">
              Thêm mới nhân viên
            </button>
          </div>
        </div>
        <div class="data">
          <div class="feature">
            <div class="delete-multiple" @click="showDeleteMultiple"  v-show="sum>0">
              <!-- <button  class="btn-delete-multiple"  data-c-tooltip="Xóa nhiều" tooltip-position ="right"  @click="showDlgDelete()"> 
              <i class="fas fa-trash"></i>
             </button>
             <p>Đã chọn</p> <strong>  {{ sum }}</strong> -->
              
             <div class="delete-multiple-text">
              {{ this.MISAResource["VN"].MultipleCommand }}            
             </div>
             <div class="icon-combobox" >
              <div v-show="isShowDeleteMultiple" class="delete-text"  @click="showDlgDelete" >{{ this.MISAResource.NameMode.Delete }}</div>
             </div>
            </div>
            <div class="box__input-icon">
              <input
                type="text"
                name="input"
                placeholder="Tìm theo mã, tên nhân viên"
                v-model="searchText"
                @input="OninputSearchData"
              />
              <button class="btn-search" data-c-tooltip="Tìm kiếm" @click="SearchData" >
                <div class="icon-search" ></div>
              </button>
            </div>
             <button class="btn-reload"  data-c-tooltip="Tải lại trang" tooltip-position ="left" >
              <div class="icon--reload" @click="reload"></div>
             </button>
             <button class="btn-export" data-c-tooltip="Xuất tệp" tooltip-position ="left" @click="ExportFile">
              <div class="icon--export" ></div>
             </button>
              <button class=" btn-import " data-c-tooltip="Chèn tệp " tooltip-position ="left" @click="ShowFormImport">
                <div class="icon--import "></div>
           
              </button>
          </div>
          <div class="scroll__table">
            <table id="table">
              <thead>
                <tr>
                  <th>
                    <div class="checked__box">
                      <input id="check" type="checkbox" v-model="selectAll"
                       @change="toggleSelectAll"/>
                    </div>
                  </th>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.EmployeeCode }}
                  </th>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.EmployeeName }}
                  </th>
                  <th>{{ this.MISAResource["VN"].TableColumn.Gender }}</th>
                  <th>{{ this.MISAResource["VN"].TableColumn.DateOfBirth }}</th>
                  <th data-c-tooltip="Số chứng minh thư nhân dân" tooltip-position ="bottom">
                    {{ this.MISAResource["VN"].TableColumn.IdentityNumber }}
                  </th>
                 
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.PositionName }}
                  </th>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.DepartmentName }}
                  </th>
                  <th >
                    {{ this.MISAResource["VN"].TableColumn.CreditNumber }}
                  </th>
                  <th>{{ this.MISAResource["VN"].TableColumn.BankName }}</th>
                  <th>{{ this.MISAResource["VN"].TableColumn.BankAddress }}</th>
                  <th>{{ this.MISAResource["VN"].TableColumn.Feature }}</th>
                 
                </tr>
              </thead>
              <tbody>
                <tr v-show="orderedUsers.length===0">
                  <div> 
                      Không tồn tại bản ghi muốn tìm
                  </div>
                </tr>
                <tr
                  style="position: relative"
                  v-for="(item, index) in orderedUsers"
                  :key="index"
                  @keydown.delete.prevent="
                    showDlg(orderedUsers[selectedRowIndex])
                  "
                  @keydown.down.prevent="moveDown(index)"
                  @keydown.up.prevent="moveUp(index)"
                  @keydown.enter.prevent="
                    showData(orderedUsers[selectedRowIndex])
                  "
                  @dblclick="showData(orderedUsers[selectedRowIndex])"
                  :class="{ 'highlighted-row': index === selectedRowIndex }"
                  @click="Select(index)"
                  tabindex="0"
                >
                  <td>
                    <div class="checked__box">
                      <input
                        id="check"
                        type="checkbox"
                        :value="item"
                        v-model="selectedItems"
                        @change="CountRowSelect"
                      />
                    </div>
                  </td>
                  <td class="txt-left">{{ item.EmployeeCode }}</td>
                  <td class="txt-left">{{ item.FullName }}</td>
                  <td class="txt-left">
                    {{ this.MISAEnum.GenderName(item.Gender) }}
                  </td>
                  <td class="txt-center">
                    {{ this.MISAResource.formatDate(item.DateOfBirth) }}
                  </td>
                  <td class="txt-right">
                    {{ item.IdentityNumber }}
                  </td>
                
                  <td class="txt-left"  >
                    <div v-for="(position, index) in position" :key="index">
                      <div v-if="position.PositionId===item.PositionId">
                      {{ position.PositionName }}
                    </div>
                    </div>
                  </td>
             
                  <td class="txt-left"  >
                    <div v-for="(department, index) in department" :key="index" >
                      <span v-if="department.DepartmentId===item.DepartmentId"> 
                        {{ department.DepartmentName }}
                      </span>
                    </div>
                  </td>
                  <td class="txt-right">
                    {{ item.CreditNumber }}
                  </td>
                  <td class="txt-left">{{ item.BankName }}</td>
                  <td class="txt-left">
                  {{ item.BankAdress }}
                  </td>
                  <td>
                    <div
                      id="editRow"
                      @click="showTooltip(index)"
                      @mouseleave="hideTooltip(index)"
                    >
                      <div id="edit--detail" >Sửa</div>
                      <div class="icon--drop">
                        <div id="edit--feature" v-show="index === tool">
                          <ul>
                            <li @click="copyData(item)">Nhân bản</li>
                            <li @click="showDlg(item)">Xóa</li>
                            <li>Ngừng sử dụng</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
           
          </div>
          <div class="footer">
              <div colspan="8">
                <div class="total-record">
                  Tổng số: <strong> {{ records }} </strong> bản ghi
                </div>
              </div>
              <div colspan="6">
                <div class="paging">
                  <m-dropdown-list 
                  :dataApi="pageSizes"
                   propText="text"
                   propValue="value"
                   @ChangePageSize="changPageSize"
                  ></m-dropdown-list>
                  <the-pagination 
                   v-model:pageNumber="pageNumber"
                   v-model:pageSize="pageSize" 
                   :totalRecords="records"
                   @dataFilter = "SearchData"
                   ></the-pagination>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <form-import-excel v-if="formExcel" @closeFormExcel="CloseFormImport">
  </form-import-excel>
  <form-employee-detail
    v-if="isShowForm"
    @hideForm="hideForm"
    :EmployeeSelected="employee"
    :methodP="method"
    :MaxCode="maxCode"
    @showFormToast="showFormToast"
    @loadData="reload"></form-employee-detail>
  <!-- this is toast-message -->
  <MToast :text="content" :msgToast="msgToast" :icon="typeToast" v-if="showToast">
  </MToast>
  <MLoader v-if="loader"></MLoader>
  <!-- end toast-message -->
  <!-- this is dialog -->
  <the-dialog
    v-if="isShowDlg"
    @removeData="deleteData"
    @hideDlg="hideDlg"
    :title="title"
    :type="type"
    :msgError="msgDialog"
    :employeeIdRemove="employeeId"
    @loadData="reload"
    @deleteMultiple="DeleteMultiple"
  >
  </the-dialog>
  <!-- end dialog -->
</template>
<script>
import _ from "lodash";
import FormImportExcel from '../importcomponent/FormImportExcel.vue';
export default {
  components: { FormImportExcel },
  computed: {
    orderedUsers: function () {
      return _.orderBy(this.employees, "FullName", "Asc");
    },
  },
  created() {
     this.SearchData(this.pageSize,this.numberPage);  
     this.LoadAllData();
    },
    watch: {
    
  },
  methods: {
    //Hiển thị form Import
   ShowFormImport(){
     this.formExcel = true;
   },
   // Đóng form Import
   CloseFormImport(){
     this.formExcel = false;
   },
    //Lọc dữ liệu khi nhập
    //CreatedBy NCMANH(24/1/2024)
    OninputSearchData(){
      setTimeout(()=> this.SearchData(this.pageSize,this.numberPage),500);
    },
     //Hàm phân trang dữ liệu
    //CreatedBy NCMANH(24/1/2024)
    async SearchData(pageSize,numberPage){
      let text = this.searchText.trim();
      let urlRecord =  this.MISAApi+`/getpaging?searchText=${text}`
      if(this.text === null){
      console.log(text);
      }else{
      this.employees = await this.MISAApiService.loadFilter(text,pageSize,numberPage);
      let CountRecords = await this.MISAApiService.GetDataUrl(urlRecord);
      if(CountRecords){
        this.records= CountRecords.length;
      }
      this.loader = false;
    }
    } , 
   
   //Hàm xuất tệp
  //CreatedBy NCMANH(24/1/2024)
    async ExportFile(){
    let url = 'https://localhost:7096/api/v1/Employees/Export';
    await this.api
    .get(url)
    .then((response) => {
      console.log(response.data);
      window.open(url);
    });

     },
   
    //Hiển thị dialog cảnh báo xóa nhiều
    //CreadtedBy : NC Mạnh(23/01/2024)
    showDlgDelete(){
      this.msgDialog = [];
      this.isShowDlg = true;
      this.title = this.MISAResource.NameMode.DeleteMultiple;
      console.log(this.title);
      this.type = this.MISAResource.notice.warning;
      this.msgDialog.push(this.MISAResource["VN"].DeleteMultipleQuestion);
    },
   
    CountRowSelect() {
      this.sum = this.selectedItems.length; // Cập nhật tổng số phần tử trong selectedItems
    },
    // Láy tất cả bản ghi 
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    async LoadAllData(){
          let data = await this.MISAApiService.GetData();
          this.position =  await this.MISAApiService.GetDataName('Positions');
          this.department =  await this.MISAApiService.GetDataName('Departments');
          this.maxCode =  this.MISADataService.GetMaxCode(data) +1;

    },
     //Hàm toggle tất cả bản ghi  với checkbox
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    toggleSelectAll() {
      // Đảo ngược giá trị của selectAll và cập nhật mảng selectedItems tương ứng
      // this.selectedItems = this.selectedItems.map(() => this.selectAll);
      if (this.selectAll) {
        this.selectedItems = [...this.orderedUsers]; // Select all items
      } else {
        this.selectedItems = []; // Deselect all items
      }
      this.sum = this.selectedItems.length;
    },
    //Hàm chọn bản ghi  với checkbox
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    Select(index) {
      this.selectedRowIndex = index;
      this.showTooltip(index);
      this.row = index;
      const selected = this.orderedUsers[index];
      const isSelected = this.selectedItems.includes(selected);
      if (!isSelected) {
        this.selectedItems.push(selected); // Thêm vào mảng nếu chưa được chọn
      } else {
        this.selectedItems = this.selectedItems.filter(
          (item) => item !== selected
        ); // Loại bỏ nếu đã được chọn
      }
      this.CountRowSelect();
    },
   //Hàm lên dòng trên bằng phím mũi lên trên
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    moveUp(index) {
      if (this.row > 0) {
        index = --this.row;
        this.selectedRowIndex = index;
        this.showTooltip(index);
      }
    },
    //Hàm xuống dòng dưới bằng phím mũi xuống dưới
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    moveDown(index) {
      if (this.row < this.orderedUsers.length - 1) {
        index = ++this.row;
        this.selectedRowIndex = index;
        this.showTooltip(index);
      }
    },
    //hàm hiển thị và đóng from toast
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showFormToast() {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
    //hàm ẩn Dialog
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    hideDlg() {
      this.isShowDlg = false;
    },
    //hàm show Dialog
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showDlg(item) {
      this.msgDialog = [];
      this.isShowDlg = true;
      this.title = this.MISAResource.NameMode.Delete;
      this.employeeId = item;
      this.type = this.MISAResource.notice.warning;
      this.msgDialog.push(this.MISAResource["VN"].DeleteQuestion +`<${item.EmployeeCode}>`);
    },
     //Hàm xóa nhiều bản ghi 
    //CreadtedBy : NC Mạnh(23/01/2024)
   async DeleteMultiple(){
      this.employeeIdArray=[];
      this.msgToast = [];
      this.selectedItems.map(x=>this.employeeIdArray.push(x.EmployeeId));
      this.msgToast.push(this.MISAResource.returnMessage.deleteComplete);
      this.typeToast = this.MISAResource.notice.success;
     await this.MISAApiService.DeleteDataMultiple(this.employeeIdArray);
      this.isShowDlg = false;
        this.showFormToast();
       await this.reload();
    },
    //hàm xóa employee
    //param : employeeId
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
   async deleteData(id) {
      this.msgToast = [];
      this.msgToast.push(this.MISAResource.returnMessage.deleteComplete);
      this.typeToast = this.MISAResource.notice.success;
      try {
        await this.MISAApiService.DeleteData(id);
        this.isShowDlg = false;
        this.showFormToast();
       await this.reload();
      } catch (error) {
        console.log(error);
      }
      await this.reload();
    },
    //hàm show tool
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showTooltip(index) {
      this.tool = index;
    },
    hideTooltip() {
      this.tool = [];
    },
    //hàm lấy về từng khách hàng
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showData(item) {
      this.isShowForm = true;
      this.employee = item;
      this.method = this.MISAEnum.method.UPDATE;
      this.content = this.MISAResource.returnMessage.updateComplete;
      this.type = this.MISAResource.notice.question;
    },
     //hàm nhân bản
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
     copyData(item){
      this.isShowForm = true;
      this.employee = {};
      this.employee = item;
      this.method = this.MISAEnum.method.ADD;
      this.content = this.MISAResource.returnMessage.addComplete;
    },
    //hàm mở form thông tin
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
     showForm() {
      this.isShowForm = true;
      this.employee = {};
      this.method = this.MISAEnum.method.ADD;
      this.content = this.MISAResource.returnMessage.addComplete;
    },
    //hàm đóng form thông tin
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    hideForm() {
      this.isShowForm = false;
    },
     //hàm thay đổi số bản ghi
    //CreadtedBy : NC Mạnh
    //CreatedDate "23/01/2024"
   async changPageSize(pageSize) {
       this.loader = true;
      await this.SearchData(pageSize,this.numberPage);
    },
    //hàm Load lại dữ liệu
    //CreadtedBy : NC Mạnh
    //CreatedDate "23/01/2024"
   async reload(){
       this.loader = true;
       await this.SearchData(this.pageSize,this.numberPage);
       setTimeout(() => this.loader = false,2);
       
    },
   //hàm show xóa nhiều
  //CreadtedBy : NC Mạnh
  //CreatedDate "5/12/2023"
    showDeleteMultiple(){
      this.isShowDeleteMultiple = !this.isShowDeleteMultiple;
    },
  },
  data() {
    return {
      formExcel : false,
      isShowDeleteMultiple : false,
      employees: [],
      isShowForm: false,
      employee: {},
      showToast: false,
      typeToast: false,
      tool: [],
      content: "",
      method: 0,
      formattedDate: "",
      selectedRowIndex: "",
      row: 0,
      selectAll: false,
      selectedItems: [],
      sum: 0,
      loader: false,
      title: "",
      employeeId: {},
      isShowDlg: false,
      ckeckedBox: true,
      type: "question",
      msgToast: [],
      msgDialog: [],
      countPage: [],
      records: 0,
      pageSizes: [
        {
        text: "10 bản ghi trên 1 trang",
        value : 10
        },
        {
        text: "20 bản ghi trên 1 trang",
        value : 20
        },
        {
        text: "30 bản ghi trên 1 trang",
        value : 30
        },
       ],
      numberPage: 1,
      pageSize: 10,
      currentPage: 1,
      totalPage: 10, // Đặt số t
      pageNumber : 1,
      selectedFile : "",
      response: [],
      maxCode: 0,
      employeeIdArray: [],
      searchText : " ",
      position : [],
      department : [],
      titleDialog:"",
    };
    // Thêm các dòng dữ liệu khác cần hiển thị
  },
  
};
</script>


<style>

</style>