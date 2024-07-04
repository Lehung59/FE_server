const userNOW = JSON.parse(localStorage.getItem("auth"));
const adminRoutes = [
  {
    path: "/",
    redirect: (to) => {
      if (userNOW) {
        console.log(userNOW.role)

        switch (userNOW.role) {
          case 'ADMIN':
            return { path: '/danh-sach-nguoi-dung' };
          case 'USER':
            return { path: '/trang-chu-stores' };
          case 'MANAGER':
            return { path: `/doanh-thu-store/${userNOW.storeId}` };
          case 'SHIPPER':
            return { path: '/danh-sach-don' }; // Default redirect if role is unrecognized
        }
      } else {
        return { path: '/login' }; // Redirect to login if no user is logged in
      }
    }, // redirect property
    component: () => import("../layouts/_share.vue"),
    children: [
      {
        path: "dashboards",
        name: "admin-dashboards",
        meta: { title: "Dashboards" },
        component: () => import("../views/dashboards/index.vue"),
      },
      {
        path: "danh-sach-don",
        name: "danh-sach-don",
        meta: { title: "Dánh sách đơn" },
        component: () => import("../views/_shippers/danhsachdonhang.vue"),
      },
      {
        path: "danh-sach-don-da-nhan",
        name: "danh-sach-don-da-nhan",
        meta: { title: "Dánh sách đơn đã nhận" },
        component: () => import("../views/_shippers/danhsachdanhan.vue"),
      },
      {
        path: "danh-sach-don-da-giao",
        name: "danh-sach-don-da-giao",
        meta: { title: "Dánh sách đơn đã giao" },
        component: () => import("../views/_shippers/danhsachdagiao.vue"),
      },

      {
        path: "san-pham/chi-tiet/:id",
        name: "admin-chi-tiet-san-pham",
        meta: { title: "Chi tiết - sản phẩm" },
        component: () => import("../views/users/detailsProduct.vue"),
      },
      {
        path: "don-hang/chi-tiet/:id",
        name: "admin-chi-tiet-don-hang",
        meta: { title: "Chi tiết - đơn hàng" },
        component: () => import("../views/_managers/detailsOrderbyStore.vue"),  
      },


      {
        path: "thanh-vien",
        name: "admin-users",
        meta: { title: "Thành viên" },
        component: () => import("../views/users/index.vue"),
      },
      {
        path: "danh-sach-store",
        name: "admin-store",
        meta: { title: "Dánh sách store" },
        component: () => import("../views/admins/storeAll.vue"),
      },
      {
        path: "danh-sach-nguoi-dung",
        name: "admin-account",
        meta: { title: "Dánh sách store" },
        component: () => import("../views/admins/accountAll.vue"),
      },
      {
        path: "importExport/:id",
        name: "importExport",
        meta: { title: "Dánh sách hóa đơn" },
        component: () => import("../views/_managers/importExport.vue"),
      },
      {
        path: "importExport/add-new/:id",
        name: "importExport/add-new",
        meta: { title: "Thêm hóa đơn" },
        component: () => import("../views/_managers/createExport.vue"),
      },
      {
        path: "profile-user",
        name: "profile-user",
        meta: { title: "Thông tin cá nhân" },
        component: () => import("../views/users/profileUser.vue"),
      },
      {
        path: "profile-store",
        name: "profile-store",
        meta: { title: "Thông tin cửa hàng" },
        component: () => import("../views/_managers/storeProfile.vue"),
      },
      // importExport
      {
        path: "danh-sach-order-store/:id",
        name: "danh-sach-order-store",
        meta: { title: "Dánh sách order" },
        component: () => import("../views/_managers/detailsOrderbyStore.vue"),
      },
      {
        path: "order-by-user/:id/customer/:customerId",
        name: "order-by-user",
        meta: { title: "Danh sách sản phẩm đã mua" },
        component: () => import("../views/_managers/orderByUser.vue"),
      },
      {
        path: "doanh-thu-store/:id",
        name: "doanh-thu-store",
        meta: { title: "Doanh thu" },
        component: () => import("../views/_managers/revenueStore.vue"),
      },
      // detailsOrderbyStore
      {
        path: "ProductByStore/:id",
        name: "ProductByStore",
        meta: { title: "ProductByStore" },
        component: () => import("../views/_managers/storeProduct.vue"),
      },
      {
        path: "product/edit/:id",
        name: "admin-product-edit",
        meta: { title: "sửa - product" },
        component: () => import("../views/_managers/editProduct.vue"),
      },

      {
        path: "thanh-vien/them-moi",
        name: "admin-users-create",
        meta: { title: "Thêm mới - Thành viên" },
        component: () => import("../views/users/create.vue"),
      },
      {
        path: "store/info-them-moi",
        name: "store/info-them-moi",
        meta: { title: "Thêm mới - info store" },
        component: () => import("../views/_managers/createInfoStore.vue"),
      },
      {
        path: "product-type/them-moi/:id",
        name: "product-type/them-moi",
        meta: { title: "Thêm mới - product-type" },
        component: () => import("../views/_managers/createProductType.vue"),
      },
      {
        path: "store/customer/:id",
        name: "admin-store-all-customer",
        meta: { title: "Thêm mới - product-type" },
        component: () => import("../views/_managers/detailCustomerByStore.vue"),
      },

      {
        path: "product/them-moi/:id",
        name: "product/them-moi",
        meta: { title: "Thêm mới - product" },
        component: () => import("../views/_managers/createProduct.vue"),
      },


      {
        path: "danh-sach-store/them-moi",
        name: "admin-store-create",
        meta: { title: "Thêm mới - store" },
        component: () => import("../views/users/createStore.vue"),
      },
      {
        path: "thanh-vien/them-moi-manager",
        name: "admin-manager-create",
        meta: { title: "Thêm mới - manager" },
        component: () => import("../views/users/createManager.vue"),
      },
      {
        path: "thanh-vien/them-moi-member",
        name: "admin-member-create",
        meta: { title: "Thêm mới - member" },
        component: () => import("../views/users/createMember.vue"),
      },
      {
        path: "thanh-vien/sua/:id",
        name: "admin-users-edit",
        meta: { title: "Sửa - Thành viên" },
        component: () => import("../views/users/edit.vue"),
      },
      {
        path: "hoa-don/sua/:id",
        name: "hoa-don/sua",
        meta: { title: "Sửa - hoá đơn" },
        component: () => import("../views/_managers/editImport.vue"),
      },
      {
        path: "product-type/info",
        name: "product-type/info",
        meta: { title: "Thêm mới - product-type" },
        component: () => import("../views/_managers/createProductTypeCo.vue"),
      },
    ],
  },
  {
    component: () => import("../layouts/_share.vue"),
    children: [


    ],
  },

  {
    path: "/login",
    name: "login",
    meta: { title: "Đăng nhập" },
    component: () => import("../views/auths/login.vue"),
  },

  {
    path: "/forgetpassword",
    name: "forgetpassword",
    meta: { title: "Quên mật khẩu" },
    component: () => import("../views/auths/forgetPassword.vue"),
  },
  {
    path: "/checkresetpassword",
    name: "checkresetpassword",
    meta: { title: "Mã quên mật khẩu" },
    component: () => import("../views/auths/checkresetpassword.vue")
  }
,

  {
    path: "/register",
    name: "register",
    meta: { title: "Đăng ký" },
    component: () => import("../views/auths/register.vue"),
  },
  {
    path: "/trang-chu/:id",
    name: "trang-chu",
    meta: { title: "Trang chủ" },
    component: () => import("../views/_customers/homeLayout.vue"),
  },
  {
    path: "/trang-chu-stores",
    name: "trang-chu-stores",
    meta: { title: "Trang chủ cửa hàng" },
    component: () => import("../views/_customers/storeAllDs.vue"),
  },
  {
    path: "/trang-chu-chi-tiet-san-pham/:id",
    name: "trang-chu-chi-tiet-san-pham",
    meta: { title: "Trang chủ" },
    component: () => import("../views/_customers/DetailsProductHome.vue"),
  },
  {
    path: "/favstore",
    name: "favstore",
    meta: { title: "favstore" },
    component: () => import("../views/_customers/frivStore.vue"),
  },
  {
    path: "/ordered",
    name: "ordered",
    meta: { title: "ordered" },
    component: () => import("../views/_customers/Ordered.vue"),
  },
  {
    path: "/trang-chu/gio-hang",
    name: "trang-chu-gio-hang",
    meta: { title: "Giỏ hàng" },
    component: () => import("../views/_customers/cartView.vue"),
  },
  {
    path: "/profile-client",
    name: "profile-client",
    meta: { title: "Thông tin cá nhân" },
    component: () => import("../views/_customers/profileUserNew.vue"),
  },
  {
    path: "/change-password",
    name: "change-password",
    meta: { title: "Đổi mật khẩu" },
    component: () => import("../views/auths/changePassword.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: { title: "404" },
    component: () => import("../views/response-data/404.vue"),
  },
  {
    path: "/forbidden",
    name: "forbidden",
    meta: { title: "403" },
    component: () => import("../views/response-data/forbidden.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];

export default adminRoutes;
