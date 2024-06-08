<template>
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" class="aside-menu">
    <div class="item-menu" v-if="authStore.user" v-for="item in authStore.user.roleClaim">
      <a-menu-item :key="item.routeName">
        <router-link :to="{ name: item.routeName }">
          <span>
            <i :class="item.icon"></i> {{ item.title }}
          </span>
        </router-link>
      </a-menu-item>
    </div>
  </a-menu>
</template>
<script>
import { UserOutlined, TagOutlined, TeamOutlined, HomeOutlined, SettingOutlined, HistoryOutlined } from "@ant-design/icons-vue";
import { defineComponent, onUpdated, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMenu } from "../stores/use-menu.js";
import { useAuthStore } from "../stores/auth.store.js";
export default defineComponent({
  components: {
    UserOutlined,
    TagOutlined,
    TeamOutlined,
    HomeOutlined,
    SettingOutlined,
    HistoryOutlined
  },
  setup() {
    const store = useMenu();
    const router = useRouter();
    const authStore = useAuthStore();
    onMounted(() => {
      if (!authStore.checkToken()) {
       
      }
    })
    return {
      ...storeToRefs(store),
      authStore
    };
  },
});
</script>