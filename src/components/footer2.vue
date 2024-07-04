<template>
    <div id="footer">
        <div class="f" style="padding: 40px 0">
            <div class="wrap flexJus">
                <div class="f flex">
                    <div class="fotb" style="width: 30%; padding-right: 30px">
                        <router-link to="/trang-chu-stores">
    <div class="logo-container">
      <div class="logo-icon">
        <img src="https://res.cloudinary.com/dqvr7kat6/image/upload/v1720022364/yyqubml5cvkswkuqxcfd.webp" alt="Logo Icon">
      </div>
      <div class="logo-text">
        <span>SMBK</span>
        <div class="logo-subtext">Hệ thống quản lí bán hàng </div>
      </div>
    </div>
  </router-link>
                    </div>
                    <div class="fotb" style="width: 70%; padding: 0 40px 0 60px">
                        <div class="muahang f flexC">
                            <div class="showrooms">
                                <ul>
                                    <li style="margin-bottom: 10px;">Hệ thống hỗ trợ quản lí và bán hàng tạp hóa</li>
                                    <li>
                                        <span>Địa chỉ văn phòng: </span>21C Trần Duy Hưng, Cầu Giấy, HN
                                    </li>
                                    <li>
                                        <span>Liên hệ hỗ trợ : </span><a href="tel:0933665115">0933.66.5115</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="fotb">
                        <label>THÔNG TIN - HƯỚNG DẪN SỬ DỤNG</label>
                        <ul>
                            <li>
                                <p title="Giới Thiệu Hệ Thống" rel="nofollow" href="/">Giới Thiệu Hệ Thống</p>
                            </li>

                            <li>
                                <p title="Giao hàng &amp; Thanh toán" rel="nofollow" href="/">Giao hàng &amp; Thanh
                                    toán</p>
                            </li>

                            <li>
                                <p title="Hướng dẫn mua hàng Online" rel="nofollow" href="/">Hướng dẫn mua hàng
                                    Online</p>
                            </li>

                            <li>
                                <p title="Quy chế hoạt động" rel="nofollow" href="/">Quy chế hoạt động</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="f p10 cen trang copyright">
            © 2024 bản quyền thuộc về HungNL@gmail.com
        </div>

    </div>



</template>

<style scoped>
.dichvu {
    padding: 20px 0;
    background: #fff;
}

.dichvu ul {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}

.dichvu li {
    margin: 0 10px;
    border: 4px solid #eee;
    padding: 50px 15px;
    text-align: center;
    color: #666;
    width: 234px;
    position: relative;
}

.dichvu li span {
    font: 16px arial;
    margin-bottom: 20px;
    display: block;
    text-transform: uppercase;
}

.dichvu li i {
    position: absolute;
    width: 40px;
    height: 40px;
    background: #fff;
    top: -20px;
    left: calc(50% - 20px);
    text-align: center;
}

.dichvu li i:before {
    font: 26px/40px FontAwesome;
}

.wrap {
    width: 98%;
    margin: 0 auto;
    max-width: 1300px;
}

.f,
.iv div {
    width: 100%;
    float: left;
}

.flex {
    display: flex;
    justify-content: space-between;
}

.fotb {
    float: left;
    width: 30%;
    color: #fff;
}

.fotb a {
    color: #fff;
}

.fotb:nth-last-child(1) {
    margin-right: 0;
}

.fotb label {
    display: block;
    margin-bottom: 10px;
    font: bold 13px/25px arial;
    text-transform: uppercase;
}

.fotb label:before {
    font: 14px/18px FontAwesome;
    margin-right: 5px;
}

.fotb:nth-last-child(1) label:before {
    content: "\f095";
}

.fotb:nth-last-child(2) label:before {
    content: "\f129";
}

.fotb:nth-last-child(3) label:before {
    content: "\f0f6";
}

.muahang p a {
    color: #ffb229;
    min-width: 105px !important;
    display: inline-block;
    padding-left: 5px;
}

.muahang p span {
    width: 70px;
    display: inline-block;
}

.flexC {
    display: flex;
    flex-direction: column;
}



.showrooms li {
    float: left;
    width: 100%;
}

.showrooms li:nth-child(1) {
    font-weight: bold;
    text-transform: uppercase;
}

.showrooms li:nth-child(1):before {
    font: 14px/18px FontAwesome;
    margin-right: 5px;
    content: "\f041";
}

.showrooms span {
    display: inline-block;
    width: 140px;
    color: #aaa;
    margin-bottom: 10px;
}

.showrooms li i {
    font: 12px arial;
    color: red;
}

.showrooms li a {
    color: orange !important;
}

.p10 {
    padding: 10px;
}

.cen,
.v {
    text-align: center;
}

.trang {
    color: #fff;
}

.copyright {
    border-top: 1px solid #1a1d2a;
}

.copyright a {
    color: #fff;
}

#footer {
    width: 100%;
    float: left;
    margin-top: 20px;
    background: #1a1d2a;
}
.logo-container {
      display: flex;
      align-items: center;
    }
    .logo-icon img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .logo-text {
      font-size: 40px;
      font-weight: bold;
      color: #FFA500;
    }
    .logo-text span {
      display: block;
    }
    .logo-subtext {
      font-size: 14px;
      color: #FFA500;
    }
    a {
      text-decoration: none; /* Bỏ gạch chân */
    }
</style>