<template>
  <div class="dark--screen" v-if="true">
    <div
      class="form"
      :class="{
        'close-form': showForm === false,
        'show-form': showForm === true,
      }"
    >
      <div class="form--content">
        <div class="form--title">
          <div class="form--title check-box">
            <h3>{{ this.MISAResource["VN"].EmployeeInformation }}</h3>
            <div>
              <label for="" id="object"
                ><input type="checkbox" name="object" />Là khách hàng</label
              >
              <label for="" id="object"
                ><input type="checkbox" name="object" />Là nhà cung cấp</label
              >
            </div>
          </div>
          <div class="form--title-icon">
            <div class="icon--question"></div>
            <div
              class="icon--close"
              data-c-tooltip="Đóng"
              tooltip-position="left"
              @click="closeForm"
            ></div>
          </div>
        </div>
        <div class="form--input">
          <div class="form__input--left">
            <div class="form-input-code">
              <div class="label-input">
                <label id="label" for=""
                  >{{ this.MISAResource["VN"].EmployeeCode }}
                  <span class="text--required">*</span>
                </label>
                <MInput
                  title="Mã không được để trống"
                  v-model="state.EmployeeSelect.EmployeeCode"
                  input-id="empcode"
                  :hasError="v$.EmployeeSelect.EmployeeCode.$error"
                  ref="focusText"
                ></MInput>
                <div
                  class="error-text"
                  v-if="v$.EmployeeSelect.EmployeeCode.$error"
                >
                  {{ v$.EmployeeSelect.EmployeeCode.$errors[0].$message }}
                </div>
              </div>
              <div class="label-input">
                <label id="label" for=""
                  >{{ this.MISAResource["VN"].FullName
                  }}<span class="text--required">*</span>
                </label>
                <MInput
                  title="Tên không được để trống"
                  v-model="state.EmployeeSelect.FullName"
                  :hasError="v$.EmployeeSelect.FullName.$error"
                  input-id="name"
                ></MInput>
                <div
                  class="error-text"
                  v-if="v$.EmployeeSelect.FullName.$error"
                >
                  {{ v$.EmployeeSelect.FullName.$errors[0].$message }}
                </div>
              </div>
            </div>
            <div class="label-input">
              <label id="label" for=""
                >Đơn vị<span class="text--required">*</span>
                <m-combobox
                  :dataApi="department"
                  title="Hãy chọn phòng ban"
                  propText="DepartmentName"
                  propValue="DepartmentId"
                  v-model="state.EmployeeSelect.DepartmentId"
                  :hasError="v$.EmployeeSelect.DepartmentId.$error"
                ></m-combobox>
              </label>
              <div
                class="error-text"
                v-if="v$.EmployeeSelect.DepartmentId.$error"
              >
                {{ v$.EmployeeSelect.DepartmentId.$errors[0].$message }}
              </div>
            </div>
            <div class="label-input">
              <label id="label" for=""
                >{{ this.MISAResource["VN"].PositionName
                }}
                <m-combobox
                  :dataApi="position"
                  title="Hãy chọn chức vụ"
                  propText="PositionName"
                  propValue="PositionId"
                  v-model="state.EmployeeSelect.PositionId"
                ></m-combobox>
              </label>
              <div
                class="error-text"
                v-if="v$.EmployeeSelect.DepartmentId.$error"
              >
                <!-- {{ v$.EmployeeSelect.DepartmentId.$errors[0].$message }} -->
              </div>
            </div>
          </div>
          <div class="form__input--right">
            <div>
              <div class="label-input">
                <label id="label" for=""
                  >{{ this.MISAResource["VN"].DateOfBirth }}
                </label>
                <div class="format-date">
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    v-model="showDob"
                    id="dateDisplay"
                  />
                  <input
                    type="date"
                    id="selectedDate"
                    v-model="state.EmployeeSelect.DateOfBirth"
                    @input="formatDate"
                    @change="showDate"
                  />
                </div>
              </div>

              <label id="label" for=""
                >{{ this.MISAResource["VN"].Gender }}
                <div class="box__input--radio">
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.EmployeeSelect.Gender"
                      value="0"
                    />{{ this.MISAResource["VN"].GenderName.Male }}</label
                  >
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.EmployeeSelect.Gender"
                      value="1"
                    />{{ this.MISAResource["VN"].GenderName.Female }}</label
                  >
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.EmployeeSelect.Gender"
                      value="2"
                    />{{ this.MISAResource["VN"].GenderName.Other }}</label
                  >
                </div>
              </label>
            </div>
            <div class="input-identity">
              <div class="label-input">
                <label
                  id="label"
                  for=""
                  data-c-tooltip="Số chứng minh nhân dân"
                  tooltip-position="left"
                  >Số CMND
                </label>
                <input
                  type="text"
                  id="idcard"
                  v-model="state.EmployeeSelect.IdentityNumber"
                />
                <div></div>
              </div>
         
            <div class="label-input">
              <label id="label" for=""
              >{{ this.MISAResource["VN"].IdentityDate }}
            </label>
              <div class="format-date">
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    v-model="identityDate"
                    id="dateDisplay"
                  />
                <input
                  type="date"
                  @change="showIdentityDate"
                  v-model="state.EmployeeSelect.IdentityDate"
                />
            </div>
            </div>
            </div>

            <label id="label" for=""
              >{{ this.MISAResource["VN"].IdentityPlace }}
              <input
                type="text"
                id="identity-place"
                v-model="state.EmployeeSelect.IdentityPlace"
              />
            </label>
          </div>
        </div>
        <div class="form__input--under">
          <label id="label" for=""
            >{{ this.MISAResource["VN"].Address }}
            <input type="text" v-model="state.EmployeeSelect.Address" />
          </label>
          <div class="form--info">
            <label id="label" for=""
              >{{ this.MISAResource["VN"].PhoneNumber }}
              <input type="text" v-model="state.EmployeeSelect.PhoneNumber" />
            </label>
            <label id="label" for=""
              >{{ this.MISAResource["VN"].Fax }}
              <input type="text" />
            </label>
            <div class="label-input">
              <label id="label" for=""
                >Email
                <MInput
                  title="Email chưa đúng định dạng"
                  v-model="state.EmployeeSelect.Email"
                  :hasError="v$.EmployeeSelect.Email.$error"
                  input-id="email"
                ></MInput>
                <!-- <span class="error-text" v-if="v$.EmployeeSelect.Email.$error">
                  {{ v$.EmployeeSelect.Email.$errors[0].$message }} -->
                <!-- </span> -->
              </label>
            </div>
            <label id="label" for=""
              >{{ this.MISAResource["VN"].CreditNumber }}
              <input type="text" v-model="state.EmployeeSelect.CreditNumber" />
            </label>
            <label id="label" for=""
              >{{ this.MISAResource["VN"].BankName }}
              <input type="text" v-model="state.EmployeeSelect.BankName" />
            </label>
            <label id="label" for=""
              >{{ this.MISAResource["VN"].BankAddress }}
              <input type="text" v-model="state.EmployeeSelect.BankAdress" />
            </label>
          </div>
        </div>
        <div class="form--footer">
          <button class="button btn-second btn-cancel" @click="closeForm">
            {{ this.MISAResource["VN"].Cancel }}
          </button>
          <div>
            <button
              class="button btn-second btn-add btn-second"
              @click="addData"
            >
              {{ this.MISAResource["VN"].Add }}
            </button>
            <button class="button btn-add btn-main" @click="addAndNew">
              {{ this.MISAResource["VN"].AddAndNew }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <the-dialog
    v-if="isShowDlg"
    @addData="addData"
    @hideDlg="hideDlg"
    :type="type"
    :title="title"
    :msgError="msgError"
    :textBtn="textBtn"
    :classBinding="binding"
    @hideForm="hideForm"
  >
  </the-dialog>
  <MToast
    :text="content"
    :msgToast="msgToast"
    :icon="typeToast"
    v-if="showToast"
  >
  </MToast>
</template>
<script>
import useValidate from "@vuelidate/core";
import isEqual from "lodash/isEqual";
import {
  required,
  minLength,
  maxLength,
  numeric,
  email,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import MISAResource from "../../js/helper/resource";
export default {
  props: ["EmployeeSelected", "methodP", "MaxCode"],
  created() {
    

    this.state.EmployeeSelect = JSON.parse(
      JSON.stringify(this.EmployeeSelected)
    );
    this.method = this.methodP;
    if (this.methodP === this.MISAEnum.method.ADD) {
      this.title = this.MISAResource.NameMode.AddNew;
    } else {
      this.title = this.MISAResource.NameMode.Change;
    }
    this.getDataCombobox();
  },
  setup() {
    //reactive validate
    const state = reactive({
      EmployeeSelect: {
        EmployeeCode: "",
        Email: "",
        FullName: "",
        PhoneNumber: "",
        Gender: 1,
        DateOfBirth: "",
        DepartmentId: "",
        Address: "",
        BankName: "",
        BankPlace: "",
        CreditNumber: "",
        PositionId: "",
      },
    });
    //validateconst notFutureDate = withParams({ type: 'notFutureDate' }, value => {

    const rules = computed(() => {
      //   const notFutureDate = withParams({ type: 'notFutureDate' }, value => {
      //   const selectedDate = new Date(value);
      //   const currentDate = new Date();
      //   return selectedDate <= currentDate;
      // });

      return {
        EmployeeSelect: {
          EmployeeCode: {
            required: helpers.withMessage(
              MISAResource["VN"].EmployeeNotEmpty,
              required
            ),
            // minLength: minLength(6),
          },
          DepartmentId: {
            required: helpers.withMessage(
              MISAResource["VN"].DepartmentNotEmpty,
              required
            ),
            // minLength: minLength(6),
          },
          Email: {
            // required: helpers.withMessage(MISAResource["VN"].EmailNotEmpty, required),
            email: helpers.withMessage(MISAResource["VN"].EmailNotValid, email),
          },
          FullName: {
            required: helpers.withMessage(
              MISAResource["VN"].FullNameNotEmpty,
              required
            ),
            // minLength: minLength(10),
          },
          DateOfBirth: {
            // notFutureDate: helpers.withMessage(
            //   MISAResource["VN"].DateNotGreater,
            //   (value) => new Date(value) < new Date())
          },

          PhoneNumber: {
            // required: helpers.withMessage(MISAResource["VN"].PhoneIsNotEmpty, required),
            numeric: helpers.withMessage(
              MISAResource["VN"].PhoneIsNumeric,
              numeric
            ),
            minLength: helpers.withMessage(
              MISAResource["VN"].PhoneIsValid,
              minLength(10)
            ),
            maxLength: helpers.withMessage(
              MISAResource["VN"].PhoneIsValid,
              maxLength(10)
            ),
          },
          // DebitAmount: {
          //     numeric: helpers.withMessage(MISAResource["VN"].DebitAmountIsNumeric, numeric),
          //     // minLength: minLength(4),
          // },
        },
      };
    });
    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  methods: {
    async addAndNew() {
      //  await this.addData();
      await this.addData();
    },
    //Lấy dữ liệu cho combobox
    async getDataCombobox() {
      this.position = await this.MISAApiService.GetDataName("Positions");
      this.department = await this.MISAApiService.GetDataName("Departments");
    },
    //Hàm hiển thị dialog
    //cretedBy : NC Mạnh
    //CreatedAt : 5/12/2023
    showDlg() {
      try {
        this.type =
          this.methodP === this.MISAEnum.method.ADD
            ? this.MISAResource.notice.information
            : this.MISAResource.notice.question;
        this.isShowDlg = true;
      } catch (error) {
        console.log(error);
      }
    },
    //Hàm ẩn dialog
    //cretedBy : NC Mạnh
    //CreatedAt : 5/12/2023
    hideDlg() {
      this.isShowDlg = false;
      this.$refs.focusText.$el.focus();
    },
    //hàm thêm,thay đổi dữ liệu
    //cretedBy : NC Mạnh
    //CreatedAt : 5/12/2023
    async addData() {
      this.msgError = [];
      this.type = "";
      this.employee = Object.assign({}, this.state.EmployeeSelect);
      //Chạy hàm validate
      this.v$.$validate();
      //Thêm cảnh báo vào dialog
      this.v$.$errors.forEach((x) => this.msgError.push('-'+x.$message));
      //Nếu cảnh báo ở validate ở UI >0
      if (this.msgError.length > 0) {
        this.type = this.MISAResource.notice.error;
        this.isShowDlg = true;
        this.textBtn = this.MISAResource.TextBtn.Accept;
      } else {
        if (this.method === this.MISAEnum.method.ADD) {
          try {
            await this.api
              .post(this.MISAApi, this.employee)
              .then((response) => {
                response.data;
                this.msgError = this.MISAErrorService.GetErrorCode(response);
                this.loadForm(response);
                this.closeToast();
                console.log(response);
              })
              .catch((error) => {
                //Bắt lỗi trả về  từ API
                this.MsgValidate = this.MISAErrorService.GetErrorCode(
                  error.response
                );
                this.msgError = this.msgError.concat(this.MsgValidate);
                this.textBtn = this.MISAResource.TextBtn.Close;
                this.loadForm(error.response);
                console.log(error);
              });
          } catch (error) {
            this.loadForm();
            console.log(error);
          }
        } else {
          try {
            await this.api
              .put(
                this.MISAApi + "/" + this.state.EmployeeSelect.EmployeeId,
                this.employee
              )
              .then((response) => {
                response.data;
                this.msgError = this.MISAErrorService.GetErrorCode(response);
                this.loadForm(response);
                this.closeToast();
                this.textBtn = this.MISAResource.TextBtn.Close;
              })
              .catch((error) => {
                this.MsgValidate = this.MISAErrorService.GetErrorCode(
                  error.response
                );
                console.log(error);
                this.msgError = this.msgError.concat(this.MsgValidate);
                this.textBtn = this.MISAResource.TextBtn.Close;
                this.loadForm(error.response);
              });
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    //Hiển thị dialog
    showDialog() {
      try {
        this.msgError = [];
        this.isShowDlg = true;
        this.type = this.MISAResource.notice.info;
        this.binding = false;
        this.textBtn = "Có";
        this.msgError.push(this.MISAResource["VN"].HideDialogQuestion);
      } catch (error) {
        console.log(error);
      }
    },
    //hàm loadForm
    //cretedBy : NC Mạnh
    //CreatedAt : 5/12/2023
    loadForm(error) {
      // window.location.reload();
      try {
        this.msgToast = [];
        this.isShowDlg = true;
        let message =
          error.status === 201
            ? this.MISAResource.returnMessage.addComplete
            : this.MISAResource.returnMessage.updateComplete;
        if ((error.status === 201) | (error.status === 200)) {
          this.typeToast = this.MISAResource.notice.success;
          this.type = this.MISAResource.notice.success;
        } else {
          this.typeToast = this.MISAResource.notice.success;
          this.type = this.MISAResource.notice.warning;
          this.textBtn = this.MISAResource["VN"].Accept;
        }
        this.msgToast.push(message);
      } catch (error) {
        console.log(error);
      }
    },
    //hàm đóng form
    //cretedBy : NC Mạnh
    //CreatedAt : 5/12/2023
    closeForm() {
      this.dataChange = JSON.parse(JSON.stringify(this.EmployeeSelected));
      if (isEqual(this.dataChange, this.state.EmployeeSelect)) {
        this.$emit("hideForm");
        // Đối tượng có cùng giá trị
      } else {
        this.showDialog();
        // Đối tượng khác nhau
      }
    },
    // this.showForm = false;
    // setTimeout(() => this.$emit("hideForm"), 1000);
    //hàm đóng form
    //cretedBy : NC Mạnh
    //CreatedAt : 5/12/2023
    hideForm() {
      this.$emit("hideForm");
    },
    //hàm đóng form
    //cretedBy : NC Mạnh
    //CreatedAt : 20/12/2023
    closeToast() {
      // this.showToast=true
      try {
        this.isShowDlg = false;
        this.showToast = true;
        setTimeout(() => (this.showToast = false), 2000);
        this.$emit("loadData");
        setTimeout(() => this.hideForm(), 2000);
      } catch (error) {
        console.log(error);
      }
    },
    //Định dạng ngày sinh là dd/mm/yyyy
    showDate() {
      const selectedDate = new Date(this.state.EmployeeSelect.DateOfBirth);
      this.showDob = `${selectedDate.getDate()}/${
        selectedDate.getMonth() + 1
      }/${selectedDate.getFullYear()}`;
    },
    //Định gày cấp là dd/mm/yyyy
    showIdentityDate() {
      const selectedDate = new Date(this.state.EmployeeSelect.IdentityDate);
      this.identityDate = `${selectedDate.getDate()}/${
        selectedDate.getMonth() + 1
      }/${selectedDate.getFullYear()}`;
    },
  },
  computed: {},
  mounted() {
    // Focus vào input khi component được mounted
    this.$refs.focusText.$el.focus();
  },
  data() {
    return {
      binding: true,
      EmployeeSelect: {},
      isShowDlg: false,
      showToast: false,
      method: 0,
      title: " ",
      formattedValue: 0,
      type: "",
      employee: {},
      dataChange: {},
      msgError: [],
      msgToast: [],
      typeToast: "info",
      closeCss: false,
      MsgValidate: [],
      position: [],
      department: [],
      showForm: true,
      textBtn: "",
      showDob:"",
      identityDate:""
    };
  },
};
</script>

<style>
</style>