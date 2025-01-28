// import React, { useState } from "react";
// import "../STYLE/calcc.css";

// const Calculator = () => {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState(null);

//   const handleButtonClick = (value) => {
//     if (value === "=") {
//       try {
//         setResult(eval(input)); // Use eval carefully; for production, use a math library.
//       } catch {
//         setResult("Error");
//       }
//     } else if (value === "C") {
//       setInput("");
//       setResult(null);
//     } else {
//       setInput((prev) => prev + value);
//     }
//   };

//   const buttons = [
//     "7",
//     "8",
//     "9",
//     "/",
//     "4",
//     "5",
//     "6",
//     "*",
//     "1",
//     "2",
//     "3",
//     "-",
//     "0",
//     ".",
//     "=",
//     "+",
//     "C",
//   ];

//   return (
//     <div className="calculator">
//       <div className="display">
//         <div className="input">{input || "0"}</div>
//         <div className="result">{result !== null ? `= ${result}` : ""}</div>
//       </div>
//       <div className="buttons">
//         {buttons.map((button, index) => (
//           <button
//             key={index}
//             onClick={() => handleButtonClick(button)}
//             className="calc-button"
//           >
//             {button}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calculator;
