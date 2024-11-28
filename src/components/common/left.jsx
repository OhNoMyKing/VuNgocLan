function Left() {
    return (
        <div>
            <aside className="left-sidebar" style={{ position: 'relative', top: 'auto' }} >

                <div>
                    <div className="brand-logo d-flex align-items-center justify-content-between">
                        <a href="./index.html" className="text-nowrap logo-img">
                            <img src="/website/assets/images/logos/dark-logo.svg" width="180" alt="" />
                        </a>
                        <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                            <i className="ti ti-x fs-8"></i>
                        </div>
                    </div>

                    <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Trang chủ</span>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="/manager" aria-expanded="false">
                                    <span>
                                        <i class="fa-solid fa-chart-line"></i>
                                    </span>
                                    <span className="hide-menu">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">Thao tác</span>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="/manager/sportswear" aria-expanded="false">
                                    <span>
                                        <i class="fa-solid fa-shirt"></i>
                                    </span>
                                    <span className="hide-menu">Quản lý sản phẩm</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="/manager/order" aria-expanded="false">
                                    <span>
                                        <i class="fa-solid fa-note-sticky"></i>
                                    </span>
                                    <span className="hide-menu">Quản lý đơn hàng</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="/manager/user" aria-expanded="false">
                                    <span>
                                        <i class="fa-solid fa-user"></i>
                                    </span>
                                    <span className="hide-menu">Quản lý người dùng</span>
                                </a>
                            </li>
                            {/* <li className="sidebar-item">
                                <a className="sidebar-link" href="./ui-card.html" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-cards"></i>
                                    </span>
                                    <span className="hide-menu">Card</span>
                                </a>
                            </li>


                            <li className="sidebar-item">
                                <a className="sidebar-link" href="./ui-typography.html" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-typography"></i>
                                    </span>
                                    <span className="hide-menu">Typography</span>
                                </a>
                            </li>
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">AUTH</span>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="authentication-signin.html" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-login"></i>
                                    </span>
                                    <span className="hide-menu">Login</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="authentication-signup.html" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-user-plus"></i>
                                    </span>
                                    <span className="hide-menu">Register</span>
                                </a>
                            </li>
                            <li className="nav-small-cap">
                                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                                <span className="hide-menu">EXTRA</span>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="./icon-tabler.html" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-mood-happy"></i>
                                    </span>
                                    <span className="hide-menu">Icons</span>
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link" href="./sample-page.html" aria-expanded="false">
                                    <span>
                                        <i className="ti ti-aperture"></i>
                                    </span>
                                    <span className="hide-menu">Sample Page</span>
                                </a>
                            </li> */}
                        </ul>
                        {/* <div className="unlimited-access hide-menu bg-light-primary position-relative mb-7 mt-5 rounded">
                            <div className="d-flex">
                                <div className="unlimited-access-title me-3">
                                    <h6 className="fw-semibold fs-4 mb-6 text-dark w-85">Upgrade to pro</h6>

                                </div>
                                <div className="unlimited-access-img">
                                    <img src="/website/assets/images/backgrounds/rocket.png" alt="" className="img-fluid" />
                                </div>
                            </div>
                        </div> */}
                    </nav>

                </div>

            </aside>
        </div>
    )
}
export default Left;