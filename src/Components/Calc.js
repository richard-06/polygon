import { useEffect, useRef, useState } from "react";
import { fetchData, product } from "../DataHandling/data";

export function Calc({
  selectedItem,
  setSelectedItem,
  data,
  setData,
  val,
  setVal,
}) {
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

  function modifyVal(val) {
    const normalizedVal = val.replace(/\b0+(\d)/g, "$1");
    return normalizedVal;
  }
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
          <div className="calc-button" onClick={() => setVal(0)}>
            AC
          </div>
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
          <CalcButtonPlusDot val="." setVal={setVal} />
          <CalcEnter
            val={val}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            setVal={setVal}
            setHist={setHist}
            data={data}
            setData={setData}
          />
        </div>
      </div>
    </div>
  );
}

function CalcEnter({
  selectedItem,
  setSelectedItem,
  val,
  setVal,
  setHist,
  data,
  setData,
}) {
  function handleEnter() {
    let handle =
      selectedItem && Number(val) == 0 ? "run" : Number(val) && "run";

    if (handle == "run") {
      console.log("running");
      const index = data.findIndex((item) => item.Name === selectedItem);
      console.log(index);
      data[index].quantity = Number(val);
      setSelectedItem("");
      setVal("");
      setHist("");
    }
  }
  return (
    <div
      onClick={
        selectedItem && val == "0"
          ? handleEnter
          : selectedItem && Number(val)
          ? handleEnter
          : () => {}
      }
      className={`calc-button-enter ${
        selectedItem && val == "0"
          ? "calc-button-enter-active"
          : selectedItem && Number(val)
          ? "calc-button-enter-active"
          : ""
      }`}
    >
      ENTER
    </div>
  );
}

function CalcButton({ val, setVal }) {
  return (
    <div
      onClick={() =>
        setVal((prev) => {
          let temp = prev + val;

          const normalizedVal = temp.replace(/\b0+(\d)/g, "$1");

          return normalizedVal;
        })
      }
      className="calc-button"
    >
      {val}
    </div>
  );
}
function CalcButtonPlus({ val, setVal }) {
  const symbols = ["+", "-", "x", "÷"];

  return (
    <div
      onClick={() =>
        setVal((prev) => {
          console.log(prev, prev[prev.length - 1]);
          if (prev[prev.length - 1] == "." && symbols.includes(val))
            return prev.slice(0, prev.length - 1) + val;
          if (!symbols.includes(val)) return prev + val;
          if (!symbols.includes(prev[prev.length - 1])) return prev + val;

          return prev.slice(0, prev.length - 1) + val;
        })
      }
      className="calc-button"
      style={{ fontSize: "2rem" }}
    >
      {val}
    </div>
  );
}
function CalcButtonPlusDot({ val, setVal }) {
  const symbols = ["+", "-", "x", "÷", "."];

  return (
    <div
      onClick={() =>
        setVal((prev) => {
          const parts = prev.split(/[\+\-\x\÷]/);
          console.log("rr");

          if (parts[parts.length - 1].includes(".")) return prev;

          return prev + val;
        })
      }
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
      onClick={() => setVal((prev) => String(prev).slice(0, -1))}
      className="calc-button"
    >
      {val}
    </div>
  );
}

function CalcButtonEquals({ setVal, setHist }) {
  const symbols = ["+", "-", "x", "÷", "."];

  function evaluateMathExpression(expression) {
    expression = expression.trim(); // Remove spaces

    // Check for balanced parentheses
    let stack = [];
    for (let char of expression) {
      if (char === "(") stack.push(char);
      if (char === ")") {
        if (stack.length === 0) return expression; // Unbalanced
        stack.pop();
      }
    }
    if (stack.length !== 0) return expression; // Unbalanced parentheses

    // Regular expression to validate a proper math expression
    const mathRegex = /^-?(\d+(\.\d*)?|\.\d+)([+\-x÷]-?(\d+(\.\d*)?|\.\d+))*$/;

    // Prevent consecutive operators (except negative sign at the start)
    if (!mathRegex.test(expression) || /[+\-x÷]{2,}/.test(expression)) {
      return expression; // Return input if invalid
    }

    try {
      // Replace "x" with "*" and "÷" with "/" for JavaScript evaluation
      const sanitizedExpression = expression
        .replace(/x/g, "*")
        .replace(/÷/g, "/");

      // Evaluate the expression
      const result = new Function(`return ${sanitizedExpression}`)();

      // Return the result as a string
      return result.toString();
    } catch (error) {
      return expression; // If evaluation fails, return the original input
    }
  }
  // remove chatGPT code and do it myself
  return (
    <div
      onClick={() => {
        // return () => {};
        // setVal((prev) => {
        //   const mathRegex = /^-?\d+(\.\d+)?([+\-x÷]-?\d+(\.\d+)?)*$/;
        //   prev = String(prev);
        //   let expression = prev.trim();
        //   if (!mathRegex.test(expression)) {
        //     console.log("MsG From Calc: Invalid INPUT");
        //     return prev;
        //   }

        //   if (symbols.includes(prev[prev.length - 1]))
        //     prev = prev.slice(0, prev.length - 1);

        //   console.log("equals", prev, typeof prev, prev[prev.length - 1]);

        //   setHist(prev);
        //   let temp = eval(prev.replace(/x/g, "*").replace(/÷/g, "/"));
        //   temp = temp % 1 !== 0 ? temp.toFixed(2) : temp;
        //   return temp;
        // });
        setVal((prev) => {
          let temp = Number(evaluateMathExpression(prev));

          temp = temp % 1 !== 0 ? temp.toFixed(2) : temp;

          if (String(temp) == "NaN") return String(prev);
          setHist(prev);
          return String(temp);
        });
      }}
      className="calc-button"
    >
      =
    </div>
  );
}
