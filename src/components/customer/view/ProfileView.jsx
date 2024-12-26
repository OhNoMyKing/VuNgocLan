
import { useState } from "react";
import { PaginationContext } from "../../../context/PaginationContext";
import Background from "../../common/Background";
import { imageBackground } from "../../common/data";
import Menu from "../../common/menu";
import ModuleCart from "../module/ModuleCart";
import Footer from "../../common/footer";
import ModuleProfile from "../module/ModuleProfile";



function ProfileView() {
    const [noPage, setNoPage] = useState('');
    const [totalPage, setTotalPage] = useState('');

    return (

        <div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Menu />
                <Background imageBackground={imageBackground} />
                <div className="" style={{ display: 'flex' }}>

                    <div className="body-wrapper" style={{ marginLeft: '0px', flexGrow: 1 }} >

                        <PaginationContext.Provider value={{ noPage, setNoPage, totalPage, setTotalPage }}>
                            <ModuleProfile />

                        </PaginationContext.Provider>




                    </div>
                </div>
                <Footer />






            </div>
        </div>


    )
} export default ProfileView;