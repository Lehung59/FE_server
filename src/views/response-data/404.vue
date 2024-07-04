<template>
        <Header v-if="userLocal.role == 'USER'" />
        <HeaderOther v-else/>
    <div class="bg-white" style="min-height: 800px;">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-black text-center mt-5">Lỗi 404! Không tìm thấy trang.</h1>
                </div>
            </div>
        </div>
    </div>
    <Footer v-if="userLocal.role == 'USER'" />
</template>

<script>
import { defineComponent, computed, ref, reactive } from "vue";

import Header from "../../components/HeaderCustomer.vue";
import HeaderOther from "../../components/Header.vue";

import Footer from "../../components/footer2.vue"

export default defineComponent({
  components: {
    Header,
    Footer,
    HeaderOther
  },  
  setup () {
    const userLocal = JSON.parse(localStorage.getItem("auth"));
    console.log('userLocal.role.value')
    return {
        userLocal};
  }
});

</script>
