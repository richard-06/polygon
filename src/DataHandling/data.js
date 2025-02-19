// import { async } from "@firebase/util";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import app from "../firebase";

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

export async function saveData(data) {
  // function saves the data in firebase with the current date
  const db = getFirestore(app);
  const date = new Date(Date.now());
  const formatted = date.toLocaleDateString("en-GB").split("/").join("-");

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
      });
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  });
}

export const product = [
  // {
  //   Name: "Olmeca Silver",
  //   Price: 16.56,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Agave",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Jameson ",
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Woodford Reserve",
  //   Price: 15.65,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Hendricks",
  //   Price: 15.65,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Gin",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Tanqueray 10",
  //   Price: 23.39,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Gin",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Monkey 47",
  //   Price: 25.79,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Gin",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Hibiki Harmony",
  //   Price: 28.99,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "East London Dry ",
  //   Price: 68.17,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Gin",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "East London",
  //   Price: 25.47,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Rum",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "East London",
  //   Price: 55.09,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Vodka",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Ketel one",
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Vodka",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Tapatio Blanco",
  //   Price: 21.32,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Agave",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Saxerac Straight Rye",
  //   Price: 19.79,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Gosling's Black Seal",
  //   Price: 26.5,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Rum",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Grey Goose",
  //   Price: 15.25,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Vodka",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "East London Kew",
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Gin",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Bowmore 12yr Old",
  //   Price: 23.39,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Arette Reposado",
  //   Price: 27.56,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Agave",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Linkwood 14Yr Old 2010 (Signatory)",
  //   Price: 33.68,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Green Spot Single Pot Still",
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "No. 3",
  //   Price: 28.97,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Gin",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Silent Pool",
  //   Price: 31.05,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Gin",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Diplomatico Reserva Exclusiva",
  //   Price: 36.56,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Rum",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Ron La Progresiva 13",
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Rum",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Konik's Tail Vodka",
  //   Price: 19.83,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Vodka",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Taptatio Anejo",
  //   Price: 28.15,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Agave",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Mezcal Union Uno",
  //   Price: 34.45,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Agave",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Clynelish 14yr Old",
  //   Price: 18.48,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Belvedere Single Estate Rye Vodka - Lake Bartezek",
  //   Price: 22.88,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Vodka",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Michter's US 1* Bourbon",
  //   Price: 25.45,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Vivir Anejo",
  //   Price: 47.43,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Agave",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Dalmore 12yr Old",
  //   Price: 26.49,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "East London Liquor",
  //   Price: 28.84,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "House",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Hampden Estate 8yr Old",
  //   Price: 15.65,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Rum",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Glenfarclas 15yr Old ",
  //   Price: 32.21,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Blanton's Original Single Barrel",
  //   Price: 33.74,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Yamazaki 12yr Old",
  //   Price: 41.25,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Whiskey",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Frapin 1270 Cognac",
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Brandy, Cognac & Armagnac",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Darroze Grands Assemblages 8 Year Old Bas-Armagnac",
  //   Price: 33.24,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Brandy, Cognac & Armagnac",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Delord 25 Year Old Bas-Armagnac",
  //   Price: 34.74,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Brandy, Cognac & Armagnac",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Père Magloire - Fine Pays d'Auge Calvados",
  //   Price: 43.46,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Brandy, Cognac & Armagnac",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Ragnaud-Sabourin No. 10 VSOP",
  //   Price: 53.37,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Brandy, Cognac & Armagnac",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Cognac Park Borderies Mizunara 2006",
  //   Price: 54.12,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Brandy, Cognac & Armagnac",
  //   "Menu Specification": "Premium",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Tempus Fugit Crème de Cacao a la Vanille",
  //   Price: 31.89,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Drambuie Whisky Liqueur",
  //   Price: 32.44,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Cointreau Triple Sec Orange Liqueur",
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Luxardo Maraschino Liqueur",
  //   Price: 12.56,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Amaro Nonino Quintessentia",
  //   Price: 14,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Abelha Silver Cachaça",
  //   Price: 14.65,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Bepi Tosolini Saliza Amaretto",
  //   Price: 17.5,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Pernod Absinthe",
  //   Price: 18.92,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Chambord Black Raspberry Liqueur",
  //   Price: 21.28,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Cocchi Storico Vermouth Di Torino",
  //   Price: 21.58,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Vermouths",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Campari",
  //   Price: 22.49,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Punt E Mes",
  //   Price: 23.49,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Cocchi Vermouth Di Torino Extra Dry",
  //   Price: 32.99,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Vermouths",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Cocchi Dopo Teatro Vermouth Amaro",
  //   Price: 34.46,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Vermouths",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Cynar",
  //   Price: 23.96,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
  // {
  //   Name: "Bailey's",
  //   Price: 24.93,
  //   "Month Closing Value": 0,
  //   "Spirit Type": "Liqueurs",
  //   "Menu Specification": "Menu",
  //   "On Menu": "On",
  // },
];
