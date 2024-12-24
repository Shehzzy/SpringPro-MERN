const orderModel = require("../Models/OrderModel");

// ORDER CREATION API - Post
const orderSubmit = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Order details are missing" });
    }

    const userId = req.user.userId; // Assuming userId is in the session or token
    const { status = "Pending", imeiNumbers, ...orderData } = req.body; // Make sure imeiNumbers are included in the request

    const order = await orderModel.create({
      ...orderData,
      userId,
      imeiNumbers, // Ensure this is passed to the schema
      status,
    });

    return res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


// Get All Orders API
const getOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find();

    if (!allOrders) {
      return res.json({ message: "No orders found" });
    }
    return res.json({ message: "here's the order data", orderData: allOrders });
  } catch (error) {
    return res.json({ message: "Server error", error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await orderModel.find({ userId });
    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUserOrders };

// Update order status API
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "In Progress", "Completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { orderSubmit, getUserOrders, getOrders, updateOrderStatus };
