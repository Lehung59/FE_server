<template>
              <a-form @submit.prevent="onSearch">
                <a-form-item>
                  <a-input placeholder="Tìm kiếm sản phẩm" v-model:value="searchKeyword" @pressEnter="onSearch" />
                </a-form-item>
                <a-button type="primary" @click="onSearch">Tìm kiếm</a-button>
              </a-form>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
    setup() {
        const userLocal = JSON.parse(localStorage.getItem("auth"));

        return {

            userLocal,
        };
    },
});
</script>

<style scoped>
#header,
.btn2 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

#header {
    width: 100%;
    float: left;
    position: relative;
}

.head1 {
    padding: 15px 0;
    background: #000;
    position: relative;
}

.head2 {
    background: #ffd52f;
}

.wrap {
    width: 98%;
    margin: 0 auto;
    max-width: 1300px;
}

.flexJus {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.open {
    color: #fff;
    display: flex;
}

.open label {
    font-size: 13px;
    padding-left: 48px;
    position: relative;
}

.open label:nth-child(1) {
    margin-right: 30px;
}
.open label span {
  text-align: left;
  color: #ffd52f;
  font: bold 15px arial;
  display: block;
}
.open span b {
    color: white;
    font-weight: normal;
}
.vcart2:before {
  font: 21px/1 FontAwesome;
  padding-right: 2px;
}

.vcart2 {
  color: #000;
  padding-left: 14px;
  cursor: pointer;
  position: relative;
  font-size: 18px;
}
.oh:before {
    background: url("/Content/img/i/icon-logo.png") no-repeat;
    width: 40px;
    display: inline-block;
    height: 40px;
    padding-right: 5px;
    content: " ";
    position: absolute;
    left: 0;
    top: -5px;
}

@media screen and (max-width: 769px) {
  .owl-wrapper-outer {
    padding-bottom: 40px;
  }

  .owl-pagination {
    text-align: center;
    width: 100%;
  }

  #mslidedetail .owl-pagination {
    bottom: 0;
  }

  .owl-page {
    display: inline-block;
  }

  .owl-page span {
    display: block;
    width: 22px;
    height: 14px;
    border: 0;
    margin: 0 3px 0 0;
    float: left;
    text-align: center;
    background: none !important;
  }

  .owl-page span:before {
    content: "\f111";
    font: 6px/1px FontAwesome;
    color: #ccc;
    display: inline-block;
    width: 8px;
    height: 8px;
  }

  .active span:before {
    color: #666;
  }
}

@media screen and (max-width: 415px) {

.tiplist h2,
.tiplist h3,
.tiplist h4 {
  font-size: 13px;
}

.blog {
  width: 96%;
}
}

@keyframes sonar {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  100% {
    -webkit-transform: scale(4);
    transform: scale(4);
    opacity: 0;
  }
}

@font-face {
  font-family: "FontAwesome";
  src: url("/Content/awesome/fontawesome-webfont.eot?v=4.4.0");
  src: url("/Content/awesome/fontawesome-webfont.eot?#iefix&v=4.4.0") format("embedded-opentype"),
    url("/Content/awesome/fontawesome-webfont.woff2?v=4.4.0") format("woff2"),
    url("/Content/awesome/fontawesome-webfont.woff?v=4.4.0") format("woff"),
    url("/Content/awesome/fontawesome-webfont.ttf?v=4.4.0") format("truetype"),
    url("/Content/awesome/fontawesome-webfont.svg?v=4.4.0#fontawesomeregular") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>