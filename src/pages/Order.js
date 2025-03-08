import React, { useState, useEffect } from "react";
import "./css/Order.css";

function Order() {
  const [orders, setOrders] = useState([]); // State to store the fetched orders
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Track the expanded order
  const [filters, setFilters] = useState({
    orderPlacedDate: "",
    orderStatus: "",
    paymentStatus: "",
  });
  const [artistIdInput, setArtistIdInput] = useState(""); // State for the artistId input
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for handling errors

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://back-house-dwfv.vercel.app/backhouse/order/allOrders",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  const handleArtistIdChange = (e) => {
    setArtistIdInput(e.target.value); // Update the artistId input value
  };

  // Reusable function to update orders
  const updateOrder = async (transactionId, updateData) => {
    try {
      const response = await fetch(
        `https://back-house-dwfv.vercel.app/backhouse/order/orders/${transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedOrder = await response.json();

      // Update the local state with the updated order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.transactionId === transactionId ? updatedOrder : order
        )
      );

      alert("Order updated successfully!");
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Failed to update order. Please try again.");
    }
  };

  const assignArtist = (transactionId) => {
    if (!artistIdInput.trim()) {
      alert("Please enter a valid Artist ID.");
      return;
    }

    const updateData = {
      artistAssigned: true,
      artistId: artistIdInput, // Use the artistId input state
      orderStatus: 'In Progress',
    };

    updateOrder(transactionId, updateData); // Call update API
    setArtistIdInput(""); // Clear input field after assigning
  };

  // Apply filters to the order data
  const filteredOrders = orders.filter((order) => {
    return (
      (filters.orderPlacedDate === "" ||
        order.orderPlacedDate.includes(filters.orderPlacedDate)) &&
      (filters.orderStatus === "" ||
        order.orderStatus.includes(filters.orderStatus)) &&
      (filters.paymentStatus === "" ||
        order.paymentStatus.includes(filters.paymentStatus))
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order">
      <h1>Order Details</h1>

      {/* Filter Section */}
      {/* Filter Section */}
      <div className="order-filters">
        <input
          type="date"
          name="orderPlacedDate"
          value={filters.orderPlacedDate}
          onChange={handleFilterChange}
        />
        <select
          name="orderStatus"
          value={filters.orderStatus}
          onChange={handleFilterChange}
        >
          <option value="">Order Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>{" "}
          {/* Added In Progress */}
          <option value="Completed">Completed</option>
        </select>
        <select
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={handleFilterChange}
        >
          <option value="">Payment Status</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      {/* Order Cards */}
      <div className="order-cards">
        {filteredOrders.map((order) => (
          <div key={order.transactionId} className="order-card">
            <h2
              className="expandable-card-header"
              onClick={() => toggleExpand(order.transactionId)}
            >
              {/* Icon for expanding or minimizing */}
              <span className="expand-collapse-icon">
                {expandedOrderId === order.transactionId ? "-" : "+"}
              </span>
              Transaction ID:{" "}
              <span className="transaction-id">{order.transactionId}</span>
            </h2>

            {/* Order Details Summary */}
            <div className="order-summary">
              <p>
                <strong>Order Placed Date:</strong> {order.orderPlacedDate}
              </p>
              <p>
                <strong>Order Placed Time:</strong> {order.orderPlacedTime}
              </p>
              <p>
                <strong>Order Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <p>
                <strong>Phone Number:</strong> {order.phoneNumber}
              </p>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
            </div>

            {/* Expanded details */}
            {expandedOrderId === order.transactionId && (
              <div className="order-details">
                <div className="cart-items">
                  <h3>Cart Items:</h3>
                  <ul>
                    {order.cartItems.map((item, index) => (
                      <li key={index}>
                        {item.title} - ₹{item.price} x {item.quantity} = ₹
                        {item.totalPrice}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  <strong>Total Amount:</strong>{" "}
                  <span className="highlighted">₹{order.totalAmount}</span>
                </p>

                {/* Artist Assignment Section */}
                {order.artistAssigned ? (
                  <p>
                    <strong>Artist Assigned:</strong> {order.artistId}
                  </p>
                ) : (
                  <div className="input-container">
                    <p>
                      <strong>Artist not assigned yet.</strong>
                    </p>
                    <input
                      type="text"
                      placeholder="Enter Artist ID"
                      value={artistIdInput}
                      onChange={handleArtistIdChange}
                    />
                    <button onClick={() => assignArtist(order.transactionId)}>
                      Assign
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
