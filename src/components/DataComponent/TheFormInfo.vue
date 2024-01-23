<template>
  <div class="dark--screen">
    <div class="form">
      <div class="form--content">
        <div class="form--title">
          <div style="display: flex;">
            <h3>{{ this.MISAResource["VN"].EmployeeInformation }}</h3>
            <label for=""><input type="checkbox" />Là khách hàng</label>
            <label for=""><input type="checkbox" />Là nhà cung cấp</label>
          </div>
          <div class="form--title-icon">
          <div class="icon--question"></div>
          <div class="icon--close" @click="closeForm"></div>
         </div>
        </div>
        <div class="form--input">
          <div class="form__input--left">
            <div style="display: flex; justify-content: space-between">
              <label id="label" for="">{{ this.MISAResource["VN"].EmployeeCode }} <span class="text--required">*</span>
                <MInput
                 v-model="state.EmployeeSelect.EmployeeCode"
                  input-id="empcode"
                 :hasError="v$.EmployeeSelect.EmployeeCode.$error"
                 ref="focusText"
                 ></MInput>
                 <div
                  style="font-size: 12px; color: red"
                  v-if="v$.EmployeeSelect.EmployeeCode.$error">
                  {{ v$.EmployeeSelect.EmployeeCode.$errors[0].$message }}
                </div>
              </label>
              <label id="label" for="">{{ this.MISAResource["VN"].FullName }}<span class="text--required">*</span>
                <MInput
                 v-model="state.EmployeeSelect.FullName"
                 :hasError="v$.EmployeeSelect.FullName.$error"
                 input-id="name"
                 ></MInput>
                 <div
                  style="font-size: 12px; color: red"
                  v-if="v$.EmployeeSelect.FullName.$error">
                  {{ v$.EmployeeSelect.FullName.$errors[0].$message }}
              </div>
              </label>
            </div>
            <label id="label" for="">Đơn vị<span class="text--required">*</span>
              <input type="text" value="Phòng nhân sự"/>
            </label>
            <label id="label" for="">Chức danh
              <input type="text" value="Fresher"/>
            </label>
          </div>
          <div class="form__input--right">
            <div>
              <label id="label" for=""
                >{{ this.MISAResource["VN"].DateOfBirth }}
                <input type="date" id="selectedDate" />
              </label>
              <label id="label" for="">Giới tính
                <div class="box__input--radio">
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.EmployeeSelect.Gender"
                      value="0"
                    />{{ this.MISAResource["VN"].Gender.Male }}</label
                  >
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.EmployeeSelect.Gender"
                      value="1"
                    />{{ this.MISAResource["VN"].Gender.Female }}</label
                  >
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.EmployeeSelect.Gender"
                      value="2"
                    />{{ this.MISAResource["VN"].Gender.Other }}</label
                  >
                </div>
              </label>
            </div>
            <div style="
                display: flex;
                width: 550px;
                justify-content: space-between;
              ">
              <label id="label" for="">Số CMTND
                <input type="text" id="idcard" value="033201000203"/>
              </label>
              <label id="label" for="">Ngày cấp
                <input type="date" />
              </label>
            </div>
            <label id="label" for="">Nơi cấp
              <input type="text" id="identity-place" value="Hưng Yên" />
            </label>
          </div>
        </div>
        <div class="form__input--under">
          <label id="label" for="">Địa chỉ 
            <input type="text" value="Song Mai Kim Động"/>
          </label>
        <div class="form--info">
          <label id="label" for="">ĐT di động
            <input type="text" value="0566211950"/>
          </label>
          <label id="label" for="">ĐT cố định
            <input type="text" value="(077) 123-4567"/>
          </label>
          <label id="label" for="">Email
            <MInput
                 v-model="state.EmployeeSelect.Email"
                 :hasError="v$.EmployeeSelect.Email.$error"
                 input-id="email"
                 ></MInput>
              <span
                style="font-size: 12px; color: red"
                v-if="v$.EmployeeSelect.Email.$error">
                {{ v$.EmployeeSelect.Email.$errors[0].$message }}
              </span>
          </label>
          <label id="label" for="">Tài khoản ngân hàng
            <input type="text" value="121313131"/>
          </label>
          <label id="label" for="">Tên ngân hàng
            <input type="text" value="Ngân hàng ACB"/>
          </label>
          <label id="label" for="">Chi nhánh
            <input type="text" value="Chi nhánh 10"/>
          </label>
        </div>
        </div>
        <div class="form--footer">
          <button class="button btn-second btn-cancel" @click="closeForm">{{ this.MISAResource["VN"].Cancel }}</button>
          <div>
            <button class="button btn-second btn-add " @click="addData">{{ this.MISAResource["VN"].Add }}</button>
            <button class="button btn-add btn-main">Cất và thêm</button>
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
    >
    </the-dialog>
    <MToast :text="content" :msgToast="msgToast" :icon="typeToast"  v-if="showToast"> </MToast>
</template>
<script>
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  maxLength,
  numeric,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed,  } from "vue";
import MISAResource from "../../js/helper/resource";

export default {
    props: ["EmployeeSelected", "methodP","MaxCode"],
    created() {
        this.state.EmployeeSelect = this.EmployeeSelected;
        console.log(this.state.EmployeeSelect);
        this.method = this.methodP;
        if(  this.methodP === this.MISAEnum.method.ADD){
          (this.title = this.MISAResource.NameMode.AddNew);
           this.state.EmployeeSelect.EmployeeCode = "NV-"+ (this.MaxCode + 1);
        }
        (this.title = this.MISAResource.NameMode.Change);
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
                DateOfBirth:"",
            },
        });
        //validate
        const rules = computed(() => {
            return {
                EmployeeSelect: {
                  EmployeeCode: {
                        required: helpers.withMessage(MISAResource["VN"].EmployeeNotEmpty, required),
                        // minLength: minLength(6),
                    },
                    Email: {
                        // required: helpers.withMessage(MISAResource["VN"].EmailNotEmpty, required),
                        email: helpers.withMessage(MISAResource["VN"].EmailNotValid, email),
                    },
                    FullName: {
                        required: helpers.withMessage(MISAResource["VN"].FullNameNotEmpty, required),
                        // minLength: minLength(10),
                    },
                    PhoneNumber: {
                        // required: helpers.withMessage(MISAResource["VN"].PhoneIsNotEmpty, required),
                        numeric: helpers.withMessage(MISAResource["VN"].PhoneIsNumeric, numeric),
                        minLength: helpers.withMessage(MISAResource["VN"].PhoneIsValid, minLength(10)),
                        maxLength: helpers.withMessage(MISAResource["VN"].PhoneIsValid, maxLength(10)),
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
        showDlg() {
            this.type =
                this.methodP === this.MISAEnum.method.ADD
                    ? this.MISAResource.notice.information
                    : this.MISAResource.notice.question;
            this.isShowDlg = true;
        },
        hideDlg() {
            this.isShowDlg = false;
        },
        //hàm thêm,thay đổi dữ liệu
        //cretedBy : NC Mạnh
        //CreatedAt : 5/12/2023
      async addData() {
                this.msgError = [];
                this.Employee = Object.assign({}, this.state.EmployeeSelect);
                if (this.method === this.MISAEnum.method.ADD) {
                    try {
                       await this.api
                            .post(this.MISAApi, this.Employee)
                            .then((response) => {
                            response.data;
                            console.log(this.Employee)
                            this.msgError = this.MISAErrorService.GetErrorCode(response);
                            this.loadForm(response);
                            this.closeToast();
                            this.$emit('loadData');
                        })
                            .catch((error) => {
                            this.v$.$validate();
                            this.v$.$errors.forEach(x=> this.msgError.push(x.$message));
                            if(this.msgError.length < 1 ){
                              this.MsgValidate = this.MISAErrorService.GetErrorCode(error.response);
                              this.msgError =  this.msgError.concat(this.MsgValidate);
                            }
                            this.loadForm(error.response);
                        });
                    }
                    catch (error) {
                      this.MISAErrorService.GetErrorCode(error);
                      this.loadForm();
                      
                    }
                }
                else {
                    try {
                      await this.api
                            .put(this.MISAApi + '/'+
                            this.state.EmployeeSelect.EmployeeId, this.Employee)
                            .then((response) => {
                            response.data;
                            this.msgError = this.MISAErrorService.GetErrorCode(response);
                            this.v$.$validate();
                            this.loadForm(response);
                            this.closeToast();
                        }).catch((e) => {
                          this.v$.$validate();
                            this.v$.$errors.forEach(x=> this.msgError.push(x.$message));
                            if(this.msgError.length < 1 ){
                              this.MsgValidate = this.MISAErrorService.GetErrorCode(e.response);
                              this.msgError =  this.msgError.concat(this.MsgValidate);
                            }
                            this.loadForm(e.response);
                        });
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
        },
        //hàm loadForm
        //cretedBy : NC Mạnh
        //CreatedAt : 5/12/2023
        loadForm(error) {
            // window.location.reload();
            this.msgToast = []
            this.isShowDlg = true;
            let message = error.status === 201?
             this.MISAResource.returnMessage.addComplete:
             this.MISAResource.returnMessage.updateComplete;
            if(error.status===201|error.status===200){
            this.typeToast = this.MISAResource.notice.information;
            this.type = this.MISAResource.notice.information;
            }
           else{
            this.typeToast = this.MISAResource.notice.warning;
             this.type = this.MISAResource.notice.warning;
          }
          this.msgToast.push(message);
        },
        //hàm đóng form
        //cretedBy : NC Mạnh
        //CreatedAt : 5/12/2023
        closeForm(){
          this.$emit("some-event")
        },
        //hàm đóng form
        //cretedBy : NC Mạnh
        //CreatedAt : 20/12/2023
        closeToast() {// this.showToast=true
            this.isShowDlg = false;
            this.showToast=true;
            this.$emit("loadData");
            setTimeout(() => 
            this.$emit("some-event"),2000
            )
            setTimeout(() => 
            this.showToast=false,2000
            )
        },
    },
   mounted(){

   },
    data() {
        return {
            EmployeeSelect: {},
            isShowDlg: false,
            showToast: false,
            method: 0,
            title: " ",
            formattedValue: 0,
            type: "",
            Employee: {},
            msgError: [],
            msgToast: [],
            typeToast :"info",
            closeCss : false,
            MsgValidate:[],
        };
    },
};
</script>

<style>
.close-form{
  /* animation:  hide 4s ; */
  /* position: absolute;
  top: -150%; */
}

@keyframes hide{
    0% {
      transform: Rotate(120deg);
    }
    25% {
        transform: Rotate(240deg);
    }
    25% {
        transform: Rotate(360deg);
    }
    50% {
        transform: translateY(-110%);
    }
}

.border-error {
  border: 1px solid red !important;
}
</style>