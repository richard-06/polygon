import { async } from "@firebase/util";
import * as XLSX from "xlsx";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { fetchData } from "./DataHandling/data";
import app from "./firebase";
import { useEffect, useState } from "react";

export default function TestLanding({ setDev }) {
  const db = getFirestore(app);
  let temp = [
    { Name: ["adhai", "camden"], type: "beer" },
    { Name: ["red", "white"], type: "wine" },
    { Name: ["blacklabel", "cambuffoloden"], type: "sprits" },
  ];
  let temp_1 = [
    { Name: "roshan", "Spirit Type": "NONE" },
    { Name: "richard", "Spirit Type": "NONE" },
    { Name: "richuu", "Spirit Type": "cNONE" },
    { Name: "will", "Spirit Type": "NONE" },
    { Name: "ian", "Spirit Type": "NONE" },
  ];
  //   {Name:,Type:,SubType,}
  const products = [
    {
      Name: [
        "Farmhouse Blend White",
        "Curico Chardonnay",
        "Excelsior",
        "Vinho Verde",
        "Pinot Grigio",
        "Gavi Di Gavi",
        "Kim Crawford",
        "Cotes Du Rhone White",
      ],
      Type: "Wine",
      SubType: "White",
    },
    {
      Name: [
        "Farmhouse Blend Red",
        "Merlot",
        "Syrah Blend",
        "Cabernet Sauvignon",
        "Malbec",
        "Barbera",
        "Lirac",
        "Pinot Noir",
      ],
      Type: "Wine",
      SubType: "Red",
    },
    {
      Name: ["Chateau de Fontareche", "Chateau du Rouet"],
      Type: "Wine",
      SubType: "Rose",
    },
    {
      Name: ["Prosecco Spumante", "Grand Reserve Brut", "Rose Brut"],
      Type: "Wine",
      SubType: "Sparkling",
    },
    {
      Name: [
        "Founders Ruby Reserve",
        "20yr Old Tawny",
        "Jurancon Moelleux",
        "Sauternes",
        "Tokaji",
      ],
      Type: "Wine",
      SubType: "Dessert",
    },
    {
      Name: ["Camden Hells", "Ashai", "Estrella Galicia"],
      Type: "Beer",
      SubType: "Lager",
    },
    { Name: ["Neck Oil", "Peckham Session"], Type: "Beer", SubType: "IPA" },
    {
      Name: ["Lucky Saints", "Heineken 0%"],
      Type: "Beer",
      SubType: "Non-Alcoholic",
    },
    {
      Name: ["Sanford Devon Red", "Sanford Bramble", "Sanford Rose"],
      Type: "Beer",
      SubType: "Cider",
    },
  ];

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: "John Doe",
        age: 25,
        email: "johndoe@example.com",
      });
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const addIntoFirebase = () => {
    temp_1.map(async (item, index) => {
      try {
        const docRef = await doc(db, "test", item.Name);
        await setDoc(docRef, {
          Name: item.Name,
          Category: item["Spirit Type"],
        });
        console.log("Document written with ID:", docRef.id);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    });
  };

  const getUsersFromLocalStorage = () => {
    const storedData = localStorage.getItem("usersData");
    return storedData ? JSON.parse(storedData) : []; // Return parsed data or empty array
  };

  const users = getUsersFromLocalStorage();
  console.log("Loaded from Local Storage:", users);

  // Call the function
  //   fetchDataa();

  const exportToExcel = () => {
    // Create a new worksheet
    const ws = XLSX.utils.json_to_sheet(temp_1);

    // Create a new workbook and append the sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write the workbook and trigger download
    XLSX.writeFile(wb, "data.xlsx");
  };
  const [firstColumnArray, setFirstColumnArray] = useState(["f", "f"]);

  const handleFileUpload = (event) => {
    // Need to be attached with an file Input receiver
    // Take the first column of the file and converts it into an array
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Extract first column (skip header if needed)
        const firstColumn = data
          .map((row) => row[0])
          .filter((cell) => cell !== undefined);

        firstColumn.shift();
        setFirstColumnArray(firstColumn);
        console.log(typeof firstColumn);
      };
    }
  };

  //Function to list all collections in Firestore
  async function listCollections() {
    const collectionsList = [];
    const snapshot = await getDocs(collection(db, "Polygon"));

    snapshot.forEach((doc) => {
      // Check if it’s a collection, not a document
      collectionsList.push(doc.id);
    });

    console.log("Collections:", collectionsList);
  }

  // Call the function
  listCollections();

  // Reference to the document you want to fetch
  const docRef = doc(db, "Polygon", "StockTake");

  // Fetch the document
  async function fetchDocument() {
    const docRef = doc(db, "Polygon", "StockTake");
    const docSnap = await getDoc(docRef);

    console.log("Document data:", ...docSnap.data()["StockTake Date"]);

    return docSnap.data()["StockTake Date"];
  }

  // Call the function
  fetchDocument();

  return (
    <>
      <div onClick={() => setDev(false)} className="DevMode">
        User Mode
      </div>
      <div>
        Test Landing
        <button className="test" onClick={addData}>
          Click ME
        </button>
        <button className="test" onClick={addIntoFirebase}>
          Firebase Sync
        </button>
        <button className="test" onClick={fetchData}>
          Firebase fetch
        </button>
        <button
          className="test"
          onClick={() => {
            console.log(temp_1);
          }}
        >
          temp
        </button>
        <button className="test" onClick={exportToExcel}>
          EXCEL
        </button>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <button className="test" onClick={() => console.log(firstColumnArray)}>
          First-Col
        </button>
        <button
          className="test-firebase"
          //
          onClick={() => addToFirebaseV2(products)}
        >
          AddToFireBase
        </button>
      </div>
      <ul>
        {firstColumnArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="Dev-stocktake">
        List of StockTake
        <ul></ul>
      </div>
    </>
  );
}

function addToFirebase(data, type) {
  // adds all the list of products from the data with the type as type
  const db = getFirestore(app);
  data.map(async (data, index) => {
    try {
      const docRef = await doc(db, "test-product", data);
      await setDoc(docRef, {
        Name: data,
        Type: type,
      });
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  });
}
// [{Name:[],type:'wine'}]
function addToFirebaseV2(data) {
  const db = getFirestore(app);

  data.map((item) => {
    item["Name"].map(async (dataa, index) => {
      try {
        const docRef = await doc(db, "Base Products", dataa);
        await setDoc(docRef, {
          Name: dataa,
          Type: item["Type"],
          SubType: item["SubType"],
        });
        console.log("Document written with ID:", docRef.id);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    });
  });
}
