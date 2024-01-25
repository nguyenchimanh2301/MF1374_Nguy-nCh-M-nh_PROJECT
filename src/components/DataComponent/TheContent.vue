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
            <button v-show="sum>0" class="btn-delete-multiple"  data-c-tooltip="Xóa nhiều" tooltip-position ="left"  @click="showDlgDelete()"> 
              <div class="icon--remove"></div>
            </button>
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
              <div class="icon--reload" @click="Reload"></div>
             </button>
             <button class="btn-export" data-c-tooltip="Xuất tệp" tooltip-position ="left" @click="ExportFile">
              <div class="icon--export" ></div>
             </button>
              <button class=" btn-import " data-c-tooltip="Chèn tệp " tooltip-position ="left" @click="ImportFileClick">
                <div class="icon--import "></div>
              <input type="file" ref="fileInput" @change="handleFileChange" />
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
                  <th>MÃ NHÂN VIÊN</th>
                  <th>Tên nhân viên</th>
                  <th>GIỚI TÍNH</th>
                  <th>NGÀY SINH</th>
                  <th data-c-tooltip="Số chứng minh thư nhân dân" tooltip-position ="bottom">SỐ CMND</th>
                  <th>CHỨC DANH</th>
                  <th>TÊN ĐƠN VỊ</th>
                  <th>SỐ TÀI KHOẢN</th>
                  <th>TÊN NGÂN HÀNG</th>
                  <th>CHI NHÁNH TK NGÂN HÀNG</th>
                  <th>CHỨC NĂNG</th>
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
                    {{ item.Gender.IdentityNumber }}
                  </td>
                  <td class="txt-right">
                    {{ item.Gender.IdentityNumber }}
                  </td>
                  <td class="txt-left">
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
                            <li @click="CopyData(item)">Nhân bản</li>
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
                  <span style="color: #616161"></span>
                  <span>
                    <select
                      name=""
                      id=""
                      v-model="pageSize"
                      @change="changPageSize(pageSize)"
                    >
                      <option
                        v-for="(page, index) in pageSizes"
                        :key="index"
                        :value="page"
                      >
                        {{ page }} bản ghi trên 1 trang
                      </option>
                    </select></span
                  >
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
  
  <TheFormInfo
    v-if="isShowForm"
    @some-event="hideForm"
    :EmployeeSelected="employee"
    :methodP="method"
    :MaxCode="maxCode"
    @showFormToast="showFormToast"
    @loadData="LoadAllData"
  >
  </TheFormInfo>
  <!-- this is toast-message -->
  <MToast :text="content" :msgToast="msgToast" :icon="type" v-if="showToast">
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
  >
  </the-dialog>
  <!-- end dialog -->
</template>

<script>
import TheFormInfo from "./TheFormInfo.vue";

import _ from "lodash";
export default {
  computed: {
    orderedUsers: function () {
      return _.orderBy(this.employees, "FullName", "Asc");
    },
  },
  created() {
    this.SearchData(this.pageSize,this.numberPage);  
    },
    watch: {
    
  },
  methods: {
    //Lọc dữ liệu khi nhập
    //CreatedBy NCMANH(24/1/2024)
    OninputSearchData(){
      this.SearchData(this.pageSize,this.numberPage);
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
      this.records= CountRecords.length;
      this.loader = false;
    }
    } , 
    //Hiển thị màn hình chọn tệp
    ImportFileClick(){
      this.$refs.fileInput.click();
     },
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
      //Hàm lấy về tệp  dữ liệu
    //CreatedBy NCMANH(24/1/2024)
   async handleFileChange() {
      this.loader = true;
      this.selectedFile = this.$refs.fileInput.files[0];
      this.employees = await this.MISAApiService.uploadFile(this.selectedFile);
      this.loader = false;

    },
    //Hiển thị dialog cảnh báo xóa nhiều
    //CreadtedBy : NC Mạnh(23/01/2024)
    showDlgDelete(){
      this.msgDialog = [];
      this.isShowDlg = true;
      this.title = this.MISAResource.DeleteMultiple;
      this.selectedItems.map(x=>this.employeeIdArray.push(x.EmployeeId));
      this.type = this.MISAResource.notice.warning;
      this.msgDialog.push(this.MISAResource["VN"].DeleteQuestion);
     this.MISAApiService.DeleteDataMultiple(this.employeeIdArray);
    },
    CountRowSelect() {
      this.sum = this.selectedItems.length; // Cập nhật tổng số phần tử trong selectedItems
    },
    // Láy tất cả bản ghi 
    async LoadAllData(){
          await this.MISAApiService.GetData();
          let data = this.MISAApiService.GetData();
          this.records = data.length;
          console.log();
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
      this.msgDialog.push(this.MISAResource.DeleteQuestion+item.FullName);
    },
    //hàm xóa employee
    //param : employeeId
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    deleteData(id) {
      this.msgToast = [];
      this.msgToast.push(this.MISAResource.returnMessage.deleteComplete);
      try {
        this.MISAApiService.DeleteData(id);
        this.isShowDlg = false;
        this.showFormToast();
        this.Reload();
      } catch (error) {
        console.log(error);
      }
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
     CopyData(item){
      this.isShowForm = true;
      this.employee = {};
      this.employee = item;
      this.method = this.MISAEnum.method.ADD;
      this.content = this.MISAResource.returnMessage.addComplete;
    },
    //hàm mở form thông tin
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    async showForm() {
      this.isShowForm = true;
      this.employee = {};
      this.method = this.MISAEnum.method.ADD;
      this.content = this.MISAResource.returnMessage.addComplete;
      let data =  await this.MISAApiService.GetData();
      this.maxCode =  this.MISADataService.GetMaxCode(data);

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
       pageSize = this.pageSize;
       this.loader = true;
      await this.SearchData(pageSize,this.numberPage);
    },
    //hàm Load lại dữ liệu
    //CreadtedBy : NC Mạnh
    //CreatedDate "23/01/2024"
   async Reload(){
       this.loader = true;
       await this.SearchData(this.pageSize,this.numberPage);
       setTimeout(() => this.loader = false,2);
       
    },
 
    },
  //hàm load dữ liệu
  //CreadtedBy : NC Mạnh
  //CreatedDate "5/12/2023"

  data() {
    return {
      employees: [],
      isShowForm: false,
      employee: {},
      showToast: false,
      tool: [],
      content: "",
      method: 0,
      formattedDate: "",
      selectedRowIndex: 0,
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
      pageSizes: [10, 20, 30],
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
    };
    // Thêm các dòng dữ liệu khác cần hiển thị
  },
  components: {
    TheFormInfo,
  },
};
</script>


<style>


</style>