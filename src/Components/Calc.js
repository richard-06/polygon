import { useEffect, useRef, useState } from "react";
import { fetchData, product } from "../DataHandling/data";

export function Calc({ selectedItem, setSelectedItem }) {
  const [val, setVal] = useState("");
  const [hist, setHist] = useState("");

  const resultValRef = useRef(null);
  const scrollToEnd = () => {
    if (resultValRef.current) {
      resultValRef.current.scrollLeft = resultValRef.current.scrollWidth;
    }
  };
  useEffect(() => {
    scrollToEnd();
  }, [val]); // Dependency on 'val' means it runs after 'val' updates

  return (
    <div className="calc-cont">
      <div className="calc-row">
        <div className="result-bar">
          <div className="result-hist">{hist}</div>
          <div className="result-val" ref={resultValRef}>
            {val}
          </div>
        </div>
        <div className="row-buttons">
          <div className="calc-button">AC</div>
          <CalcButtonPlus val="÷" setVal={setVal} />
          <CalcButtonPlus val="x" setVal={setVal} />
          <CalcButtonDel val="DEL" setVal={setVal} />
        </div>
        <div className="row-buttons">
          <CalcButton val="7" setVal={setVal} />
          <CalcButton val="8" setVal={setVal} />
          <CalcButton val="9" setVal={setVal} />
          <CalcButtonPlus val="-" setVal={setVal} />
        </div>
        <div className="row-buttons">
          <CalcButton val="4" setVal={setVal} />
          <CalcButton val="5" setVal={setVal} />
          <CalcButton val="6" setVal={setVal} />
          <CalcButtonPlus val="+" setVal={setVal} />
        </div>
        <div className="row-buttons">
          <CalcButton val="1" setVal={setVal} />
          <CalcButton val="2" setVal={setVal} />
          <CalcButton val="3" setVal={setVal} />
          <CalcButtonEquals setVal={setVal} setHist={setHist} />
        </div>
        <div className="row-buttons" style={{ paddingBottom: "1%" }}>
          <CalcButton val="0" setVal={setVal} />
          <CalcButtonPlus val="." setVal={setVal} />
          <CalcEnter
            val={val}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            setVal={setVal}
            setHist={setHist}
          />
        </div>
      </div>
    </div>
  );
}

function CalcEnter({ selectedItem, setSelectedItem, val, setVal, setHist }) {
  function handleEnter() {
    let handle = selectedItem && Number(val) && "run";
    if (handle == "run") {
      console.log("running");
      const index = fetchData.findIndex((item) => item.Name === selectedItem);
      fetchData[index].quantity = Number(val);
      setSelectedItem("");
      setVal("");
      setHist("");
    }
  }
  return (
    <div
      onClick={handleEnter}
      className={`calc-button-enter ${
        selectedItem && Number(val) ? "calc-button-enter-active" : ""
      }`}
    >
      ENTER
    </div>
  );
}

function CalcButton({ val, setVal }) {
  return (
    <div onClick={() => setVal((prev) => prev + val)} className="calc-button">
      {val}
    </div>
  );
}
function CalcButtonPlus({ val, setVal }) {
  return (
    <div
      onClick={() => setVal((prev) => prev + val)}
      className="calc-button"
      style={{ fontSize: "2rem" }}
    >
      {val}
    </div>
  );
}

function CalcButtonDel({ val, setVal }) {
  return (
    <div
      onClick={() => setVal((prev) => prev.slice(0, -1))}
      className="calc-button"
    >
      {val}
    </div>
  );
}

function CalcButtonEquals({ setVal, setHist }) {
  return (
    <div
      onClick={() =>
        setVal((prev) => {
          setHist(prev);
          let temp = eval(prev.replace(/x/g, "*").replace(/÷/g, "/"));
          return temp % 1 !== 0 ? temp.toFixed(2) : temp;
        })
      }
      className="calc-button"
    >
      =
    </div>
  );
}
