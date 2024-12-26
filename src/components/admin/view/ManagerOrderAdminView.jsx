
import { useState } from "react";
import Menu from "../../common/menu";

import { imageBackground } from "../../common/data";
import Left from "../../common/left";

import { PaginationContext } from "../../../context/PaginationContext";

import Background from "../../common/Background";
import ModuleOrderAdmin from "../module/ModuleOrderAdmin";




function ManagerOrderAdminView() {


    const [noPage, setNoPage] = useState('');
    const [totalPage, setTotalPage] = useState('');
    return (
        <div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Menu />
                <Background imageBackground={imageBackground} />
                <div className="" style={{ display: 'flex' }}>
                    <Left />

                    <div className="body-wrapper" style={{ marginLeft: '0px', flexGrow: 1 }} >

                        <PaginationContext.Provider value={{ noPage, setNoPage, totalPage, setTotalPage }}>
                            {/* <UpdateSportswear /> */}
                            <ModuleOrderAdmin />
                        </PaginationContext.Provider>

                    </div>
                </div>
            </div>





        </div>
    )
}
export default ManagerOrderAdminView;