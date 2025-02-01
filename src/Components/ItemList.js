import React, { useEffect, useRef, useState } from "react";

export function ItemList({ product, selectedItem, setSelectedItem }) {
  let temp = true;
  const [ind, setIndex] = useState(0);

  const values = product.map((item) => item.Name);

  const itemRefs = useRef([]);
  itemRefs.current = values.map(
    (_, i) => itemRefs.current[i] || React.createRef()
  );

  const index = values.findIndex((item) =>
    item.toLowerCase().includes(selectedItem.toLowerCase())
  );

  function handleSearch() {
    console.log(itemRefs.current[1], "from MY CODE");
    // Scroll to the matching item

    if (index !== -1) {
      console.log(ind, " previous Index");

      console.log(index, " Current index");

      if (Math.abs(ind - index) > 10) {
        itemRefs.current[index].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setIndex(index);
      }
    }
  }

  useEffect(() => {
    if (selectedItem != "") handleSearch();
  }, [selectedItem]);

  return (
    <div className="item-list-all">
      <ButtonsItemList />
      <div className="item-title">
        <p className="name-custom ">Product Name</p>
        <p className="type">Category</p>
        <p className="unit-custom">Unit</p>
        <p className="quantity-custom">Quantity</p>
      </div>

      <div className="item-list">
        <ul class="content-list ">
          {product.map((item, i) => {
            temp = !temp;
            return (
              <li
                onClick={() => setSelectedItem(item.Name)}
                ref={itemRefs.current[i]}
                key={i}
                className={`custom-list ${temp ? "color-adder" : ""}
                 
                ${
                  selectedItem &&
                  item.Name.toLowerCase() === selectedItem.toLowerCase()
                    ? "selected-list-item"
                    : ""
                }`}
              >
                <p className="name">
                  {selectedItem == item.Name ? item.Name : shortener(item.Name)}
                </p>
                <p className="type">
                  {item["Spirit Type"] ? item["Spirit Type"] : "Sprit"}
                </p>
                <p className="unit">Bottle</p>
                <p className="quantity">
                  {item.quantity ? item.quantity : "99"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function shortener(str) {
  return str.length > 25 ? str.slice(0, 22) + "..." : str;
}

function ButtonsItemList() {
  return (
    <div className="bar-buttons">
      <div className="space-buttons"></div>
      <div style={{ color: "rgb(138, 138, 138)" }}>{`Floor`}</div>
      <div className="bar-buttons-ind " style={{ marginRight: 0 }}>{`<`}</div>
      <div className="bar-buttons-ind">{`>`}</div>
      {/* <div className="bar-buttons-ind">RESET</div> */}
    </div>
  );
}
