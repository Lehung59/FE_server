<template>
    <div>
        <a-modal v-model:visible="propsParent.showModal" width="1000px" title="Sửa kết quả đo" @ok="handleOk"
            @cancel="handleCancel">
            <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" name="basic" autocomplete="off"
                @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="ID" name="ID">
                    <a-input v-model:value="formState.ID" :disabled="true" />
                </a-form-item>
                <a-form-item label="Dụng cụ đo" name="ToolName">
                    <a-input v-model:value="formState.ToolName" :disabled="true" />
                </a-form-item>
                <a-form-item label="Hạng mục đo" name="ItemName">
                    <a-input v-model:value="formState.ItemName" :disabled="true" />
                </a-form-item>
                <a-form-item label="Ngày đo" name="RecordingDate">
                    <a-input v-model:value="formState.RecordingDate" :disabled="true" />
                </a-form-item>
                <a-form-item label="Min" name="MinValue">
                    <a-input-number v-model:value="formState.MinValue" />
                </a-form-item>
                <a-form-item label="Max" name="MaxValue">
                    <a-input-number v-model:value="formState.MaxValue" />
                </a-form-item>
                <a-form-item label="Single Value" name="SingleValue">
                    <a-input-number v-model:value="formState.SingleValue" />
                </a-form-item>
                <a-form-item label="Remark" name="Remark">
                    <a-input v-model:value="formState.Remark" />
                </a-form-item>
                <a-form-item label="Evaluation Status" name="EvaluationStatus">
                    <a-select v-model:value="formState.EvaluationStatus" show-search placeholder="Chọn trạng thái"
                        style="width: 100%" :options="users.optionsEvaluationStatus"
                        :filter-option="filterOptionEvaluationStatus"></a-select>
                </a-form-item>
                <!-- <a-form-item>
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item> -->
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, defineModel, defineProps, defineEmits, onUpdated, onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from 'ant-design-vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { useMenu } from "../../stores/use-menu.js";
import { useAuthStore } from "../../stores/auth.store.js";
import BaseCommon from '../../api/BaseCommon.js';
import ApiViewData from '../../api/ApiViewData.js';
import ApiMeasurementResultData from '../../api/ApiMeasurementResultData.js';
export default defineComponent({
    name: "MeasurementResultDatasComponentFrmCreate",
    props: {
        actType: {
            type: String
        },
        idMesResultData: {
            type: Number
        },
        showModal: {
            type: Boolean
        }
    },
    components: {
        // call component
    },
    setup(props, context) {
        const formState = reactive({
            ID: 0,
            MeasuringToolId: 0,
            MeasurementItemID: 0,
            RecordingDate: '',
            MinValue: 0,
            MaxValue: 0,
            SingleValue: 0,
            Remark: 'Remark',
            EvaluationStatus: '',
            ManageCode: '',
            ToolName: '',
            ShortKeyItem: '',
            ItemName: '',
            CreatedBy: '',
            UpdatedBy: '',
            // RecordingDateString: ""
        });
        const users = reactive({
            optionsEvaluationStatus: [],
        });
        /**
        *** modal them moi
        *** 
        * **/
        const propsParent = ref(props);
        const handleOk = e => {
            // console.log(e);
            // console.log('click handleOk');
            ApiMeasurementResultData.EditItemById(formState).then((response) => {
                if (response.status == 200) {
                    message.success("Cập nhật thành công!");
                    //
                    context.emit('close');
                    propsParent.showModal = false;
                    // router.push({ name: "admin-measurementresultdatas" });
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
        const handleCancel = e => {
            // console.log(e);
            context.emit('close');
            propsParent.showModal = false;
            // console.log('click handleCancel', propsParent);
        };
        /**
         * end modal them moi
         * **/

        // const onFinish = values => {
        //     // console.log('Success:', values);
        // };
        // const onFinishFailed = errorInfo => {
        //     // console.log('Failed:', errorInfo);
        // };
        //
        const getEvaluationStatus = () => {
            ApiViewData.GetOptionsEvaluationStatus().then((response) => {
                users.optionsEvaluationStatus = response.data;
                formState.EvaluationStatus = response.data[0].value;
            })
                .catch((error) => {
                    console.log(error);
                });
        };
        const filterOptionEvaluationStatus = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        //
        const getUsersEdit = () => {
            console.log('get user edit:', props.idMesResultData);
            ApiMeasurementResultData.GetItemById(props.idMesResultData).then((response) => {
                formState.ID = response.data.id;
                formState.MeasuringToolId = response.data.measuringToolId;
                formState.MeasurementItemID = response.data.measurementItemID;
                formState.RecordingDate = response.data.recordingDate;
                formState.MinValue = response.data.minValue;
                formState.MaxValue = response.data.maxValue;
                formState.SingleValue = response.data.singleValue;
                formState.Remark = response.data.remark;
                formState.ManageCode = response.data.manageCode;
                //
                formState.ToolName = response.data.toolName;
                formState.ShortKeyItem = response.data.shortKeyItem;
                formState.ItemName = response.data.itemName;
                //
                formState.EvaluationStatus = `${response.data.evaluationStatus}`;
                //
                formState.CreatedBy=response.data.createdBy;
                formState.UpdatedBy=response.data.updatedBy;
            }).catch((error) => {
                console.log(error);
            });
        };
        //
        onMounted(() => {
            getUsersEdit();
            getEvaluationStatus();
        })
        return {
            handleOk,
            handleCancel,
            // props,
            propsParent,
            // form
            formState,
            // onFinish,
            // onFinishFailed,
            //
            users,
            getUsersEdit,
            getEvaluationStatus,
            filterOptionEvaluationStatus,
        };
    },
    // cach 2: goi emit
    // methods: {
    //     close() {
    //         this.$emit('close');
    //     }
    // }
});
</script>

