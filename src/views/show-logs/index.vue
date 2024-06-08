<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-12">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>Log</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12">
                <a-form @keyup.enter="clickFrmFilter($event)" layout="inline" class="p-3 border">
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">Loại log</label>
                        <a-form-item name="logType">
                            <a-select v-model:value="pageParam.logType" allowClear="true" show-search
                                placeholder="-- Chọn --" style="width: 100%" :options="viewData.optionsLogType"
                                :filter-option="filterOptionLogType"></a-select>
                        </a-form-item>
                    </div>
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">Author</label>
                        <a-form-item>
                            <a-input v-model:value="pageParam.author" placeholder="Người tạo"
                                class="form-control form-control-sm" size="middle"></a-input>
                        </a-form-item>
                    </div>
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">Ngày</label>
                        <a-form-item>
                            <a-space direction="vertical" :size="12">
                                <a-date-picker v-model:value="pageParam.createdDate" :style="{ 'width': 100 + '%' }"
                                    valueFormat="YYYY-MM-DD" />
                            </a-space>
                        </a-form-item>
                    </div>
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">.</label>
                        <a-form-item>
                            <a-button v-on:click="clickFrmFilter($event)" class="bg-success text-light btn btn-sm"
                                size="middle" type="submit" html-type="button">
                                Tìm kiếm
                            </a-button>
                        </a-form-item>
                    </div>
                </a-form>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-pagination @change="onChange" v-model:current="pageParam.current" :total=pageParam.totalRecord
                    :pageSize="pageParam.pageSize" :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`" class="mb-2 text-end" />
                <a-table :dataSource="dataResult" :columns="columns" :scroll="{ x: 576 }" :pagination=false>
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'id'">
                            <span>{{ record.id }}</span>
                        </template>
                        <template v-if="column.key === 'logType'">
                            <span>{{ record.logType }}</span>
                        </template>
                        <template v-if="column.key === 'content'">
                            <div v-html="record.content"></div>
                        </template>
                        <template v-if="column.key === 'author'">
                            <span>{{ record.author }}</span>
                        </template>
                        <template v-if="column.key === 'ip'">
                            <span>{{ record.ip }}</span>
                        </template>
                        <template v-if="column.key === 'createdDate'">
                            <span>{{ record.createdDate }}</span>
                        </template>
                        <template v-if="column.key === 'action' && authStoreClaim !== null">
                            <a-space warp v-if="authStoreClaim['admin.logs.view'] === '1'">
                                <router-link :to="{ name: 'admin-logs-detail', params: { id: record.id } }">
                                    <a-button type="dashed" class="me-2 text-primary" size="small" title="Xem">
                                        <i class="fa-solid fa-eye"></i>
                                    </a-button>
                                </router-link>
                            </a-space>
                        </template>
                    </template>
                </a-table>
                <a-pagination @change="onChange" v-model:current="pageParam.current" :total=pageParam.totalRecord
                    :pageSize="pageParam.pageSize" :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`" class="mt-2 text-end" />
            </div>
        </div>
    </a-card>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import { onUpdated, onMounted } from 'vue';
import ApiLog from '../../api/ApiLog.js';
import ApiViewData from '../../api/ApiViewData.js';
import { useAuthStore } from "../../stores/auth.store.js";
export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-logs"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const router = useRouter();
        const route = useRoute();
        const viewData = reactive({
            optionsLogType: [],
        });
        const errors = ref([]);
        const dataResult = ref([]);
        const pageParam = reactive({
            current: (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1,
            pageNumber: (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1,
            pageSize: (Object.keys(route.query).length > 0) ? route.query.PageSize : 10,
            totalRecord: 0,
            logType: (Object.keys(route.query).length > 0) ? route.query.logType : '',
            author: (Object.keys(route.query).length > 0) ? route.query.author : '',
            createdDate: (Object.keys(route.query).length > 0) ? route.query.createdDate : '',
            statusFilter: false
        });
        const columns = [
            {
                title: "#",
                key: "id",
            },
            {
                title: "LogType",
                key: "logType",
            },
            {
                title: "Nội dung",
                key: "content",
            },
            {
                title: "Author",
                key: "author",
            },
            {
                title: "IP",
                key: "ip",
            },
            {
                title: "Ngày tạo",
                key: "createdDate",
            },
            {
                title: "Tác vụ",
                key: "action",
                fixed: "right",
            },
        ];
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
        const getRoles = (args) => {
            // get all
            ApiLog.GetAllByLimit(args).then((response) => {
                dataResult.value = response.data.data;
                pageParam.pageNumber = response.data.pageNumber;
                pageParam.pageSize = response.data.pageSize;
                pageParam.totalRecord = response.data.totalRecords;
                //
                pageParam.logType = args.logType;
                pageParam.author = args.author;
                pageParam.createdDate = args.createdDate;
                //
                if (pageParam.statusFilter) {
                    if (response.data.totalPages < response.data.pageNumber && response.data.totalRecords > 0) {
                        pageParam.current = 1;
                        pageParam.pageNumber = 1;
                        getRoles(pageParam);
                        router.push({ name: "admin-logs", query: { PageNumber: 1, PageSize: pageParam.pageSize, logType: pageParam.logType, author: pageParam.author, createdDate: pageParam.createdDate } })
                    } else {
                        router.push({ name: "admin-logs", query: { PageNumber: pageParam.pageNumber, PageSize: pageParam.pageSize, logType: pageParam.logType, author: pageParam.author, createdDate: pageParam.createdDate } })
                    }
                }
                //
            }).catch((error) => {
                message.error(`Lỗi! ${error.response.statusText}`);
            });
            
        };
        //
        onUpdated(() => {
            if (Object.keys(route.query).length === 0) {
                pageParam.current = (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1;
                pageParam.pageNumber = (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1;
                pageParam.pageSize = (Object.keys(route.query).length > 0) ? route.query.PageSize : 10;
                //
                pageParam.logType = (Object.keys(route.query).length > 0) ? route.query.logType : '';
                pageParam.author = (Object.keys(route.query).length > 0) ? route.query.author : '';
                pageParam.createdDate = (Object.keys(route.query).length > 0) ? route.query.createdDate : '';
                //
                pageParam.statusFilter = true;
                getRoles(pageParam);
            }
        })
        onMounted(() => {
            getRoles(pageParam);
            getOptionsLogType();
        })
        //
        function onChange(page, pageSize) {
            pageParam.pageNumber = page;
            pageParam.pageSize = pageSize;
            //
            pageParam.statusFilter = true;
            getRoles(pageParam);
        }
        const clickFrmFilter = (event) => {
            pageParam.statusFilter = true;
            getRoles(pageParam);
        }
        //
        return {
            route,
            router,
            authStoreClaim,
            errors,
            dataResult,
            columns,
            viewData,
            getOptionsLogType,
            filterOptionLogType,
            pageParam,
            onChange,
            clickFrmFilter,
        };
        //
    }
});
</script> 