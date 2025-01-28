import { useState } from "react";
import "./STYLE/StockSheet/searchBar.css";
import "./STYLE/StockSheet/itemList.css";
import "./STYLE/StockSheet/calc.css";
import "./STYLE/StockSheet/stockBody.css";
import { SearchBar } from "./Components/SearchBar";
import { ItemList } from "./Components/ItemList";
import { product } from "./DataHandling/data";
import { Calc } from "./Calc";
import SpreadsheetReader from "./DataHandling/SpreadSheetReader";

export function Main() {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div className="main">
      <h2> Stock-Take {selectedItem}</h2>
      <SearchBar data={product} setSelectedItem={setSelectedItem} />
      <div className="stock-body">
        <ItemList product={product} selectedItem={selectedItem} />

        <SideBar />
      </div>
    </div>
  );
}

function SideBar() {
  return (
    <div className="side-bar">
      <div className="side-nav-top"></div>

      <Calc />
    </div>
  );
}
