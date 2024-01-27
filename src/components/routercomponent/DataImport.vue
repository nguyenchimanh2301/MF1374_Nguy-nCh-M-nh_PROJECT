<template>
        <div class="data-excel" >
        <div class="scroll__table-excel" >
            <table id="table--excel">
              <thead>
                <tr>
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
                  @dblclick="showData(orderedUsers[selectedRowIndex])"
                  :class="{ 'highlighted-row': index === selectedRowIndex }"
                  @click="Select(index)"
                  tabindex="0"
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
                  <td class="txt-left"  >
                    <div v-for="(department, index) in department" :key="index" >
                      <span v-if="department.DepartmentId===item.DepartmentId"> 
                        {{ department.DepartmentName }}
                      </span>
                    </div>
                  </td>
                
                  <td class="txt-left"  >
                    <div v-for="(position, index) in position" :key="index">
                      <div v-if="position.PositionId===item.PositionId">
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
    </div>
</template>

<script>
export default{
    name: "data-import"
} 
</script>