import { useState } from "react";
import "./STYLE/StockSheet/searchBar.css";
import "./STYLE/StockSheet/itemList.css";
import "./STYLE/StockSheet/calc.css";
import "./STYLE/StockSheet/stockBody.css";
import "./STYLE/StockSheet/sideBar.css";
import { SearchBar } from "./Components/SearchBar";
import { ItemList } from "./Components/ItemList";
import { product } from "./DataHandling/data";
import { Calc } from "./Components/Calc";
import SpreadsheetReader from "./DataHandling/SpreadSheetReader";

export function Main() {
  const [selectedItem, setSelectedItem] = useState("");
  const [data, setData] = useState([]);

  return (
    <div className="main">
      <h2>
        Stock-Take:
        {selectedItem.length > 25
          ? selectedItem.slice(0, 22) + "..."
          : selectedItem}
      </h2>
      <SearchBar setSelectedItem={setSelectedItem} />
      <div className="stock-body">
        <ItemList
          product={product}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          data={data}
          setData={setData}
        />

        <SideBar
          data={data}
          setData={setData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </div>
  );
}

function SideBar({ selectedItem, setSelectedItem, data, setData }) {
  return (
    <div className="side-bar">
      <div className="side-nav-top">d</div>

      <Calc
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        data={data}
        setData={setData}
      />
    </div>
  );
}
