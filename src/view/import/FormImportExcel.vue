<template>
  <div class="dark--screen">
    <div
      class="form-excel"
      :class="{
        'close-form': showForm === false,
        'show-form': showForm === true,
      }"
    >
      <div class="form-header">
        <h3>{{ this.MISAResource["VN"].Import.Step }}{{ header }}</h3>
      </div>
      <div class="form-excel-content">
        <div class="form-sidebar">
          <div>
            <ul class="menu-import">
              <li
                v-for="(menu, index) in sidebar"
                :key="index"
                @click="ChangeContent(menu)"
                :class="{ 'menu-active': isShow === menu.value }"
              >
                {{ menu.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="form-table">
          <div class="form-excel-title" v-show="isShow === 0">
            <div class="title">
              {{ this.MISAResource["VN"].Import.ChoseFileImport }}
            </div>
            <div class="input-file">
              <input type="text" v-model="excelName" id="filename" />
              <button
                class="button btn-second btn-add btn-second"
                @click="ImportFileClick"
              >
                Chọn
              </button>
              <input type="file" ref="fileInput" @change="handleFileChange" />
            </div>
            <div class="text">
              {{ this.MISAResource["VN"].Import.DownLoadEmptyFile }}
            </div>
          </div>
          <div class="scroll__table-excel" v-show="isShow === 1">
            <div class="import-count">
              <strong
                >{{ valid }}/{{ length
                }}{{ this.MISAResource["VN"].Import.RowValid }}</strong
              >
              <span></span>
              <strong
                >{{ notValid }}/{{ length }}
                {{ this.MISAResource["VN"].Import.RowNotValid }}</strong
              >
            </div>
            <table id="table--excel">
              <thead>
                <tr>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.EmployeeCode }}
                  </th>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.EmployeeName }}
                  </th>
                  <th>{{ this.MISAResource["VN"].TableColumn.Gender }}</th>
                  <th>{{ this.MISAResource["VN"].TableColumn.DateOfBirth }}</th>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.CreditNumber }}
                  </th>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.PositionName }}
                  </th>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.DepartmentName }}
                  </th>
                  <th>
                    {{ this.MISAResource["VN"].TableColumn.CreditNumber }}
                  </th>
                  <th>{{ this.MISAResource["VN"].TableColumn.BankName }}</th>
                  <th>{{ this.MISAResource["VN"].TableColumn.BankAddress }}</th>
                  <th>{{ this.MISAResource["VN"].TableColumn.Status }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style="position: relative"
                  v-for="(item, index) in employees"
                  :key="index"
                >
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
                  <td class="txt-left"></td>
                  <td class="txt-left"></td>
                  <td class="txt-right">
                    {{ item.CreditNumber }}
                  </td>
                  <td class="txt-left">{{ item.BankName }}</td>
                  <td class="txt-left">
                    {{ item.BankAdress }}
                  </td>
                  <td>
                    <div
                      v-for="(error, index) in item.DTOImportErrors"
                      :key="index"
                    >
                      <p class="excel-text-error">
                        {{ error }}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </div>
          <div class="form-excel-result" v-show="isShow === 2">
            <div class="title">
              <h2>{{ this.MISAResource["VN"].Import.ImportResult }}</h2>
            </div>
            <div>
              <h4>{{ this.MISAResource["VN"].Import.DownLoadHere }}</h4>
            </div>
            <div class="text">
              <div>
                + {{ this.MISAResource["VN"].Import.RowImportValid }}<span>:</span>  <span></span> {{ valid }}
              </div>
              <div>
                +{{ this.MISAResource["VN"].Import.RowImportNotValid}}<span>:</span><span></span>{{ notValid }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form--footer">
        <button class="button btn-second btn-cancel">
          <div class="icon--info"></div>
          <div>{{ this.MISAResource["VN"].Help }}</div>
        </button>
        <div>
          <button
            class="button btn-add"
            v-bind:disabled="isShow === 0"
            v-show="isShow < 2"
            @click="onClickPreviousStep"
          >
          <div class="icon--previous-step"></div>
          <div>  {{ this.MISAResource["VN"].Previous }}</div>
          </button>
          <button
            class="button btn-add"
            v-show="isShow < 2"
            @click="onClickNextStep"
          >
           <div>{{ this.MISAResource["VN"].Next }}</div>
            <div class="icon--continue"></div>
          </button>
          <button class="button btn-add" @click="CloseForm">
             <div><i class="fas fa-ban"></i></div>
             <div>{{ this.MISAResource["VN"].CancelBtn }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <m-loader v-if="loader"></m-loader>
</template>
  <script>
export default {
  props: [],
  created() {},

  methods: {
    //Mở màn hình chọn tệp
    ImportFileClick() {
      this.$refs.fileInput.click();
    }, 
    //Chọn tệp
    handleFileChange() {
      this.loader = true;
      this.selectedFile = this.$refs.fileInput.files[0];
      this.excelName = this.selectedFile.name;
      setTimeout(() => this.handleFile(), 2000);
    },
    //Hàm lấy về tệp  dữ liệu
    //CreatedBy NCMANH(24/1/2024)
    async handleFile() {
      try {
        this.employees = await this.MISAApiService.uploadFile(
          this.selectedFile
        );
        this.valid = 0;
        this.notValid=0;
        this.length = this.employees.length;
        this.employees.reduce((acc, x) => {
          console.log(acc);
          if (x.DTOImportErrors.length < 1) {
            this.valid++;
          } else {
            this.notValid++;
          }
        }, {});
        this.loader = false;
        this.$emit("loadData");
      } catch (e) {
        console.log(e);
      }
    },
    //Hàm chạy đến bước tiếp theo
    //CreatedBy NCMANH(24/1/2024)
    onClickNextStep() {
      if (this.isShow < 2) {
        this.isShow += 1;
        let obj = this.sidebar.filter((x) => x.value === this.isShow);
        this.header = obj[0].name;
      }
    },
    //Hàm chạy đến bước trước đó
    //CreatedBy NCMANH(24/1/2024)
    onClickPreviousStep() {
      if (this.isShow > 0) {
        this.isShow -= 1;
        let obj = this.sidebar.filter((x) => x.value === this.isShow);
        this.header = obj[0].name;
      }
    },
    //Thay đổi nội dung tiêu đề
    //CreatedBy NCMANH(24/1/2024)
    ChangeContent(menu) {
    try {
      this.isShow = menu.value;
      this.header = menu.name;
    } catch (error) {
      console.log(error);
    }
    },
     //Đóng formExcel
    //CreatedBy NCMANH(24/1/2024)
    CloseForm() {
      this.$emit("closeFormExcel");
    },
  },
  mounted() {},
  data() {
    return {
      sidebar: [
        {
          name: "1.Chọn tệp nguồn",
          value: 0,
        },
        {
          name: "2.Kiểm tra dữ liệu",
          value: 1,
        },
        {
          name: "3.Kết quả nhập khẩu",
          value: 2,
        },
      ],
      employees: [],
      excelName: "",
      valid: 0,
      notValid: 0,
      length: 0,
      isShow: 0,
      loader: false,
      header: "1.Chọn tệp nguồn",
    };
  },
};
</script>
  
  <style>

</style>


    
    