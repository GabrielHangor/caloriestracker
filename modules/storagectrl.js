// Storage module

function storeItem(newItem) {
  let items;
  // check if smth in ls
  if (localStorage.getItem("items") === null) {
    // if not, creat empty array
    items = [];
    items.push(newItem);
    // add new data to the ls
    localStorage.setItem("items", JSON.stringify(items));
  } else {
    // get data from the ls
    items = JSON.parse(localStorage.getItem("items"));
    items.push(newItem);
    // add new data to the ls
    localStorage.setItem("items", JSON.stringify(items));
  }
}

function getItemsFromStorage() {
  let items;

  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  return items;
}

function updateItemStorage(updatedItem) {
  let items = JSON.parse(localStorage.getItem("items"));
  items.forEach((item, index) => {
    if (updatedItem.id === item.id) {
      items.splice(index, 1, updatedItem);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function deleteItemFromStorage(currentItemId) {
  let items = JSON.parse(localStorage.getItem("items"));

  items.forEach((item, index) => {
    if (currentItemId === item.id) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

function clearItemsFromStorage() {
  localStorage.removeItem("items");
}

export default {
  storeItem,
  getItemsFromStorage,
  updateItemStorage,
  deleteItemFromStorage,
  clearItemsFromStorage,
};
