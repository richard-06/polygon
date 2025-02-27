import { Button, Dropdown, Space } from "antd";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import React, { useEffect, useState } from "react";
import { fetchAllCollections, fetchDataByDate } from "../DataHandling/data";
import { ButtonsItemList } from "./ButtonsItemList";
import { DownOutlined } from "@ant-design/icons";
import { async } from "@firebase/util";

export function StockTakeHist() {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [currDate, setCurrDate] = useState("");

  console.log("32", dates);

  const getData = async (date = "25-02-2025") => {
    const result = await fetchDataByDate(date);
    setData(result || []);
  };

  useEffect(() => {
    // Code below is integrated into fetchDates function
    // const getData = async (date = "25-02-2025") => {
    //   const result = await fetchDataByDate(date);
    //   setData(result || []);
    // };
    // getData();

    const fetchDates = async () => {
      const fetchedDates = await fetchAllCollections();
      setDates(fetchedDates || []);

      const getData = async () => {
        const result = await fetchDataByDate(fetchedDates[0]);

        // code to sort data not working
        // const sortedData = data.sort((a, b) => {
        //   if (a.Type === b.Type) {
        //     return (a.SubType || "").localeCompare(b.SubType || "");
        //   }
        //   return a.Type.localeCompare(b.Type);
        // });

        // setData(sortedData);

        setData(result || []);
        setCurrDate(fetchedDates[0]);
        console.log("Inital date is: ", fetchedDates[0]);
      };
      getData();

      // ✅ Ensure dates is always an array
    };

    fetchDates();

    // setDates(() => {
    //   return fetchAllCollections();
    // });
  }, []);

  let temp = false;

  let test = [
    { label: "roshan", key: 3 },
    { label: "roshan", key: 2 },
    { label: "rricha", key: 4 },
    { label: "rosafahan", key: 35 },
  ];
  return (
    <div className="STHist">
      <div className="STTitle">
        <h2>StockTake Hist {currDate}</h2>
        <Button
          onClick={() => {
            console.log(dates);
          }}
        >
          TEST
        </Button>
        <span className="STCard">Completed By: Roshan | 20-21-21 | Monday</span>
      </div>

      <div className="STBody">
        <div className="STView">
          <div className="STButtonList">
            <Space>
              {`Filter `}

              <Dropdown menu={{ items: test, onClick: () => {} }}>
                <Button className="button-dark">
                  Type <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown menu={{ items: test, onClick: () => {} }}>
                <Button className="button-dark">
                  Company <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown menu={{ items: test, onClick: () => {} }}>
                <Button className="button-dark">
                  Par Lvl <DownOutlined />
                </Button>
              </Dropdown>
            </Space>
          </div>
          <div className="item-title ">
            <p className="name ">Product Name</p>
            <p className="type">Type</p>
            <p className="unit">Unit</p>
            <p className="quantity">Quantity</p>
            <p className="type">Par|Quantity</p>
          </div>
          <div className="item-list">
            <ul className="content-list">
              {data.map((item, i) => {
                temp = !temp;

                return (
                  <li
                    key={i}
                    className={`custom-list ${temp ? "color-adder" : ""}`}
                  >
                    <p className="name">{item.Name}</p>
                    <p className="type">{item.Type}</p>
                    <p className="unit">Bottle</p>

                    <p className="quantity">
                      {item["Quantity"] ? item["Quantity"] : "-"}
                    </p>
                    <p className="type">⬇️ 10 | 21</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="STPrev">
          <div className="STPrev-title">StockTake History</div>
          <div className="STPrev-list">
            {dates.map((date) => {
              return (
                <StockTakeCard
                  date={date}
                  getData={getData}
                  setCurrDate={setCurrDate}
                  currDate={currDate}
                />
              );
            })}
            {/* <div className="STMonth-hist">January 2025</div>
            <StockTakeCard />
            <StockTakeCard />
            <StockTakeCard />
            <StockTakeCard />
            <div className="STMonth-hist">Feburary 2025</div>
            <StockTakeCard />
            <StockTakeCard />
            <StockTakeCard />
            <StockTakeCard />
            <div className="STMonth-hist">March 2025</div>
            <StockTakeCard />
            <StockTakeCard />
            <StockTakeCard />
            <StockTakeCard />
            <div className="STMonth-hist">April 2025</div>
            <StockTakeCard />
            <StockTakeCard />
            <StockTakeCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function StockTakeCard({ date, getData, setCurrDate, currDate }) {
  let temp = date == currDate;
  return (
    <ul
      onClick={() => {
        getData(date);
        setCurrDate(date);
      }}
      className={`StockTakeCard ${temp ? "STCAnimate" : ""}`}
    >
      <div
        className={` ${temp ? "STCAnimate-CBar" : "StockTakeCard-CBar"}`}
      ></div>
      <div>
        <div className="StockTakeCard-title">Date : {date}</div>
        <div className="StockTakeCard-body">Conducted By: Test User</div>
      </div>
    </ul>
  );
}
