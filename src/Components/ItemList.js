import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../DataHandling/data";
import { Dropdown } from "antd";

export function ItemList({
  product,
  selectedItem,
  setSelectedItem,
  data,
  setData,
}) {
  let temp = true;
  const [ind, setIndex] = useState(0);

  console.log(product, "From Itemlist");

  function eraseAndFetchData() {
    setData([]);
    const getData = async () => {
      const result = await fetchData(); // Wait for fetchData to complete
      setData(result || []); // Ensure result is always an array
    };

    getData();
  }

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(); // Wait for fetchData to complete
      setData(result || []); // Ensure result is always an array
    };

    getData();
  }, []);

  const values = data
    .map((item) => item?.Name) // Use optional chaining to prevent errors
    .filter((name) => name !== undefined); // Remove undefined values

  const itemRefs = useRef([]);
  itemRefs.current = values.map(
    (_, i) => itemRefs.current[i] || React.createRef()
  );

  // Make sure selectedItem exists and then call toLowerCase
  const index = values.findIndex((item) =>
    item?.toLowerCase().includes(selectedItem?.toLowerCase() || "")
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
    if (selectedItem !== "") handleSearch();
  }, [selectedItem]);

  return (
    <div className="item-list-all">
      <ButtonsItemList modifyData={eraseAndFetchData} />
      {/* Column Headings */}
      <div className="item-title">
        <p className="name-custom ">Product Name</p>
        <p className="type">Category</p>
        <p className="type">Sub Category</p>
        <p className="unit-custom">Unit</p>
        <p className="quantity-custom">Quantity</p>
      </div>

      <div className="item-list">
        <ul className="content-list">
          {data.map((item, i) => {
            temp = !temp;
            return (
              <li
                onClick={() => setSelectedItem(item.Name)}
                ref={itemRefs.current[i]}
                key={i}
                className={`custom-list ${temp ? "color-adder" : ""}
                 
                ${
                  selectedItem &&
                  item?.Name?.toLowerCase() === selectedItem?.toLowerCase()
                    ? "selected-list-item"
                    : ""
                }`}
              >
                <p className="name">
                  {selectedItem == item.Name ? item.Name : shortener(item.Name)}
                </p>
                <p className="type">{item["Type"] ? item["Type"] : "Spirit"}</p>
                <p className="type">
                  {item["SubType"] ? item["SubType"] : "Spirit"}
                </p>
                <p className="unit">Bottle</p>
                <p className="quantity">
                  {item.quantity ? item.quantity : "-"}
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
  return str?.length > 25 ? str.slice(0, 22) + "..." : str;
}

function ButtonsItemList({ modifyData }) {
  const [disrupt, setDisrupt] = useState(false);

  return (
    <div className="bar-buttons">
      {disrupt ? (
        <Disrupt
          setDisrupt={setDisrupt}
          messsage={"Confirm Reset?"}
          setAnswer={modifyData}
        />
      ) : (
        <></>
      )}
      <div className="space-buttons"></div>
      <div
        className="bar-buttons-ind"
        onClick={() => {
          setDisrupt(true);
        }}
      >
        Reset
      </div>
      <div style={{ color: "rgb(138, 138, 138)" }}>{`Floor`}</div>
      <div className="bar-buttons-ind " style={{ marginRight: 0 }}>{`<`}</div>
      <div className="bar-buttons-ind">{`>`}</div>
      {/* <div className="bar-buttons-ind">RESET</div> */}
    </div>
  );
}

function Disrupt({ messsage, setDisrupt, setAnswer }) {
  return (
    <>
      <div className="floating-cont"></div>
      <div className="floating-cont-box">
        <div className="floating-cont-text">
          {messsage ? messsage : "no data received"}
        </div>
        <div>
          <button
            className="floating-cont-button"
            onClick={() => {
              setDisrupt(false);
              setAnswer();
            }}
          >
            Yes
          </button>
          <button
            className="floating-cont-button"
            onClick={() => setDisrupt(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
