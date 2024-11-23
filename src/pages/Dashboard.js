import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./css/Dashboard.css";

// Sample Data
const orderData = [
  { name: "Pending", value: 100 },
  { name: "Completed", value: 300 },
  { name: "Cancelled", value: 50 },
];

const weeklySales = [
  { day: "Mon", revenue: 1000 },
  { day: "Tue", revenue: 1500 },
  { day: "Wed", revenue: 1200 },
  { day: "Thu", revenue: 2000 },
  { day: "Fri", revenue: 1700 },
  { day: "Sat", revenue: 2500 },
  { day: "Sun", revenue: 1800 },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 8000 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 13000 },
  { month: "May", revenue: 17000 },
  { month: "Jun", revenue: 16000 },
  { month: "Jul", revenue: 19000 },
  { month: "Aug", revenue: 20000 },
  { month: "Sep", revenue: 21000 },
  { month: "Oct", revenue: 23000 },
  { month: "Nov", revenue: 22000 },
  { month: "Dec", revenue: 25000 },
];

const radarData = [
  { kpi: "Sales", value: 80 },
  { kpi: "Orders", value: 70 },
  { kpi: "Revenue", value: 90 },
  { kpi: "Artists", value: 60 },
  { kpi: "Customers", value: 85 },
];

const stats = {
  artists: 50,
  revenueThisMonth: 23000,
  completedOrders: 120,
  pendingOrders: 20,
  activeOrders: 30,
};

function Dashboard() {
  useEffect(() => {
    // Example: Fetch your data from an API if needed
  }, []);

  return (
    <div className="dashboard">

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>Artists</h3>
          <p>{stats.artists}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Orders</h3>
          <p>{stats.completedOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p>{stats.pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Active Orders</h3>
          <p>{stats.activeOrders}</p>
        </div>
        <div className="stat-card revenue">
          <h3>Revenue This Month</h3>
          <p>${stats.revenueThisMonth}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Pie Chart */}
        <div className="chart">
          <h3>Order Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {orderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28"][index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart">
          <h3>Weekly Sales Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trends Section */}
      <div className="trends-section">
        {/* Line Chart */}
        <div className="trend">
          <h3>Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="trend">
          <h3>Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="kpi" />
              <PolarRadiusAxis />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
