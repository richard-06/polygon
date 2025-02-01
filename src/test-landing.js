import { async } from "@firebase/util";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { fetchData } from "./DataHandling/data";
import app from "./firebase";

export default function TestLanding() {
  const db = getFirestore(app);
  let temp = [];

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
    fetchData.map(async (item, index) => {
      try {
        const docRef = await addDoc(collection(db, "users"), {
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

  return (
    <div>
      Test Landing
      <button onClick={addData}>Click ME</button>
      <button onClick={addIntoFirebase}>Firebase Sync</button>
      <button onClick={fetchData}>Firebase fetch</button>
      <button
        onClick={() => {
          console.log(temp);
        }}
      >
        temp
      </button>
    </div>
  );
}
