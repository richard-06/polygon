import React, { useEffect, useRef } from "react";

export function ItemList({ product, selectedItem }) {
  let temp = true;

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
      itemRefs.current[index].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  useEffect(() => {
    handleSearch();
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
                ref={itemRefs.current[i]}
                key={i}
                className={`custom-list ${temp ? "color-adder" : ""} ${
                  selectedItem &&
                  item.Name.toLowerCase().includes(selectedItem.toLowerCase())
                    ? "selected-list-item"
                    : ""
                }`}
              >
                <p className="name">{item.Name}</p>
                <p className="type">{item.type ? item.type : "Sprit"}</p>
                <p className="unit">Bottle</p>
                <p className="quantity">
                  <input
                    className="quantity-input"
                    value={item.quantity ? item.quantity : "-"}
                  />
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
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
