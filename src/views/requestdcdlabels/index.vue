<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-6">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>Yêu cầu cấp nhãn</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <div class="col-6 d-flex justify-content-end" v-if="authStoreClaim !== null">
                <a-button type="primary" title="Thêm mới" v-if="authStoreClaim['admin.requestdcdlabels.create'] === '1'">
                    <router-link :to="{ name: 'admin-requestdcdlabels-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-form @keyup.enter="clickFrmFilter($event)" layout="inline" class="p-3 border">
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">Line Name</label>
                        <a-form-item>
                            <a-input v-model:value="pageParam.itemName" placeholder="Tên hạng mục"
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
                <a-table :dataSource="roles" :columns="columns" :scroll="{ x: 576 }" :pagination=false>
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>
                        <template v-if="column.key === 'IdLine'">
                            <span>{{ record.idLine }}</span>
                        </template>
                        <template v-if="column.key === 'LineName'">
                            <span>{{ record.lineName }}</span>
                        </template>
                        <template v-if="column.key === 'action' && authStoreClaim !== null">
                            <a-space warp v-if="authStoreClaim['admin.requestdcdlabels.edit'] === '1'">
                                <router-link :to="{ name: 'admin-requestdcdlabels-edit', params: { id: record.id } }">
                                    <a-button type="dashed" class="me-2 text-primary" size="small" title="Sửa">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a-button>
                                </router-link>
                            </a-space>
                            <a-popconfirm title="Dữ liệu sẽ không thể phục hồi, bạn muốn Xóa bản ghi này?" ok-text="Yes"
                                cancel-text="No" @confirm="confirmRemove(record.id)"
                                v-if="authStoreClaim['admin.requestdcdlabels.delete'] === '1'">
                                <a-button title="Xóa" type="dashed" size="small" shape="" danger><i
                                        class="fa-solid fa-trash-can"></i></a-button>
                            </a-popconfirm>
                        </template>
                    </template>
                </a-table>
                <a-pagination @change="onChange" v-model:current="pageParam.current" :total=pageParam.totalRecord
                    :pageSize="pageParam.pageSize"
                    :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`" class="mt-2 text-end" />
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
import { storeToRefs } from "pinia";
import { onUpdated, onMounted } from 'vue'
import ApiRequestDcdLabel from '../../api/ApiRequestDcdLabel.js';
import { useAuthStore } from "../../stores/auth.store.js";
export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-requestdcdlabels"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const router = useRouter();
        const route = useRoute();
        const errors = ref([]);
        const roles = ref([]);
        //
        const pageParam = reactive({
            current: (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1,
            pageNumber: (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1,
            pageSize: (Object.keys(route.query).length > 0) ? route.query.PageSize : 10,
            totalRecord: 0,
            itemName: (Object.keys(route.query).length > 0) ? route.query.itemName : '',
            statusFilter: false
        });
        const columns = [{
            title: "#",
            key: "index",
        }, {
            title: 'Id Line',
            dataIndex: 'IdLine',
            key: 'IdLine',
        }, {
            title: 'Line Name',
            dataIndex: 'LineName',
            key: 'LineNameme',
        }, {
            title: 'Request Date',
            dataIndex: 'requestDate',
            key: 'RequestDate',
        }, {
            title: 'Type Request',
            dataIndex: 'typeRequest',
            key: 'TypeRequest',
        }, {
            title: 'Item Quantity',
            dataIndex: 'itemQuantity',
            key: 'ItemQuantity',
        }, {
            title: 'Request Status',
            dataIndex: 'requestStatus',
            key: 'RequestStatus',
        }, {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'Reason',
        },{
            title: 'MeasuringToolName',
            dataIndex: 'measuringToolName',
            key: 'MeasuringToolName',
        }, {
            title: 'Tác vụ',
            key: 'action',
        }];

        const getRoles = (args) => {
            ApiRequestDcdLabel.GetAllByLimit(args).then((response) => {
                roles.value = response.data.data;
                pageParam.pageNumber = response.data.pageNumber;
                pageParam.pageSize = response.data.pageSize;
                pageParam.totalRecord = response.data.totalRecords;
                //
                pageParam.itemName = args.itemName;
                if (pageParam.statusFilter) {
                    if (response.data.totalPages < response.data.pageNumber && response.data.totalRecords > 0) {
                        pageParam.current = 1;
                        pageParam.pageNumber = 1;
                        getRoles(pageParam);
                        router.push({ name: "admin-requestdcdlabels", query: { PageNumber: 1, PageSize: pageParam.pageSize, itemName: pageParam.itemName } })
                    } else {
                        router.push({ name: "admin-requestdcdlabels", query: { PageNumber: pageParam.pageNumber, PageSize: pageParam.pageSize, itemName: pageParam.itemName } })
                    }
                }
                //
            }).catch((error) => {
                console.log(error);
            });
        };
        const confirmRemove = (id) => {
            ApiRequestDcdLabel.DeleteById(id).then((response) => {
                if (response.status == 200) {
                    message.success("Xóa thành công!");
                } else {
                    message.error("Lỗi! Tác vụ thực hiện không thành công.");
                }
                getRoles(pageParam);
            }).catch((error) => {
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
            if (Object.keys(route.query).length === 0) {
                pageParam.current = (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1;
                pageParam.pageNumber = (Object.keys(route.query).length > 0) ? route.query.PageNumber : 1;
                pageParam.pageSize = (Object.keys(route.query).length > 0) ? route.query.PageSize : 10;
                pageParam.itemName = (Object.keys(route.query).length > 0) ? route.query.itemName : '';
                pageParam.statusFilter = true;
                getRoles(pageParam);
            }
        })
        onMounted(() => {
            getRoles(pageParam);
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
            roles,
            columns,
            pageParam,
            onChange,
            clickFrmFilter,
            confirmRemove
        };
        //
    }
});

</script>