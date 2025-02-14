import React, { useState } from "react";
import { saveData } from "../DataHandling/data";
import {
  DownOutlined,
  RedoOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { Disrupt } from "./ItemList";

export function ButtonsItemList({ modifyData, data, type, setType }) {
  let uniqueTypes = [...new Set(data.map((item) => item["Type"]))];
  let uniqueSubTypes = [...new Set(data.map((item) => item["SubType"]))];
  // console.log(uniqueSubTypes);
  const [disrupt, setDisrupt] = useState(false);
  const [disruptSave, setDisruptSave] = useState(false);

  const items = uniqueTypes.map((item, index) => {
    return { label: item, key: index };
  });

  items.push(
    {
      type: "divider",
    },
    {
      label: "-none-",
      key: "3",
    }
  );

  const handleMenuClick = (e) => {
    console.log(e.key);
    uniqueTypes[e.key] ? setType(uniqueTypes[e.key]) : setType("Type");
  };

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
      {disruptSave ? (
        <Disrupt
          setDisrupt={setDisruptSave}
          messsage={"Save Data?"}
          setAnswer={() => saveData(data)}
        />
      ) : (
        <></>
      )}
      <div className="space-buttons"></div>
      <Space>
        <div style={{ color: "rgb(138, 138, 138)" }}>Filter </div>
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          trigger={["click"]}
        >
          <Button onClick={(e) => e.preventDefault()}>
            <Space>
              {type}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <Button onClick={(e) => e.preventDefault()}>
            <Space>
              Sub Type
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Button
          onClick={() => {
            setDisrupt(true);
          }}
        >
          RESET
          <RedoOutlined />
        </Button>

        <Button icon={<CaretLeftOutlined />}></Button>
        <Button icon={<CaretRightOutlined />}></Button>
        <Button
          onClick={() => {
            let temp = [];
            data.map((item) => {
              if (item["quantity"]) {
                temp.push(item["Name"]);
              }
              console.log(temp);
            });
          }}
        >
          Print Data
        </Button>
        <Button
          style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          onClick={() => {
            setDisruptSave(true);
          }}
        >
          SAVE
        </Button>
      </Space>
    </div>
  );
}
