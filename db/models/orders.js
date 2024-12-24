// Imports
const mongoose = require("../db.js");

// Order schema
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItems"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Serializes the order objects to JSON
orderSchema.set("toJSON", {
  virtuals: true
});

// Calculates the total price of the order
orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// Order model
const Order = mongoose.model("Order", orderSchema);

// A function that fetches all orders
const getAll = async () => {
  // Populate each item
  const orders = await Order.find().populate("items.item");
  return orders;
};

// A function that fetches one order by its ID
const getOne = async (id) => {
  const order = await Order.findById(id).populate("items.item");
  return order;
};

// A function that creates and inserts a new Order document to the collection
const create = async (body) => {
  const order = await Order.create(body);
  return order;
};

// A function that updates an order
const update = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, { new: true });
  return order;
};

// A function that removes an order
const remove = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order.id;
};

// A function that fetches all orders by status
const getByStatus = async (status) => {
  const orders = await Order.find({ status }).populate("items");
  return orders;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByStatus,
  Order
};
