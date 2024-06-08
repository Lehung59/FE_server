<template>
  <div class="row mb-3">
    <div class="col-12">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{ name: 'admin-measurementresultdatas' }">Dụng cụ đo</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>Sửa</a-breadcrumb-item>
      </a-breadcrumb>
      <h1></h1>
    </div>
    <div class="col-12 col-sm-12">
      <a-form class="p-3" name="custom-validation" ref="formRef" :model="formState" v-bind="layout"
        @finish="editMeasuringTool()">
        <a-form-item ref="idLine" label="Id Line" name="idLine">
          <a-select v-model:value="formState.idLine" show-search placeholder="Dây chuyền" style="width: 100%"
            :options="users.optionsLine" :filter-option="filterOptionLine"></a-select>
          <small v-if="errors && errors.idLine" class="text-danger">{{
            errors.idLine[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="manageCode" label="Code QL" name="manageCode">
          <a-input v-model:value="formState.manageCode" />
          <small v-if="errors && errors.ManageCode" class="text-danger">{{
            errors.ManageCode[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="toolName" label="Tên DCĐ" name="toolName">
          <a-input v-model:value="formState.toolName" />
          <small v-if="errors && errors.ToolName" class="text-danger">{{
            errors.ToolName[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="serialNumber" label="Serial No" name="serialNumber">
          <a-input v-model:value="formState.serialNumber" />
          <small v-if="errors && errors.SerialNumber" class="text-danger">{{
            errors.SerialNumber[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="maker" label="Maker" name="maker">
          <a-input v-model:value="formState.maker" />
          <small v-if="errors && errors.Maker" class="text-danger">{{
            errors.Maker[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="measuringRange" label="Dải đo" name="measuringRange">
          <a-input v-model:value="formState.measuringRange" />
          <small v-if="errors && errors.MeasuringRange" class="text-danger">{{
            errors.MeasuringRange[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="resolution" label="Độ phân giải" name="resolution">
          <a-input v-model:value="formState.resolution" />
          <small v-if="errors && errors.Resolution" class="text-danger">{{
            errors.Resolution[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="typeFrequency" label="Loại tần suất" name="typeFrequency">
          <a-select v-model:value="formState.typeFrequency" show-search placeholder="Loại tần suất" style="width: 100%"
            :options="users.optionsTypeFrequency" :filter-option="filterOptionTypeFrequency"></a-select>
          <small v-if="errors && errors.typeFrequency" class="text-danger">{{
            errors.typeFrequency[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="frequencyValue" label="Giá trị tần suất" name="frequencyValue">
          <a-input v-model:value="formState.frequencyValue" />
          <small v-if="errors && errors.frequencyValue" class="text-danger">{{
            errors.frequencyValue[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="useDate" label="Use Date" name="useDate">
          <a-space direction="vertical" :size="12">
            <a-date-picker v-model:value="formState.useDate" :style="{ width: 100 + '%' }" valueFormat="YYYY-MM-DD" />
          </a-space>
          <small v-if="errors && errors.UseDate" class="text-danger">{{
            errors.UseDate[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="managementCategory" label="Hạng mục QL" name="managementCategory">
          <a-select v-model:value="formState.managementCategory" show-search placeholder="Hạng mục QL"
            style="width: 100%" :options="users.optionsManagementCategory"
            :filter-option="filterOptionManageCategory"></a-select>
          <small v-if="errors && errors.managementCategory" class="text-danger">{{ errors.managementCategory[0]
            }}</small>
        </a-form-item>
        <!-- ------------------- -->
        <a-form-item ref="purpose" label="Mục đích" name="purpose">
          <a-input v-model:value="formState.purpose" />
          <small v-if="errors && errors.Purpose" class="text-danger">{{
            errors.Purpose[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="usageStatus" label="Trạng thái SD" name="usageStatus">
          <a-select v-model:value="formState.usageStatus" show-search placeholder="Chọn trạng thái SD"
            max-tag-count="responsive" style="width: 100%" :options="users.optionUsageStatus"
            :filter-option="filterOptionUsageStatus"></a-select>
          <small v-if="errors && errors.UsageStatus" class="text-danger">{{
            errors.UsageStatus[0]
          }}</small>
        </a-form-item>
        <a-form-item ref="sensorInfor" label="Thông tin cảm biến" name="sensorInfor">
          <a-input v-model:value="formState.sensorInfor" />
          <small v-if="errors && errors.SensorInfor" class="text-danger">{{
            errors.SensorInfor[0]
          }}</small>
        </a-form-item>

        <a-form-item ref="measurementItem" label="Hạng mục đo" name="measurementItem">
          <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
          <a-table bordered :data-source="dataSource" :columns="columns" :pagination="false">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'measuringItemId'">
                <div v-if="editableData[record.key]"  class="editable-cell">
                  <!-- <a-input-number v-model:value="editableData[record.key].measuringItemId" :disabled="true"
                            @pressEnter="save(record.key)" /> -->
                  <a-select v-model:value="editableData[record.key].measuringItemId" show-search placeholder="Hạng mục đo" style="margin: -5px 0; width: 100%"
                    :options="users.optionsMeasurementItem" :filter-option="filterOptionsMeasurementItem"
                    @change="saveByMultipleInput($event, record.key)" @click="edit(record.key)"></a-select>
                    <!-- <div><check-outlined class="editable-cell-icon-check" @click="save(record.key)" /></div> -->
                </div>
                <div v-else class="editable-cell-text-wrapper">
                          <template v-for="itemOpt in users.optionsMeasurementItem">
                            <span v-if="itemOpt.value == text">
                              {{ itemOpt.label }}
                            </span>
                            <span v-else></span>
                          </template>
                          <!-- {{ text || ' ' }} -->
                          <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                        </div>
              </template>

              <template v-if="column.dataIndex === 'minValue'">
                <div class="editable-cell">
                  <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                    <a-input v-model:value="editableData[record.key].minValue" @pressEnter="save(record.key)" />
                    <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
                  </div>
                  <div v-else class="editable-cell-text-wrapper">
                    {{ text || " " }}
                    <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                  </div>
                </div>
              </template>

              <template v-if="column.dataIndex === 'maxValue'">
                <div class="editable-cell">
                  <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                    <a-input v-model:value="editableData[record.key].maxValue" @pressEnter="save(record.key)" />
                    <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
                  </div>
                  <div v-else class="editable-cell-text-wrapper">
                    {{ text || " " }}
                    <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                  </div>
                </div>
              </template>

              <template v-else-if="column.dataIndex === 'operation'">
                <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
                  <a><i class="fa-solid fa-trash-can"></i></a>
                </a-popconfirm>
              </template>
            </template>
          </a-table>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }" >
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
            <router-link :to="{ name: 'admin-measuringtools' }">
              <span>Quay lại</span>
            </router-link>
          </a-button>
          <a-button class="me-0 me-sm-2 mb-3 mb-sm-0 bg-info text-light" @click="resetForm">Reset</a-button>
          <a-button type="primary" html-type="submit" class="bg-success">Lưu</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  defineComponent,
  ref,
  reactive,
  toRefs,
} from "vue";
import { cloneDeep } from "lodash-es";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import {
  DeleteOutlined,
  CheckOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { useMenu } from "../../stores/use-menu.js";
import ApiViewData from "../../api/ApiViewData.js";
import BaseCommon from "../../api/BaseCommon.js";
import ApiMeasuringTool from "../../api/ApiMeasuringTool.js";
import { useAuthStore } from "../../stores/auth.store.js";
export default defineComponent({
  components: {
    DeleteOutlined,
    CheckOutlined,
    EditOutlined,
    CloseOutlined,
  },
  setup() {
    useMenu().onSelectedKeys(["admin-measuringtools"]);
    const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
    const router = useRouter();
    const users = reactive({
      optionsLevelManage: [],
      optionsRole: [],
      optionsStatus: [],
      optionUsageStatus: [],
      optionsLine: [],
      optionsManagementCategory: [],
      optionsMeasurementItem: [],
      optionsTypeFrequency: [],
      lastKeyTableRef: '0'
    });

    //
    const columns = [
      {
        title: "Hạng mục đo",
        // dataIndex: "MeasuringItem",
        dataIndex: "measuringItemId",
      },
      {
        title: "Min",
        dataIndex: "minValue",
        align: "center",
      },
      {
        title: "Max",
        dataIndex: "maxValue",
        align: "center",
      },
      {
        title: "Action",
        dataIndex: "operation",
        align: "center",
      },
    ];

    const errors = ref({});
    const formRef = ref();
    const dataSource = ref([]);
    const count = computed(() => dataSource.value.length + 1);

    const editableData = reactive({});
    const edit = (key) => {
      editableData[key] = cloneDeep(
        dataSource.value.filter((item) => key === item.key)[0]
      );
    };

    // const editByMultipleInput = (value, key) => {
    //   debugger;
    //   console.log(`selected ${value}, ${key}`);
    // };

    const save = (key) => {
      console.log("editableData:", editableData); // Log editableData
      console.log("dataSource:", dataSource.value); // Log dataSource
      Object.assign(
        dataSource.value.filter((item) => key === item.key)[0],
        editableData[key]
      );
      delete editableData[key];

      const editedItem = editableData[key];
      const originalItem = dataSource.value.find((item) => item.key === key);

      if (editedItem && originalItem) {
        originalItem.MeasuringItem = editedItem.MeasuringItem;
        originalItem.MinValue = editedItem.MinValue;
        originalItem.MaxValue = editedItem.MaxValue;

        // Remove the temporary editableData
        delete editableData[key];
      }
    };

    const saveByMultipleInput = (value, key) => {
      // console.log("editableData:", editableData); // Log editableData
      // console.log("dataSource:", dataSource.value); // Log dataSource

      Object.assign(
        dataSource.value.filter((item) => key === item.key)[0],
        editableData[key]
      );
      delete editableData[key];

      const editedItem = editableData[key];
      const originalItem = dataSource.value.find((item) => item.key === key);

      if (editedItem && originalItem) {
        originalItem.MeasuringItem = value;
        // Remove the temporary editableData
        delete editableData[key];
      }
    };

    const onDelete = (key) => {
      dataSource.value = dataSource.value.filter((item) => item.key !== key);
    };
    // const save = key => {
    //   Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    //   delete editableData[key];
    // };

    let countR = 0;
    const handleAdd = () => {
      users.lastKeyTableRef++;
      const newData = {
        key: `${users.lastKeyTableRef}`,
        measuringItem: 0,
        minValue: "0",
        maxValue: "0",
      };
      dataSource.value.push(newData);
    };

    const handleChange = (value, key) => {
      debugger;
      console.log(`selected ${value}, ${key}`);
    };

    const route = useRoute();
    const formState = reactive({
      id: route.params.id,
      idLine: "",
      lineName: "",
      manageCode: "",
      toolName: "",
      //
      serialNumber: "",
      maker: "",
      measuringRange: "",
      resolution: "",
      //
      typeFrequency: "",
      frequencyValue: "",
      useDate: "",
      managementCategory: "",
      //
      purpose: "",
      calibrationStatus: "",
      usageStatus: "",
      sensorInfor: "",
      approvalStatus: "",
      createdBy: "",
      measurementItem: [],
      //
    });

    const rules = {
      idLine: [
        {
          required: true,
          message: "idLine không để trống.",
          trigger: "change",
        },
      ],
      lineName: [
        {
          required: true,
          message: "Dây chuyền.",
          trigger: "change",
        },
      ],
      manageCode: [
        {
          required: true,
          message: "Code QL không để trống.",
          trigger: "change",
        },
      ],
      toolName: [
        {
          required: true,
          message: "Tên DCĐ không để trống.",
          trigger: "change",
        },
      ],
      serialNumber: [
        {
          required: true,
          message: "Serial No không để trống.",
          trigger: "change",
        },
      ],
      maker: [
        {
          required: true,
          message: "Maker không để trống.",
          trigger: "change",
        },
      ],
      measuringRange: [
        {
          required: true,
          message: "Dải đo không để trống.",
          trigger: "change",
        },
      ],
      resolution: [
        {
          required: true,
          message: "Độ phân giải không để trống.",
          trigger: "change",
        },
      ],
      typeFrequency: [
        {
          required: true,
          message: "TypeFrequency không để trống.",
          trigger: "change",
        },
      ],
      frequencyValue: [
        {
          required: true,
          message: "FrequencyValue không để trống.",
          trigger: "change",
        },
      ],
      UseDate: [
        {
          required: false,
          message: "UseDate không để trống.",
          trigger: "change",
        },
      ],
      managementCategory: [
        {
          required: false,
          message: "Hạng mục QL không để trống.",
          trigger: "change",
        },
      ],
      measurementItem: [
        {
          required: true,
          message: 'Hạng mục đo không để trống.',
          trigger: 'change',
        },
      ],
      purpose: [
        {
          required: false,
          message: "Mục đích không để trống.",
          trigger: "change",
        },
      ],
      usageStatus: [
        {
          required: false,
          message: "Trạng thái SD không để trống.",
          trigger: "change",
        },
      ],
      sensorInfor: [
        {
          required: false,
          message: "Thông tin cảm biến không để trống.",
          trigger: "change",
        },
      ],
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    //
    const getOptionsUsageStatus = () => {
      ApiViewData.GetOptionsUsageStatus()
        .then((response) => {
          users.optionUsageStatus = response.data;
          formState.usageStatus = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionUsageStatus = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    //
    const getOptionsLine = () => {
      ApiViewData.GetOptionsLine()
        .then((response) => {
          users.optionsLine = response.data;
          formState.idLine = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionLine = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    //

    const getOptionsManageCategory = () => {
      ApiViewData.GetOptionsManageCategory()
        .then((response) => {
          users.optionsManagementCategory = response.data;
          formState.managementCategory = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionManageCategory = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const getOptionsTypeFrequency = () => {
      ApiViewData.GetOptionsTypeFrequency()
        .then((response) => {
          users.optionsTypeFrequency = response.data;
          formState.typeFrequency = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionTypeFrequency = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    //
    const getOptionsMeasurementItem = () => {
      ApiViewData.GetOptionsMeasurementItem()
        .then((response) => {
          users.optionsMeasurementItem = response.data;
          formState.measurementItem = response.data[0].value;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOptionsMeasurementItem = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    //
    const createMeasuringTool = () => {
      formState.measurementItem = dataSource;
      console.log("formState:", formState);

      // ApiMeasuringTool.CreateItem(formState)
      //   .then((response) => {
      //     if (response.status == 200) {
      //       message.success("Tạo mới thành công!");
      //       router.push({ name: "admin-measuringtools" });
      //     } else {
      //       message.error("Lỗi! Thực hiện tác vụ không thành công.");
      //     }
      //   })
      //   .catch((error) => {
      //     message.error(error.message);
      //     if (error.response.data.hasOwnProperty("errors")) {
      //       errors.value = error.response.data.errors;
      //     } else {
      //       errors.value = error.response.data;
      //     }
      //   });
    };
    const getDataEdit = (id) => {
      ApiMeasuringTool.GetItemById(id).then((response) => {
        // gan form state
        formState.id = `${response.data.id}`;
        formState.idLine = `${response.data.idLine}`;
        formState.manageCode = response.data.manageCode;
        formState.toolName = response.data.toolName;
        formState.serialNumber = response.data.serialNumber;
        formState.maker = response.data.maker;
        formState.measuringRange = response.data.measuringRange;
        formState.resolution = response.data.resolution;
        formState.typeFrequency = `${response.data.typeFrequency}`;
        formState.frequencyValue = response.data.frequencyValue;
        formState.TypeRequest = `${response.data.typeRequest}`;
        formState.useDate = response.useDate;
        formState.managementCategory = `${response.data.managementCategory}`;
        formState.purpose = response.data.purpose;
        formState.usageStatus = `${response.data.usageStatus}`;
        formState.sensorInfor = response.data.sensorInfor;
        formState.measurementItem = response.data.measurementItem;
        //
        dataSource.value = response.data.measurementItem;
        users.lastKeyTableRef = (response.data.measurementItem.length > 0) ? response.data.measurementItem[0].key : 0;
        //

      }).catch((error) => {
        console.log(error);
      });
    };
    // error
    const editMeasuringTool = () => {
      formState.ItemData = dataSource;
      console.log('form state:', formState);
      ApiMeasurementResultData.EditItem(formState).then((response) => {
        if (response.status == 200) {
          message.success("Cập nhật thành công!");
          router.push({ name: "admin-measuringtools" });
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
    };

    onMounted(() => {
      resetForm();
      getDataEdit(formState.id);
      getOptionsUsageStatus();
      getOptionsLine();
      getOptionsManageCategory();
      getOptionsMeasurementItem();
      getOptionsTypeFrequency();
    });

    return {
      ...toRefs(users),
      authStoreClaim,
      errors,
      users,
      columns,
      onDelete,
      count,
      edit,
      save,
      handleAdd,
      dataSource,
      editableData,
      //
      formState,
      formRef,
      rules,
      layout,
      resetForm,
      getOptionsUsageStatus,
      getOptionsLine,
      getOptionsManageCategory,
      getOptionsMeasurementItem,
      getOptionsTypeFrequency,
      filterOptionLine,
      filterOptionUsageStatus,
      filterOptionManageCategory,
      filterOptionTypeFrequency,
      filterOptionsMeasurementItem,
      editMeasuringTool,
      getDataEdit,
      handleChange,
      saveByMultipleInput,
    };
  },
});
</script>