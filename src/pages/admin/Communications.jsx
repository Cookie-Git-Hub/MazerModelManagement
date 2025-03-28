import React from "react";
import { Mail, Users, Send, Archive, Edit2, Trash2, Clock } from "lucide-react";
import "./Communications.css";

const templates = [
  {
    id: 1,
    name: "Welcome Message",
    description: "Initial welcome message for new models joining the agency.",
  },
  {
    id: 2,
    name: "Booking Confirmation",
    description: "Confirmation template for successful bookings.",
  },
  {
    id: 3,
    name: "Portfolio Update",
    description: "Reminder for models to update their portfolios.",
  },
  {
    id: 4,
    name: "Event Invitation",
    description: "Template for inviting models to agency events.",
  },
  {
    id: 5,
    name: "Monthly Newsletter",
    description:
      "Monthly update template with industry news and opportunities.",
  },
  {
    id: 6,
    name: "Feedback Request",
    description: "Template for requesting feedback after assignments.",
  },
];

const communications = [
  {
    id: 1,
    title: "Spring Fashion Week Update",
    content:
      "Important information about the upcoming fashion week schedule and requirements.",
    date: "2 hours ago",
    status: "Sent",
    statusColor: "bg-green-100 text-green-800",
    recipients: "All Models (124)",
    icon: <Mail size={20} className="text-blue-500" />,
    iconBg: "bg-blue-50",
  },
  {
    id: 2,
    title: "New Booking System Announcement",
    content:
      "Introducing our new digital booking system for streamlined job management.",
    date: "Yesterday",
    status: "Scheduled",
    statusColor: "bg-yellow-100 text-yellow-800",
    recipients: "Active Models (98)",
    icon: <Archive size={20} className="text-purple-500" />,
    iconBg: "bg-purple-50",
  },
  {
    id: 3,
    title: "Portfolio Update Reminder",
    content:
      "Friendly reminder to update your portfolio with recent work and measurements.",
    date: "3 days ago",
    status: "Draft",
    statusColor: "bg-gray-100 text-gray-800",
    recipients: "Selected Models (45)",
    icon: <Mail size={20} className="text-green-500" />,
    iconBg: "bg-green-50",
  },
];

const Communications = () => {
  return (
    <div className="communications-container">
      {/* Header */}
      <div className="communications-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>Communications</h1>
            <p>
              Manage notifications, newsletters, and communications with models
            </p>
          </div>
          <button className="btn btn-primary flex items-center space-x-2">
            <Mail size={20} />
            <span>New Message</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="communications-grid">
        <div className="communications-card">
          <div className="flex items-center justify-between mb-4">
            <h3>Messages Sent</h3>
            <Send className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold">847</p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>

        <div className="communications-card">
          <div className="flex items-center justify-between mb-4">
            <h3>Active Recipients</h3>
            <Users className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold">124</p>
          <p className="text-sm text-gray-500 mt-1">Subscribed models</p>
        </div>

        <div className="communications-card">
          <div className="flex items-center justify-between mb-4">
            <h3>Scheduled</h3>
            <Clock className="text-purple-500" size={24} />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-gray-500 mt-1">Pending messages</p>
        </div>
      </div>

      {/* Message Templates */}
      <div className="communications-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Message Templates</h2>
          <button className="btn btn-secondary">Create Template</button>
        </div>

        <div className="communications-grid">
          {templates.map((template) => (
            <div key={template.id} className="communications-template-card">
              <div className="flex items-center justify-between mb-3">
                <h3>{template.name}</h3>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit2 size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm">{template.description}</p>
              <button className="text-blue-500 text-sm hover:text-blue-600">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Communications */}
      <div className="communications-recent-card">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Communications</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {communications.map((comm) => (
            <div key={comm.id} className="communications-recent-item">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${comm.iconBg}`}>
                    {comm.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{comm.title}</h3>
                    <p className="text-sm text-gray-500">{comm.date}</p>
                  </div>
                </div>
                <span className={`communications-status ${comm.statusColor}`}>
                  {comm.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{comm.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users size={16} />
                  <span>{comm.recipients}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="btn btn-secondary">View Details</button>
                  <button className="btn btn-secondary">Duplicate</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communications;
