// import { async } from "@firebase/util";
import { async } from "@firebase/util";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  arrayUnion,
  getDoc,
  listCollections,
  updateDoc,
} from "firebase/firestore";
import app from "../firebase";

export const CheckSTExists = async () => {
  const date = new Date(Date.now());
  const formatted = date.toLocaleDateString("en-GB").split("/").join("-");
  const db = getFirestore(app);
  let temp = [];

  const querySnapshot = await getDocs(
    collection(db, "Polygon", "StockTake", formatted)
  );
  querySnapshot.forEach((doc) => {
    temp.push(doc.data());
  });
  return temp.length ? true : false;
};

export const fetchAllCollections = async () => {
  // ''' Returns all sub collection names stored in StockTake Date'''
  const db = getFirestore(app);
  try {
    const docRef = doc(db, "Polygon", "StockTake");
    const docSnap = await getDoc(docRef);
    return docSnap.data()["StockTake Date"];
  } catch (error) {
    console.error("Error fetching document:", error);
    return [];
  }
};

export const fetchBaseData = async () => {
  const db = getFirestore(app);
  let temp = [];

  try {
    const querySnapshot = await getDocs(collection(db, "Base Products"));
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    console.log("rr", temp);
    return temp;
  } catch (error) {
    console.error("Error fetching data:", error);
    return ["error fetching data"];
  }
};

export const fetchData = async () => {
  // disabling fetching data from local
  // const existingData = localStorage.getItem("usersData");

  // if (existingData) {
  //   console.log("Using data from localStorage:", JSON.parse(existingData));
  //   return JSON.parse(existingData);
  // }

  const db = getFirestore(app);
  let temp = [];

  try {
    const querySnapshot = await getDocs(collection(db, "Base Products"));
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });

    localStorage.setItem("usersData", JSON.stringify(temp));
    console.log("Fetched from Firebase & stored in localStorage:", temp);
    return temp;
  } catch (error) {
    console.error("Error fetching data:", error);
    return ["error fetching data"];
  }
};

export async function addToBaseProducts(name, type, subType, par, company) {
  const db = getFirestore(app);
  try {
    // const docRef = await addDoc(collection(db, "Base Products", name), {
    //   Name: name,
    //   Type: type,
    //   SubType: subType,
    //   Comp: company,
    //   Par: par,
    // });

    const docRef = doc(db, "Base Products", name);

    // Set the document with the custom ID
    await setDoc(docRef, {
      Name: name,
      Type: type,
      SubType: subType,
      Comp: company,
      Par: par,
    });

    console.log("Document added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export const fetchDataByDate = async (date) => {
  // disabling fetching data from local
  // const existingData = localStorage.getItem("usersData");

  // if (existingData) {
  //   console.log("Using data from localStorage:", JSON.parse(existingData));
  //   return JSON.parse(existingData);
  // }

  const db = getFirestore(app);
  let temp = [];

  try {
    const querySnapshot = await getDocs(
      collection(db, "Polygon", "StockTake", date)
    );
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });

    // localStorage.setItem("usersData", JSON.stringify(temp));
    // console.log("Fetched from Firebase & stored in localStorage:", temp);
    return temp;
  } catch (error) {
    console.error("Error fetching data:", error);
    return ["error fetching data"];
  }
};

export async function checkFormattedDateExists() {
  const db = getFirestore(app);
  const snapshot = await db
    .collection("Polygon") // Main Collection
    .doc("StockTake") // Stocktake Document inside Polygon
    .collection("21-02-2025") // Collection to check
    .limit(1) // Fetch at most 1 document
    .get();

  return !snapshot.empty; // Returns true if at least one document exists
}

export async function saveData(data) {
  // function saves the data in firebase with the current date
  const db = getFirestore(app);
  const date = new Date(Date.now());
  const formatted = date.toLocaleDateString("en-GB").split("/").join("-");

  // Test Purpose
  // const formatted = "28-02-2025";

  try {
    const docRef = await doc(db, "Polygon", "StockTake");
    await updateDoc(docRef, {
      "StockTake Date": arrayUnion(formatted),
    });
    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }

  data.map(async (data, index) => {
    try {
      const docRef = await doc(
        db,
        "Polygon",
        "StockTake",
        formatted,
        data["Name"]
      );
      await setDoc(docRef, {
        Name: data["Name"],
        Type: data["Type"],
        SubType: data["SubType"],
        Quantity: data["quantity"] || 0,
        Comp: data["Comp"] || "UnKnown",
      });
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  });
}
