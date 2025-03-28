import React from "react";
import { Users, Mail, TrendingUp, UserPlus } from "lucide-react";
import "./Dashboard.css";

const recentModels = [
  {
    id: 1,
    name: "Emma Thompson",
    location: "New York",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Los Angeles",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    location: "Miami",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
  },
];

// const recentCommunications = [
//   {
//     id: 1,
//     title: "Spring Fashion Week Update",
//     description:
//       "Important information about the upcoming fashion week schedule and requirements.",
//     status: "Sent",
//     statusColor: "bg-green-100 text-green-800",
//     recipients: "All Models",
//     date: "2 hours ago",
//   },
//   {
//     id: 2,
//     title: "Portfolio Update Reminder",
//     description:
//       "Reminder for models to update their portfolios with recent work.",
//     status: "Scheduled",
//     statusColor: "bg-blue-100 text-blue-800",
//     recipients: "Selected Models",
//     date: "Tomorrow",
//   },
//   {
//     id: 3,
//     title: "New Booking Opportunity",
//     description: "Exclusive campaign opportunity with major fashion brand.",
//     status: "Draft",
//     statusColor: "bg-gray-100 text-gray-800",
//     recipients: "Premium Models",
//     date: "Not sent",
//   },
// ];

// const analyticsMetrics = [
//   {
//     id: 1,
//     title: "Profile Views",
//     value: "2,847",
//     change: "+12.5%",
//     trend: "up",
//     description: "Total profile views this month",
//   },
//   {
//     id: 2,
//     title: "Booking Rate",
//     value: "64%",
//     change: "-2.3%",
//     trend: "down",
//     description: "Average booking acceptance rate",
//   },
//   {
//     id: 3,
//     title: "Active Campaigns",
//     value: "18",
//     change: "+4",
//     trend: "up",
//     description: "Currently running campaigns",
//   },
// ];

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <div className="admin-dashboard-header">
        <h1>Agency Administration</h1>
        <p>Manage models, communications, and monitor performance metrics</p>
      </div>

      {/* Quick Stats */}
      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3>Active Models</h3>
            <Users className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold">124</p>
          <p className="text-sm text-gray-500 mt-1">+12 this month</p>
        </div>

        <div className="admin-dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3>Pending Applications</h3>
            <UserPlus className="text-yellow-500" size={24} />
          </div>
          <p className="text-3xl font-bold">18</p>
          <p className="text-sm text-gray-500 mt-1">Requires review</p>
        </div>

        {/* <div className="admin-dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3>Notifications Sent</h3>
            <Mail className="text-purple-500" size={24} />
          </div>
          <p className="text-3xl font-bold">847</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>

        <div className="admin-dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3>Average Activity</h3>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold">87%</p>
          <p className="text-sm text-gray-500 mt-1">Profile completion</p>
        </div> */}
      </div>

      <div className="admin-dashboard-grid">
        {/* Recent Models */}
        <div className="admin-dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Models</h2>
            <button className="btn btn-primary">Add New Model</button>
          </div>

          <div className="space-y-4">
            {recentModels.map((model) => (
              <div key={model.id} className="admin-model-card">
                <div className="flex gap-4 items-center space-x-4">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{model.name}</p>
                    <p className="text-sm text-gray-500">{model.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="btn btn-secondary">Edit</button>
                  <button className="btn btn-secondary">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Communications */}
        {/* <div className="admin-dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Communications</h2>
            <button className="btn btn-primary">Create New</button>
          </div>

          <div className="space-y-4">
            {recentCommunications.map((comm) => (
              <div key={comm.id} className="admin-communications-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{comm.title}</h3>
                  <span
                    className={`admin-communications-status ${comm.statusColor}`}
                  >
                    {comm.status}
                  </span>
                </div>
                <p className="text-sm">{comm.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Sent to: {comm.recipients}</span>
                  <span>{comm.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Analytics Overview */}
      {/* <div className="admin-dashboard-card">
        <h2 className="text-lg font-semibold mb-6">Activity Analytics</h2>
        <div className="admin-dashboard-grid">
          {analyticsMetrics.map((metric) => (
            <div key={metric.id} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">{metric.title}</h3>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span
                  className={`text-sm ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
