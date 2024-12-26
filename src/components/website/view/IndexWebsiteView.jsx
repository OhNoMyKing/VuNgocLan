import React, { useState } from "react";

import ModuleShowSportswearList from "../module/ModuleShowSportswearList";
import Menu from "../../common/menu";
import Chatbot from "../../chatbot/chatbot";
import { imageBackground } from "../../common/data";
import Left from "../../common/left";
import { SearchContext } from "../../../context/SearchContext";
import { PaginationContext } from "../../../context/PaginationContext";
import Search from "../../common/Search";
import Pagination from "../../common/Pagination";
import Background from "../../common/Background";
import Footer from "../../common/footer";

function IndexWebsiteView() {
  const [key, setKey] = useState("");
  const [categoryName, setCategoryName] = useState("");
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
            <SearchContext.Provider
              value={{ key, setKey, categoryName, setCategoryName }}
            >
              <PaginationContext.Provider
                value={{ noPage, setNoPage, totalPage, setTotalPage }}
              >
                <Search />
                <ModuleShowSportswearList />
              </PaginationContext.Provider>
            </SearchContext.Provider>
            <Chatbot></Chatbot>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default IndexWebsiteView;
