import ItemCtrl from "./modules/itemctrl.js";
import StorageCtrl from "./modules/storagectrl.js";
import UICtrl from "./modules/uictrl.js";

// Main module

const loadEventListeners = function () {
  const UISelectors = UICtrl.getSelectors();

  document
    .querySelector(UISelectors.addBtn)
    .addEventListener("click", itemAddSubmit);

  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  });

  document
    .querySelector(UISelectors.itemList)
    .addEventListener("click", itemEditClick);

  document
    .querySelector(UISelectors.updateBtn)
    .addEventListener("click", itemUpdateSubmit);

  document
    .querySelector(UISelectors.backBtn)
    .addEventListener("click", backBtnClick);

  document
    .querySelector(UISelectors.deleteBtn)
    .addEventListener("click", itemDeleteSubmit);

  document
    .querySelector(UISelectors.clearBtn)
    .addEventListener("click", clearAllItemsClick);
};

const backBtnClick = function (e) {
  UICtrl.clearEditState();

  e.preventDefault();
};

const itemAddSubmit = function (e) {
  const input = UICtrl.getItemInput();

  if (input.name !== "" && input.calories !== "") {
    const newItem = ItemCtrl.addItem(input.name, input.calories);
    UICtrl.addListItem(newItem);
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.storeItem(newItem);

    UICtrl.clearInput();
  }

  e.preventDefault();
};

const itemEditClick = function (e) {
  if (e.target.classList.contains("edit-item")) {
    const listID = e.target.parentNode.parentNode.id;
    const listIDArr = listID.split("-");
    const ID = parseInt(listIDArr[1]);

    const itemToEdit = ItemCtrl.getItemById(ID);
    ItemCtrl.setCurrentItem(itemToEdit);

    UICtrl.addItemToForm();
  }

  e.preventDefault();
};

const itemUpdateSubmit = function (e) {
  const input = UICtrl.getItemInput();
  const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

  UICtrl.updateListItem(updatedItem);

  const totalCalories = ItemCtrl.getTotalCalories();
  UICtrl.showTotalCalories(totalCalories);

  StorageCtrl.updateItemStorage(updatedItem);

  UICtrl.clearEditState();
  e.preventDefault();
};

const itemDeleteSubmit = function (e) {
  const currentItem = ItemCtrl.getCurrentItem();
  ItemCtrl.deleteItem(currentItem.id);
  UICtrl.deleteListItem(currentItem.id);

  const totalCalories = ItemCtrl.getTotalCalories();
  UICtrl.showTotalCalories(totalCalories);

  StorageCtrl.deleteItemFromStorage(currentItem.id);

  UICtrl.clearEditState();

  const items = ItemCtrl.getItems();
  if (items.length === 0) {
    UICtrl.hideList();
  }

  e.preventDefault();
};

const clearAllItemsClick = function (e) {
  ItemCtrl.clearAllItems();

  const totalCalories = ItemCtrl.getTotalCalories();
  UICtrl.showTotalCalories(totalCalories);

  UICtrl.removeItems();

  StorageCtrl.clearItemsFromStorage();

  UICtrl.hideList();

  e.preventDefault();
};

function init() {
  UICtrl.clearEditState();

  const items = ItemCtrl.getItems();

  if (items.length === 0) {
    UICtrl.hideList();
  } else {
    UICtrl.populateItemList(items);
  }

  const totalCalories = ItemCtrl.getTotalCalories();
  UICtrl.showTotalCalories(totalCalories);

  loadEventListeners();
}

// Initialize App
init();
