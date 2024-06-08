<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-6">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>Dụng cụ đo</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <div class="col-6 d-flex justify-content-end" v-if="authStoreClaim !== null">
                <a-button type="primary" title="Thêm mới" v-if="authStoreClaim['admin.measuringtools.create'] === '1'">
                    <router-link :to="{ name: 'admin-measuringtools-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>

            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-form @keyup.enter="clickFrmFilter($event)" layout="inline" class="p-3 border">
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">Tên dụng cụ đo</label>
                        <a-form-item>
                            <a-input v-model:value="pageParam.toolName" placeholder="Tên dụng cụ đo"
                                class="form-control form-control-sm" size="small"></a-input>
                        </a-form-item>
                    </div>
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">.</label>
                        <a-form-item>
                            <a-button v-on:click="clickFrmFilter($event)" class="bg-success text-light btn btn-sm"
                                size="small" type="submit" html-type="button">
                                Tìm kiếm
                            </a-button>
                        </a-form-item>
                    </div>
                </a-form>

            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }" :pagination=false>
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>
                        <template v-if="column.key === 'Id'">
                            <span>{{ record.id }}</span>
                        </template>
                        <template v-if="column.key === 'LineName'">
                            <span>{{ record.lineName }}</span>
                        </template>
                        <template v-if="column.key === 'ManageCode'">
                            <span>{{ record.manageCode }}</span>
                        </template>
                        <template v-if="column.key === 'ToolName'">
                            <span>{{ record.toolName }}</span>
                        </template>
                        <template v-if="column.key === 'SerialNumber'">
                            <span>{{ record.serialNumber }}</span>
                        </template>
                        <template v-if="column.key === 'action' && authStoreClaim !== null">
                            <a-space warp v-if="authStoreClaim['admin.measurementresultdatas.view'] === '1'">
                                <router-link :to="{ name: 'admin-measurementresultdatas-create', params: { id: record.id } }">
                                    <a-button type="dashed" class="me-2 text-primary" size="small" title="Nhập kết quả đo">
                                        <i class="fa-solid fa-compass-drafting"></i>
                                    </a-button>
                                </router-link>
                            </a-space>

                            <a-space warp v-if="authStoreClaim['admin.measuringtools.edit'] === '1'">
                                <router-link :to="{ name: 'admin-measuringtools-edit', params: { id: record.id } }">
                                    <a-button type="dashed" class="me-2 text-primary" size="small" title="Sửa">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a-button>
                                </router-link>
                            </a-space>
                            <a-popconfirm title="Dữ liệu sẽ không thể phục hồi, bạn muốn Xóa bản ghi này?" ok-text="Yes"
                                cancel-text="No" @confirm="confirmRemove(record.id)"
                                v-if="authStoreClaim['admin.measuringtools.delete'] === '1'">
                                <a-button title="Xóa" type="dashed" size="small" shape="" danger><i
                                        class="fa-solid fa-trash-can"></i></a-button>
                            </a-popconfirm>
                            
                        </template>
                    </template>
                </a-table>
                <div class="col-12">
                    <a-pagination @change="onChange" v-model:current="pageParam.current" :total=pageParam.totalRecord
                        :pageSize="pageParam.pageSize"
                        :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`" class="mt-2 text-end" />
                </div>
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
import { onUpdated, onMounted } from 'vue'
import ApiViewData from '../../api/ApiViewData.js';
import ApiMeasuringTool from '../../api/ApiMeasuringTool.js';
import { useAuthStore } from "../../stores/auth.store.js";
export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-measuringtools"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const router = useRouter();
        const route = useRoute();
        const errors = ref([]);
        const users = ref([]);
        const pageParam = reactive({
            current: (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1,
            pageNumber: (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1,
            pageSize: (Object.keys(route.query).length > 0) ? route.query.PageSize : 10,
            totalRecord: 0,
            toolName: (Object.keys(route.query).length > 0) ? route.query.ToolName : '',
            statusFilter: false
        });
        const columns = [
            {
                title: "#",
                key: "index",
            },
            {
                title: "ID",
                key: "Id",
            },
            {
                title: "Dây chuyền",
                key: "LineName",
            },
            {
                title: "Code QL",
                key: "ManageCode",
            },
            {
                title: "Tên DCĐ",
                key: "ToolName",
            },
            {
                title: "Serial No",
                key: "SerialNumber",
            },
            {
                title: "Tác vụ",
                key: "action",
                fixed: "right",
            },
        ];

        const getUsers = (args) => {
            ApiMeasuringTool.GetAllByLimit(args).then((response) => {
                // list ban ghi
                users.value = response.data.data;
                // tham so
                pageParam.current = response.data.pageNumber;
                pageParam.pageNumber = response.data.pageNumber;
                pageParam.pageSize = response.data.pageSize;
                pageParam.totalRecord = response.data.totalRecords;
                //
                pageParam.toolName = args.toolName;
                if (pageParam.statusFilter) {
                    if (response.data.totalPages < response.data.pageNumber && response.data.totalRecords > 0) {
                        pageParam.current = 1;
                        pageParam.pageNumber = 1;
                        getUsers(pageParam);
                        router.push({ name: "admin-measuringtools", query: { PageNumber: 1, PageSize: pageParam.pageSize, ToolName: pageParam.toolName } })
                    } else {
                        router.push({ name: "admin-measuringtools", query: { PageNumber: pageParam.pageNumber, PageSize: pageParam.pageSize, ToolName: pageParam.toolName } })
                    }
                }
                //
            }).catch((error) => {
                message.error(`Lỗi! ${error.response.statusText}`);
            });
        };
        const confirmRemove = (id) => {
            ApiMeasuringTool.DeleteById(id)
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        message.success("Xóa thành công!");
                        // router.push({ name: "admin-users" });
                    }
                    getUsers(pageParam);
                })
                .catch((error) => {
                    message.error(error.message);
                    if (error.response.data.hasOwnProperty('errors')) {
                        errors.value = error.response.data.errors;
                    } else {
                        errors.value = error.response.data;
                    }
                });
        };
        //
        onUpdated(() => {
            //
            if (Object.keys(route.query).length === 0) {
                pageParam.current = (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1;
                pageParam.pageNumber = (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1;
                pageParam.pageSize = (Object.keys(route.query).length > 0) ? route.query.PageSize : 10;
                pageParam.toolName = (Object.keys(route.query).length > 0) ? route.query.ToolName : '';
                pageParam.statusFilter = true;
                getUsers(pageParam);
            }
        })
        onMounted(() => {
            getUsers(pageParam);
        })
        //
        function onChange(page, pageSize) {
            pageParam.pageNumber = page;
            pageParam.pageSize = pageSize;
            //
            pageParam.statusFilter = true;
            getUsers(pageParam);
        }
        //
        const clickFrmFilter = (event) => {
            pageParam.statusFilter = true;
            getUsers(pageParam);
        }
        //
        return {
            route,
            router,
            authStoreClaim,
            errors,
            users,
            columns,
            pageParam,
            onChange,
            clickFrmFilter,
            confirmRemove,
        };
        //
    }
});
</script> 