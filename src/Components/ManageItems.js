import { Button, Dropdown, Input, Space } from "antd";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  addToBaseProducts,
  fetchAllCollections,
  fetchBaseData,
  fetchDataByDate,
} from "../DataHandling/data";

// import { use } from "react/cjs/react.production";
export function ManageItems() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const [comp, setComp] = useState("");
  const [par, setPar] = useState("");

  const [types, setTypes] = useState([]);
  const [subTypes, setSubTypes] = useState([]);
  const [comps, setComps] = useState([]);
  const [data, setData] = useState([]);
  const [cust, setCust] = useState(false);
  const getData = async () => {
    const result = await fetchBaseData(); // Wait for fetchData to complete
    console.log("result", result);
    setData(result || []); // Ensure result is always an array
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("d", data.length);

    if (data.length > 0) {
      const uniqueTypesArray = [...new Set(data.map((item) => item.Type))].map(
        (type, index) => ({
          label: type,
          key: index,
        })
      );

      const uniqueSubTypesArray = [
        ...new Set(data.map((item) => item.SubType)),
      ].map((type, index) => ({
        label: type,
        key: index,
      }));

      const uniqueCompsArray = [...new Set(data.map((item) => item.Comp))].map(
        (type, index) => ({
          label: type,
          key: index,
        })
      );

      // code for custom button but not needed now
      // [uniqueCompsArray, uniqueSubTypesArray, uniqueTypesArray].map((item) => {
      //   item.push({ type: "divider" });

      //   item.push(
      //     // Adds a separator line
      //     {
      //       label: (
      //         <Button type="text" icon={<PlusOutlined />} onClick={() => {}}>
      //           Add Custom Type
      //         </Button>
      //       ),
      //       key: 99,
      //     }
      //   );
      // });

      // console.log("dad", uniqueTypesArray);
      setTypes(uniqueTypesArray);
      setSubTypes(uniqueSubTypesArray); // Update state with formatted data
      setComps(uniqueCompsArray);

      const sortedData = data.sort((a, b) => {
        if (a.Type === b.Type) {
          return (a.SubType || "").localeCompare(b.SubType || "");
        }
        return a.Type.localeCompare(b.Type);
      });

      setData(sortedData);
    }
  }, [data]);

  function handleAdd() {
    let proceed =
      !name || !type || !subType || !comp || !Number(par) || "proceed";
    proceed == "proceed"
      ? console.log("can Proceed")
      : console.log("cant proced");

    if (proceed == "proceed") {
      addToBaseProducts(name, type, subType, par, comp);
      getData();
      setName("");
      setComp("");
      setType("");
      setSubType("");
      setPar("");
    }
  }

  // let typesf = [
  //   { label: "Beer", key: 0 },
  //   { label: "Wine", key: 1 },
  //   { label: "Sprit", key: 2 },
  //   { label: "Bar Misc", key: 3 },
  //   { type: "divider" }, // Adds a separator line
  //   {
  //     label: (
  //       <Button type="text" icon={<PlusOutlined />} onClick={() => {}}>
  //         Add Custom Type
  //       </Button>
  //     ),
  //     key: "add-new",
  //   },
  // ];
  const handleChange = (event, val) => {
    val(event.target.value);
  };
  return (
    <div className="MI">
      <div className="MI-AddItems">
        <div className="MI-title">
          ADD
          <br /> ITEMS
        </div>
        <div className="MI-Card">
          <div>
            <p className="MI-SubTitle">Item Details</p>
            <div className="MI-Name">
              <Space>
                NAME
                <Input
                  className="input-dark"
                  value={name}
                  onChange={(e) => handleChange(e, setName)}
                />
                Par Levels
                <Input
                  className="input-dark input-par"
                  value={par}
                  onChange={(e) => handleChange(e, setPar)}
                />
              </Space>
            </div>
            <div className="MI-Name ">
              <Space>
                {cust ? (
                  <>
                    <DropDownCust
                      name={type}
                      placeholder={"Type"}
                      items={types}
                      setFunc={setType}
                    />
                    <DropDownCust
                      name={subType}
                      placeholder={"Sub Type"}
                      items={subTypes}
                      setFunc={setSubType}
                    />
                    <DropDownCust
                      name={comp}
                      placeholder={"Company"}
                      items={comps}
                      setFunc={setComp}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      placeholder="Type..."
                      className="input-dark MI-DropDown"
                      value={type}
                      onChange={(e) => handleChange(e, setType)}
                    />
                    <Input
                      placeholder="Sub Type..."
                      className="input-dark MI-DropDown"
                      value={subType}
                      onChange={(e) => handleChange(e, setSubType)}
                    />
                    <Input
                      placeholder="Company..."
                      className="input-dark MI-DropDown"
                      value={comp}
                      onChange={(e) => handleChange(e, setComp)}
                    />
                  </>
                )}

                <div
                  className={` MI-No-Hover ${
                    cust ? "MI-button-light" : "MI-button-dark"
                  }`}
                  onClick={() => {
                    setCust((prev) => !prev);
                  }}
                >
                  CUSTOM
                </div>
              </Space>
            </div>
          </div>
          <div
            className="MI-Button"
            onClick={() => {
              handleAdd();
            }}
          >
            <p>A</p>
            <p>D</p>
            <p>D</p>
          </div>
        </div>
      </div>

      <MIBody data={data} />
    </div>
  );
}

function DropDownCust({ name, placeholder, items, setFunc }) {
  return (
    <Dropdown
      menu={{
        items: items,
        onClick: (e) => setFunc(items[e.key]["label"]),
      }}
      trigger={["click"]}
    >
      <Button className="button-dark MI-DropDown">
        {name || placeholder} <DownOutlined />
      </Button>
    </Dropdown>
  );
}

function MIBody({ data }) {
  let temp = true;

  const [type, setType] = useState("Type");
  const [subType, setSubType] = useState("Sub Type");
  const [comp, setComp] = useState("Company");

  return (
    <div className="MI-Body">
      <div className="MI-List-Button-List">
        <MIButtonList
          data={data}
          type={type}
          setType={setType}
          subType={subType}
          setSubType={setSubType}
          comp={comp}
          setComp={setComp}
        />
      </div>
      <div className="MI-List-Block-Title">
        <p className="MI-List-Item-Cust-Name">Product Name</p>
        <p className="MI-List-Item">Type</p>
        <p className="MI-List-Item">Sub Type</p>
        <p className="MI-List-Item">Par Level</p>
        <p className="MI-List-Item">Company</p>
      </div>
      <ul className="MI-List">
        {data.map((data, i) => {
          temp = !temp;
          if (comp != "Company") {
            if (data.Comp == comp)
              return <MIListItem data={data} temp={temp} />;
          } else {
            if (data.Type == type || type == "Type")
              if (data.SubType == subType || subType == "Sub Type")
                return <MIListItem data={data} temp={temp} />;
          }
        })}

        {/* {data.map((item, i) => {
          temp = !temp;
          if (item.Type == type || type == "Type")
            if (item.SubType == subType || subType == "Sub Type")
              return <MIListItem data={data} temp={temp} />;
        })} */}
      </ul>
      {/* <div className="MI-List">
        <ul className="">
          {data.map((item, i) => {
            temp = !temp;

            return (
              <li key={i} className={` ${temp ? "color-adder" : ""}`}>
                <p className="">{item.Name}</p>
                <p className="">{item.Type}</p>
                <p className="">{item["SubType"]}</p>

                <p className="">10</p>
                <p className="">Greene King</p>
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
}

function MIButtonList({
  data,
  type,
  setType,
  subType,
  setSubType,
  comp,
  setComp,
}) {
  let uniqueTypes = [...new Set(data.map((item) => item["Type"]))];
  const typeItems = uniqueTypes.map((item, index) => ({
    label: item,
    key: index,
  }));
  typeItems.push({ type: "divider" }, { label: "-none-", key: "none" });

  const handleTypeClick = (e) => {
    if (e.key === "none") {
      setType("Type");
      setSubType("Sub Type"); // Reset SubType
    } else {
      setComp("Company");
      setType(uniqueTypes[e.key]);
      setSubType("Sub Type"); // Reset SubType when Type changes
    }
  };

  let uniqueComps = [...new Set(data.map((item) => item["Comp"]))];
  const CompItems = uniqueComps.map((item, index) => ({
    label: item,
    key: index,
  }));
  CompItems.push({ type: "divider" }, { label: "-none-", key: "none" });

  const handleCompClick = (e) => {
    if (e.key === "none") {
      setComp("Company");
    } else {
      setComp(uniqueComps[e.key]);
      setSubType("Sub Type");
      setType("Type"); // Reset SubType when Type changes
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

  const handleSubTypeClick = (e) => {
    const subTypesList = getSubTypes();
    setSubType(subTypesList[e.key]?.label || "Sub Type");
  };
  return (
    <Space>
      Filter
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
      <Dropdown
        menu={{ items: CompItems, onClick: handleCompClick }}
        trigger={["click"]}
      >
        <Button className="button-dark">
          <Space>
            {comp}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
}

function MIListItem({ data, temp }) {
  return (
    <li className={`MI-List-Block ${temp ? "MI-Color-Adder" : ""}`}>
      <p className="MI-List-Item-Cust">{data.Name}</p>
      <p className="MI-List-Item">{data.Type}</p>
      <p className="MI-List-Item">{data.SubType}</p>

      <p className="MI-List-Item">{data.Par || 10}</p>
      <p className="MI-List-Item">{data.Comp || "Unknown"}</p>
    </li>
  );
}
