<template>
  <div class="dark--screen">
    <div class="form">
      <div class="form--content">
        <div class="form--title">
          <div class="form--title check-box">
            <h3>{{ this.MISAResource["VN"].EmployeeInformation }}</h3>
            <div>
              <label for="" id="object"><input type="checkbox" name="object" />Là khách hàng</label>
              <label for="" id="object"><input type="checkbox" name="object" />Là nhà cung cấp</label>
            </div>
          </div>
          <div class="form--title-icon">
          <div class="icon--question"></div>
          <div class="icon--close" data-c-tooltip="Đóng" tooltip-position ="left" @click="closeForm"></div>
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
                <m-combobox :dataApi="department" 
                propText="DepartmentName"
                propValue="DepartmentId"
                v-model="state.EmployeeSelect.DepartmentId"
                :hasError="v$.EmployeeSelect.DepartmentId.$error"
                ></m-combobox>
                <div
                  style="font-size: 12px; color: red"
                  v-if="v$.EmployeeSelect.DepartmentId.$error">
                  {{ v$.EmployeeSelect.DepartmentId.$errors[0].$message }}
              </div>
            </label>
            <label id="label" for="">{{ this.MISAResource["VN"].PositionName}}
              <m-combobox :dataApi="position" 
                propText="PositionName"
                propValue="PositionId"
                v-model="state.EmployeeSelect.PositionId"
                ></m-combobox>
            </label>
          </div>
          <div class="form__input--right">
            <div>
              <label id="label" for=""
                >{{ this.MISAResource["VN"].DateOfBirth }}
                <input type="date" id="selectedDate" />
              </label>
              <label id="label" for="">{{ this.MISAResource["VN"].Gender}}
                <div class="box__input--radio">
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.EmployeeSelect.Gender"
                      value= "0"
                    />{{ this.MISAResource["VN"].GenderName.Male }}</label
                  >
                  <label id="gender" for=""
                    ><input
                      name="gender"
                      type="radio"
                      v-model="state.EmployeeSelect.Gender"
                      value= "1"
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
            <div style="
                display: flex;
                width: 550px;
                justify-content: space-between;
              ">
              <label id="label" for="" data-c-tooltip="Số chứng minh thư nhân dân" tooltip-position ="left">Số CMTND
                <input type="text" id="idcard"   v-model="state.EmployeeSelect.IdentityNumber">
              </label>
              <label id="label" for="">{{ this.MISAResource["VN"].IdentityDate }}
                <input type="date"  v-model="state.EmployeeSelect.IdentityDate"/>
              </label>
            </div>
            <label id="label" for="">{{ this.MISAResource["VN"].IdentityPlace }}
              <input type="text" id="identity-place" v-model="state.EmployeeSelect.IdentityPlace"/>
            </label>
          </div>
        </div>
        <div class="form__input--under">
          <label id="label" for="">{{ this.MISAResource["VN"].Address }}
            <input type="text" v-model="state.EmployeeSelect.Address">
          </label>
        <div class="form--info">
          <label id="label" for="">{{ this.MISAResource["VN"].PhoneNumber }}
            <input type="text" v-model="state.EmployeeSelect.PhoneNumber"/>
          </label>
          <label id="label" for="">{{ this.MISAResource["VN"].Fax }}
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
          <label id="label" for="">{{ this.MISAResource["VN"].CreditNumber }}
            <input type="text" v-model="state.EmployeeSelect.CreditNumber"/>
          </label>
          <label id="label" for="">{{ this.MISAResource["VN"].BankName }}
            <input type="text" v-model="state.EmployeeSelect.BankName"/>
          </label>
          <label id="label" for="">{{ this.MISAResource["VN"].Address }}
            <input type="text" v-model="state.EmployeeSelect.BankAdress"/>
          </label>
        </div>
        </div>
        <div class="form--footer">
          <button class="button btn-second btn-cancel" @click="closeForm">{{ this.MISAResource["VN"].Cancel }}</button>
          <div>
            <button class="button btn-second btn-add btn-second " @click="addData">{{ this.MISAResource["VN"].Add }}</button>
            <button class="button btn-add btn-main" @click="addData">Cất và thêm</button>
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
        this.method = this.methodP;
        if(  this.methodP === this.MISAEnum.method.ADD){
          (this.title = this.MISAResource.NameMode.AddNew);
           this.state.EmployeeSelect.EmployeeCode = "NV-"+ (this.MaxCode + 1);
        }
        (this.title = this.MISAResource.NameMode.Change);
        this.GetDataCombobox();
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
                DepartmentId:"",
                Address:"",
                BankName:"",
                BankPlace:"",
                CreditNumber:"",
                PositionId:"",

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
                    DepartmentId: {
                        required: helpers.withMessage(MISAResource["VN"].DepartmentNotEmpty, required),
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
        async GetDataCombobox(){
          this.position =  await this.MISAApiService.GetDataName('Positions');
          this.department =  await this.MISAApiService.GetDataName('Departments');
        },
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
      //  async OnClickAddData(e) {
      //        if(e===null){
      //         await this.addData();
      //        }else{
      //         await this.addData();
      //         setTimeout(() => 
      //       this.$emit("some-event"),2000
      //       )
      //        }
      //   },
        //hàm thêm,thay đổi dữ liệu
        //cretedBy : NC Mạnh
        //CreatedAt : 5/12/2023
      async addData() {
                this.msgError = [];
                this.state.EmployeeSelect.Gender = parseInt(this.state.EmployeeSelect.Gender);
                this.Employee = Object.assign({}, this.state.EmployeeSelect);
                console.log(this.Employee)
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
            this.typeToast = this.MISAResource.notice.success;
            this.type = this.MISAResource.notice.success;
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
            setTimeout(() => 
            this.$emit("some-event"),
            this.showToast=false,2000
            )
            this.$emit('loadData');
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
            position:[],
            department:[]
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