<template>
  <div class="form-excel-title">
    <div class="title"></div>
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
    <div class="text"></div>
  </div>
  <div v-show="valid>0">
    <strong>{{ valid }}/{{ length }} Dòng hợp lệ</strong> <span></span> <strong>{{ notValid }}/{{ length }} Dòng không hợp lệ</strong>
  </div>
  <div class="scroll__table-excel">
    <table id="table--excel">
      <thead>
        <tr>
          <th>MÃ NHÂN VIÊN</th>
          <th>TÊN NHÂN VIÊN</th>
          <th>GIỚI TÍNH</th>
          <th>NGÀY SINH</th>
          <th>SỐ TÀI KHOẢN</th>
          <th>CHỨC DANH</th>
          <th>TÊN ĐƠN VỊ</th>
          <th>SỐ TÀI KHOẢN</th>
          <th>TÊN NGÂN HÀNG</th>
          <th>CHI NHÁNH TK NGÂN HÀNG</th>
          <th>TÌNH TRẠNG</th>
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
          <td class="txt-left">
            <div v-for="(department, index) in department" :key="index">
              <span v-if="department.DepartmentId === item.DepartmentId">
                {{ department.DepartmentName }}
              </span>
            </div>
          </td>

          <td class="txt-left">
            <div v-for="(position, index) in position" :key="index">
              <div v-if="position.PositionId === item.PositionId">
                {{ position.PositionName }}
              </div>
            </div>
          </td>
          <td class="txt-right">
            {{ item.CreditNumber }}
          </td>
          <td class="txt-left">{{ item.BankName }}</td>
          <td class="txt-left">
            {{ item.BankAdress }}
          </td>
          <td v-for="(error, index) in item.DTOImportErrors" :key="index">
            <p class="excel-text-error">
              {{ error }}
            </p>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr></tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  name: "the-choosefile",
  methods: {
    //Hiển thị màn hình chọn tệp
    ImportFileClick() {
      this.$refs.fileInput.click();
    }, //Hàm lấy về tệp  dữ liệu
    //CreatedBy NCMANH(24/1/2024)
    async handleFileChange() {
      //   this.loader = true;
      this.selectedFile = this.$refs.fileInput.files[0];
      this.excelName = this.selectedFile.name;
      console.log(this.selectedFile);
      this.employees = await this.MISAApiService.uploadFile(this.selectedFile);
      this.length = this.employees.length;
      this.employees.reduce((acc, x) => {
        console.log(acc);
        if (x.DTOImportErrors.length < 1) {
          this.valid++;
        } else {
            this.notValid++;
        }
        }, {});
      //   this.loader = false;
    },
  },
  data() {
    return {
      employees: [],
      excelName: "",
      valid: 0,
      notValid: 0,
      length: 0,

    };
  },
};
</script>