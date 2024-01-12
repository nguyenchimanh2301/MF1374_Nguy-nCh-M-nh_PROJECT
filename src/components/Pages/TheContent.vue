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
              <div class="icon--bell"></div>
              <div class="icon--user"></div>
              <div class="name--user">Nguyễn Chí Mạnh</div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="feature">
            <div class="title"><h2>Nhân Viên</h2></div>
            <div class="btn--feature">
              <button class="button btn-main" @click="showForm">Thêm mới nhân viên</button>
            </div>
          </div>

          <div class="data">
            <div class="feature">
              <div></div>
              <div class="box__input-icon">
                <div class="input-icon"> 
                  <input type="text" name="input" placeholder="Placeholder" />
                    <div class="icon-search"></div>
                </div>
                <div class="icon--reload"></div>
              </div>
            </div>
            <div class="scroll__table">
            <table id="table">
              <thead>
                <tr>
                  <th style="width: 50px">
                    <input id="check" type="checkbox" />
                  </th>
                  <th>MÃ NHÂN VIÊN</th>
                  <th>Tên nhân viên</th>
                  <th>GIỚI TÍNH</th>
                  <th>NGÀY SINH</th>
                  <th>SỐ CMND</th>
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
                  @keydown.down.prevent="moveDown(index)"
                  @keydown.up.prevent="moveUp(index)"
                  @keydown.enter.prevent="
                    showData(orderedUsers[selectedRowIndex])
                  "
                  @click="Select(index)"
                  tabindex="0"
                >
                  <td>
                    <input
                      id="check"
                      type="checkbox"
                      :value="item"
                      v-model="selectedItems"
                      @change="CountRowSelect"
                    />
                  </td>
                  <td >{{ item.EmployeeCode }}</td>
                  <td class="txt-left">{{ item.FullName }}</td>
                  <td class="txt-left">
                    {{ this.MISAEnum.GenderName(item.Gender) }}
                  </td>
                  <td class="txt-center">{{ this.MISAResource.formatDate(item.DateOfBirth) }}</td>
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
                  <td class="txt-right">
                    {{ this.MISAResource.formatCurrency(item.DebitAmount) }}
                  </td>
                  <td >
                  <div id="editRow" @mouseover="showTooltip(index)"
                   @mouseleave="hideTooltip">
                    <div id="edit--detail" >Sửa 
                    </div>
                  <div class="icon--drop"
                   
                   >
                    <div id="edit--feature" v-show="index===tool">
                      <ul >
                        <li>Nhân bản</li>
                        <li>Xóa</li>
                        <li>Ngừng sử dụng</li>
                      </ul>
                    </div>
                  </div>
                  </div>
                   </td>
                  <div class="tooltips" v-show="index===tool" >
                    <button @click="showDlg(item)">
                      <div class="icon--delete"></div>
                    </button>
                    <button @click="showData(item)">
                      <div class="icon--edit"></div>
                    </button>
                  </div>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="8">
                    <div class="total-record">Tổng số: <strong> {{ records }} </strong> bản ghi</div>
                  </td>
                  <td colspan="6">
                    <div class="paging">
                      <span style="color: #616161"></span>
                      <span
                        ><select name="" id="">
                          <option value="">20 bản ghi trên trang</option>
                        </select></span
                      >
                      <span id="previous">Trước</span>
                      <span style="font-weight: 700">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>...</span>
                        <span>51</span>
                      </span>
                      <span id="next">sau</span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          </div>
        </div>
      </div>
  <!-- <div class="container">
    <div class="content">
      <div class="feature__button">
        <div class="title">
          <div style="position: relative">
            <h2 style="font-size: 25px">Quản lý khách hàng</h2>
          </div>
        </div>
        <div class="btn--feature">
          <button id="btn-add" class="button btn-main" @click="showForm">
            Thêm mới
            <div class="icon--adduser"></div>
          </button>
        </div>
      </div>
      <div class="table">
        <div class="main--content">
          <div style="background-color: #ffffff">
            <div class="feature">
              <div class="feature__box">
                <div class="box__input--icon">
                  <div class="item--select">
                    <div>
                      <div>
                        Đã chọn<span id="count">{{ sum }}</span>
                      </div>
                      <div><span id="clear">Bỏ chọn</span></div>
                      <div class="icon--close"></div>
                    </div>
                    <button class="button btn--delete">
                      Xóa tất cả<i class="icon--trash"></i>
                    </button>
                  </div>
                </div>
                <div class="box__select--icon">
                  <div style="position: relative"></div>
                  <export-excel 
                    :data  = "employees">
                   <button>
                    <div class="icon--filter" ></div>
                  </button>
                 </export-excel>
                  <button>
                    <div class="icon--reload"></div>
                  </button>
                </div>
              </div>
            </div>
            <div class="table-scroll">
              <table id="table">
              <thead>
                <tr>
                  <th style="width: 50px">
                    <input
                      id="check"
                      type="checkbox"
                      v-model="selectAll"
                      @change="toggleSelectAll"
                    />
                  </th>
                  <th>Mã khách hàng</th>
                  <th>Họ và tên</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Công ty</th>
                  <th>Dư nợ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style="position: relative"
                  v-for="(item, index) in orderedUsers"
                  :key="index"
                  @mouseover="showTooltip(index)"
                  @mouseleave="hideTooltip"
                  :class="{ 'highlighted-row': index === selectedRowIndex }"
                  @keydown.down.prevent="moveDown(index)"
                  @keydown.up.prevent="moveUp(index)"
                  @keydown.enter.prevent="
                    showData(orderedUsers[selectedRowIndex])
                  "
                  @click="Select(index)"
                  tabindex="0"
                >
                  <td>
                    <input
                      id="check"
                      type="checkbox"
                      :value="item"
                      v-model="selectedItems"
                      @change="CountRowSelect"
                    />
                  </td>
                  <td class="txt-left">{{ item.employeeCode }}</td>
                  <td class="txt-left">{{ item.FullName }}</td>
                  <td class="txt-left">
                    {{ this.MISAEnum.GenderName(item.Gender) }}
                  </td>
                  <td class="txt-center">{{ this.MISAResource.formatDate(item.DateOfBirth) }}</td>
                  <td class="txt-left">{{ item.CompanyName }}</td>
                  <td class="txt-right">
                    {{ this.MISAResource.formatCurrency(item.DebitAmount) }}
                  </td>
                  <div class="tooltips" v-show="index===tool" >
                    <button @click="showDlg(item)">
                      <div class="icon--delete"></div>
                    </button>
                    <button @click="showData(item)">
                      <div class="icon--edit"></div>
                    </button>
                  </div>
                </tr>
              </tbody>
            </table>
            </div>
         
          </div>
        </div>
        <div class="footer">
          <div style="font-weight: 600">Tổng: 100</div>
          <div class="paging">
            <span>Số bản ghi/trang</span>
            <span
              ><select name="" id="">
                <option value="">10</option>
              </select></span
            >
            <div>
              <div id="previous"></div>
              <div id="next"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <TheFormInfo
    v-if="isShowForm"
    @some-event="hideForm"
    :EmployeeSelected="employee"
    :methodP="method"
    @showFormToast="showFormToast"
    @loadData="load"
  >
  </TheFormInfo>
  <!-- this is toast-message -->
  <MToast :text="content" :msgToast="msgToast" :icon="type"  v-if="showToast"> </MToast>
  <MLoader v-if="loader"></MLoader>
  <!-- end toast-message -->
  <!-- this is dialog -->
  <the-dialog
    v-if="isShowDlg"
    @removeData="deleteData"
    @hideDlg="hideDlg"
    :title="title"
    :type = "type"
    :msgError = "msgDialog"
    :employeeIdRemove="employeeId"
  >
  </the-dialog>
  <!-- end dialog -->
</template>

<script>
import TheFormInfo from "../TheFormInfo.vue";

import _ from "lodash";
export default {
  computed: {
    orderedUsers: function () {
      return _.orderBy(this.employees, "FullName", "Asc");
    },
  },
  created() {
    try {
      this.loader = true;
      this.api
        .get(this.MISAApi)
        .then((response) => {
          this.employees = response.data;
          this.records = response.data.length;
          // console.log(this.employees);
          this.loader = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    } catch (error) {
      console.log(error);
    
    }

  },

  //   watch: {
  //   // Theo dõi sự thay đổi trong mảng selectedItems
  //      selectedItems: {
  //        handler(newVal) {
  //       // Kiểm tra xem tất cả các mục đã được chọn chưa
  //       this.selectAll = newVal.every(item => item);
  //       console.log(this.selectAll);
  //     },
  //     deep: true
  //   }

  // },
  methods: {
    
    CountRowSelect()   {
      this.sum = this.selectedItems.length; // Cập nhật tổng số phần tử trong selectedItems
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
    Select(index){
      this.selectedRowIndex = index;
      this.showTooltip(index);
      this.row = index;
       const selected = this.orderedUsers[index];
       const isSelected = this.selectedItems.includes(selected);
    if (!isSelected) {
      this.selectedItems.push(selected); // Thêm vào mảng nếu chưa được chọn
    } else {
      this.selectedItems = this.selectedItems.filter(item => item !== selected); // Loại bỏ nếu đã được chọn
    }
     this.CountRowSelect();
    },

    moveUp(index) {
      if (this.row >0) {
        index = --this.row;
        this.selectedRowIndex = index;
        this.showTooltip(index);
      }
    },
    moveDown(index) {
      if (this.row < this.orderedUsers.length-1) {
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
      console.log(item);
      this.type = this.MISAResource.notice.warning;
      this.msgDialog.push("Bạn có muốn xóa nhân viên "+item.FullName);
    },
    //hàm xóa employee
    //param : employeeId
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    deleteData(id) {
      this.msgToast.push(this.MISAResource.returnMessage.deleteComplete);
      console.log( this.msgDialog);
      try {
        this.api
          .delete(this.MISAApi +'/'+id)
          .then((response) => {
            response.data;
            this.isShowDlg = false;
            this.load();
            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
            }, 2000);
          })
          .catch((e) => {
            console.log(e);
          });
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
    //hàm mở form thông tin
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    showForm() {
      this.isShowForm = true;
      this.employee = {};
      this.method = this.MISAEnum.method.ADD;
      this.content = this.MISAResource.returnMessage.addComplete;
      console.log(this.type);
    },
    //hàm đóng form thông tin
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    hideForm() {
      this.isShowForm = false;
    },
   
   
    //hàm load dữ liệu
    //CreadtedBy : NC Mạnh
    //CreatedDate "5/12/2023"
    load() {
      try {
        this.api
          .get(this.MISAApi)
          .then((response) => {
            this.employees = response.data;
            // console.log(this.employees);
          })
          .catch((e) => {
            this.errors.push(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
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
      type :"question",
      msgToast : [],
      msgDialog : [],
      records: 0,
    };
    // Thêm các dòng dữ liệu khác cần hiển thị
  },
  components: {
    TheFormInfo,
  },
};
</script>


<style>
.tooltips {
  position: absolute;
  z-index: 10;
  right: 15%;
  display: flex;
  align-items: center;
  justify-items: center;
  height: 40px;
  width: 80px;
  top:10%;
  justify-content: space-between;
  /* background-color: red; */
}
.tooltips button {
  height: 30px;
  width: 30px;
  border: none;
  outline: none;
  background-color: #f2fff0;
}

.highlighted-row {
  background-color: #f2fff0; /* Màu nền để làm nổi bật dòng đang được chọn */
}
.focus-row {
  backdrop-filter: red;
}
/* .icon--drop:hover #edit--feature{
  display:block;
} */
#edit--feature{
  width: 150px;
  height:60px;
  border: 1px solid;
  position: absolute;
  right: 10%;
  top: 10px;
  z-index: 100;
  background-color: #ffffff;
}
#edit--feature ul{
  list-style: none;
  line-height : 20px;
  text-align: left;

}
#edit--feature ul li:hover{
  background-color: #f2fff0;
  color: green;
}
</style>