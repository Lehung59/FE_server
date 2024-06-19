<template>
  <a-card style="width: 100%">
    <div class="row mb-3">
      <div class="col-12">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link :to="{ name: 'admin-requestdcdlabels' }">Yêu cầu cấp nhãn</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>Thêm mới</a-breadcrumb-item>
        </a-breadcrumb>
        <h1></h1>
      </div>
      <div class="col-12 col-sm-12 mb-3">
        <!-- @submit.prevent="createUsers()" -->
        <a-form class="p-3" name="custom-validation" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
          autocomplete="off" ref="formRef" :model="formState" :rules="rules" @finish="createUsers()">
          <div class="row">
            <div class="col-12 col-sm-9">
              <a-form-item ref="IdLine" label="Id Line" name="IdLine">
                <a-select v-model:value="formState.IdLine" show-search placeholder="Dây chuyền" style="width: 100%"
                  :options="users.optionsLine" :filter-option="filterOptionLine"></a-select>
                <small v-if="errors && errors.IdLine" class="text-danger">{{
              errors.IdLine[0]
            }}</small>
              </a-form-item>

              <a-form-item label="RequestDate" required name="RequestDate">
                <a-space direction="vertical" :size="12">
                  <a-date-picker v-model:value="formState.RequestDate" :style="{ 'width': 100 + '%' }"
                    valueFormat="YYYY-MM-DD" />
                </a-space>
                <small v-if="errors && errors.RequestDate" class="text-danger">{{
              errors.RequestDate[0]
            }}</small>
              </a-form-item>

              <a-form-item ref="TypeRequest" label="Type Request" name="TypeRequest">
                <a-select v-model:value="formState.TypeRequest" show-search placeholder="Type Request"
                  style="width: 100%" :options="users.optionsTypeRequest"
                  :filter-option="filterOptionTypeRequest"></a-select>
                <small v-if="errors && errors.TypeRequest" class="text-danger">{{
              errors.TypeRequest[0]
            }}</small>
              </a-form-item>

              <a-form-item label="ItemQuantity" required name="ItemQuantity">
                <a-input v-model:value="formState.ItemQuantity" />
                <small v-if="errors && errors.ItemQuantity" class="text-danger">{{ errors.ItemQuantity[0]
                  }}</small>
              </a-form-item>

              <a-form-item ref="RequestStatus" label="Request Status" name="RequestStatus">
                <a-select v-model:value="formState.RequestStatus" show-search placeholder="Request Status"
                  style="width: 100%" :options="users.optionsRequestStatus"
                  :filter-option="filterOptionRequestStatus"></a-select>
                <small v-if="errors && errors.RequestStatus" class="text-danger">{{
              errors.RequestStatus[0]
            }}</small>
              </a-form-item>

              <a-form-item name="Reason" label="Reason">
                <a-textarea v-model:value="formState.Reason" />
                <small v-if="errors && errors.Reason" class="text-danger">{{ errors.Reason[0]
                  }}</small>
              </a-form-item>
              <div class="col-12 col-sm-12">
                <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Thêm
                  dòng</a-button>
                <a-table bordered :data-source="dataSource" :columns="columns" :pagination="false">
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'ExpiredDate'">
                      <div class="editable-cell">
                        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                          <!-- <a-input-number v-model:value="editableData[record.key].ExpiredDate"
                            @pressEnter="save(record.key)" /> -->
                          <a-form-item label="ExpiredDate" required name="ExpiredDate">
                            <a-space direction="vertical" :size="12">
                              <a-date-picker v-model:value="editableData[record.key].ExpiredDate" :style="{ 'width': 100 + '%' }"
                                valueFormat="YYYY-MM-DD" @pressEnter="save(record.key)" />
                            </a-space>
                          </a-form-item>
                          <div><check-outlined class="editable-cell-icon-check" @click="save(record.key)" /></div>
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                          {{ text || ' ' }}
                          <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                        </div>
                      </div>
                    </template>

                    <template v-if="column.dataIndex === 'Quantity'">
                      <div class="editable-cell">
                        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                          <a-input-number v-model:value="editableData[record.key].Quantity"
                            @pressEnter="save(record.key)" />
                          <div><check-outlined class="editable-cell-icon-check" @click="save(record.key)" /></div>
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                          {{ text || ' ' }}
                          <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                        </div>
                      </div>
                    </template>

                    <template v-if="column.dataIndex === 'MeasuringToolId'">
                      <div class="editable-cell">
                        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                          <a-input-number v-model:value="editableData[record.key].MeasuringToolId" :disabled="true"
                            @pressEnter="save(record.key)" />
                          <a-select v-model:value="editableData[record.key].MeasuringToolId" :size="size"
                            style="width: 200px" :options="users.optionsMeasuringToolId"
                            :filter-option="filterOptionMeasuringToolId"
                            @change="handleChange($event, record.key)"></a-select>
                          <div><check-outlined class="editable-cell-icon-check" @click="save(record.key)" /></div>
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                          <template v-for="itemOpt in users.optionsMeasuringToolId">
                            <span v-if="itemOpt.value == text">
                              {{ itemOpt.label }}
                            </span>
                            <span v-else></span>
                          </template>
                          <!-- {{ text || ' ' }} -->
                          <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                        </div>
                      </div>
                    </template>

                    <template v-else-if="column.dataIndex === 'operation'">
                      <a-popconfirm v-if="dataSource.length" title="Bạn muốn xóa dòng?" @confirm="onDelete(record.key)">
                        <a>Xóa</a>
                      </a-popconfirm>
                    </template>
                  </template>
                </a-table>

              </div><!-- /col -->
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }"
                v-if="authStoreClaim['admin.requestdcdlabels.create'] === '1'">
                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                  <router-link :to="{ name: 'admin-requestdcdlabels' }">
                    <span>Quay lại</span>
                  </router-link>
                </a-button>
                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0 bg-info text-light" @click="resetForm">Reset</a-button>
                <a-button type="primary" html-type="submit" class="bg-success">Lưu</a-button>
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </a-card>
</template>

<script>
import { onMounted, defineComponent, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue';
import { DeleteOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es/lodash.js';
import { useMenu } from "../../stores/use-menu.js";
import { useAuthStore } from "../../stores/auth.store.js";
//
import ApiViewData from "../../api/ApiViewData.js";
import ApiRequestDcdLabel from '../../api/ApiRequestDcdLabel.js';
export default defineComponent({
  components: {
    DeleteOutlined,
    CheckOutlined,
    EditOutlined
  },
  setup() {
    useMenu().onSelectedKeys(["admin-requestdcdlabels"]);
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const apiPrefix = import.meta.env.VITE_API_PREFIX;
    const router = useRouter();
    const users = reactive({
      optionsLine: [],
      optionsTypeRequest: [],
      optionsRequestStatus: [],
      optionsMeasuringToolId: [],
    });
    const errors = ref({});
    const formRef = ref();
    const formState = reactive({
      IdLine: '9',
      LineName: '',
      RequestDate: '',
      TypeRequest: 5,
      ItemQuantity: 5,
      RequestStatus: 5,
      Reason: '',
      CreatedBy: 'init',
      UpdatedBy: 'init',
      ItemData: [],
    });
    const rules = {
      // ShortKeyItem: [
      //   {
      //     required: true,
      //     message: 'Short Key không để trống.',
      //     trigger: 'change',
      //   }
      // ],
      // ItemName: [
      //   {
      //     required: true,
      //     message: 'Tên hạng mục không để trống.',
      //     trigger: 'change',
      //   }
      // ]
    };
    /**
         * cau hinh table
         * **/
    const columns = [{
      title: 'ExpiredDate',
      dataIndex: 'ExpiredDate',
      // width: '30%',
    }, {
      title: 'Quantity',
      dataIndex: 'Quantity',
    }, {
      title: 'MeasuringToolId',
      dataIndex: 'MeasuringToolId',
    }, {
      title: 'Tác vụ',
      dataIndex: 'operation',
    }];
    const dataSource = ref([]);
    // const count = computed(() => dataSource.value.length + 1);
    const editableData = reactive({});
    const edit = key => {
      // lay du lieu tu datasource voi key tuong ung
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };
    const save = key => {
      Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    };
    const onDelete = key => {
      dataSource.value = dataSource.value.filter(item => item.key !== key);
    };
    let countR = 0;
    const handleAdd = () => {
      countR++;
      const newData = {
        key: `${countR}`,
        ExpiredDate: ``,
        Quantity: `0`,
        MeasuringToolId: `1`
      };
      dataSource.value.push(newData);
    };
    const handleChange = (value, key) => {
      console.log(`selected ${value}, ${key}`);

    };
    /**
     * end cau hinh table
     * **/
    const resetForm = () => {
      formRef.value.resetFields();
    };
    /**
     * view data
     * **/
    // MeasuringToolId
    const getOptionsMeasuringToolId = () => {
      ApiViewData.GetOptionsMeasuringTool()
        .then((response) => {
          users.optionsMeasuringToolId = response.data;
          formState.MeasuringToolId = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionMeasuringToolId = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    // ID Line
    const getOptionsLine = () => {
      ApiViewData.GetOptionsLine()
        .then((response) => {
          users.optionsLine = response.data;
          formState.IdLine = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionLine = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    // Type Request
    const getOptionsTypeRequest = () => {
      ApiViewData.GetOptionsTypeRequest()
        .then((response) => {
          users.optionsTypeRequest = response.data;
          formState.TypeRequest = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionTypeRequest = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    // RequestStatus
    const getOptionsRequestStatus = () => {
      ApiViewData.GetOptionsRequestStatus()
        .then((response) => {
          users.optionsRequestStatus = response.data;
          formState.RequestStatus = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionRequestStatus = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    // error
    const createUsers = () => {
      formState.ItemData = dataSource;
      console.log('form state:', formState);
      //
      ApiRequestDcdLabel.CreateItem(formState).then((response) => {
        if (response.status == 200) {
          message.success("Tạo mới thành công!");
          router.push({ name: "admin-requestdcdlabels" });
        } else {
          message.error('Lỗi! Thực hiện tác vụ không thành công.');
        }
      }).catch((error) => {
        message.error(error.message);
        if (error.response.data.hasOwnProperty('errors')) {
          errors.value = error.response.data.errors;
        } else {
          errors.value = error.response.data;
        }
      });
    }
    onMounted(() => {
      resetForm();
      getOptionsLine();
      getOptionsTypeRequest();
      getOptionsRequestStatus();
      getOptionsMeasuringToolId();
      handleChange();
    })
    //
    return {
      ...toRefs(users),
      authStoreClaim,
      errors,
      formState,
      formRef,
      rules,
      resetForm,
      // view data
      filterOptionLine,
      getOptionsTypeRequest,
      getOptionsRequestStatus,
      getOptionsMeasuringToolId,
      //
      users,
      createUsers,
      // cau hinh table
      columns,
      onDelete,
      handleAdd,
      handleChange,
      dataSource,
      editableData,
      countR,
      edit,
      save,
    };
  },
});
</script>