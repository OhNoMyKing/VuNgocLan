import Background from "../../common/Background";

import { imageBackground } from "../../common/data";
import Left from "../../common/left";
import Menu from "../../common/menu";
import UserService from "../../service/UserService";
import ModuleDashBoardAdmin from "../module/ModuleDashboardAdmin";



function IndexAdminView() {
    const adminOnly = UserService.adminOnly();
    if (adminOnly) {
        return (
            <div>
                <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                    data-sidebar-position="fixed" data-header-position="fixed">
                    <Menu />
                    <Background imageBackground={imageBackground} />
                    <div className="" style={{ display: 'flex' }}>
                        <Left />
                        <div className="body-wrapper" style={{ marginLeft: '0px', flexGrow: 1 }} >
                            <ModuleDashBoardAdmin />
                        </div>

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="">
                <Menu />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${require('./leo.gif')})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <div className="rainbow-text" style={{
                        fontSize: '50px',
                        textAlign: 'center',
                        background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>

                        <strong>YOU ARE GAY</strong> <i class="fa-solid fa-hand-middle-finger"></i>
                    </div>
                </div>
            </div>
        )
    }

}
export default IndexAdminView;