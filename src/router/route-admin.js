const adminRoutes = [
  {
    path: "/",
    redirect: { path: "/trang-chu-stores" }, // redirect property
    component: () => import("../layouts/_share.vue"),
    children: [
      {
        path: "dashboards",
        name: "admin-dashboards",
        meta: { title: "Dashboards" },
        component: () => import("../views/dashboards/index.vue"),
      },
      {
        path: "yeu-cau-cap-nhan",
        name: "admin-requestdcdlabels",
        meta: { title: "Yêu cầu cấp nhãn" },
        component: () => import("../views/requestdcdlabels/index.vue"),
      },

      {
        path: "yeu-cau-cap-nhan/them-moi",
        name: "admin-requestdcdlabels-create",
        meta: { title: "Thêm mới - Yêu cầu cấp nhãn" },
        component: () => import("../views/requestdcdlabels/create.vue"),
      },
      {
        path: "yeu-cau-cap-nhan/sua/:id",
        name: "admin-requestdcdlabels-edit",
        meta: { title: "Sửa - Yêu cầu cấp nhãn" },
        component: () => import("../views/requestdcdlabels/edit.vue"),
      },
      {
        path: "ket-qua-do",
        name: "admin-measurementresultdatas",
        meta: { title: "Kết quả đo" },
        component: () => import("../views/measurementresultdatas/index.vue"),
      },
      {
        path: "danh-sach-don",
        name: "danh-sach-don",
        meta: { title: "Dánh sách đơn" },
        component: () => import("../views/users/dsDorder.vue"),
      },
      {
        path: "danh-sach-don-da-nhan",
        name: "danh-sach-don-da-nhan",
        meta: { title: "Dánh sách đơn đã nhận" },
        component: () => import("../views/users/dsAccept.vue"),
      },
      {
        path: "danh-sach-don-da-giao",
        name: "danh-sach-don-da-giao",
        meta: { title: "Dánh sách đơn đã giao" },
        component: () => import("../views/users/dsOrdero.vue"),
      },
      {
        path: "ket-qua-do/them-moi/:id",
        name: "admin-measurementresultdatas-create",
        meta: { title: "Thêm mới - Kết quả đo" },
        component: () => import("../views/measurementresultdatas/create.vue"),
      },
      {
        path: "san-pham/chi-tiet/:id",
        name: "admin-chi-tiet-san-pham",
        meta: { title: "Chi tiết - sản phẩm" },
        component: () => import("../views/users/detailsProduct.vue"),
      },

      {
        path: "ket-qua-do/sua/:id/:recordingDate",
        name: "admin-measurementresultdatas-edit",
        meta: { title: "Sửa - Kết quả đo" },
        component: () => import("../views/measurementresultdatas/edit.vue"),
      },
      {
        path: "hang-muc-do",
        name: "admin-measurementitems",
        meta: { title: "Hạng mục đo" },
        component: () => import("../views/measurementitems/index.vue"),
      },
      {
        path: "hang-muc-do/them-moi",
        name: "admin-measurementitems-create",
        meta: { title: "Thêm mới - Hạng mục đo" },
        component: () => import("../views/measurementitems/create.vue"),
      },
      {
        path: "hang-muc-do/sua/:id",
        name: "admin-measurementitems-edit",
        meta: { title: "Sửa - Hạng mục đo" },
        component: () => import("../views/measurementitems/edit.vue"),
      },
      {
        path: "dung-cu-do",
        name: "admin-measuringtools",
        meta: { title: "Dụng cụ đo" },
        component: () => import("../views/measuringtools/index.vue"),
      },
      {
        path: "dung-cu-do/them-moi",
        name: "admin-measuringtools-create",
        meta: { title: "Thêm mới - Dụng cụ đo" },
        component: () => import("../views/measuringtools/create.vue"),
      },
      {
        path: "dung-cu-do/sua/:id",
        name: "admin-measuringtools-edit",
        meta: { title: "Sửa - Dụng cụ đo" },
        component: () => import("../views/measuringtools/edit.vue"),
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
        component: () => import("../views/users/storeAll.vue"),
      },
      {
        path: "importExport/:id",
        name: "importExport",
        meta: { title: "Dánh sách hóa đơn" },
        component: () => import("../views/users/importExport.vue"),
      },
      {
        path: "importExport/add-new/:id",
        name: "importExport/add-new",
        meta: { title: "Thêm hóa đơn" },
        component: () => import("../views/users/createExport.vue"),
      },
      {
        path: "profile-user",
        name: "profile-user",
        meta: { title: "Thông tin cá nhân" },
        component: () => import("../views/users/profileUser.vue"),
      },

      // importExport
      {
        path: "danh-sach-order-store/:id",
        name: "danh-sach-order-store",
        meta: { title: "Dánh sách order" },
        component: () => import("../views/users/detailsOrderbyStore.vue"),
      },
      {
        path: "order-by-user/:id/customer/:customerId",
        name: "order-by-user",
        meta: { title: "Danh sách sản phẩm đã mua" },
        component: () => import("../views/users/orderByUser.vue"),
      },
      {
        path: "doanh-thu-store/:id",
        name: "doanh-thu-store",
        meta: { title: "Doanh thu" },
        component: () => import("../views/users/revenueStore.vue"),
      },
      // detailsOrderbyStore
      {
        path: "ProductByStore/:id",
        name: "ProductByStore",
        meta: { title: "ProductByStore" },
        component: () => import("../views/users/storeProduct.vue"),
      },
      {
        path: "product/edit/:id",
        name: "admin-product-edit",
        meta: { title: "sửa - product" },
        component: () => import("../views/users/editProduct.vue"),
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
        component: () => import("../views/users/createInfoStore.vue"),
      },
      {
        path: "product-type/them-moi/:id",
        name: "product-type/them-moi",
        meta: { title: "Thêm mới - product-type" },
        component: () => import("../views/users/createProductType.vue"),
      },
      {
        path: "store/staff/:id",
        name: "admin-store-all-staff",
        meta: { title: "Thêm mới - product-type" },
        component: () => import("../views/users/detailsStaffByStore.vue"),
      },

      {
        path: "product/them-moi/:id",
        name: "product/them-moi",
        meta: { title: "Thêm mới - product" },
        component: () => import("../views/users/createProduct.vue"),
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
        path: "vai-tro",
        name: "admin-roles",
        meta: { title: "Vai trò" },
        component: () => import("../views/roles/index.vue"),
      },
      {
        path: "vai-tro/them-moi",
        name: "admin-roles-create",
        meta: { title: "Thêm mới - Vai trò" },
        component: () => import("../views/roles/create.vue"),
      },
      {
        path: "vai-tro/sua/:id",
        name: "admin-roles-edit",
        meta: { title: "Sửa - Vai trò" },
        component: () => import("../views/roles/edit.vue"),
      },
      {
        path: "hoa-don/sua/:id",
        name: "hoa-don/sua",
        meta: { title: "Sửa - hoá đơn" },
        component: () => import("../views/users/editImport.vue"),
      },
      {
        path: "cai-dat",
        name: "admin-themeoptions",
        meta: { title: "Cài đặt" },
        component: () => import("../views/settings/index.vue"),
      },
      {
        path: "logs",
        name: "admin-logs",
        meta: { title: "Logs" },
        component: () => import("../views/show-logs/index.vue"),
      },
      {
        path: "logs/chi-tiet/:id",
        name: "admin-logs-detail",
        meta: { title: "Chi tiết - Logs" },
        component: () => import("../views/show-logs/detail.vue"),
      },
      {
        path: "product-type/info",
        name: "product-type/info",
        meta: { title: "Thêm mới - product-type" },
        component: () => import("../views/users/createProductTypeCo.vue"),
      },
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
    component: () => import("../views/home/homeLayout.vue"),
  },
  {
    path: "/trang-chu-stores",
    name: "trang-chu-stores",
    meta: { title: "Trang chủ cửa hàng" },
    component: () => import("../views/home/storeAllDs.vue"),
  },
  {
    path: "/trang-chu-chi-tiet-san-pham/:id",
    name: "trang-chu-chi-tiet-san-pham",
    meta: { title: "Trang chủ" },
    component: () => import("../views/home/DetailsProductHome.vue"),
  },
  {
    path: "/frivStore",
    name: "frivStore",
    meta: { title: "frivStore" },
    component: () => import("../views/home/frivStore.vue"),
  },
  {
    path: "/ordered",
    name: "ordered",
    meta: { title: "ordered" },
    component: () => import("../views/home/Ordered.vue"),
  },
  {
    path: "/trang-chu/gio-hang",
    name: "trang-chu-gio-hang",
    meta: { title: "Giỏ hàng" },
    component: () => import("../views/home/cartView.vue"),
  },
  {
    path: "/profile-client",
    name: "profile-client",
    meta: { title: "Thông tin cá nhân" },
    component: () => import("../views/users/profileUserNew.vue"),
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
