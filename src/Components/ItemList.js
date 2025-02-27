import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../DataHandling/data";
import { Space, Button } from "antd";
import { ButtonsItemList } from "./ButtonsItemList";

export function ItemList({
  selectedItem,
  setSelectedItem,
  data,
  setData,
  setVal,
  type,
  setType,
  subType,
  setSubType,
}) {
  let temp = true;
  const [ind, setIndex] = useState(0);

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

  const sortedData = data.sort((a, b) => {
    if (a.Type === b.Type) {
      return (a.SubType || "").localeCompare(b.SubType || "");
    }
    return a.Type.localeCompare(b.Type);
  });

  setData(sortedData);

  return (
    <div className="item-list-all">
      <ButtonsItemList
        modifyData={eraseAndFetchData}
        data={data}
        type={type}
        setType={setType}
        subType={subType}
        setSubType={setSubType}
      />
      {/* Column Headings */}
      <div className=" item-title">
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
            if (item.Type == type || type == "Type")
              if (item.SubType == subType || subType == "Sub Type")
                return (
                  <li
                    onClick={() => {
                      setVal((val) => {
                        if (item.quantity) return String(item.quantity);
                        else return "";
                      });

                      setSelectedItem(item.Name);
                    }}
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
                      {selectedItem == item.Name
                        ? item.Name
                        : shortener(item.Name)}
                    </p>
                    <p className="type">
                      {item["Type"] ? item["Type"] : "Spirit"}
                    </p>
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

export function Disrupt({ messsage, setDisrupt, setAnswer }) {
  return (
    <>
      <div className="floating-cont"></div>
      <div className="floating-cont-box">
        <div className="floating-cont-text">
          {messsage ? messsage : "no data received"}
        </div>
        <div>
          <Space>
            <Button
              className="floating-cont-button"
              onClick={() => {
                setDisrupt(false);
                setAnswer();
              }}
            >
              Yes
            </Button>
            <Button
              className="floating-cont-button"
              onClick={() => setDisrupt(false)}
            >
              Cancel
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
}
