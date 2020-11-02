import StorageCtrl from "./storagectrl.js";

// Item module

class Item {
  constructor(id, name, calories, specifiedDate) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.specifiedDate = specifiedDate;
  }
}

// Data Structure
const data = {
  items: StorageCtrl.getItemsFromStorage(),
  currentItem: null,
  totalCalories: 0,
};

function getItems() {
  return data.items;
}

function addItem(name, calories, specifiedDate) {

  let ID;

  if (data.items.length > 0) {
    ID = data.items[data.items.length - 1].id + 1;
  } else {
    ID = 0;
  }

  calories = parseInt(calories);
  const newItem = new Item(ID, name, calories, specifiedDate);

  data.items.push(newItem);
  return newItem;
}

function getItemById(ID) {
  let found = null;

  data.items.forEach((item) => {
    if (item.id === ID) {
      found = item;
    }
  });
  return found;
}

function updateItem(name, calories, specifiedDate) {
  calories = parseInt(calories);

  let found = null;

  data.items.forEach(function (item) {
    if (item.id === data.currentItem.id) {
      item.name = name;
      item.calories = calories;
      item.specifiedDate = specifiedDate;
      found = item;
    }
  });

  return found;
}

function deleteItem(currentItemId) {
  const ids = data.items.map(function (item) {
    return item.id;
  });

  const index = ids.indexOf(currentItemId);
  data.items.splice(index, 1);
}

function clearAllItems() {
  data.items = [];
}

function setCurrentItem(itemToEdit) {
  data.currentItem = itemToEdit;
}

function getCurrentItem() {
  return data.currentItem;
}

function getTotalCalories() {
  let total = 0;

  data.items.forEach((item) => {
    total += item.calories;
  });

  data.totalCalories = total;
  return data.totalCalories;
}

function logData() {
  return data;
}

export default {
  data,
  getItems,
  addItem,
  getItemById,
  updateItem,
  deleteItem,
  clearAllItems,
  setCurrentItem,
  getTotalCalories,
  logData,
  getCurrentItem,
};
