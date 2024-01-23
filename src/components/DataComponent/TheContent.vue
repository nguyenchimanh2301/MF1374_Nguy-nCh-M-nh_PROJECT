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
            <div class="box__input-icon">
              <input
                type="text"
                name="input"
                placeholder="Tìm theo mã, tên nhân viên"
              />
              <button class="btn-search" data-c-tooltip="Tìm kiếm" >
                <div class="icon-search"></div>
              </button>
            </div>
             <button class="btn-reload"  data-c-tooltip="Tải lại trang" tooltip-position ="left" >
              <div class="icon--reload" @click="Reload"></div>
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
                  <td class="txt-right">
                    {{ item.Gender.IdentityNumber }}
                  </td>
                  <td class="txt-right">
                    {{ item.Gender.IdentityNumber }}
                  </td>
                  <td class="txt-left">{{ item.CompanyName }}</td>
                  <td class="txt-left">
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
                   @dataFilter = "loadFilter"
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
    this.loadFilter(this.pageSize, this.numberPage);
    this.LoadAllData();

    },
  //   watch: {

  // },
  methods: {
    ImportFileClick(){
      this.$refs.fileInput.click();
     },
   async handleFileChange() {
      this.loader = true;
      this.selectedFile = this.$refs.fileInput.files[0];
      this.employees = await this.MISAApiService.uploadFile(this.selectedFile);
      this.loader = false;

    },
    CountRowSelect() {
      this.sum = this.selectedItems.length; // Cập nhật tổng số phần tử trong selectedItems
    },
    // Láy tất cả bản ghi 
    async LoadAllData(){
          await this.MISAApiService.GetData();
          let data = await this.MISAApiService.GetData('Employees');
          this.maxCode = this.MISADataService.GetMaxCode(data);
          this.records = data.length;
    },
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
   
    moveUp(index) {
      if (this.row > 0) {
        index = --this.row;
        this.selectedRowIndex = index;
        this.showTooltip(index);
      }
    },
    moveDown(index) {
      if (this.row < this.orderedUsers.length - 1) {
        index = ++this.row;
        this.selectedRowIndex = index;
        this.showTooltip(index);
      }
    },

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
      this.title = "Xóa";
      this.employeeId = item;
      this.type = this.MISAResource.notice.warning;
      this.msgDialog.push("Bạn có muốn xóa nhân viên " + item.FullName);
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
   async changPageSize(pageSize) {
      this.pageSize = pageSize;
      this.loader = true;
    await this.loadFilter(this.pageSize, this.numberPage);
    },
   async Reload(){
       this.loader = true;
       await this.LoadAllData(),
       await  this.loadFilter(this.pageSize, this.numberPage);
       setTimeout(() => this.loader = false,2);
       
    },
    async loadFilter(pageSize, numberPage) {
       this.pageSize = pageSize;
       this.numberPage = numberPage;
        try {
        await this.api
          .get(
            this.MISAApi +
              `/getpaging?pageSize=` +
              this.pageSize +
              `&numberPage=` +
              this.numberPage +
              ``
          )
          .then((response) => {
            this.employees = response.data;
            this.loader = false;
          })
          .catch((e) => {
            if(e){
              this.errors.push(e);
            }
          });
      } catch (error) {
        console.log(error);
       }
      }
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