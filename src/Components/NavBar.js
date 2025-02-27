import { ExperimentOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useState } from "react";
import "../STYLE/navBar.css";

export default function NavBar(props) {
  const [open, setOpen] = useState(false);

  function NavItem({ name, pageID }) {
    return (
      <div
        onClick={() => {
          props.setPage(pageID);
          setOpen(false);
        }}
        className={`nav-items ${
          props.page == pageID ? "nav-item-select" : ""
        } `}
      >
        {name}
      </div>
    );
  }

  function BlackOut() {
    return <div className={` ${open ? "BlackOut" : ""}`}></div>;
  }

  return (
    <div className=" navBar ">
      {/* <div className="navBarAdd"></div> */}
      <BlackOut />
      <div className={"nbar" + ` ${open ? "nav-bar-active" : "nav-bar"}`}>
        <div className="nav-bar-title">POLYGON</div>
        <div className="divider"></div>
        <div className="nav-sub-title">Stocktake</div>
        <NavItem name="📉 New StockTake" pageID="StockTake" />
        <NavItem name="📈 StockTake Hist" pageID="PrevData" />
        <NavItem name="📁 Manage Items" pageID="EditItems" />
        <div className="divider"></div>
        <div className="nav-sub-title">Stocktake</div>
        <div className="nav-items">📉 New StockTake</div>
        <div className="nav-items">📈 Previous StockTake</div>
        <div className="nav-items">📁 Manage Items</div>
      </div>

      <ExperimentOutlined
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className={` ${open ? "nav-menu-active" : "nav-menu"}`}
      />

      {/* <h2 className="logo-name">POLYGON</h2> */}

      {/* <div className="navBar">
     
      </div> */}
      {/* <div className={` ${open ? "nav-bar-active" : "navBar"}`}>
        <MenuOutlined
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        />
      </div> */}
    </div>
  );
}

function NavItem({ name, pageID, pageData }) {
  return (
    <div
      onClick={() => {
        pageData.setPage(pageID);
      }}
      className={`nav-items ${
        pageData.page == pageID ? "nav-item-select" : ""
      } `}
    >
      {name}
    </div>
  );
}
