import React, { useState } from "react";
import {
  checkFormattedDateExists,
  CheckSTExists,
  fetchData2,
  saveData,
} from "../DataHandling/data";
import {
  DownOutlined,
  RedoOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { Disrupt } from "./ItemList";

export function ButtonsItemList({
  modifyData,
  data,
  type,
  setType,
  subType,
  setSubType,
}) {
  let uniqueTypes = [...new Set(data.map((item) => item["Type"]))];

  const [disrupt, setDisrupt] = useState(false);
  const [disruptSave, setDisruptSave] = useState(false);
  const [disruptOverride, setDisruptOverride] = useState(false);

  // Generate Type dropdown items
  const typeItems = uniqueTypes.map((item, index) => ({
    label: item,
    key: index,
  }));

  typeItems.push({ type: "divider" }, { label: "-none-", key: "none" });

  // Handle Type selection
  const handleTypeClick = (e) => {
    if (e.key === "none") {
      setType("Type");
      setSubType("Sub Type"); // Reset SubType
    } else {
      setType(uniqueTypes[e.key]);
      setSubType("Sub Type"); // Reset SubType when Type changes
    }
  };

  // Get unique SubTypes based on selected Type
  const getSubTypes = () => {
    let subTypes = [
      ...new Set(
        data
          .filter((item) => item["Type"] === type)
          .map((item) => item["SubType"])
      ),
    ];

    let temp = subTypes.map((item, index) => ({
      label: item || "No SubType",
      key: index,
    }));
    temp.push({ type: "divider" }, { label: "-None-", key: "none" });
    return temp;
  };

  // Handle SubType selection
  const handleSubTypeClick = (e) => {
    const subTypesList = getSubTypes();
    setSubType(subTypesList[e.key]?.label || "Sub Type");
  };

  return (
    <div className="bar-buttons">
      {disrupt && (
        <Disrupt
          setDisrupt={setDisrupt}
          messsage={"Confirm Reset?"}
          setAnswer={modifyData}
        />
      )}

      {disruptOverride && (
        <Disrupt
          setDisrupt={setDisruptOverride}
          messsage={"Override Previous Data"}
          setAnswer={() => saveData(data)}
        />
      )}

      {disruptSave && (
        <Disrupt
          setDisrupt={setDisruptSave}
          messsage={"Save Data?"}
          setAnswer={() => saveData(data)}
        />
      )}
      <div className="space-buttons"></div>
      <Space>
        <div className="button-dark">Filter </div>

        {/* Type Filter */}
        <Dropdown
          menu={{ items: typeItems, onClick: handleTypeClick }}
          trigger={["click"]}
        >
          <Button className="button-dark">
            <Space>
              {type}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        {/* Sub Type Filter */}
        <Dropdown
          menu={{ items: getSubTypes(), onClick: handleSubTypeClick }}
          trigger={["click"]}
          disabled={type === "Type"}
        >
          <Button className="button-dark" disabled={type === "Type"}>
            <Space>
              {subType}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Button className="button-dark" onClick={() => setDisrupt(true)}>
          RESET <RedoOutlined />
        </Button>

        <Button className="button-dark" icon={<CaretLeftOutlined />} />
        <Button className="button-dark" icon={<CaretRightOutlined />} />
        <Button
          className="button-dark"
          onClick={() => {
            let temp = data
              .filter((item) => item["quantity"])
              .map((item) => item["Name"]);
            console.log(temp);
          }}
        >
          Print Data
        </Button>
        <Button
          style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          onClick={() =>
            CheckSTExists ? setDisruptOverride(true) : setDisruptSave(true)
          }
        >
          SAVE
        </Button>
      </Space>
    </div>
  );
}
