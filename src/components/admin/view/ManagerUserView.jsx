
import { useState } from "react";
import Menu from "../../common/menu";

import { imageBackground } from "../../common/data";
import Left from "../../common/left";
import { SearchContext } from "../../../context/SearchContext";
import { PaginationContext } from "../../../context/PaginationContext";
import ModuleManagerSportswear from "../module/ModuleManagerSportswear";
import Background from "../../common/Background";
import ModuleManagerUser from "../module/ModuleManagerUser";




function ManagerUserView() {
    const [key, setKey] = useState('');
    const [categoryName, setCategoryName] = useState('');
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
                        <SearchContext.Provider value={{ key, setKey, categoryName, setCategoryName }}>
                            <PaginationContext.Provider value={{ noPage, setNoPage, totalPage, setTotalPage }}>
                                {/* <UpdateSportswear /> */}
                                <ModuleManagerUser />
                            </PaginationContext.Provider>
                        </SearchContext.Provider>
                    </div>
                </div>
            </div>





        </div>
    )
}
export default ManagerUserView;