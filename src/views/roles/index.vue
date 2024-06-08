<template>
    <a-card style="width: 100%">
        <div class="row mb-3">
            <div class="col-6">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-dashboards' }">Trang chủ</router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>Vai trò</a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <div class="col-6 d-flex justify-content-end" v-if="authStoreClaim !== null">
                <a-button type="primary" title="Thêm mới" v-if="authStoreClaim['admin.roles.create'] === '1'">
                    <router-link :to="{ name: 'admin-roles-create' }">
                        <i class="fa-solid fa-plus"></i>
                    </router-link>
                </a-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-form @keyup.enter="clickFrmFilter($event)" layout="inline" class="p-3 border">
                    <div class="col-3">
                        <label for="exampleFormControlInput1" class="form-label">Vai trò</label>
                        <a-form-item>
                            <a-input v-model:value="pageParam.roleName" placeholder="RoleName"
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
                        <template v-if="column.key === 'name'">
                            <span>{{ record.name }}</span>
                        </template>
                        <template v-if="column.key === 'countUser'">
                            <span>{{ record.countUser }}</span>
                        </template>
                        <template v-if="column.key === 'defaultRole'">
                            <span class="text-success" v-if="record.defaultRole == true"><i
                                    class="fa-solid fa-square-check"></i></span>
                        </template>
                        <template v-if="column.key === 'status'">
                            <span :class="`st-val-${record.status}`">{{ record.statusDesc }}</span>
                        </template>
                        <template v-if="column.key === 'action' && authStoreClaim !== null">
                            <a-space warp v-if="authStoreClaim['admin.roles.edit'] === '1'">
                                <router-link :to="{ name: 'admin-roles-edit', params: { id: record.id } }">
                                    <a-button type="dashed" class="me-2 text-primary" size="small" title="Sửa">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a-button>
                                </router-link>
                            </a-space>
                            <a-popconfirm title="Bạn muốn Khóa bản ghi này?" ok-text="Yes" cancel-text="No"
                                @confirm="confirmBanned(record.id)"
                                v-if="authStoreClaim['admin.roles.banned'] === '1' && record.status != -5">
                                <a-button title="Khóa" type="dashed" size="small" shape="" class="me-2 text-warning"><i
                                        class="fa-solid fa-lock"></i></a-button>
                            </a-popconfirm>
                            <a-popconfirm title="Dữ liệu sẽ không thể phục hồi, bạn muốn Xóa bản ghi này?" ok-text="Yes"
                                cancel-text="No" @confirm="confirmRemove(record.id)"
                                v-if="authStoreClaim['admin.roles.delete'] === '1' && record.status == -5">
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
import ApiViewData from '../../api/ApiViewData.js';
import ApiRole from '../../api/ApiRole.js';
import { useAuthStore } from "../../stores/auth.store.js";
export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-roles"]);
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
            roleName: (Object.keys(route.query).length > 0) ? route.query.roleName : '',
            statusFilter: false
        });
        const columns = [
            {
                title: "#",
                key: "index",
            },
            {
                title: "Tên vai trò",
                key: "name",
            },
            {
                title: "Số tài khoản",
                key: "countUser",
            },
            {
                title: "Mặc định",
                key: "defaultRole",
            },
            {
                title: "Trạng thái",
                key: "status",
            },
            {
                title: "Tác vụ",
                key: "action",
                fixed: "right",
            },
        ];

        const getRoles = (args) => {
            ApiRole.GetAllByLimit(args).then((response) => {
                roles.value = response.data.data;
                pageParam.pageNumber = response.data.pageNumber;
                pageParam.pageSize = response.data.pageSize;
                pageParam.totalRecord = response.data.totalRecords;
                //
                pageParam.roleName = args.roleName;
                if (pageParam.statusFilter) {
                    if (response.data.totalPages < response.data.pageNumber && response.data.totalRecords > 0) {
                        pageParam.current = 1;
                        pageParam.pageNumber = 1;
                        getRoles(pageParam);
                        router.push({ name: "admin-roles", query: { PageNumber: 1, PageSize: pageParam.pageSize, roleName: pageParam.roleName } })
                    } else {
                        router.push({ name: "admin-roles", query: { PageNumber: pageParam.pageNumber, PageSize: pageParam.pageSize, roleName: pageParam.roleName } })
                    }
                }
                //
            }).catch((error) => {
                console.log(error);
            });
        };
        const confirmRemove = (id) => {
            ApiRole.DeleteById(id).then((response) => {
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
        const confirmBanned = (id) => {
            ApiRole.BannedById(id).then((response) => {
                if (response.status == 200) {
                    message.success("Khóa thành công!");
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
                pageParam.roleName = (Object.keys(route.query).length > 0) ? route.query.roleName : '';
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
            confirmRemove,
            confirmBanned
        };
        //
    }
});
</script> 