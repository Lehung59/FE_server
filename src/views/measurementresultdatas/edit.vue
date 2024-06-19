<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-12">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-measurementresultdatas' }">Kết quả đo</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>Sửa theo ngày đo</a-breadcrumb-item>
                </a-breadcrumb>
                <h1></h1>
            </div>
            <div class="col-12 col-sm-12 mb-3">
                <!-- @submit.prevent="createUsers()" -->
                <a-form name="custom-validation" autocomplete="off" ref="formRef" :model="formState"
                    :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" @finish="createUsers()">
                    <div class="row">
                        <div class="col-12 col-sm-12">
                            <a-form-item ref="MeasuringToolId" required label="Dụng cụ _ Hạng mục đo"
                                name="MeasuringToolId">
                                <a-select v-model:value="formState.MeasuringToolId" show-search
                                    placeholder="Chọn Dụng cụ đo" style="width: 100%" :options="users.optionsMeasuringTool"
                                    :filter-option="filterOptionMeasuringTool" @change="handleChangeMeasuringToolId">
                                </a-select>
                            </a-form-item>

                            <a-form-item label="Ngày đo" required name="RecordingDate">
                                <a-space direction="vertical" :size="12">
                                    <a-date-picker v-model:value="formState.RecordingDate" :style="{ 'width': 100 + '%' }" @change="handleChangeRecordingDate"
                                        valueFormat="YYYY-MM-DD" />
                                </a-space>
                                <small v-if="errors && errors.RecordingDate" class="text-danger">{{
                                    errors.RecordingDate[0]
                                }}</small>
                            </a-form-item>
                        </div><!-- /col -->
                        <div class="col-12 col-sm-12">
                            <!-- <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Thêm
                                dòng</a-button> -->
                            <a-table bordered :data-source="dataSource" :columns="columns" :pagination="false">
                                <template #bodyCell="{ column, text, record }">
                                    <template v-if="column.dataIndex === 'minValue'">
                                        <div class="editable-cell">
                                            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                                                <a-input-number v-model:value="editableData[record.key].minValue"
                                                    @pressEnter="save(record.key)" />
                                                <div><check-outlined class="editable-cell-icon-check"
                                                        @click="save(record.key)" /></div>
                                            </div>
                                            <div v-else class="editable-cell-text-wrapper">
                                                {{ text || ' ' }}
                                                <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="column.dataIndex === 'maxValue'">
                                        <div class="editable-cell">
                                            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                                                <a-input-number v-model:value="editableData[record.key].maxValue"
                                                    @pressEnter="save(record.key)" />
                                                <div><check-outlined class="editable-cell-icon-check"
                                                        @click="save(record.key)" /></div>
                                            </div>
                                            <div v-else class="editable-cell-text-wrapper">
                                                {{ text || ' ' }}
                                                <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="column.dataIndex === 'singleValue'">
                                        <div class="editable-cell">
                                            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                                                <a-input-number v-model:value="editableData[record.key].singleValue"
                                                    @pressEnter="save(record.key)" />
                                                <div><check-outlined class="editable-cell-icon-check"
                                                        @click="save(record.key)" /></div>
                                            </div>
                                            <div v-else class="editable-cell-text-wrapper">
                                                {{ text || ' ' }}
                                                <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="column.dataIndex === 'remark'">
                                        <div class="editable-cell">
                                            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                                                <a-input v-model:value="editableData[record.key].remark"
                                                    @pressEnter="save(record.key)" />
                                                <div><check-outlined class="editable-cell-icon-check"
                                                        @click="save(record.key)" /></div>
                                            </div>
                                            <div v-else class="editable-cell-text-wrapper">
                                                {{ text || ' ' }}
                                                <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="column.dataIndex === 'evaluationStatus'">
                                        <div class="editable-cell">
                                            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                                                <a-input-number v-model:value="editableData[record.key].evaluationStatus"
                                                    :disabled="true" @pressEnter="save(record.key)" />
                                                <a-select v-model:value="editableData[record.key].evaluationStatus"
                                                    :size="size" style="width: 200px"
                                                    :options="users.optionsEvaluationStatus"
                                                    :filter-option="filterOptionEvaluationStatus"
                                                    @change="handleChange($event, record.key)"></a-select>
                                                <div><check-outlined class="editable-cell-icon-check"
                                                        @click="save(record.key)" /></div>
                                            </div>
                                            <div v-else class="editable-cell-text-wrapper">
                                                <template v-for="itemOpt in users.optionsEvaluationStatus">
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
                                        <a-popconfirm v-if="dataSource.length" title="Bạn muốn xóa dòng?"
                                            @confirm="onDelete(record.key)">
                                            <a>Xóa</a>
                                        </a-popconfirm>
                                    </template>
                                </template>
                            </a-table>

                        </div><!-- /col -->
                        <div class="col-12 col-sm-12 text-end">
                            <h1></h1>
                            <a-form-item v-if="authStoreClaim['admin.measurementresultdatas.create'] === '1'">
                                <a-button class="me-0 me-sm-2 mb-3 mb-sm-0">
                                    <router-link :to="{ name: 'admin-measurementresultdatas' }">
                                        <span>Quay lại</span>
                                    </router-link>
                                </a-button>
                                <a-button type="primary" html-type="submit" class="bg-success">Lưu</a-button>
                            </a-form-item>
                        </div><!-- /col -->
                    </div>
                </a-form>
            </div>
        </div>
    </a-card>
</template>
<script>
import { computed, onMounted, defineComponent, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from 'ant-design-vue';
import { DeleteOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es/lodash.js';
import { useMenu } from "../../stores/use-menu.js";
import { useAuthStore } from "../../stores/auth.store.js";
import BaseCommon from '../../api/BaseCommon.js';
import ApiViewData from '../../api/ApiViewData.js';
import ApiMeasurementResultData from '../../api/ApiMeasurementResultData.js';

export default defineComponent({
    components: {
        DeleteOutlined,
        CheckOutlined,
        EditOutlined
    },
    setup() {
        useMenu().onSelectedKeys(["admin-measurementresultdatas"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const apiPrefix = import.meta.env.VITE_API_PREFIX;
        const router = useRouter();
        const route = useRoute();
        const users = reactive({
            optionsMeasuringTool: [],
            optionsEvaluationStatus: [],
        });
        const errors = ref({});
        const formRef = ref();
        const selectedEvaluationStatus = ref('5');
        const formState = reactive({
            MeasuringToolId: route.params.id,
            RecordingDate: route.params.recordingDate,
            ItemData: [],
        });
        
        /**
         * cau hinh table
         * **/
        const columns = [{
            title: 'Min',
            dataIndex: 'minValue',
            // width: '30%',
        }, {
            title: 'Max',
            dataIndex: 'maxValue',
        }, {
            title: 'Single Val',
            dataIndex: 'singleValue',
        }, {
            title: 'Remark',
            dataIndex: 'remark',
        }, {
            title: 'Evaluation Status',
            dataIndex: 'evaluationStatus',
        }, {
            title: 'Tác vụ',
            dataIndex: 'operation',
        }];
        const dataSource = ref([]);
        // const count = computed(() => dataSource.value.length + 1);
        const editableData = reactive({});
        const edit = key => {
            // lay du lieu tu datasource voi key tuong ung
            dataSource.value.filter(item => key === item.key)[0].evaluationStatus = dataSource.value.filter(item => key === item.key)[0].evaluationStatus.toString();
            editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
        };
        const save = key => {
            Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
            delete editableData[key];
            
        };
        const onDelete = key => {
            dataSource.value = dataSource.value.filter(item => item.key !== key);
        };
        /**
         * end cau hinh table
         * **/
        const handleChangeMeasuringToolId = (value) => {
            console.log(`selected ${value}`);
            formState.MeasuringToolId = `${value}`;
            getUsersEdit(formState.MeasuringToolId,formState.RecordingDate);
        }
        const handleChangeRecordingDate = (value) => {
            console.log(`date time: ${value}`);
            formState.RecordingDate = `${value}`;
            getUsersEdit(formState.MeasuringToolId,formState.RecordingDate);
        }
        //
        const resetForm = () => {
            formRef.value.resetFields();
        };
        //
        const getOptionsMeasuringTool = () => {
            // xy ly string to array
            ApiViewData.GetOptionsMeasuringToolMeasurementItemByDay(route.params.id).then((response) => {
                users.optionsMeasuringTool = response.data;
                formState.MeasuringToolId = response.data[0].value;
                //
                formState.RecordingDate = route.params.recordingDate;
            })
                .catch((error) => {
                    console.log(error);
                });
        };
        const filterOptionMeasuringTool = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const getEvaluationStatus = () => {
            ApiViewData.GetOptionsEvaluationStatus().then((response) => {
                users.optionsEvaluationStatus = response.data;
            })
                .catch((error) => {
                    console.log(error);
                });
        };
        const filterOptionEvaluationStatus = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const handleChange = (value, key) => {
            // console.log(`selected ${value}, ${key}`);
        };
        //
        const getUsersEdit = (id, recordingDate) => {
            console.log('get user edit danh sach:', formState.MeasuringToolId, formState.RecordingDate );
            ApiMeasurementResultData.GetItemByDay(id, recordingDate).then((response) => {
                dataSource.value = response.data;
            }).catch((error) => {
                console.log(error);
            });
        };
        // error    
        const createUsers = () => {
            formState.ItemData = dataSource;
            console.log('form state:', formState);
            ApiMeasurementResultData.EditItem(formState).then((response) => {
                if (response.status == 200) {
                    message.success("Cập nhật thành công!");
                    router.push({ name: "admin-measurementresultdatas" });
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
            //
            resetForm();
            getOptionsMeasuringTool();
            getEvaluationStatus();
            // getUsersEdit(route.params.id, route.params.recordingDate);
            getUsersEdit(formState.MeasuringToolId, formState.RecordingDate);
        })
        //
        return {
            ...toRefs(users),
            authStoreClaim,
            errors,
            formState,
            formRef,
            resetForm,
            //
            getOptionsMeasuringTool,
            filterOptionMeasuringTool,
            getEvaluationStatus,
            filterOptionEvaluationStatus,
            selectedEvaluationStatus,
            handleChange,
            users,
            createUsers,
            //
            getUsersEdit,
            handleChangeMeasuringToolId,
            handleChangeRecordingDate,
            // cau hinh table
            columns,
            onDelete,
            dataSource,
            editableData,
            edit,
            save,
        };
    },
});
</script>