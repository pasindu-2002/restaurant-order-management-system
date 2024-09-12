const orderMenu = {
    "M1": "Classic Burger",
    "M2": "Vegetarian Pizza",
    "M3": "Grilled Chicken Salad",
    "M4": "Pasta Alfredo",
    "M5": "Fish and Chips"
  };
  
export const constructMenuItems = (items) => {
      let itemString = "";
      if (items === undefined) return "";
      items.map((item) => { itemString += orderMenu[item] + ", "; });
      return itemString.substring(0, itemString.length - 2);
  };