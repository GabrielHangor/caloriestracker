import ItemCtrl from "./itemctrl.js";

// UI module
const UISelectors = {
  itemList: "#item-list",
  listItems: "#item-list li",
  addBtn: ".add-btn",
  updateBtn: ".update-btn",
  deleteBtn: ".delete-btn",
  backBtn: ".back-btn",
  clearBtn: ".clear-btn",
  itemNameInput: "#item-name",
  itemCaloriesInput: "#item-calories",
  totalCalories: ".total-calories",
};

function populateItemList(items) {
  let html = "";
  items.forEach(function (item) {
    html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="small edit-item fa fa-pencil"></i></a>
        </li>`;
  });
  document.querySelector(UISelectors.itemList).innerHTML = html;
}

function getItemInput() {
  return {
    name: document.querySelector(UISelectors.itemNameInput).value,
    calories: document.querySelector(UISelectors.itemCaloriesInput).value,
  };
}

function addListItem(item) {
  document.querySelector(UISelectors.itemList).style.display = "block";

  const li = document.createElement("li");
  li.className = "collection-item";
  li.id = `item-${item.id}`;
  li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="small edit-item fa fa-pencil"></i></a>`;

  document
    .querySelector(UISelectors.itemList)
    .insertAdjacentElement("beforeend", li);
}

function updateListItem(updatedItem) {
  let listItems = document.querySelectorAll(UISelectors.listItems);

  listItems = Array.from(listItems);
  listItems.forEach(function (listItem) {
    const itemID = listItem.getAttribute("id");

    if (itemID === `item-${updatedItem.id}`) {
      document.querySelector(
        `#${itemID}`
      ).innerHTML = `<strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="small edit-item fa fa-pencil"></i></a>`;
    }
  });
}

function deleteListItem(currentItemId) {
  const itemId = `#item-${currentItemId}`;
  const item = document.querySelector(itemId);
  item.remove();
}

function clearInput() {
  document.querySelector(UISelectors.itemNameInput).value = "";
  document.querySelector(UISelectors.itemCaloriesInput).value = "";
}

function addItemToForm() {
  document.querySelector(
    UISelectors.itemNameInput
  ).value = ItemCtrl.getCurrentItem().name;
  document.querySelector(
    UISelectors.itemCaloriesInput
  ).value = ItemCtrl.getCurrentItem().calories;
  showEditState();
}

function removeItems() {
  let listItems = document.querySelectorAll(UISelectors.listItems);
  listItems = Array.from(listItems);

  listItems.forEach(function (item) {
    item.remove();
  });
}

function hideList() {
  document.querySelector(UISelectors.itemList).style.display = "none";
}

function showTotalCalories(totalCalories) {
  document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
}

function clearEditState() {
  clearInput();
  document.querySelector(UISelectors.updateBtn).style.display = "none";
  document.querySelector(UISelectors.deleteBtn).style.display = "none";
  document.querySelector(UISelectors.backBtn).style.display = "none";
  document.querySelector(UISelectors.addBtn).style.display = "inline";
}

function showEditState() {
  document.querySelector(UISelectors.updateBtn).style.display = "inline";
  document.querySelector(UISelectors.deleteBtn).style.display = "inline";
  document.querySelector(UISelectors.backBtn).style.display = "inline";
  document.querySelector(UISelectors.addBtn).style.display = "none";
}

function getSelectors() {
  return UISelectors;
}

export default {
  populateItemList,
  getItemInput,
  addListItem,
  updateListItem,
  deleteListItem,
  clearInput,
  addItemToForm,
  removeItems,
  hideList,
  showTotalCalories,
  clearEditState,
  showEditState,
  getSelectors,
};
