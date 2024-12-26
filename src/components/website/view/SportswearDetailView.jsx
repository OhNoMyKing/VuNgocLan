import { useState } from "react";
import { PaginationContext } from "../../../context/PaginationContext";
import Background from "../../common/Background";

import { imageBackground } from "../../common/data";
import Footer from "../../common/footer";
import Left from "../../common/left";
import Menu from "../../common/menu";
import ModuleShowSportswearDetail from "../module/ModuleShowSportswearDetail";
import Pagination from "../../common/Pagination";

function SportswearDetailView() {
  const [noPage, setNoPage] = useState("");
  const [totalPage, setTotalPage] = useState("");
  return (
    <div>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <Menu />
        <Background imageBackground={imageBackground} />

        <div className="" style={{ display: "flex" }}>
          {/* <Left /> */}
          <div
            className="body-wrapper"
            style={{ marginLeft: "0px", flexGrow: 1 }}
          >
            <PaginationContext.Provider
              value={{ noPage, setNoPage, totalPage, setTotalPage }}
            >
              <ModuleShowSportswearDetail />
            </PaginationContext.Provider>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default SportswearDetailView;
