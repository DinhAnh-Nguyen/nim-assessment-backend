// Creates a structure of documents for the menu items collection

// Imports
const mongoose = require("../db.js");

// Defines the document structure for the menu items collection
const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});

// Serializes the menu items objects to JSON
menuItemsSchema.set("toJSON", {
  virtuals: true
});

// Creates menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

// A function that fetches all menu items
const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

// A function that fetches one menu item by its ID
const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

// Creates and inserts a new MenuItems document to the collection
const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

// A function that updates a menu item
const update = async (id, body) => {
  const menuItem = await MenuItems.findByIdAndUpdate(id, body, { new: true });
  return menuItem;
};

// A function that removes a menu item
const remove = async (id) => {
  const menuItem = await MenuItems.findByIdAndDelete(id);
  return menuItem.id;
};

// A function that fetches all orders by status
const getByNameOrDesc = async (status) => {
  const menuItem = await MenuItems.find({ status }).populate("items");
  return menuItem;
};

module.exports = { getAll, getOne, create, update, remove, getByNameOrDesc, MenuItems };
