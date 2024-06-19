<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-12">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-logs' }">Log</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>Chi tiết</a-breadcrumb-item>
                </a-breadcrumb>
                <h1></h1>
            </div>
            <div class="col-12 col-sm-12 mb-3">
                <div class="clearfix mb-3">
                    <label for="" class="form-label fw-bold">Loại Log</label>
                    <a-select v-model:value="formState.logType" style="width: 100%" :options="viewData.optionsLogType"
                        :filter-option="filterOptionLogType" :disabled="true"></a-select>
                </div>
                <div class="clearfix mb-3">
                    <label for="" class="form-label fw-bold">Người tạo</label>
                    <a-input v-model:value="formState.author" :disabled="true" />
                </div>
                <div class="clearfix mb-3">
                    <label for="" class="form-label fw-bold">Ngày tạo</label>
                    <a-input v-model:value="formState.createdDate" :disabled="true" />
                </div>
                <div class="clearfix mb-3">
                    <label for="" class="form-label fw-bold">Nội dung</label>
                    <div>
                        <div v-html="formState.content"></div>
                    </div>
                </div>
                <div class="text-end">
                    <a-button @click="goBack" class="me-0 me-sm-2 mb-3 mb-sm-0">
                    <span>Quay lại</span>
                </a-button>
                </div>
            </div>
        </div>
    </a-card>
</template>
<script>
import { onMounted, defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import { message } from 'ant-design-vue';
import { useMenu } from "../../stores/use-menu.js";
import ApiLog from '../../api/ApiLog.js';
import ApiViewData from '../../api/ApiViewData.js';

export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-logs"]);
        const route = useRoute();
        const apiPrefix = import.meta.env.VITE_API_PREFIX;
        const viewData = reactive({
            optionsLogType: [],
        });
        const formState = reactive({
            id: '',
            logType: '',
            content: '',
            author: '',
            createdDate: ''
        });
        const goBack = () => {
      // Navigate back to the previous page
      if (history.length > 1) {
        // If there's history available, go back
        history.go(-1);
      } else {
        // Otherwise, fallback to home or another default route
        this.$router.push("/");
      }
    };
        //
        const getOptionsLogType = () => {
            ApiViewData.GetOptionsLogType().then((response) => {
                viewData.optionsLogType = response.data;
            }).catch((error) => {
                message.error(`Lỗi! ${error.response.statusText}`);
            });
        };
        const filterOptionLogType = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        //
        const getLogsDetail = () => {
            ApiLog.GetLogDetail(route.params.id).then((response) => {
                formState.id = response.data.id;
                formState.logType = response.data.logType;
                formState.content = response.data.content;
                formState.author = `${response.data.author}`;
                formState.createdDate = `${response.data.createdDate}`;
            }).catch((error) => {
                console.log(error);
            });
        };
        onMounted(() => {
            getOptionsLogType();
            getLogsDetail();
        })
        //
        return {
            viewData,
            formState,
            getOptionsLogType,
            filterOptionLogType,
            getLogsDetail,
            goBack
        };
    },
});
</script>