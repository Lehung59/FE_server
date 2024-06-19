<template>
    Đây là Trang quản lý Settings
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useMenu } from "../../stores/use-menu.js";
import { useAuthStore } from "../../stores/auth.store.js";
export default {
    setup() {
        useMenu().onSelectedKeys(["admin-settings"]);
        const authStoreClaim = ref(useAuthStore().user.roleClaimDetail);
        const apiPrefix = import.meta.env.VITE_API_PREFIX;
        return {
            authStoreClaim
        };
    },
}
</script>