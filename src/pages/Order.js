import React, { useState } from 'react';
import './css/Order.css';

// Sample order data with the new fields
const orderData = [
    {
      _id: "672a67eb3d953b8093a3c1bc",
      transactionId: "TXN-1730832363818",
      name: "D",
      phoneNumber: "d",
      address: "d",
      date: "2024-11-23",
      time: "3:15 PM",
      longitude: 77.6994816,
      latitude: 12.9728512,
      cartItems: [
        { serviceId: "Ade3", title: "Hair Dye", price: 221 },
        { serviceId: "B32de", title: "Coloring Techniques", price: 23 },
      ],
      orderPlacedDate: "2024-11-06",
      orderPlacedTime: "00:16",
      userId: "dummyUser123",
      totalAmount: 244,
      orderStatus: "Pending",
      paymentStatus: "Unpaid",
      artistAssigned: false,  // New field
      artistId: "",  // New field to store artistId if not assigned
    },
    {
      _id: "672a67eb3d953b8093a3c1bd",
      transactionId: "TXN-1730832363820",
      name: "A",
      phoneNumber: "a",
      address: "a",
      date: "2024-11-23",
      time: "4:00 PM",
      longitude: 77.6794816,
      latitude: 12.9628512,
      cartItems: [
        { serviceId: "C12", title: "Nail Art", price: 120 },
        { serviceId: "D34", title: "Manicure", price: 45 },
      ],
      orderPlacedDate: "2024-11-07",
      orderPlacedTime: "02:10",
      userId: "dummyUser124",
      totalAmount: 165,
      orderStatus: "Completed",
      paymentStatus: "Paid",
      artistAssigned: true,  // New field set to true
      artistId: "Artist124",  // Artist already assigned
    },
    {
      _id: "672a67eb3d953b8093a3c1be",
      transactionId: "TXN-1730832363845",
      name: "B",
      phoneNumber: "b",
      address: "b",
      date: "2024-11-23",
      time: "4:30 PM",
      longitude: 77.6894816,
      latitude: 12.9528512,
      cartItems: [
        { serviceId: "E56", title: "Facial Treatment", price: 350 },
        { serviceId: "F78", title: "Eyebrow Shaping", price: 80 },
      ],
      orderPlacedDate: "2024-11-08",
      orderPlacedTime: "03:45",
      userId: "dummyUser125",
      totalAmount: 430,
      orderStatus: "Pending",
      paymentStatus: "Unpaid",
      artistAssigned: false,  // Artist not yet assigned
      artistId: "",  // Artist not assigned
    },
    {
      _id: "672a67eb3d953b8093a3c1bf",
      transactionId: "TXN-1730832363850",
      name: "C",
      phoneNumber: "c",
      address: "c",
      date: "2024-11-23",
      time: "5:00 PM",
      longitude: 77.6999816,
      latitude: 12.9928512,
      cartItems: [
        { serviceId: "G90", title: "Haircut", price: 150 },
        { serviceId: "H12", title: "Shampoo", price: 30 },
      ],
      orderPlacedDate: "2024-11-09",
      orderPlacedTime: "05:10",
      userId: "dummyUser126",
      totalAmount: 180,
      orderStatus: "Completed",
      paymentStatus: "Paid",
      artistAssigned: true,  // Artist already assigned
      artistId: "Artist126",  // Artist already assigned
    },
    {
      _id: "672a67eb3d953b8093a3c1c0",
      transactionId: "TXN-1730832363870",
      name: "E",
      phoneNumber: "e",
      address: "e",
      date: "2024-11-23",
      time: "5:30 PM",
      longitude: 77.6694816,
      latitude: 12.9228512,
      cartItems: [
        { serviceId: "I34", title: "Pedicure", price: 200 },
        { serviceId: "J56", title: "Massage", price: 250 },
      ],
      orderPlacedDate: "2024-11-10",
      orderPlacedTime: "06:30",
      userId: "dummyUser127",
      totalAmount: 450,
      orderStatus: "Pending",
      paymentStatus: "Unpaid",
      artistAssigned: false,  // Artist not assigned
      artistId: "",  // Artist not assigned
    },
    {
      _id: "672a67eb3d953b8093a3c1c1",
      transactionId: "TXN-1730832363885",
      name: "F",
      phoneNumber: "f",
      address: "f",
      date: "2024-11-23",
      time: "6:00 PM",
      longitude: 77.6594816,
      latitude: 12.9128512,
      cartItems: [
        { serviceId: "K78", title: "Haircut", price: 180 },
        { serviceId: "L90", title: "Shave", price: 50 },
      ],
      orderPlacedDate: "2024-11-11",
      orderPlacedTime: "07:00",
      userId: "dummyUser128",
      totalAmount: 230,
      orderStatus: "Completed",
      paymentStatus: "Paid",
      artistAssigned: true,  // Artist already assigned
      artistId: "Artist128",  // Artist already assigned
    },
  ];
  

function Order() {
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Track the expanded order
  const [filters, setFilters] = useState({
    orderPlacedDate: "",
    orderStatus: "",
    paymentStatus: "",
  });
  const [artistIdInput, setArtistIdInput] = useState(""); // State for the artistId input

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const toggleExpand = (orderId) => {
    // If the same card is clicked, toggle collapse, otherwise expand the clicked one
    setExpandedOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };

  const handleArtistIdChange = (e) => {
    setArtistIdInput(e.target.value); // Update the artistId input value
  };

  // Apply filters to the order data
  const filteredOrders = orderData.filter((order) => {
    return (
      (filters.orderPlacedDate === "" || order.orderPlacedDate.includes(filters.orderPlacedDate)) &&
      (filters.orderStatus === "" || order.orderStatus.includes(filters.orderStatus)) &&
      (filters.paymentStatus === "" || order.paymentStatus.includes(filters.paymentStatus))
    );
  });

  return (
    <div className="order">
      <h1>Order Details</h1>

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
          <div key={order._id} className="order-card">
            <h2 className="expandable-card-header" onClick={() => toggleExpand(order._id)}>
              {/* Icon for expanding or minimizing */}
              <span className="expand-collapse-icon">
                {expandedOrderId === order._id ? '-' : '+'}
              </span>
              Transaction ID: <span className="transaction-id">{order.transactionId}</span>
            </h2>

            <div className="order-summary">
              <p><strong>Order Placed Date:</strong> {order.orderPlacedDate}</p>
              <p><strong>Order Status:</strong> {order.orderStatus}</p>
              <p className="small-text"><strong>Transaction ID:</strong> {order.transactionId}</p>
            </div>

            {/* Expanded details */}
            {expandedOrderId === order._id && (
              <div className="order-details">
                <div className="cart-items">
                  <h3>Cart Items:</h3>
                  <ul>
                    {order.cartItems.map((item, index) => (
                      <li key={index}>{item.title} - ₹{item.price}</li>
                    ))}
                  </ul>
                </div>
                <p><strong>Total Amount:</strong> <span className="highlighted">₹{order.totalAmount}</span></p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>

                {/* Artist Assignment Section */}
                {order.artistAssigned ? (
                  <p><strong>Artist Assigned:</strong> {order.artistId}</p>
                ) : (
                  <div className="input-container">
                    <p><strong>Artist not assigned yet.</strong></p>
                    <input
                      type="text"
                      placeholder="Enter Artist ID"
                      value={artistIdInput}
                      onChange={handleArtistIdChange}
                    />
                    <button onClick={() => console.log("Assigning Artist:", artistIdInput)}>Assign</button>
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
