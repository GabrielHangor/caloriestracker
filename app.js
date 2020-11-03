import ItemCtrl from "./modules/itemctrl.js";
import StorageCtrl from "./modules/storagectrl.js";
import UICtrl from "./modules/uictrl.js";
import ChartCtrl from "./modules/chartctrl.js";

// Main module

// Event listeners
const loadEventListeners = function () {
  const UISelectors = UICtrl.getSelectors();

  document.querySelector("#ru").addEventListener("click", toRussianClick);

  document.querySelector("#eng").addEventListener("click", toEnglishClick);

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

const checkLang = function () {
  if (JSON.parse(localStorage.getItem("language")) === "ru") {
    toRussian();
  } else {
    toEnglish();
  }
};

const toRussian = function () {
  UICtrl.changeTextContent(".brand-logo", "Счетчик калорий");
  UICtrl.changeTextContent("#clear-all-button", "Очистить все");
  UICtrl.changeTextContent(".card-title", "Добавить блюдо и калорийность");
  document.querySelector("#item-name").placeholder = "Добавить блюдо";
  document.querySelector("#item-calories").placeholder = "Добавить калории";
  UICtrl.changeTextContent("#food-label", "Блюдо");
  UICtrl.changeTextContent("#calories-label", "Калорийность");
  UICtrl.changeTextContent("#add-button", "Добавить");
  UICtrl.changeTextContent("#update-button", "Обновить");
  UICtrl.changeTextContent("#delete-button", "Удалить");
  UICtrl.changeTextContent("#back-button", "Назад");
  UICtrl.changeTextContent(
    "#total-calories-text",
    `Всего калорий: ${ItemCtrl.data.totalCalories}`
  );
};

const toEnglish = function () {
  UICtrl.changeTextContent(".brand-logo", "Calories tracker App");
  UICtrl.changeTextContent("#clear-all-button", "CLEAR ALL");
  UICtrl.changeTextContent(".card-title", "Add Meal & Calories");
  document.querySelector("#item-name").placeholder = "Add food";
  document.querySelector("#item-calories").placeholder = "Add calories";
  UICtrl.changeTextContent("#food-label", "Food");
  UICtrl.changeTextContent("#calories-label", "Calories");
  UICtrl.changeTextContent("#add-button", "ADD MEAL");
  UICtrl.changeTextContent("#update-button", "UPDATE MEAL");
  UICtrl.changeTextContent("#delete-button", "DELETE MEAL");
  UICtrl.changeTextContent("#back-button", "BACK");
  UICtrl.changeTextContent(
    "#total-calories-text",
    `Total Calories: ${ItemCtrl.data.totalCalories}`
  );
};

// switch to russian lang
const toRussianClick = function (e) {
  UICtrl.changeTextContent(".brand-logo", "Счетчик калорий");
  UICtrl.changeTextContent("#clear-all-button", "Очистить все");
  UICtrl.changeTextContent(".card-title", "Добавить блюдо и калорийность");
  document.querySelector("#item-name").placeholder = "Добавить блюдо";
  document.querySelector("#item-calories").placeholder = "Добавить калории";
  UICtrl.changeTextContent("#food-label", "Блюдо");
  UICtrl.changeTextContent("#calories-label", "Калорийность");
  UICtrl.changeTextContent("#add-button", "Добавить");
  UICtrl.changeTextContent("#update-button", "Обновить");
  UICtrl.changeTextContent("#delete-button", "Удалить");
  UICtrl.changeTextContent("#back-button", "Назад");
  UICtrl.changeTextContent(
    "#total-calories-text",
    `Всего калорий: ${ItemCtrl.data.totalCalories}`
  );

  localStorage.setItem("language", JSON.stringify("ru"));

  e.preventDefault();
};

// switch to english lang
const toEnglishClick = function (e) {
  UICtrl.changeTextContent(".brand-logo", "Calories tracker App");
  UICtrl.changeTextContent("#clear-all-button", "CLEAR ALL");
  UICtrl.changeTextContent(".card-title", "Add Meal & Calories");
  document.querySelector("#item-name").placeholder = "Add food";
  document.querySelector("#item-calories").placeholder = "Add calories";
  UICtrl.changeTextContent("#food-label", "Food");
  UICtrl.changeTextContent("#calories-label", "Calories");
  UICtrl.changeTextContent("#add-button", "ADD MEAL");
  UICtrl.changeTextContent("#update-button", "UPDATE MEAL");
  UICtrl.changeTextContent("#delete-button", "DELETE MEAL");
  UICtrl.changeTextContent("#back-button", "BACK");
  UICtrl.changeTextContent(
    "#total-calories-text",
    `Total Calories: ${ItemCtrl.data.totalCalories}`
  );

  localStorage.setItem("language", JSON.stringify("eng"));

  e.preventDefault();
};

const backBtnClick = function (e) {
  UICtrl.clearEditState();

  e.preventDefault();
};

const itemAddSubmit = function (e) {
  const input = UICtrl.getItemInput();

  if (
    input.name !== "" &&
    input.calories !== "" &&
    input.specifiedDate !== ""
  ) {
    const newItem = ItemCtrl.addItem(
      input.name,
      input.calories,
      input.specifiedDate
    );

    UICtrl.addListItem(newItem);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.storeItem(newItem);

    

    UICtrl.clearInput();
  }

  ChartCtrl.updateChart(ItemCtrl.getItems());

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
  const updatedItem = ItemCtrl.updateItem(
    input.name,
    input.calories,
    input.specifiedDate
  );

  UICtrl.updateListItem(updatedItem);

  const totalCalories = ItemCtrl.getTotalCalories();
  UICtrl.showTotalCalories(totalCalories);

  StorageCtrl.updateItemStorage(updatedItem);

  ChartCtrl.updateChart(ItemCtrl.getItems());

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

  ChartCtrl.updateChart(ItemCtrl.getItems());

  e.preventDefault();
};

const clearAllItemsClick = function (e) {
  ItemCtrl.clearAllItems();

  const totalCalories = ItemCtrl.getTotalCalories();
  UICtrl.showTotalCalories(totalCalories);

  UICtrl.removeItems();

  StorageCtrl.clearItemsFromStorage();

  UICtrl.hideList();

  ChartCtrl.updateChart(ItemCtrl.getItems());

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

  checkLang();

  const totalCalories = ItemCtrl.getTotalCalories();
  UICtrl.showTotalCalories(totalCalories);

  ChartCtrl.updateChart(ItemCtrl.getItems());

  loadEventListeners();
}

// Initialize App
init();
