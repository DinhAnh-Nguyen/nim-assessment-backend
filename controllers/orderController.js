// Description: This file contains the logic for the order routes.

// Imports
const Order = require("../db/models/orders.js");

// A function that handles HTTP requests to retrieve all orders
const getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to retrieve a single order
const getOne = async (req, res) => {
  try {
    const order = await Order.getOne(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to create a new order
const create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to update an order
const update = async (req, res) => {
  try {
    const order = await Order.update(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to remove an order
const remove = async (req, res) => {
  try {
    const order = await Order.remove(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to retrieve all orders by customer
const getByCustomer = async (req, res) => {
  try {
    const orders = await Order.getByCustomer(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// A function that handles HTTP requests to retrieve all orders by status
const getByStatus = async (req, res) => {
  try {
    const { s } = req.query;
    const orders = await Order.getByStatus(s);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalSales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Use a filter if a date range is provided
    const query = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Fetch all orders and populate items
    const orders = await Order.find(query).populate("items.item");

    // Calculate total sales
    const totalSales = orders.reduce((total, order) => {
      const orderTotal = order.items.reduce(
        (sum, item) => sum + (item.item?.price || 0) * item.quantity,
        0
      );
      return total + orderTotal;
    }, 0);

    res.json({ total: totalSales });
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByCustomer,
  getByStatus,
  getTotalSales
};
