// Description: This file contains the functions that are used as callback functions for the routes that are defined in the routes/menuRoutes.js file. These functions are responsible for handling HTTP requests to retrieve all menu items, retrieve a single menu item, and create a new menu item.

// Imports
const MenuItems = require("../db/models/menuItems.js");

// A function that handles HTTP requests to retrieve all menu items
const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to retrieve a single menu item
const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to create a new menu item
const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to update a new menu item
const update = async (req, res) => {
  try {
    const menu = await MenuItems.update(req.params.id, {
      ...req.body,
      updatedAt: new Date()
    });
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to remove a menu item
const remove = async (req, res) => {
  try {
    const menu = await MenuItems.remove(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to retrieve all orders by customer
const getByNameOrDesc = async (req, res) => {
  try {
    const menu = await MenuItems.getByNameOrDesc(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, update, remove, getByNameOrDesc };
