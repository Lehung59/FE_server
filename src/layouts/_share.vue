<template>
  <Header />
  <div class="">
    <div class="row">
      <div class="col-sm-2 d-none d-sm-flex">
        <div
          style="height: 100vh"
          class="MuiBox-root jss156 jss93 menuExpand"
          id="menuRoot"
        >
          <nav style="height: 100vh">
            <div class="MuiBox-root jss157 menuTopHeader">
              <div class="MuiBox-root jss158 menuTopLogo">
                <a
                  href="/dashboards"
                  style="color: white; padding-left: 20px"
                  class="MuiTypography-root MuiTypography-h3"
                  >Tổng quan</a
                >
              </div>
            </div>
            <hr class="menuDivider" />
            <div class="MuiBox-root jss180 menuInnerWrapper">
              <div
                class="MuiBox-root jss181 menuPrimaryInner"
                id="menuPrimaryInner"
                style="overflow-y: auto"
              >
                <nav class="MuiList-root menuList MuiList-padding">
                  <div
                    v-if="role == 'SHIPPER'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.38 11.715a1.258 1.258 0 0 0-.424-.454 4.807 4.807 0 0 0-.549-.291 6.72 6.72 0 0 0-.548-.223 1.37 1.37 0 0 1-.424-.228.417.417 0 0 1 .04-.7c.14-.09.338-.134.594-.134.233 0 .444.042.634.124.19.083.306.125.349.125a.307.307 0 0 0 .27-.156.56.56 0 0 0 .1-.301c0-.103-.048-.193-.146-.269A.959.959 0 0 0 8.9 9.04a3.918 3.918 0 0 0-.535-.087V8.26c0-.235-.207-.426-.463-.426s-.463.19-.463.426v.753c-.19.047-.37.119-.537.216-.17.1-.307.24-.409.418a1.23 1.23 0 0 0-.153.62c0 .21.041.396.124.56.083.163.193.294.328.392.135.098.285.187.449.265.163.079.326.15.487.213.162.063.31.128.445.196a.977.977 0 0 1 .328.255.54.54 0 0 1 .125.35.47.47 0 0 1-.228.425 1.048 1.048 0 0 1-.57.143 1.231 1.231 0 0 1-.773-.261 2.402 2.402 0 0 0-.227-.18.383.383 0 0 0-.21-.082c-.105 0-.199.052-.282.154a.485.485 0 0 0-.124.304c0 .2.16.386.484.556.218.115.466.19.743.228v.655c0 .235.207.425.463.425s.463-.19.463-.425v-.675c.28-.056.52-.162.72-.318.31-.242.466-.587.466-1.034 0-.266-.057-.498-.17-.697Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                        <path
                          d="M18.134 3.19h-3.126A1.538 1.538 0 0 0 13.51 2h-2.99c-.728 0-1.34.509-1.496 1.19H5.977C4.887 3.19 4 4.073 4 5.161v14.865C4 21.115 4.887 22 5.977 22h12.157c1.09 0 1.976-.885 1.976-1.973V5.162a1.977 1.977 0 0 0-1.976-1.973Zm-7.976.343c0-.2.163-.362.363-.362h2.99c.2 0 .363.162.363.362v.717c0 .2-.163.363-.363.363h-2.99a.363.363 0 0 1-.363-.363v-.717Zm7.976 17.296H5.977a.804.804 0 0 1-.804-.802V5.162c0-.442.36-.802.804-.802H8.99a1.537 1.537 0 0 0 1.531 1.423h2.99c.81 0 1.475-.629 1.532-1.423h3.09c.444 0 .805.36.805.802v14.865c0 .442-.361.802-.804.802Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                        <path
                          d="M17.14 8.436h-5.715a.586.586 0 1 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 12.513h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 16.571h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM9.157 16.498H6.769a.586.586 0 0 0 0 1.173h2.388a.586.586 0 1 0 0-1.172Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                      </svg>
                    </div>
                    <div class="MuiListItemText-root menuItemTitle">
                      <span
                        @click="navigateTo('danh-sach-don')"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Danh sách đơn</span
                      >
                    </div>
                  </div>
                  <div
                    v-if="role == 'SHIPPER'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.38 11.715a1.258 1.258 0 0 0-.424-.454 4.807 4.807 0 0 0-.549-.291 6.72 6.72 0 0 0-.548-.223 1.37 1.37 0 0 1-.424-.228.417.417 0 0 1 .04-.7c.14-.09.338-.134.594-.134.233 0 .444.042.634.124.19.083.306.125.349.125a.307.307 0 0 0 .27-.156.56.56 0 0 0 .1-.301c0-.103-.048-.193-.146-.269A.959.959 0 0 0 8.9 9.04a3.918 3.918 0 0 0-.535-.087V8.26c0-.235-.207-.426-.463-.426s-.463.19-.463.426v.753c-.19.047-.37.119-.537.216-.17.1-.307.24-.409.418a1.23 1.23 0 0 0-.153.62c0 .21.041.396.124.56.083.163.193.294.328.392.135.098.285.187.449.265.163.079.326.15.487.213.162.063.31.128.445.196a.977.977 0 0 1 .328.255.54.54 0 0 1 .125.35.47.47 0 0 1-.228.425 1.048 1.048 0 0 1-.57.143 1.231 1.231 0 0 1-.773-.261 2.402 2.402 0 0 0-.227-.18.383.383 0 0 0-.21-.082c-.105 0-.199.052-.282.154a.485.485 0 0 0-.124.304c0 .2.16.386.484.556.218.115.466.19.743.228v.655c0 .235.207.425.463.425s.463-.19.463-.425v-.675c.28-.056.52-.162.72-.318.31-.242.466-.587.466-1.034 0-.266-.057-.498-.17-.697Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                        <path
                          d="M18.134 3.19h-3.126A1.538 1.538 0 0 0 13.51 2h-2.99c-.728 0-1.34.509-1.496 1.19H5.977C4.887 3.19 4 4.073 4 5.161v14.865C4 21.115 4.887 22 5.977 22h12.157c1.09 0 1.976-.885 1.976-1.973V5.162a1.977 1.977 0 0 0-1.976-1.973Zm-7.976.343c0-.2.163-.362.363-.362h2.99c.2 0 .363.162.363.362v.717c0 .2-.163.363-.363.363h-2.99a.363.363 0 0 1-.363-.363v-.717Zm7.976 17.296H5.977a.804.804 0 0 1-.804-.802V5.162c0-.442.36-.802.804-.802H8.99a1.537 1.537 0 0 0 1.531 1.423h2.99c.81 0 1.475-.629 1.532-1.423h3.09c.444 0 .805.36.805.802v14.865c0 .442-.361.802-.804.802Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                        <path
                          d="M17.14 8.436h-5.715a.586.586 0 1 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 12.513h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 16.571h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM9.157 16.498H6.769a.586.586 0 0 0 0 1.173h2.388a.586.586 0 1 0 0-1.172Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                      </svg>
                    </div>
                    <div class="MuiListItemText-root menuItemTitle">
                      <span
                        @click="navigateTo('danh-sach-don-da-nhan')"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Đơn đã nhận</span
                      >
                    </div>
                  </div>
                  <div
                    v-if="role == 'SHIPPER'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.38 11.715a1.258 1.258 0 0 0-.424-.454 4.807 4.807 0 0 0-.549-.291 6.72 6.72 0 0 0-.548-.223 1.37 1.37 0 0 1-.424-.228.417.417 0 0 1 .04-.7c.14-.09.338-.134.594-.134.233 0 .444.042.634.124.19.083.306.125.349.125a.307.307 0 0 0 .27-.156.56.56 0 0 0 .1-.301c0-.103-.048-.193-.146-.269A.959.959 0 0 0 8.9 9.04a3.918 3.918 0 0 0-.535-.087V8.26c0-.235-.207-.426-.463-.426s-.463.19-.463.426v.753c-.19.047-.37.119-.537.216-.17.1-.307.24-.409.418a1.23 1.23 0 0 0-.153.62c0 .21.041.396.124.56.083.163.193.294.328.392.135.098.285.187.449.265.163.079.326.15.487.213.162.063.31.128.445.196a.977.977 0 0 1 .328.255.54.54 0 0 1 .125.35.47.47 0 0 1-.228.425 1.048 1.048 0 0 1-.57.143 1.231 1.231 0 0 1-.773-.261 2.402 2.402 0 0 0-.227-.18.383.383 0 0 0-.21-.082c-.105 0-.199.052-.282.154a.485.485 0 0 0-.124.304c0 .2.16.386.484.556.218.115.466.19.743.228v.655c0 .235.207.425.463.425s.463-.19.463-.425v-.675c.28-.056.52-.162.72-.318.31-.242.466-.587.466-1.034 0-.266-.057-.498-.17-.697Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                        <path
                          d="M18.134 3.19h-3.126A1.538 1.538 0 0 0 13.51 2h-2.99c-.728 0-1.34.509-1.496 1.19H5.977C4.887 3.19 4 4.073 4 5.161v14.865C4 21.115 4.887 22 5.977 22h12.157c1.09 0 1.976-.885 1.976-1.973V5.162a1.977 1.977 0 0 0-1.976-1.973Zm-7.976.343c0-.2.163-.362.363-.362h2.99c.2 0 .363.162.363.362v.717c0 .2-.163.363-.363.363h-2.99a.363.363 0 0 1-.363-.363v-.717Zm7.976 17.296H5.977a.804.804 0 0 1-.804-.802V5.162c0-.442.36-.802.804-.802H8.99a1.537 1.537 0 0 0 1.531 1.423h2.99c.81 0 1.475-.629 1.532-1.423h3.09c.444 0 .805.36.805.802v14.865c0 .442-.361.802-.804.802Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                        <path
                          d="M17.14 8.436h-5.715a.586.586 0 1 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 12.513h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 16.571h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM9.157 16.498H6.769a.586.586 0 0 0 0 1.173h2.388a.586.586 0 1 0 0-1.172Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                      </svg>
                    </div>
                    <div class="MuiListItemText-root menuItemTitle">
                      <span
                        @click="navigateTo('danh-sach-don-da-giao')"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Đơn đã giao</span
                      >
                    </div>
                  </div>
                  <div
                    class="MuiCollapse-container MuiCollapse-hidden"
                    style="min-height: 0px"
                  >
                    <div class="MuiCollapse-wrapper">
                      <div class="MuiCollapse-wrapperInner jss187">
                        <div
                          class="MuiBox-root jss243 menuListSubMenuItem menuListSubMenuItemLevel-0"
                        >
                          <a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Tạo đơn và giao hàng
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Danh sách đơn hàng
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/order_returns"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Khách trả hàng
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.453 9.323a.605.605 0 0 0-.829 0l-2.617 2.503-1.006-.963a.605.605 0 0 0-.83 0 .544.544 0 0 0 0 .793l1.422 1.36c.114.109.264.164.414.164.15 0 .3-.055.415-.165l3.031-2.9a.544.544 0 0 0 0-.792Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                        <path
                          d="M20.442 5H9.308c-.86 0-1.558.668-1.558 1.49v1.343H4.44C3.096 7.833 2 8.88 2 10.167v5.935c0 .725.617 1.315 1.375 1.315h1.157c.268 1.153 1.346 2.019 2.632 2.019s2.364-.866 2.632-2.02h4.402c.268 1.154 1.346 2.02 2.632 2.02 1.285 0 2.363-.866 2.632-2.02h.98c.86 0 1.558-.668 1.558-1.49V6.49C22 5.668 21.301 5 20.442 5ZM4.532 16.296H3.375a.199.199 0 0 1-.203-.194v-5.935c0-.67.569-1.214 1.269-1.214H7.75v5.386a2.81 2.81 0 0 0-.586-.062c-1.286 0-2.364.866-2.632 2.02Zm2.632 2.02c-.841 0-1.525-.655-1.525-1.46 0-.804.684-1.458 1.525-1.458.84 0 1.525.654 1.525 1.459 0 .804-.684 1.458-1.525 1.458Zm9.666 0c-.841 0-1.525-.655-1.525-1.46 0-.804.684-1.458 1.525-1.458.84 0 1.525.654 1.525 1.459 0 .804-.684 1.458-1.525 1.458Zm3.612-2.02h-.98c-.269-1.153-1.347-2.019-2.633-2.019-1.285 0-2.363.866-2.631 2.02H9.796a2.564 2.564 0 0 0-.874-1.394V6.49c0-.204.173-.37.386-.37h11.134c.213 0 .386.166.386.37v9.437c0 .204-.173.37-.386.37Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                      </svg>
                    </div>
                    <div class="MuiListItemText-root menuItemTitle">
                      <span
                        @click="navigateTo('admin-member-create')"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Đăng kí user</span
                      >
                    </div>
                  </div> -->
                  <div
                    class="MuiCollapse-container MuiCollapse-hidden"
                    style="min-height: 0px"
                  >
                    <div class="MuiCollapse-wrapper">
                      <div class="MuiCollapse-wrapperInner jss187">
                        <div
                          class="MuiBox-root jss244 menuListSubMenuItem menuListSubMenuItemLevel-0"
                        >
                          <a
                            class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button MuiTypography-colorPrimary"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            to="/trang-chu-stores"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Tổng quan
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/shipments"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Quản lý vận đơn
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/delivery_collations"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Đối soát COD và phí
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/shippers"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Kết nối đối tác
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/settings/shippings"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Cấu hình giao hàng
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--
                  <div
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m21.24 6.62-8.832-4.474-.003-.002a1.38 1.38 0 0 0-1.25.012l-3.789 2.01a.59.59 0 0 0-.088.047l-4.54 2.41A1.373 1.373 0 0 0 2 7.841v8.316c0 .514.283.981.738 1.22l8.413 4.465.003.002a1.377 1.377 0 0 0 1.25.011l8.836-4.477c.47-.235.761-.706.761-1.231V7.852c0-.525-.291-.997-.76-1.231Zm-9.543-3.426a.205.205 0 0 1 .184-.002l8.267 4.189-3.217 1.602-8.083-4.277 2.85-1.512Zm-.5 17.347-7.911-4.2-.004-.001a.204.204 0 0 1-.11-.182V8.371l8.025 4.184v7.986Zm.592-8.998L3.808 7.38l3.79-2.012 8.042 4.256-3.851 1.918Zm9.04 4.605a.204.204 0 0 1-.113.183l-8.348 4.23v-7.998l3.844-1.914v2.007a.586.586 0 0 0 1.171 0v-2.59L20.83 8.35v7.798Z"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        ></path>
                      </svg>
                    </div>
                    <div class="MuiListItemText-root menuItemTitle">
                      <span
                        @click="navigateTo('admin-manager-create')"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Đăng kí manager</span
                      >
                    </div>
                  </div> -->
                  <div
                    class="MuiCollapse-container MuiCollapse-hidden"
                    style="min-height: 0px"
                  >
                    <div class="MuiCollapse-wrapper">
                      <div class="MuiCollapse-wrapperInner jss187">
                        <div
                          class="MuiBox-root jss251 menuListSubMenuItem menuListSubMenuItemLevel-0"
                        >
                          <a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/products"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Danh sách sản phẩm
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/variants"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Quản lý kho
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/order_suppliers"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Đặt hàng nhập
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/purchase_orders"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Nhập hàng
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/stock_adjustments"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Kiểm hàng
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/stock_transfers"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Chuyển hàng
                              </span>
                            </div> </a
                          ><a
                            class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button MuiTypography-colorPrimary"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            to="/admin/suppliers"
                            href="/admin/suppliers"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Nhà cung cấp
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/price_adjustments"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Điều chỉnh giá vốn
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="role == 'ADMIN'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3Zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div class="MuiListItemText-root menuItemTitle">
                      <span
                        @click="navigateTo('admin-store')"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Danh sách cửa hàng</span
                      >
                    </div>
                  </div>
                  <div
                    v-if="role == 'MANAGER'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <img
                        style="width: 30px"
                        src="../../public/payment.png"
                        alt=""
                        srcset=""
                      />
                    </div>

                    <div class="MuiListItemText-root menuItemTitle">
                      <a
                      :href="'/importExport/' + storeId.storeId"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Hoá đơn</a
                      >
                    </div>
                  </div>
                  <div
                    v-if="role == 'MANAGER'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3Zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div class="MuiListItemText-root menuItemTitle">
                      <a
                        :href="'/store/staff/'+ storeId.storeId"
                      

                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Khách hàng</a
                      >
                    </div>
                  </div>
                  <div
                    v-if="role == 'MANAGER'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <img
                        style="width: 30px"
                        src="../../public/salary.png"
                        alt=""
                        srcset=""
                      />
                    </div>

                    <div class="MuiListItemText-root menuItemTitle">
                      <a
                      
                       :href="'/doanh-thu-store/' + storeId.storeId"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Doanh thu</a
                      >
                    </div>
                  </div>
                  <div
                    v-if="role == 'MANAGER'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <img
                        style="width: 30px"
                        src="../../public/products.png"
                        alt=""
                        srcset=""
                      />
                    </div>

                    <div class="MuiListItemText-root menuItemTitle">
                      <a
                        :href="'/ProductByStore/'+ storeId.storeId"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Sản phẩm</a
                      >
                    </div>
                  </div>
                  <div
                    v-if="role == 'MANAGER'"
                    class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                  >
                    <div class="MuiListItemIcon-root">
                      <img
                        style="width: 30px"
                        src="../../public/order-now.png"
                        alt=""
                        srcset=""
                      />
                    </div>

                    <div class="MuiListItemText-root menuItemTitle">
                      <a
                        :href="'/danh-sach-order-store/' + storeId.storeId"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                        >Đơn hàng</a
                      >
                    </div>
                  </div>

                  <div
                    class="MuiCollapse-container MuiCollapse-hidden"
                    style="min-height: 0px"
                  >
                    <div class="MuiCollapse-wrapper">
                      <div class="MuiCollapse-wrapperInner jss187">
                        <div
                          class="MuiBox-root jss252 menuListSubMenuItem menuListSubMenuItemLevel-0"
                        >
                          <a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/customers"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Danh sách khách hàng
                              </span>
                            </div> </a
                          ><a
                            class="MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button"
                            tabindex="0"
                            role="button"
                            aria-disabled="false"
                            href="/admin/customer_groups"
                          >
                            <div class="MuiListItemText-root menuItemTitle">
                              <span
                                class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                                >Nhóm khách hàng
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div
                    class="MuiTypography-root MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button MuiTypography-body1"
                    tabindex="0"
                    role="button"
                    aria-disabled="false"
                    to="/admin/api/auth?api_key=6f71b0b3f866db0d7bf7ef3d8a1f32b6"
                  >
                    <div class="MuiListItemIcon-root">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m10.806 11.113-1.799-.274-.804-1.707a.223.223 0 0 0-.407 0l-.803 1.707-1.8.274a.223.223 0 0 0-.129.069.244.244 0 0 0 .005.336l1.3 1.329-.307 1.876a.247.247 0 0 0 .014.13.236.236 0 0 0 .077.102.22.22 0 0 0 .238.018L8 14.087l1.609.886a.216.216 0 0 0 .144.023.236.236 0 0 0 .185-.273l-.308-1.877 1.301-1.328a.24.24 0 0 0 .066-.136.235.235 0 0 0-.19-.27Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                        ></path>
                        <rect
                          x="1.875"
                          y="5.875"
                          width="20.25"
                          height="13.25"
                          rx="2.125"
                          stroke="currentColor"
                          stroke-width="1.75"
                        ></rect>
                        <path
                          d="M14 11h5M14 14h3"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </div>
                    <div class="MuiListItemText-root menuItemTitle">
                      <span
                        @click="navigateTo('store/info-them-moi')"
                        class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"
                      >
                        Thêm info store
                      </span>
                    </div>
                  </div> -->
                </nav>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="col-12 col-sm-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    navigateToProduct(storeId) {
      this.$router.push({ name: "ProductByStore", params: { storeId } });
    },
  },

  data() {
    return {
      role: null,
      storeId : JSON.parse(localStorage.getItem("auth"))
    };
  },

  mounted() {
    try {
      const data = JSON.parse(localStorage.getItem("auth"));
      this.role = data.role;
      console.log(data.role);
      console.log("Retrieved role:", this.role);
    } catch (error) {
      console.error("Error retrieving role from localStorage:", error);
      // Handle potential errors gracefully (e.g., display a message)
    }
  },
};
</script>

<style scoped>
.menu {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  background-color: #fff;
  padding: 10px;
}

.menu p {
  margin: 0;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu p:hover {
  background-color: #f0f0f0;
}

.MuiPaper-root {
  color: #0f1824;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
}
.MuiPaper-rounded {
  border-radius: 3px;
}
.MuiPaper-outlined {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation0 {
  box-shadow: none;
}
.MuiPaper-elevation1 {
  box-shadow: none;
}
.MuiPaper-elevation2 {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation3 {
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation4 {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation5 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation6 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation7 {
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2),
    0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation8 {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation9 {
  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2),
    0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation10 {
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation11 {
  box-shadow: 0px 6px 7px -4px rgba(0, 0, 0, 0.2),
    0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation12 {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation13 {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation14 {
  box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2),
    0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation15 {
  box-shadow: 0px 8px 9px -5px rgba(0, 0, 0, 0.2),
    0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation16 {
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation17 {
  box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2),
    0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation18 {
  box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2),
    0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation19 {
  box-shadow: 0px 9px 12px -6px rgba(0, 0, 0, 0.2),
    0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation20 {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
    0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation21 {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
    0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation22 {
  box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2),
    0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation23 {
  box-shadow: 0px 11px 14px -7px rgba(0, 0, 0, 0.2),
    0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12);
}
.MuiPaper-elevation24 {
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}
.MuiCollapse-container {
  height: 0;
  overflow: hidden;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.MuiCollapse-entered {
  height: auto;
  overflow: visible;
}
.MuiCollapse-hidden {
  visibility: hidden;
}
.MuiCollapse-wrapper {
  display: flex;
}
.MuiCollapse-wrapperInner {
  width: 100%;
}
.MuiSvgIcon-root {
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  flex-shrink: 0;
  user-select: none;
}
.MuiSvgIcon-colorPrimary {
  color: #0088ff;
}
.MuiSvgIcon-colorSecondary {
  color: #747c87;
}
.MuiSvgIcon-colorAction {
  color: rgba(0, 0, 0, 0.54);
}
.MuiSvgIcon-colorError {
  color: #f44336;
}
.MuiSvgIcon-colorDisabled {
  color: rgba(0, 0, 0, 0.26);
}
.MuiSvgIcon-fontSizeInherit {
  font-size: inherit;
}
.MuiSvgIcon-fontSizeSmall {
  font-size: 1.25rem;
}
.MuiSvgIcon-fontSizeLarge {
  font-size: 2.1875rem;
}
html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
strong,
b {
  font-weight: 700;
}
body {
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
  font-size: 0.875rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 1.43;
  background-color: #fafafa;
}
@media print {
  body {
    background-color: #fff;
  }
}
body::backdrop {
  background-color: #fafafa;
}
.MuiMenu-list.MuiList-padding {
  padding: 6px 5px;
}
.MuiTypography-root {
  margin: 0;
}
.MuiTypography-body2 {
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 19px;
}
.MuiTypography-body1 {
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 20px;
}
.MuiTypography-caption {
  font-size: 0.71rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 12px;
}
.MuiTypography-button {
  font-size: 0.875rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
}
.MuiTypography-h1 {
  font-size: 6rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 300;
  line-height: 1.167;
}
.MuiTypography-h2 {
  font-size: 3.75rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 300;
  line-height: 1.2;
}
.MuiTypography-h3 {
  font-size: 1.7rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 30px;
}
.MuiTypography-h4 {
  font-size: 1.4rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 24px;
}
.MuiTypography-h5 {
  font-size: 1.25rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 22px;
}
.MuiTypography-h6 {
  font-size: 1.125rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 20px;
}
.MuiTypography-subtitle1 {
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 20px;
}
.MuiTypography-subtitle2 {
  font-size: 0.875rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 15px;
}
.MuiTypography-overline {
  font-size: 0.75rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 400;
  line-height: 2.66;
  text-transform: uppercase;
}
.MuiTypography-srOnly {
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.MuiTypography-alignLeft {
  text-align: left;
}
.MuiTypography-alignCenter {
  text-align: center;
}
.MuiTypography-alignRight {
  text-align: right;
}
.MuiTypography-alignJustify {
  text-align: justify;
}
.MuiTypography-noWrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.MuiTypography-gutterBottom {
  margin-bottom: 0.35em;
}
.MuiTypography-paragraph {
  margin-bottom: 16px;
}
.MuiTypography-colorInherit {
  color: inherit;
}
.MuiTypography-colorPrimary {
  color: #0088ff;
}
.MuiTypography-colorSecondary {
  color: #747c87;
}
.MuiTypography-colorTextPrimary {
  color: #0f1824;
}
.MuiTypography-colorTextSecondary {
  color: #747c87;
}
.MuiTypography-colorError {
  color: #f44336;
}
.MuiTypography-displayInline {
  display: inline;
}
.MuiTypography-displayBlock {
  display: block;
}
.MuiTouchRipple-root {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;

  border-radius: inherit;
  pointer-events: none;
}
.MuiTouchRipple-ripple {
  opacity: 0;
}
.MuiTouchRipple-rippleVisible {
  opacity: 0.3;
  animation: MuiTouchRipple-keyframes-enter 550ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1);
}
.MuiTouchRipple-ripplePulsate {
  animation-duration: 200ms;
}
.MuiTouchRipple-child {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 1;
  border-radius: 50%;
  background-color: currentColor;
}
.MuiTouchRipple-childLeaving {
  opacity: 0;
  animation: MuiTouchRipple-keyframes-exit 550ms cubic-bezier(0.4, 0, 0.2, 1);
}
.MuiTouchRipple-childPulsate {
  top: 0;
  left: 0;

  animation: MuiTouchRipple-keyframes-pulsate 2500ms
    cubic-bezier(0.4, 0, 0.2, 1) 200ms infinite;
}
@-webkit-keyframes MuiTouchRipple-keyframes-enter {
  0% {
    opacity: 0.1;
    transform: scale(0);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}
@-webkit-keyframes MuiTouchRipple-keyframes-exit {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes MuiTouchRipple-keyframes-pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1);
  }
}
.MuiButtonBase-root {
  color: inherit;
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  padding: 0;

  align-items: center;
  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  -moz-appearance: none;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}
.MuiButtonBase-root::-moz-focus-inner {
  border-style: none;
}
.MuiButtonBase-root.Mui-disabled {
  cursor: default;
  pointer-events: none;
}
.MuiListItem-root {
  width: 100%;
  display: flex;

  box-sizing: border-box;
  text-align: left;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  justify-content: flex-start;
  text-decoration: none !important;
}
.MuiListItem-root.Mui-focusVisible {
  background-color: rgba(0, 0, 0, 0.08);
}
.MuiListItem-root.Mui-selected,
.MuiListItem-root.Mui-selected:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
.MuiListItem-root.Mui-disabled {
  opacity: 0.5;
}
.MuiListItem-container {
}
.MuiListItem-dense {
  padding-top: 4px;
  padding-bottom: 4px;
}
.MuiListItem-alignItemsFlexStart {
  align-items: flex-start;
}
.MuiListItem-divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-clip: padding-box;
}
.MuiListItem-gutters {
  padding-left: 16px;
  padding-right: 16px;
}
.MuiListItem-button {
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.MuiListItem-button:hover {
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.04);
}
@media (hover: none) {
  .MuiListItem-button:hover {
    background-color: transparent;
  }
}
.MuiListItem-secondaryAction {
  padding-right: 48px;
}
.MuiLink-underlineNone {
  text-decoration: none;
}
.MuiLink-underlineHover {
  text-decoration: none;
}
.MuiLink-underlineHover:hover {
  text-decoration: underline;
}
.MuiLink-underlineAlways {
  text-decoration: underline;
}
.MuiLink-button {
  border: 0;
  cursor: pointer;
  margin: 0;
  outline: 0;
  padding: 0;

  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  -moz-appearance: none;
  background-color: transparent;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}
.MuiLink-button::-moz-focus-inner {
  border-style: none;
}
.MuiLink-button.Mui-focusVisible {
  outline: auto;
}
.MuiListItemIcon-root {
  color: rgba(0, 0, 0, 0.54);
  display: inline-flex;
  min-width: 56px;
  flex-shrink: 0;
}
.MuiListItemIcon-alignItemsFlexStart {
  margin-top: 8px;
}
.MuiList-root {
  margin: 0;
  padding: 0;

  list-style: none;
}
.MuiList-padding {
  padding-top: 8px;
  padding-bottom: 8px;
}
.MuiList-subheader {
  padding-top: 0;
}
.MuiIconButton-root {
  flex: 0 0 auto;
  color: #0f1824;
  padding: 12px;
  overflow: visible;
  font-size: 1rem;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
}
.MuiIconButton-root:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
.MuiIconButton-root.Mui-disabled {
  color: rgba(0, 0, 0, 0.26);
  background-color: transparent;
}
@media (hover: none) {
  .MuiIconButton-root:hover {
    background-color: transparent;
  }
}
.MuiIconButton-edgeStart {
  margin-left: -12px;
}
.MuiIconButton-sizeSmall.MuiIconButton-edgeStart {
  margin-left: -3px;
}
.MuiIconButton-edgeEnd {
  margin-right: -12px;
}
.MuiIconButton-sizeSmall.MuiIconButton-edgeEnd {
  margin-right: -3px;
}
.MuiIconButton-colorInherit {
  color: inherit;
}
.MuiIconButton-colorPrimary {
  color: #0088ff;
}
.MuiIconButton-colorPrimary:hover {
  background-color: rgba(0, 136, 255, 0.04);
}
@media (hover: none) {
  .MuiIconButton-colorPrimary:hover {
    background-color: transparent;
  }
}
.MuiIconButton-colorSecondary {
  color: #747c87;
}
.MuiIconButton-colorSecondary:hover {
  background-color: rgba(116, 124, 135, 0.04);
}
@media (hover: none) {
  .MuiIconButton-colorSecondary:hover {
    background-color: transparent;
  }
}
.MuiIconButton-sizeSmall {
  padding: 3px;
  font-size: 1.125rem;
}
.MuiIconButton-label {
  width: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
}
@media print {
  .MuiDialog-root {
  }
}
.MuiDialog-scrollPaper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.MuiDialog-scrollBody {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}
.MuiDialog-scrollBody:after {
  width: 0;
  height: 100%;
  content: "";
  display: inline-block;
  vertical-align: middle;
}
.MuiDialog-container {
  height: 100%;
  outline: 0;
}
@media print {
  .MuiDialog-container {
    height: auto;
  }
}
.MuiDialog-paper {
  margin: 32px;

  overflow-y: auto;
}
@media print {
  .MuiDialog-paper {
    box-shadow: none;
    overflow-y: visible;
  }
}
.MuiDialog-paperScrollPaper {
  display: flex;
  max-height: calc(100% - 64px);
  flex-direction: column;
}
.MuiDialog-paperScrollBody {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
.MuiDialog-paperWidthFalse {
  max-width: calc(100% - 64px);
}
.MuiDialog-paperWidthXs {
  max-width: 444px;
}
@media (max-width: 507.95px) {
  .MuiDialog-paperWidthXs.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}
.MuiDialog-paperWidthSm {
  max-width: 600px;
}
@media (max-width: 663.95px) {
  .MuiDialog-paperWidthSm.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}
.MuiDialog-paperWidthMd {
  max-width: 960px;
}
@media (max-width: 1023.95px) {
  .MuiDialog-paperWidthMd.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}
.MuiDialog-paperWidthLg {
  max-width: 1280px;
}
@media (max-width: 1343.95px) {
  .MuiDialog-paperWidthLg.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}
.MuiDialog-paperWidthXl {
  max-width: 1920px;
}
@media (max-width: 1983.95px) {
  .MuiDialog-paperWidthXl.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}
.MuiDialog-paperFullWidth {
  width: calc(100% - 64px);
}
.MuiDialog-paperFullScreen {
  width: 100%;
  height: 100%;
  margin: 0;
  max-width: 100%;
  max-height: none;
  border-radius: 0;
}
.MuiDialog-paperFullScreen.MuiDialog-paperScrollBody {
  margin: 0;
  max-width: 100%;
}
.MuiButton-root {
  color: #0f1824;
  height: 36px;
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 80px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-weight: 500;
  line-height: 1;
  border-radius: 10px;
  text-transform: uppercase;
}
.MuiButton-root:hover {
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.04);
}
.MuiButton-root.Mui-disabled {
  color: rgba(0, 0, 0, 0.26);
}
@media (hover: none) {
  .MuiButton-root:hover {
    background-color: transparent;
  }
}
.MuiButton-root:hover.Mui-disabled {
  background-color: transparent;
}
.MuiButton-label {
  width: 100%;
  display: inherit;
  font-size: 1rem;
  align-items: inherit;
  text-transform: none;
  justify-content: inherit;
}
.MuiButton-text {
  padding: 6px 8px;
}
.MuiButton-textPrimary {
  color: #0088ff;
}
.MuiButton-textPrimary:hover {
  background-color: rgba(0, 136, 255, 0.04);
}
@media (hover: none) {
  .MuiButton-textPrimary:hover {
    background-color: transparent;
  }
}
.MuiButton-textSecondary {
  color: #747c87;
}
.MuiButton-textSecondary:hover {
  background-color: rgba(116, 124, 135, 0.04);
}
@media (hover: none) {
  .MuiButton-textSecondary:hover {
    background-color: transparent;
  }
}
.MuiButton-outlined {
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 5px 18px 4px;
  font-weight: bold;
  border-color: #ebedf1;
  border-width: 2px;
}
.MuiButton-outlined.Mui-disabled {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.MuiButton-outlinedPrimary {
  color: #0088ff;
  border: 1px solid rgba(0, 136, 255, 0.5);
}
.MuiButton-outlinedPrimary:hover {
  border: 1px solid #0088ff;
  background-color: rgba(0, 136, 255, 0.04);
}
@media (hover: none) {
  .MuiButton-outlinedPrimary:hover {
    background-color: transparent;
  }
}
.MuiButton-outlinedSecondary {
  color: #747c87;
  border: 1px solid rgba(116, 124, 135, 0.5);
}
.MuiButton-outlinedSecondary:hover {
  border: 1px solid #747c87;
  background-color: rgba(116, 124, 135, 0.04);
}
.MuiButton-outlinedSecondary.Mui-disabled {
  border: 1px solid rgba(0, 0, 0, 0.26);
}
@media (hover: none) {
  .MuiButton-outlinedSecondary:hover {
    background-color: transparent;
  }
}
.MuiButton-contained {
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background-color: #e0e0e0;
}
.MuiButton-contained:hover {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-color: #d5d5d5;
}
.MuiButton-contained.Mui-focusVisible {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
.MuiButton-contained:active {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.MuiButton-contained.Mui-disabled {
  color: rgba(0, 0, 0, 0.26);
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0.12);
}
@media (hover: none) {
  .MuiButton-contained:hover {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    background-color: #e0e0e0;
  }
}
.MuiButton-contained:hover.Mui-disabled {
  background-color: rgba(0, 0, 0, 0.12);
}
.MuiButton-containedPrimary {
  color: #fff;
  background-color: #0088ff;
}
.MuiButton-containedPrimary:hover {
  background-color: #006db3;
}
@media (hover: none) {
  .MuiButton-containedPrimary:hover {
    background-color: #0088ff;
  }
}
.MuiButton-containedSecondary {
  color: #fff;
  background-color: #747c87;
}
.MuiButton-containedSecondary:hover {
  background-color: rgb(81, 86, 94);
}
@media (hover: none) {
  .MuiButton-containedSecondary:hover {
    background-color: #747c87;
  }
}
.MuiButton-disableElevation {
  box-shadow: none;
}
.MuiButton-disableElevation:hover {
  box-shadow: none;
}
.MuiButton-disableElevation.Mui-focusVisible {
  box-shadow: none;
}
.MuiButton-disableElevation:active {
  box-shadow: none;
}
.MuiButton-disableElevation.Mui-disabled {
  box-shadow: none;
}
.MuiButton-colorInherit {
  color: inherit;
  border-color: currentColor;
}
.MuiButton-textSizeSmall {
  padding: 4px 5px;
  font-size: 0.8125rem;
}
.MuiButton-textSizeLarge {
  padding: 8px 11px;
  font-size: 0.9375rem;
}
.MuiButton-outlinedSizeSmall {
  padding: 3px 9px;
  font-size: 0.8125rem;
}
.MuiButton-outlinedSizeLarge {
  padding: 7px 21px;
  font-size: 0.9375rem;
}
.MuiButton-containedSizeSmall {
  padding: 4px 10px;
  font-size: 0.8125rem;
}
.MuiButton-containedSizeLarge {
  padding: 8px 22px;
  font-size: 0.9375rem;
}
.MuiButton-fullWidth {
  width: 100%;
}
.MuiButton-startIcon {
  display: inherit;
  margin-left: -4px;
  margin-right: 8px;
}
.MuiButton-startIcon.MuiButton-iconSizeSmall {
  margin-left: -2px;
}
.MuiButton-endIcon {
  display: inherit;
  margin-left: 8px;
  margin-right: -4px;
}
.MuiButton-endIcon.MuiButton-iconSizeSmall {
  margin-right: -2px;
}
.MuiButton-iconSizeSmall > *:first-child {
  font-size: 18px;
}
.MuiButton-iconSizeMedium > *:first-child {
  font-size: 20px;
}
.MuiButton-iconSizeLarge > *:first-child {
  font-size: 22px;
}

.jss297 {
  z-index: 100000;
}
.jss297[x-placement*="bottom"] .jss298 {
  top: 0;
  left: 0;
  margin-top: -0.71em;
  margin-left: 4px;
  margin-right: 4px;
}
.jss297[x-placement*="top"] .jss298 {
  left: 0;
  bottom: 0;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: -0.71em;
}
.jss297[x-placement*="right"] .jss298 {
  left: 0;
  width: 0.71em;
  height: 1em;
  margin-top: 4px;
  margin-left: -0.71em;
  margin-bottom: 4px;
}
.jss297[x-placement*="left"] .jss298 {
  right: 0;
  width: 0.71em;
  height: 1em;
  margin-top: 4px;
  margin-right: -0.71em;
  margin-bottom: 4px;
}
.jss297[x-placement*="left"] .jss298::before {
  transform-origin: 0 0;
}
.jss297[x-placement*="right"] .jss298::before {
  transform-origin: 100% 100%;
}
.jss297[x-placement*="top"] .jss298::before {
  transform-origin: 100% 0;
}
.jss297[x-placement*="bottom"] .jss298::before {
  transform-origin: 0 100%;
}
.jss298 {
  width: 1em;
  height: 0.71em;
  overflow: hidden;

  box-sizing: border-box;
}
.jss298::before {
  width: 100%;
  border: 1px solid #d3d5d7;
  height: 100%;
  margin: auto;
  content: "";
  display: block;
  transform: rotate(45deg);
  background-color: #fff;
}
.jss299 {
  max-width: 1000px;
  min-width: 230px;
  background-color: #fff;
}
.jss301 {
  left: auto !important;
}
.jss302 {
  margin-left: -30px;
}
.MuiListItemText-root {
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 4px;
  margin-bottom: 4px;
}
.MuiListItemText-multiline {
  margin-top: 6px;
  margin-bottom: 6px;
}
.MuiListItemText-inset {
  padding-left: 56px;
}

.jss186 {
  color: #f3f4f5;
  width: auto;
  height: 48px;
  margin: 4px;
  padding: 0;
  min-width: 44px;
  border-radius: 3px;
}
.jss186.active {
  fill: #fff;
  color: #fff;
  background: #0088ff;
}
.jss186 > .MuiListItemIcon-root {
  color: #a3a8af;
  width: 34px;
  display: flex;
  min-width: unset;
  align-items: center;
  margin-left: 10px;
}
.jss186.active > .MuiListItemIcon-root {
  fill: #fff;
  color: #fff;
}
.jss186 > .MuiListItemText-root {
  flex: unset;
  width: 155px;
  margin-top: -2px;
  font-weight: 400;
  margin-bottom: unset;
}
.jss186 > .icon-collapse {
  color: #a3a8af;
  font-size: 24px;
  transition: transform 0.2s linear;
  margin-right: 4px;
}
.jss186 > .icon-collapse:hover {
  color: #fff;
  font-size: 24px;
  transition: transform 0.2s linear;
  margin-right: 4px;
}
.jss186.open > .icon-collapse {
  color: #fff;
  transform: rotate(90deg);
}
.jss186 > .MuiListItemText-root .MuiTypography-root {
  overflow: hidden;
  white-space: nowrap;
}
.jss186:not(.active).MuiListItem-button:hover {
  fill: #fff;
  color: #fff;
  background: #243041;
  text-decoration: none;
}
.jss186:not(.active).MuiListItem-button:hover > .MuiListItemIcon-root,
.jss186:not(.active).MuiListItem-button:hover .MuiListItemText-root {
  color: #f3f4f5;
}
.jss186 > .MuiListItemIcon-root > svg {
  font-size: 24px;
  max-height: 24px;
}
.jss187 .active {
  background: none;
}
.jss187 .menuListSubMenuItemLevel-0 {
  margin: 0;
  padding: 0;
}
.jss187 .menuListSubMenuItemLevel-1 > .rootMenuItem {
  height: 36px;
  padding-left: 44px;
}
.jss187 .menuListSubMenuItemLevel-1 .menuItemTitle .MuiTypography-root {
  display: flex;
  align-items: center;
}
.jss187 .menuListSubMenuItemLevel-1 .menuItemTitle .MuiTypography-root::before {
  content: "\2022";
  font-size: 20px;
  margin-top: -2px;
  line-height: 0.2;
  margin-left: -1px;
  margin-right: 12px;
}
.jss187 .menuListSubMenuItemLevel-0 > .rootMenuItem {
  height: 40px;
  padding-left: 44px;
}
.jss187 .menuListSubMenuItemLevel-0 div.MuiButtonBase-root {
  height: 40px;
}
.jss187 .menuListSubMenuItemLevel-0 .MuiListItemText-root {
  color: #f3f4f5;
  margin: 0;
}
.jss187
  .menuListSubMenuItemLevel-0
  div.MuiButtonBase-root.open:not(.active)
  > .menuItemTitle {
  color: #f3f4f5;
}
.jss187:not(.active) .MuiListItem-button:hover {
  background: #243041;
}
.jss187 .active.MuiListItem-button:hover,
.jss187 .active .MuiListItemText-root {
  color: #0088ff !important;
  background: none;
}
.jss188 {
  min-width: 196px;
  background: #182537;
  min-height: 48px;
  margin-left: 48px;
}
.jss188 .subMenusHoverHeader {
  color: #f3f4f5;
  height: 48px;
  display: flex;
  background: #243041;
  align-items: center;
  padding-left: 16px;
  justify-content: space-between;
}
.jss188 .subMenusHoverBody {
  padding: 12px 0;
  background: #182537;
}
.jss188 .subMenusHoverBody > .MuiListItem-root {
  color: #f3f4f5;
  width: auto;
  height: 40px;
  margin: 4px 8px;
  padding: 0 16px;
  border-radius: 3px;
  text-decoration: none;
}
.jss188 .subMenusHoverBody .active {
  color: #0088ff;
}
.jss188 .subMenusHoverBody > .MuiListItem-root:hover:not(.active) {
  background: #243041;
}
.jss188 .subMenusHoverHeader .MuiTypography-root {
  line-height: 48px;
}
.jss188 .subMenusHoverHeader .MuiButtonBase-root {
  color: #a3a8af;
  padding: 12px 4px;
}
.jss188 .subMenusHoverHeader .MuiButtonBase-root svg {
  font-size: 24px;
}

.jss91 {
  border: 0;
  margin: 0;
  border-top: 1px solid #46515f;
  border-bottom: 1px solid #46515f;
}
.jss92 .menuDivider {
  border: 0;
  margin: 0;
  border-top: 1px solid #46515f;
  border-bottom: 1px solid #46515f;
}
.jss93 {
  top: 0;
  left: 0;
  width: 230px;
  bottom: 0;
  display: block;
  z-index: 1002;
  background: #ffffff;
  transition: width 200ms;
}
.jss93 > nav {
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;

  background-color: #182537;
}
.jss93.menuCollapse {
  width: 52px;
}
.jss93.menuCollapse > nav .menuTopToogle {
  right: 8px;
}
.jss93.menuCollapse
  > nav
  .menuList
  > .MuiListItem-root
  > .MuiListItemText-root {
  display: none;
}
.jss93.menuCollapse > nav .menuList > .MuiListItem-root > .icon-collapse {
  display: none;
}
.jss93.menuCollapse > nav .menuTopLogo img.logo--full {
  display: none;
}
.jss93 > nav .menuTopHeader {
  height: 55px;
}
.jss93 > nav .menuTopLogo {
  height: 55px;
}
.jss93 > nav .menuTopToogle {
  top: 8px;
  right: 4px;
  display: block;
  padding: 8px;
}
.jss93 > nav .menuDivider {
  border: 0;
  margin: 0;
  border-top: 1px solid #15202c;
  border-bottom: 1px solid #263d53;
}
.jss93 > nav .menuInnerWrapper {
  height: calc(100% - 60px);
}
.jss93 > nav .menuPrimaryInner {
  height: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  overscroll-behavior: contain;
}
.jss93 > nav .menuList {
  fill: #f3f4f5;
  color: #f3f4f5;
  padding: 0;
}
.jss93 > nav .menuPrimaryInner::-webkit-scrollbar {
  width: 5px;
  background: #202d3f;
}
.jss93 > nav .menuPrimaryInner::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #2b4263;
}
.jss93 > nav .menuTopToogle svg {
  color: #fff;
  font-size: 24px;
}
.jss93 > nav .menuTopLogo img.logo--full {
  padding: 12px 12px 0;
}
.jss94 {
  width: auto;
  cursor: pointer;
  margin: 4px;
  padding: 0 10px;
  min-height: 48px;
  text-transform: uppercase;
}
.jss94 svg {
  color: #a3a8af;
  font-size: 24px;
}
.jss94 .title {
  overflow: hidden;
  white-space: nowrap;
}
.jss94 .hidden {
  display: none;
}
.jss95 {
  width: 0;
  display: flex;
  flex-direction: column;
  background-color: #243954;
}
@media (min-width: 600px) {
  .jss95 {
    width: 230px;
    flex-shrink: 0;
  }
}
.jss96 {
  height: 52px;
  background-color: white;
}
@media (min-width: 600px) {
  .jss96 {
    width: calc(100% - 230px);
  }
}
.jss97 {
  margin-right: 16px;
}
@media (min-width: 600px) {
  .jss97 {
    display: none;
  }
}
.jss98 {
  min-height: 56px;
}
@media (min-width: 0px) and (orientation: landscape) {
  .jss98 {
    min-height: 48px;
  }
}
@media (min-width: 600px) {
  .jss98 {
    min-height: 64px;
  }
}
.jss99 {
  width: 230px;
  display: flex;
  flex-direction: column;
  background-color: #243954;
}
.jss100 {
  padding: 24px;
  flex-grow: 1;
}
.jss101 p {
  color: #ffffff;
}
.jss101 svg {
  fill: #ffffff;
}
.jss102 {
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.jss103 {
  color: #182537;
  display: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
}
@media (min-width: 600px) {
  .jss103 {
    display: block;
  }
}
.jss104 {
  display: none;
  align-items: center;
}
@media (min-width: 600px) {
  .jss104 {
    display: flex;
  }
}
.jss105 {
  color: #182537;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  padding-left: 5px;
}
.jss106 {
  cursor: pointer;
  height: 100%;
  display: flex;
  padding: 16px 13px;
  align-items: center;
}
.jss106 svg {
  color: #a2a8af;
}
.jss106:hover svg {
  color: #0088ff;
}
.jss106:hover p {
  color: #0088ff;
}
.jss107 {
  color: #747c87;
  margin-right: 9px;
}
.jss108 {
  width: 30px;
  height: 30px;
}
.jss109 {
  margin: 0 10px;
  font-weight: 500;
}
</style>
<style data-jss="" data-meta="MuiGrid">
.MuiGrid-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.MuiGrid-item {
  margin: 0;
  box-sizing: border-box;
}
.MuiGrid-zeroMinWidth {
  min-width: 0;
}
.MuiGrid-direction-xs-column {
  flex-direction: column;
}
.MuiGrid-direction-xs-column-reverse {
  flex-direction: column-reverse;
}
.MuiGrid-direction-xs-row-reverse {
  flex-direction: row-reverse;
}
.MuiGrid-wrap-xs-nowrap {
  flex-wrap: nowrap;
}
.MuiGrid-wrap-xs-wrap-reverse {
  flex-wrap: wrap-reverse;
}
.MuiGrid-align-items-xs-center {
  align-items: center;
}
.MuiGrid-align-items-xs-flex-start {
  align-items: flex-start;
}
.MuiGrid-align-items-xs-flex-end {
  align-items: flex-end;
}
.MuiGrid-align-items-xs-baseline {
  align-items: baseline;
}
.MuiGrid-align-content-xs-center {
  align-content: center;
}
.MuiGrid-align-content-xs-flex-start {
  align-content: flex-start;
}
.MuiGrid-align-content-xs-flex-end {
  align-content: flex-end;
}
.MuiGrid-align-content-xs-space-between {
  align-content: space-between;
}
.MuiGrid-align-content-xs-space-around {
  align-content: space-around;
}
.MuiGrid-justify-xs-center {
  justify-content: center;
}
.MuiGrid-justify-xs-flex-end {
  justify-content: flex-end;
}
.MuiGrid-justify-xs-space-between {
  justify-content: space-between;
}
.MuiGrid-justify-xs-space-around {
  justify-content: space-around;
}
.MuiGrid-justify-xs-space-evenly {
  justify-content: space-evenly;
}
.MuiGrid-spacing-xs-1 {
  width: calc(100% + 8px);
  margin: -4px;
}
.MuiGrid-spacing-xs-1 > .MuiGrid-item {
  padding: 4px;
}
.MuiGrid-spacing-xs-2 {
  width: calc(100% + 16px);
  margin: -8px;
}
.MuiGrid-spacing-xs-2 > .MuiGrid-item {
  padding: 8px;
}
.MuiGrid-spacing-xs-3 {
  width: calc(100% + 24px);
  margin: -12px;
}
.MuiGrid-spacing-xs-3 > .MuiGrid-item {
  padding: 12px;
}
.MuiGrid-spacing-xs-4 {
  width: calc(100% + 32px);
  margin: -16px;
}
.MuiGrid-spacing-xs-4 > .MuiGrid-item {
  padding: 16px;
}
.MuiGrid-spacing-xs-5 {
  width: calc(100% + 40px);
  margin: -20px;
}
.MuiGrid-spacing-xs-5 > .MuiGrid-item {
  padding: 20px;
}
.MuiGrid-spacing-xs-6 {
  width: calc(100% + 48px);
  margin: -24px;
}
.MuiGrid-spacing-xs-6 > .MuiGrid-item {
  padding: 24px;
}
.MuiGrid-spacing-xs-7 {
  width: calc(100% + 56px);
  margin: -28px;
}
.MuiGrid-spacing-xs-7 > .MuiGrid-item {
  padding: 28px;
}
.MuiGrid-spacing-xs-8 {
  width: calc(100% + 64px);
  margin: -32px;
}
.MuiGrid-spacing-xs-8 > .MuiGrid-item {
  padding: 32px;
}
.MuiGrid-spacing-xs-9 {
  width: calc(100% + 72px);
  margin: -36px;
}
.MuiGrid-spacing-xs-9 > .MuiGrid-item {
  padding: 36px;
}
.MuiGrid-spacing-xs-10 {
  width: calc(100% + 80px);
  margin: -40px;
}
.MuiGrid-spacing-xs-10 > .MuiGrid-item {
  padding: 40px;
}
.MuiGrid-grid-xs-auto {
  flex-grow: 0;
  max-width: none;
  flex-basis: auto;
}
.MuiGrid-grid-xs-true {
  flex-grow: 1;
  max-width: 100%;
  flex-basis: 0;
}
.MuiGrid-grid-xs-1 {
  flex-grow: 0;
  max-width: 8.333333%;
  flex-basis: 8.333333%;
}
.MuiGrid-grid-xs-2 {
  flex-grow: 0;
  max-width: 16.666667%;
  flex-basis: 16.666667%;
}
.MuiGrid-grid-xs-3 {
  flex-grow: 0;
  max-width: 25%;
  flex-basis: 25%;
}
.MuiGrid-grid-xs-4 {
  flex-grow: 0;
  max-width: 33.333333%;
  flex-basis: 33.333333%;
}
.MuiGrid-grid-xs-5 {
  flex-grow: 0;
  max-width: 41.666667%;
  flex-basis: 41.666667%;
}
.MuiGrid-grid-xs-6 {
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
}
.MuiGrid-grid-xs-7 {
  flex-grow: 0;
  max-width: 58.333333%;
  flex-basis: 58.333333%;
}
.MuiGrid-grid-xs-8 {
  flex-grow: 0;
  max-width: 66.666667%;
  flex-basis: 66.666667%;
}
.MuiGrid-grid-xs-9 {
  flex-grow: 0;
  max-width: 75%;
  flex-basis: 75%;
}
.MuiGrid-grid-xs-10 {
  flex-grow: 0;
  max-width: 83.333333%;
  flex-basis: 83.333333%;
}
.MuiGrid-grid-xs-11 {
  flex-grow: 0;
  max-width: 91.666667%;
  flex-basis: 91.666667%;
}
.MuiGrid-grid-xs-12 {
  flex-grow: 0;
  max-width: 100%;
  flex-basis: 100%;
}
@media (min-width: 600px) {
  .MuiGrid-grid-sm-auto {
    flex-grow: 0;
    max-width: none;
    flex-basis: auto;
  }
  .MuiGrid-grid-sm-true {
    flex-grow: 1;
    max-width: 100%;
    flex-basis: 0;
  }
  .MuiGrid-grid-sm-1 {
    flex-grow: 0;
    max-width: 8.333333%;
    flex-basis: 8.333333%;
  }
  .MuiGrid-grid-sm-2 {
    flex-grow: 0;
    max-width: 16.666667%;
    flex-basis: 16.666667%;
  }
  .MuiGrid-grid-sm-3 {
    flex-grow: 0;
    max-width: 25%;
    flex-basis: 25%;
  }
  .MuiGrid-grid-sm-4 {
    flex-grow: 0;
    max-width: 33.333333%;
    flex-basis: 33.333333%;
  }
  .MuiGrid-grid-sm-5 {
    flex-grow: 0;
    max-width: 41.666667%;
    flex-basis: 41.666667%;
  }
  .MuiGrid-grid-sm-6 {
    flex-grow: 0;
    max-width: 50%;
    flex-basis: 50%;
  }
  .MuiGrid-grid-sm-7 {
    flex-grow: 0;
    max-width: 58.333333%;
    flex-basis: 58.333333%;
  }
  .MuiGrid-grid-sm-8 {
    flex-grow: 0;
    max-width: 66.666667%;
    flex-basis: 66.666667%;
  }
  .MuiGrid-grid-sm-9 {
    flex-grow: 0;
    max-width: 75%;
    flex-basis: 75%;
  }
  .MuiGrid-grid-sm-10 {
    flex-grow: 0;
    max-width: 83.333333%;
    flex-basis: 83.333333%;
  }
  .MuiGrid-grid-sm-11 {
    flex-grow: 0;
    max-width: 91.666667%;
    flex-basis: 91.666667%;
  }
  .MuiGrid-grid-sm-12 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
  }
}
@media (min-width: 960px) {
  .MuiGrid-grid-md-auto {
    flex-grow: 0;
    max-width: none;
    flex-basis: auto;
  }
  .MuiGrid-grid-md-true {
    flex-grow: 1;
    max-width: 100%;
    flex-basis: 0;
  }
  .MuiGrid-grid-md-1 {
    flex-grow: 0;
    max-width: 8.333333%;
    flex-basis: 8.333333%;
  }
  .MuiGrid-grid-md-2 {
    flex-grow: 0;
    max-width: 16.666667%;
    flex-basis: 16.666667%;
  }
  .MuiGrid-grid-md-3 {
    flex-grow: 0;
    max-width: 25%;
    flex-basis: 25%;
  }
  .MuiGrid-grid-md-4 {
    flex-grow: 0;
    max-width: 33.333333%;
    flex-basis: 33.333333%;
  }
  .MuiGrid-grid-md-5 {
    flex-grow: 0;
    max-width: 41.666667%;
    flex-basis: 41.666667%;
  }
  .MuiGrid-grid-md-6 {
    flex-grow: 0;
    max-width: 50%;
    flex-basis: 50%;
  }
  .MuiGrid-grid-md-7 {
    flex-grow: 0;
    max-width: 58.333333%;
    flex-basis: 58.333333%;
  }
  .MuiGrid-grid-md-8 {
    flex-grow: 0;
    max-width: 66.666667%;
    flex-basis: 66.666667%;
  }
  .MuiGrid-grid-md-9 {
    flex-grow: 0;
    max-width: 75%;
    flex-basis: 75%;
  }
  .MuiGrid-grid-md-10 {
    flex-grow: 0;
    max-width: 83.333333%;
    flex-basis: 83.333333%;
  }
  .MuiGrid-grid-md-11 {
    flex-grow: 0;
    max-width: 91.666667%;
    flex-basis: 91.666667%;
  }
  .MuiGrid-grid-md-12 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
  }
}
@media (min-width: 1280px) {
  .MuiGrid-grid-lg-auto {
    flex-grow: 0;
    max-width: none;
    flex-basis: auto;
  }
  .MuiGrid-grid-lg-true {
    flex-grow: 1;
    max-width: 100%;
    flex-basis: 0;
  }
  .MuiGrid-grid-lg-1 {
    flex-grow: 0;
    max-width: 8.333333%;
    flex-basis: 8.333333%;
  }
  .MuiGrid-grid-lg-2 {
    flex-grow: 0;
    max-width: 16.666667%;
    flex-basis: 16.666667%;
  }
  .MuiGrid-grid-lg-3 {
    flex-grow: 0;
    max-width: 25%;
    flex-basis: 25%;
  }
  .MuiGrid-grid-lg-4 {
    flex-grow: 0;
    max-width: 33.333333%;
    flex-basis: 33.333333%;
  }
  .MuiGrid-grid-lg-5 {
    flex-grow: 0;
    max-width: 41.666667%;
    flex-basis: 41.666667%;
  }
  .MuiGrid-grid-lg-6 {
    flex-grow: 0;
    max-width: 50%;
    flex-basis: 50%;
  }
  .MuiGrid-grid-lg-7 {
    flex-grow: 0;
    max-width: 58.333333%;
    flex-basis: 58.333333%;
  }
  .MuiGrid-grid-lg-8 {
    flex-grow: 0;
    max-width: 66.666667%;
    flex-basis: 66.666667%;
  }
  .MuiGrid-grid-lg-9 {
    flex-grow: 0;
    max-width: 75%;
    flex-basis: 75%;
  }
  .MuiGrid-grid-lg-10 {
    flex-grow: 0;
    max-width: 83.333333%;
    flex-basis: 83.333333%;
  }
  .MuiGrid-grid-lg-11 {
    flex-grow: 0;
    max-width: 91.666667%;
    flex-basis: 91.666667%;
  }
  .MuiGrid-grid-lg-12 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
  }
}
@media (min-width: 1920px) {
  .MuiGrid-grid-xl-auto {
    flex-grow: 0;
    max-width: none;
    flex-basis: auto;
  }
  .MuiGrid-grid-xl-true {
    flex-grow: 1;
    max-width: 100%;
    flex-basis: 0;
  }
  .MuiGrid-grid-xl-1 {
    flex-grow: 0;
    max-width: 8.333333%;
    flex-basis: 8.333333%;
  }
  .MuiGrid-grid-xl-2 {
    flex-grow: 0;
    max-width: 16.666667%;
    flex-basis: 16.666667%;
  }
  .MuiGrid-grid-xl-3 {
    flex-grow: 0;
    max-width: 25%;
    flex-basis: 25%;
  }
  .MuiGrid-grid-xl-4 {
    flex-grow: 0;
    max-width: 33.333333%;
    flex-basis: 33.333333%;
  }
  .MuiGrid-grid-xl-5 {
    flex-grow: 0;
    max-width: 41.666667%;
    flex-basis: 41.666667%;
  }
  .MuiGrid-grid-xl-6 {
    flex-grow: 0;
    max-width: 50%;
    flex-basis: 50%;
  }
  .MuiGrid-grid-xl-7 {
    flex-grow: 0;
    max-width: 58.333333%;
    flex-basis: 58.333333%;
  }
  .MuiGrid-grid-xl-8 {
    flex-grow: 0;
    max-width: 66.666667%;
    flex-basis: 66.666667%;
  }
  .MuiGrid-grid-xl-9 {
    flex-grow: 0;
    max-width: 75%;
    flex-basis: 75%;
  }
  .MuiGrid-grid-xl-10 {
    flex-grow: 0;
    max-width: 83.333333%;
    flex-basis: 83.333333%;
  }
  .MuiGrid-grid-xl-11 {
    flex-grow: 0;
    max-width: 91.666667%;
    flex-basis: 91.666667%;
  }
  .MuiGrid-grid-xl-12 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
  }
}
</style>
<style data-jss="" data-meta="MuiLinearProgress">
.MuiLinearProgress-root {
  height: 4px;
  overflow: hidden;
}
.MuiLinearProgress-colorPrimary {
  background-color: rgb(158, 209, 255);
}
.MuiLinearProgress-colorSecondary {
  background-color: rgb(202, 205, 209);
}
.MuiLinearProgress-buffer {
  background-color: transparent;
}
.MuiLinearProgress-query {
  transform: rotate(180deg);
}
.MuiLinearProgress-dashed {
  width: 100%;
  height: 100%;

  animation: MuiLinearProgress-keyframes-buffer 3s infinite linear;
  margin-top: 0;
}
.MuiLinearProgress-dashedColorPrimary {
  background-size: 10px 10px;
  background-image: radial-gradient(
    rgb(158, 209, 255) 0%,
    rgb(158, 209, 255) 16%,
    transparent 42%
  );
  background-position: 0px -23px;
}
.MuiLinearProgress-dashedColorSecondary {
  background-size: 10px 10px;
  background-image: radial-gradient(
    rgb(202, 205, 209) 0%,
    rgb(202, 205, 209) 16%,
    transparent 42%
  );
  background-position: 0px -23px;
}
.MuiLinearProgress-bar {
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;

  transition: transform 0.2s linear;
  transform-origin: left;
}
.MuiLinearProgress-barColorPrimary {
  background-color: #0088ff;
}
.MuiLinearProgress-barColorSecondary {
  background-color: #747c87;
}
.MuiLinearProgress-bar1Indeterminate {
  width: auto;
  animation: MuiLinearProgress-keyframes-indeterminate1 2.1s
    cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}
.MuiLinearProgress-bar1Determinate {
  transition: transform 0.4s linear;
}
.MuiLinearProgress-bar1Buffer {
  z-index: 1;
  transition: transform 0.4s linear;
}
.MuiLinearProgress-bar2Indeterminate {
  width: auto;
  animation: MuiLinearProgress-keyframes-indeterminate2 2.1s
    cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
}
.MuiLinearProgress-bar2Buffer {
  transition: transform 0.4s linear;
}
@-webkit-keyframes MuiLinearProgress-keyframes-indeterminate1 {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}
@-webkit-keyframes MuiLinearProgress-keyframes-indeterminate2 {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}
@-webkit-keyframes MuiLinearProgress-keyframes-buffer {
  0% {
    opacity: 1;
    background-position: 0px -23px;
  }
  50% {
    opacity: 0;
    background-position: 0px -23px;
  }
  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
}

.jss112 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 16px;
}
.jss113 {
  width: 230px;
}
.jss114 {
  margin-top: 10px;
}
.jss115 {
  background-image: /images/dashboard/frame.png;
}
.jss116 {
  color: #212b35;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
}
.jss117 {
  color: #212b35;
  font-size: 14px;
  max-width: 450px;
  text-align: center;
  padding-top: 12px;
  margin-bottom: 36px;
}
.jss118 {
  top: 118px;
  left: 0;
  right: 0;
  width: 96px;

  margin-left: auto;
  margin-right: auto;
}
.jss119 {
  height: 12px;
  background: #ffd188;
  border-radius: 10px;
}
.jss120 {
  background-color: #f49e2c;
}
.jss121 {
  margin-top: 24px;
}
.jss122 {
  display: flex;

  margin-top: 16px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.jss123 {
  width: 100%;
}
.jss124 {
  margin: auto;
  display: flex;
}
.jss125 .MuiDialog-paperWidthSm {
  max-width: 600px;
}
.jss126 {
  border: 1px solid #d3d5d7;
  padding: 18px 24px 15px 14px;
  border-radius: 10px;
  margin-bottom: 16px;
}
.jss126:last-child {
  margin-bottom: 0;
}
.jss127 {
  border: 1px solid #0088ff;
  background-color: #f2f9ff;
}
.jss128 {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.jss129 {
  width: 48px;
  height: 48px;
  margin-right: 24px;
  border-radius: 10px;
}
.jss130 .MuiDialog-paperWidthSm {
  min-width: 540px;
}
.jss131 {
  width: 10px;
  height: 10px;
  background: #0088ff;
  border-radius: 50px;
}
.jss132 {
  width: 6.67px;
  height: 6.67px;
  background: #a3a8af;
  margin-top: 1.66px;
  border-radius: 50px;
}

.jss36 {
  flex: 1 1 auto;
  display: flex;
  padding: 24px;
}
.jss37 {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
}
.jss39 {
  font-size: 28px;
  font-weight: 500;
  line-height: 36px;
}

.jss286 {
  width: 476px;
  height: 299px;
  padding: 12px 24px;
}
.jss287 {
  height: 62px;
}
.jss287 .MuiTypography-root {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
}
.jss288 {
  margin-top: 5px;
}
.jss288 .MuiTypography-root {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.jss289 {
  width: 120px;
  margin-top: 16px;
  margin-left: 24px;
}
.jss290 {
  display: flex;
  margin-top: 25px;
  flex-direction: row;
  justify-content: space-between;
}
.jss290 .MuiTypography-root {
  font-size: 14px;
  max-width: 200px;
  font-style: normal;
  margin-top: 8px;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 16px;
}
.jss291 {
  padding: 16px;
  text-align: center;
  background-color: #f2f9ff;
}
.jss292 {
  display: flex;
  justify-content: center;
}
.jss293 {
  height: 100%;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
}
.jss294 {
  color: #fff;
  width: 40px;
  height: 40px;
  margin: auto;
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}
.jss295 {
  background: #0088ff;
}
.jss296 {
  background: #0fd186;
}
</style>
<style data-jss="" data-meta="MuiCardMedia">
.MuiCardMedia-root {
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.MuiCardMedia-media {
  width: 100%;
}
.MuiCardMedia-img {
  object-fit: cover;
}
</style>
<style data-jss="" data-meta="MuiAvatar">
.MuiAvatar-root {
  width: 40px;
  height: 40px;
  display: flex;
  overflow: hidden;

  font-size: 1.25rem;
  align-items: center;
  flex-shrink: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  line-height: 1;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
}
.MuiAvatar-colorDefault {
  color: #fafafa;
  background-color: #bdbdbd;
}
.MuiAvatar-rounded {
  border-radius: 4px;
}
.MuiAvatar-square {
  border-radius: 0;
}
.MuiAvatar-img {
  color: transparent;
  width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
  text-indent: 10000px;
}
.MuiAvatar-fallback {
  width: 75%;
  height: 75%;
}

.jss274 {
  width: 100%;
  height: 100%;
  overflow: hidden;

  background: url(https://sapo.dktcdn.net/sapo-frontend-v3/master/static/media/6f2d8a7e4d0034640555.png)
      top left no-repeat,
    url(https://sapo.dktcdn.net/sapo-frontend-v3/master/static/media/f6083db7e88697072ad0.png)
      bottom right no-repeat !important;
}
.jss275 {
  color: #00356d;
  margin: 0 0 25px 0;
  font-size: 24px;
  text-align: center;
  font-weight: 700;
}
.jss276 {
  border: 1px solid #007ce8;
  display: flex;
  padding: 8px 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  min-height: 40px;
  align-items: center;
  border-radius: 6px;
  background-color: #f2f9ff !important;
}
.jss277 {
  padding-left: 25px;
}
.jss278 {
  left: 50%;
  width: 110px;

  transform: translateX(-50%);
  margin-bottom: -20px;
}
.jss279 {
  margin-top: 16px;
}
.jss280 {
  width: 100%;
  border: 1px solid #d3d5d7;
  height: 36px;
  display: flex;
  padding: 0 12px;
  align-items: center;
  border-radius: 6px;
  justify-content: space-between;
}
.jss281 {
  cursor: pointer;
  display: flex;
  padding: 16px 13px;
  font-size: 14px;
  align-items: center;
}
.jss281 svg {
  color: #a2a8af;
  margin-right: 9px;
}
.jss281:hover {
  color: #0189ff;
  background-color: #f2f9ff;
}
.jss281:hover svg {
  color: #0189ff;
}
.jss282 {
  width: 476px;
  padding: 24px;
}
.jss283 {
  box-shadow: none;
}
.jss284 {
  margin: 0;
}

.jss261 {
  top: 0;
  height: 52px;
  display: flex;
  padding: 0 32px;
  z-index: 1001;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(168, 168, 168, 0.25);
  align-items: center;
  justify-content: space-between;
}
.jss261 .open svg {
  fill: #0088ff;
}
.jss262 {
  height: inherit;
  display: flex;
  align-items: center;
}
.jss263 {
  cursor: pointer;
  height: 100%;
  display: flex;
  padding: 16px 13px;
  align-items: center;
}
.jss263 svg {
  color: #a2a8af;
}
.jss263:hover {
  background: #f2f9ff;
}
.jss263:hover svg {
  color: #0088ff;
}
.jss263:hover p {
  color: #0088ff;
}
.jss264 {
  color: #747c87;
  margin-right: 9px;
}
.jss265 {
  width: 30px;
  height: 30px;
}
.jss266 {
  margin: 0 10px;
  font-weight: 500;
}
.jss268 {
}
.jss269 {
  top: 9px;
  left: 25px;
  color: #ffffff;
  width: 20px;
  height: 16px;
  display: flex;

  font-size: 10px;
  background: #e94765;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
}
.jss270 {
  box-shadow: 0px 4px 8px rgba(168, 168, 168, 0.25);
}
.jss271 {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.jss82 {
  display: flex;
  flex-direction: column;
}

.jss592 {
  z-index: 9999;
}
.jss592 #arrow {
  width: 10px;
  height: 10px;
}
.jss592[data-popper-placement^="top"] > #arrow {
  bottom: -10px;
}
.jss592[data-popper-placement^="left"] > #arrow {
  right: -2px;
}
.jss592[data-popper-placement^="right"] > #arrow {
  left: -6px;
}
.jss592[data-popper-placement^="right"] > #arrow:after {
  top: -40px;
  width: 15px;
  height: 15px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 10%);
}
.jss592[data-popper-placement^="left"] > #arrow:after {
  top: -40px;
  width: 15px;
  height: 15px;
  box-shadow: 2px 0px 2px 0px rgb(0 0 0 / 10%);
}
.jss592[data-popper-placement^="top"] > #arrow:after {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}
.jss592 #arrow:after {
  top: -4px;
  left: 0;
  width: 8px;
  height: 8px;
  content: "";

  transform: rotate(45deg);
  box-shadow: -1px -1px 3px rgb(0 0 0 / 10%);
  background-color: white;
}

.jss1 span {
  font-size: 14px;
}
.jss2 {
  background-color: unset;
}
.jss3 {
  height: 3px;
}

.jss763 {
  left: 0;
  color: #fff;
  width: calc(100% - 230px);
  bottom: 0;
  height: 72px;
  display: flex;
  opacity: 0.9;
  padding: 0 24px;
  z-index: 101;
  background: #182537;
  transition: 200ms;
  align-items: center;
  margin-left: 230px;
  justify-content: space-between;
}
.jss763.menu-is-collapse {
  width: calc(100% - 52px);
  margin-left: 52px;
}
.jss764 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.jss742 {
  left: 0;
  color: #fff;
  width: calc(100% - 230px);
  bottom: 0;
  height: 72px;
  display: flex;
  opacity: 0.9;
  padding: 0 24px;
  z-index: 101;
  background: #182537;
  transition: 200ms;
  align-items: center;
  margin-left: 230px;
  justify-content: space-between;
}
.jss742.menu-is-collapse {
  width: calc(100% - 52px);
  margin-left: 52px;
}
.jss743 {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.jss744 {
  height: 42px;
  min-width: 42px;
  background: #ffffff;
  border-radius: 3px;
}
.jss745 {
  height: 41px;
  padding: 7px 5px 7px 5px;
  min-width: 42px;
  background: linear-gradient(
    62.06deg,
    #0fd186 25.88%,
    #3fda9e 100%
  ) !important;
  border-radius: 3px;
}

.jss728 {
  height: fit-content;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(168, 168, 168, 0.25);
  margin-top: 24px;
}
.jss729 {
  height: auto;
  display: flex;

  min-height: 56px;
  padding-bottom: 8px;
}
.jss730 {
  width: calc(100% - 62px);
  word-break: break-word;
  margin-left: 15px;
  padding-bottom: 10px;
}
.jss731 {
  color: #747c87;
  width: 24px;
  height: 24px;
  margin-left: auto;
}
.jss732 {
  color: #fff;
  height: 20px;
  font-size: 12px;
  background: #ff4d4d;
  margin-top: -11px;
}
.jss733 {
  width: 10px;
  border: 1px solid #0088ff;
  height: 10px;
  box-shadow: 0 0 0 5px #e6f4ff;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 100%;
  background-color: #0088ff;
}
.jss733:hover {
  transform: scale(1.2);
  webkit-transform: scale(1.2);
}
.jss734 {
  top: 25px;
  left: 24px;
  bottom: -4px;

  border-left: 2px dashed #99cfff;
}
.jss735 {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.jss736:hover {
  transform: scale(1.2);
  webkit-transform: scale(1.2);
}
</style>
<style data-jss="" data-meta="MuiCardContent">
.MuiCardContent-root {
  padding: 16px;
}
.MuiCardContent-root:last-child {
  padding-bottom: 24px;
}

.jss725 {
  height: fit-content;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(168, 168, 168, 0.25);
}
.jss726 {
  display: flex;
  padding: 11px 16px;
  letter-spacing: 0.3px;
}
@media screen and (min-width: 1920px) {
  .jss726 {
    padding: 12px 24px;
  }
}
.jss726 .MuiCardMedia-root {
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 3px;
}
.jss726 .MuiCardContent-root {
  width: calc(100% - 50px);
  display: flex;
  padding: 0 0 0 12px;
  flex-wrap: wrap;
}
.jss726 .blog-item-title {
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  font-weight: 500;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.jss726:hover {
  background: #f2f9ff;
}
.jss726:hover .blog-item-title {
  color: #0088ff;
}

.jss722 {
  background: #fff;
}
</style>
<style data-jss="" data-meta="DialogAffiliate">
.jss724 {
  top: 50px;
  padding: 18px 48px 8px;

  max-width: 640px;
}
@media (max-width: 1919.95px) {
  .jss724 {
    top: unset;
  }
}

.jss719 {
  width: 100%;
  cursor: pointer;
  height: fit-content;
  display: inline-flex;
  overflow: hidden;

  border-radius: 3px;
  margin-bottom: 24px;
}
.jss719 .banner-1366 {
  display: none;
}
.jss719 img.banner-image {
  image-rendering: -webkit-optimize-contrast;
}
.jss719 button {
  top: 0;
  right: 0;
}
@media screen and (max-width: 1279px) {
  .jss719 .survey-popup-1280 {
    width: 400px;
    height: 228px;
  }
}
@media screen and (max-width: 1279px) {
  .jss719 .banner-1280 {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
  .jss719 .banner-1024 {
    display: none;
  }
}
@media screen and (max-width: 1366px) {
  .jss719 .banner-1920 {
    display: none;
  }
}
@media screen and (max-width: 1366px) {
  .jss719 .banner-1366 {
    display: block;
  }
}
.jss720 button {
  display: none;
}
.jss720:hover button {
  display: inline;
}

.jss717 {
  width: 100%;
}
.jss717 .box-title {
  display: flex;
  padding: 15px 16px 10px 16px;
  align-items: center;
  text-transform: uppercase;
}
.jss717 .box-body {
  padding: 0 0 9px;
}
@media screen and (min-width: 1920px) {
  .jss717 .box-title {
    padding: 15px 24px 10px 24px;
  }
}

.jss774 {
  font-size: 14px;
}
.jss774 ul {
  margin-top: 0;
  padding-left: 24px;
}
.jss775 {
  color: #0088ff;
  font-size: 20px;
  max-width: 270px;
}
.jss776 {
  color: #4d555d;
  font-size: 12px;
  line-height: 20px;
}
.jss777 {
  font-size: 12px;
  line-height: 20px;
  padding-left: 30px;
  margin-bottom: 20px;
  list-style-type: none;
}
.jss778 {
  color: #9e9e9e;
  right: 0;

  margin-top: 3px;
  margin-right: 5px;
}
.jss779 {
  width: 125px;
  height: 36px;
  font-weight: 500;
  border-radius: 3px;
}

.jss765 .MuiDialog-paperWidthSm {
  top: 50px;
  width: 670px;
  height: 446px;
  padding: 0;
  overflow: unset;

  font-size: 14px;
  max-width: none;
}
.jss766 {
  padding: 0 40px 0 10px;
  margin-top: 50px;
}
.jss767 {
  color: #0088ff;
  font-size: 20px;
  max-width: 270px;
}
.jss768 {
  color: #4d555d;
  font-size: 12px;
  line-height: 20px;
}
.jss769 {
  font-size: 12px;
  line-height: 20px;
  padding-left: 30px;
  margin-bottom: 20px;
  list-style-type: none;
}
.jss769 li {
  margin-bottom: 5px;
}
.jss769 li::before {
  top: 2px;
  left: -30px;
  width: 20px;
  height: 20px;
  content: "";

  background: url(https://sapo.dktcdn.net/sapo-frontend-v3/master/static/media/4f9d197f29b84845d750.svg)
    no-repeat 0 0;
}
.jss770 {
  color: #9e9e9e;
  right: 0;

  margin-top: 3px;
  margin-right: 5px;
}
.jss771 {
  height: 100%;
  background: center center no-repeat;
  background-image: url(https://sapo.dktcdn.net/sapo-frontend-v3/master/static/media/0c852a7698b8736c335e.png);
}
.jss772 {
  display: flex;
  justify-content: center;
}
.jss773 {
  height: 36px;
  padding: 0 17px;
  font-weight: 500;
  border-radius: 3px;
}

.jss605 {
  width: 36px;
  height: 36px;
  display: flex;
  background: #f4f6f8;
  align-items: center;
  margin-right: 8px;
  border-radius: 50%;
  justify-content: center;
}
.jss606 {
  color: #0088ff;
  font-weight: 500;
}
.jss607 {
  height: 64px;
  display: flex;
  padding: 12px 16px;

  align-items: center;
  text-decoration: none;
}
@media screen and (min-width: 1900px) {
  .jss607 {
    padding: 15px 16px;
  }
}
.jss607:hover {
  text-decoration: none;
}
.jss607:before {
  left: 9%;
  width: 88%;
  bottom: 0;
  content: "";

  border-bottom: 1px dashed #e8eaeb;
}
.jss608 {
  width: 100%;
}
.jss609 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.jss610 {
  color: #747c87;
  display: flex;
  font-size: 10px;
  align-items: center;
}
@media screen and (max-width: 1366px) {
  .jss610 {
    display: none;
  }
}
.jss611 {
  color: #747c87;
  font-size: 12px;
  margin-top: 9px;
}
@media screen and (min-width: 1900px) {
  .jss611 {
    margin-top: 4px;
  }
}
.jss612 {
  width: 10px;
  height: 10px;
}

.jss593 {
  border-radius: 3px;
  padding-right: 12px;
}
.jss594 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
}
.jss595 {
  width: 167px;
}
.jss596 {
  background: #fff;
  border-radius: 3px;
}
.jss597 {
  height: 72px;
  padding: 14px 16px 0px 16px;
  border-bottom: 1px solid #e8eaeb;
}
.jss598 {
  color: #747c87;
  font-size: 14px;
  margin-top: 4px;
  font-weight: 400;
}
.jss599 {
  color: #0088ff;
  height: 48px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  font-weight: 500;
  justify-content: flex-end;
  text-decoration: none;
}

.jss634 {
  padding-left: 12px;
}
.jss635 {
  left: 30px;
}
.jss636 {
  height: 100%;
  background: #fff;
  border-radius: 3px;
  background-size: 100% 100%;
}
@media screen and (min-width: 1681px) {
  .jss636 {
    padding-left: 34px;
  }
}
@media screen and (max-width: 1680px) and (min-width: 1441px) {
  .jss636 {
    padding-left: 14px;
  }
}
.jss637 {
  right: 0;
  width: 180px;
  bottom: 0;
}
.jss638 {
  right: -10px;

  max-height: 100%;
}
@media screen and (max-width: 1366px) {
  .jss638 {
    width: 150px;
    bottom: 25px;
    height: 250px;
  }
}
@media screen and (min-width: 1367px) {
  .jss638 {
    width: 205px;
    bottom: 0;
    height: 333px;
  }
}
.jss639 {
  color: #33a0ff;
  font-weight: 700;
}
@media screen and (max-width: 1366px) {
  .jss639 {
    padding: 66px 0 0px 16px;
    font-size: 20px;
  }
}
@media screen and (min-width: 1367px) {
  .jss639 {
    padding: 47px 0 0px 16px;
    font-size: 24px;
  }
}
.jss640 {
  padding: 5px 16px;
}
@media screen and (max-width: 1366px) {
  .jss640 {
    width: 240px;
    font-size: 14px;
  }
}
@media screen and (min-width: 1681px) {
  .jss640 {
    width: 318px;
    font-size: 16px;
  }
}
@media screen and (max-width: 1680px) and (min-width: 1367px) {
  .jss640 {
    width: 290px;
    font-size: 16px;
  }
}
.jss641 {
  margin-left: 6px;
}
@media screen and (max-width: 1366px) {
  .jss641 {
    width: 89px;
  }
}
@media screen and (min-width: 1367px) {
  .jss641 {
    width: 105px;
  }
}
.jss642 {
  display: flex;
  align-items: center;
}
@media screen and (max-width: 1366px) {
  .jss643 {
    width: 117px;
  }
}
@media screen and (min-width: 1367px) {
  .jss643 {
    width: 138px;
    height: 33px;
  }
}
.jss644 {
  margin-top: 11px;
}
@media screen and (max-width: 1366px) {
  .jss644 {
    width: 117px;
  }
}
@media screen and (min-width: 1367px) {
  .jss644 {
    width: 138px;
    height: 33px;
  }
}
.jss645 {
  color: rgba(116, 124, 135, 1);
  padding: 0 16px;
  font-size: 11px;
  font-style: italic;
}
@media screen and (min-width: 1681px) {
  .jss645 {
    width: 100%;
  }
}
@media screen and (max-width: 1680px) {
  .jss645 {
    width: 233px;
  }
}
.jss646 {
  top: 0;
  right: -10px;
}

.jss666 {
  overflow: hidden;
}
.jss667 {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
.jss668 {
  color: #afafaf;
  cursor: pointer;
  padding: 0;
  transition: 200ms;
}
.jss668:hover {
  color: #1f1f1f;
}
.jss668:active {
  color: #1f1f1f;
}
.jss669 {
  font-size: 15px;
}
.jss670 {
  color: #494949;
}
.jss671 {
  top: calc(50% - 70px);
  height: 100px;

  background-color: transparent;
}
.jss671:hover .jss675 {
  filter: brightness(120%);
  opacity: 0.4;
  background-color: black;
}
.jss672 {
  top: 0;
  height: 100%;
}
.jss673 {
  opacity: 1;
}
.jss674 {
  opacity: 0;
}
.jss675 {
  top: calc(50% - 20px) !important;
  color: white;
  cursor: pointer;
  margin: 0 10px;

  font-size: 30px;
  transition: 200ms;
  background-color: #494949;
}
.jss675:hover {
  opacity: 0.6 !important;
}
.jss676 {
  right: 0;
}
.jss677 {
  left: 0;
}

.jss678 {
  justify-content: center;
}
.jss678:first-child {
  padding-right: calc(16px * 2 / 3);
}
.jss678:last-child {
  padding-left: calc(16px * 2 / 3);
}
.jss678:nth-child(2) {
  padding: 0 calc(16px * 1 / 3);
}
.jss679 {
  height: 100%;
  overflow: hidden;

  background: #f9fafa;
  border-radius: 5px 5px 3px 3px;
}
.jss679:hover .titleHov {
  color: #0088ff;
}
.jss680 {
  width: 100%;
  height: 100%;
  z-index: 99;

  background: rgba(0, 0, 0, 0.1);
}
.jss681 {
  cursor: pointer;
  height: 136px;
  display: flex;

  align-items: center;
  justify-content: center;
}
.jss681 .bg-btn {
  width: 54px;
  height: 54px;
  display: flex;
  z-index: 100;
  background: rgba(255, 255, 255, 0.7);
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}
@media screen and (min-width: 1920px) {
  .jss681 {
    height: 206px;
  }
}
.jss681 .bg-btn .play-video {
  width: 36px;
  height: 36px;
  display: flex;
  z-index: 100;
  background: #0088ff;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}
.jss681 .bg-btn .play-video svg {
  color: #fff;
}
.jss682 {
  cursor: pointer;
  padding: 10px 16px 0;
  font-size: 14px;
  font-weight: 500;
}
.jss682:hover {
  color: #0088ff;
}
.jss683 {
  border-radius: 5px;
}
.jss684 {
  padding: 4px 16px;
}
.jss685 {
  color: #747c87;
  font-size: 12px;
  padding-left: 5px;
}
.jss686 {
  color: #333;
  font-weight: 500;
  text-decoration: none;
}
.jss686:hover {
  color: #0088ff;
  text-decoration: none;
}
.jss687 {
  width: 10px;
  height: 10px;
}
.jss688 {
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.jss654 {
  border-radius: 3px;
}
.jss655 {
  height: 64px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid #e8eaeb;
  justify-content: space-between;
}
.jss656 {
  height: 100%;
  background: #ffffff;
}
.jss657 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
}
.jss658 {
  color: #0088ff;
  font-weight: 500;
  text-decoration: none;
}
.jss659 {
  padding: 16px 16px 24px 16px;
}
.jss660 {
  width: 100%;
  height: 100%;
}
.jss661 {
  width: 735px;
  height: 408px;
  max-width: 100%;
  background: rgba(33, 43, 53, 0.5);
  max-height: 100%;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 1920px) {
  .jss661 {
    width: 980px;
    height: 544px;
  }
}

.jss560 {
  color: #747c87;
  height: 60px;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 16px;
}
@media screen and (max-width: 1280px) {
  .jss560 {
    min-height: 60px;
  }
}
@media screen and (max-width: 1680px) {
  .jss560 {
    min-height: 40px;
  }
}
.jss561 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  margin-top: 19px;
  min-height: 40px;
  font-weight: 500;
  margin-bottom: 12px;
}
.jss562 {
  width: fit-content;
}
.jss563 {
  height: 100%;
  display: grid;
  padding: 24px 0;
  min-height: 250px;
  text-align: center;
  border-radius: 3px;
}
.jss564 {
  height: 32px;
  display: flex;
}
.jss565 {
  color: #0088ff;
  font-size: 16px;
  font-weight: 500;
  margin-left: 6px;
}
.jss566 {
  width: 70px;
  height: 70px;
  margin: auto;
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}

.jss587 {
  width: 290px;
}
.jss588 {
  display: flex;
}
.jss589 {
  margin-top: 12px;
}
.jss590 {
  height: 40px;
  display: flex;
}
.jss591 {
  float: right;
  width: 16px;
}

.jss455 {
  color: #fff;
  width: 24px;
  height: 24px;
}
.jss456 {
  width: 48px;
  height: 48px;
  margin: auto;
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}

.jss448 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 20px;
  font-weight: 500;
}
.jss449 {
  width: 167px;
}
.jss450 {
  padding: 16px;
  background: #ffffff;
  border-radius: 3px;
}
.jss451 {
  color: #747c87;
}

.jss443 {
  width: 100%;
}
.jss444 {
  color: rgba(0, 0, 0, 0.87);
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
}
.jss445 {
  margin-top: 24px;
}
.jss446 {
  background: #fff;
  border-radius: 3px;
}

.jss438 {
  width: 100%;
  flex-wrap: wrap;
}
.jss439 {
  background: #f2f9ff;
  min-height: 88px;
  border-radius: 0px 0px 6px 6px;
}

.jss423 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #f0f1f1;
}
.jss424 .MuiDialog-paper {
  min-width: 572px;
}
.jss425 {
  width: 100%;
  height: 40px;
  display: flex;
  padding: 10px 0;
  margin-top: -32px;
  justify-content: flex-end;
}
.jss426 {
  width: calc((100vw - 230px - 32px * 2 - 24px * 3) / 4);
  margin-left: 24px;
}
.jss426.info-right-collapse {
  width: calc((100vw - 52px - 32px * 2 - 24px * 3) / 4);
}
.jss427 {
  width: calc(100% - ((100vw - 230px - 32px * 2 - 24px * 3) / 4) - 24px);
}
.jss427.info-left-collapse {
  width: calc(100% - ((100vw - 52px - 32px * 2 - 24px * 3) / 4) - 24px);
}
.jss428 {
  height: 450px;
}
.jss428 .button-close-dialog {
  top: 9px;
  right: 12px;
  width: 24px;
  cursor: pointer;
  height: 24px;
}
.jss428 .button-download {
  top: 139px;
  left: 14px;
  width: 273px;
  height: 37px;
  display: flex;

  justify-content: space-between;
}
@media screen and (min-width: 700px) {
  .jss428 {
    height: 500px;
  }
  .jss428 .button-close-dialog {
    top: 12px;
    right: 16px;
    width: 30px;
    height: 30px;
  }
}
.jss428 .button-download.language-th {
  top: 149px;
  left: 10px;
  width: 280px;
}
.jss428 .button-download .button-download-android,
.jss428 .button-download .button-download-ios {
  width: 132px;
  cursor: pointer;
  height: 100%;
  display: inline-block;
}
@media screen and (min-width: 700px) {
  .jss428 .button-download {
    top: 303px;
    left: 51px;
    width: 410px;
    height: 51px;
  }
  .jss428 .button-download .button-download-android,
  .jss428 .button-download .button-download-ios {
    width: 200px;
  }
}
.jss428 .button-download.language-th .button-download-android,
.jss428 .button-download.language-th .button-download-ios {
  width: 138px;
}
@media screen and (min-width: 700px) {
  .jss428 .button-download.language-th {
    top: 214px;
    left: 42px;
    width: 221px;
    height: 122px;
    flex-direction: column;
  }
  .jss428 .button-download.language-th .button-download-android,
  .jss428 .button-download.language-th .button-download-ios {
    width: 100%;
    height: 55px;
  }
}
.jss428 .button-close-dialog svg {
  color: #0089ff;
  width: 30px;
  height: 30px;
}
.jss429 {
  cursor: pointer;
  overflow: hidden;

  min-height: 400px;
}
.jss429 .button-close-dialog {
  top: 9px;
  right: 12px;
  width: 24px;
  cursor: pointer;
  height: 24px;
}
@media screen and (min-width: 1040px) {
  .jss429 {
    height: 395.48px;
  }
  .jss429 .button-close-dialog {
    top: 12px;
    right: 16px;
    width: 30px;
    height: 30px;
  }
}
.jss429 .button-close-dialog svg {
  color: #0089ff;
  width: 30px;
  height: 30px;
}
.jss430 .MuiDialog-paper {
  min-width: 699px;
  min-height: 401px;
}
.jss430 .content-interconnection-pharmacy {
  height: 265px;
  display: grid;
  padding-top: 15px;
}
.jss431 .MuiDialogTitle-root {
  min-height: 56px;
}
.jss432 .MuiDialogTitle-root {
  min-height: 24px;
}
.jss432 .MuiDialogContent-dividers {
  border-top: none;
}
.jss432 .MuiDialogTitle-root .MuiTypography-root {
  display: none;
}
.jss433 {
  width: 320px;
  border: 0.5px dashed #0fd186;
  height: 52px;
  display: inline-block;
  background: #f3fcf9;
  margin-top: 16px;
  border-radius: 5px;
}
.jss434 {
  top: 16px;
  left: 16px;
  color: #0fd186;
  margin: 8px 48.45px;
  display: flex;
  font-size: 20px;
  font-style: normal;
  text-align: center;
  align-items: center;
  font-weight: 700;
}
.jss435 {
  display: grid;
  justify-content: center;
}
.jss436 {
  color: #f3f4f5;
  height: 36px;
  font-size: 14px;
  min-width: 121px;
  background: #0fd186;
  font-weight: 500;
  line-height: 36px;
  border-radius: 3px;
}
.jss436:hover {
  cursor: pointer;
}
.jss436 .MuiIconButton-root:hover {
  background: none;
}
.jss437:hover {
  cursor: pointer;
}

.jss1047 {
  margin: 0;

  max-width: 755px;
  min-width: 420px;
}
.jss1048 {
  margin-top: 50px;
  align-items: flex-start;
}

.jss1049 {
  margin: 0;
}
.jss1050 {
  margin-top: 50px;
  align-items: flex-start;
}

.jss1051 {
  margin: 0;
}
.jss1052 {
  margin-top: 50px;
  align-items: flex-start;
}

.jss1053 {
  margin: 0;
}
.jss1054 {
  margin-top: 50px;
  align-items: flex-start;
}

.jss1055 {
  margin: 0;
}
.jss1056 {
  margin-top: 50px;
  align-items: flex-start;
}
.jss1088 {
  margin: 0;
}
.jss1089 {
  margin-top: 50px;
  align-items: flex-start;
}
.jss1090 {
  margin: 0;
}
.jss1091 {
  margin-top: 50px;
  align-items: flex-start;
}
</style>
