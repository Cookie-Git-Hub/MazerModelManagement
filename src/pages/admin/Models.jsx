import React, { useState } from "react";
import { Search, Filter, Plus, Eye, Edit2, Trash2 } from "lucide-react";
import "./Models.css";
const ModelsManagement = () => {
  const [selectedModels, setSelectedModels] = useState([]);

  const toggleModelSelection = (id) => {
    setSelectedModels((prev) =>
      prev.includes(id)
        ? prev.filter((modelId) => modelId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="models-management-container">
      {/* Header */}
      <div className="models-management-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>Models Management</h1>
            <p>Manage your agency's models and their information</p>
          </div>
          <button className="btn btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Add New Model</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="models-management-filters">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
              <input
                type="text"
                placeholder="Search models..."
                className="pl-12 py-2 w-full rounded border border-gray-300"
              />
            </div>

            <button className="btn btn-secondary flex items-center space-x-2">
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <select>
              <option>All Categories</option>
              <option>Fashion</option>
              <option>Commercial</option>
              <option>Runway</option>
            </select>
            <select>
              <option>All Locations</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Miami</option>
            </select>
          </div>
        </div>
      </div>

      {/* Models Table */}
      <div className="models-management-table">
        <table className="models-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Model</th>
              <th>Nationality</th>
              <th>Location</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedModels.includes(model.id)}
                    onChange={() => toggleModelSelection(model.id)}
                  />
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={model.image}
                      alt={model.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {model.name}
                      </div>
                      <div className="text-sm text-gray-500">{model.email}</div>
                    </div>
                  </div>
                </td>
                <td>{model.nationality}</td>
                <td>{model.location}</td>
                <td>
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${model.statusColor}`}
                  >
                    {model.status}
                  </span>
                </td>
                <td className="text-sm text-gray-500">{model.lastActive}</td>
                <td>
                  <div className="flex items-center justify-start space-x-2">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Eye size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <Edit2 size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="models-pagination">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </span>
          <div className="flex items-center space-x-2">
            <button className="btn btn-secondary">Previous</button>
            <button className="btn btn-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const models = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "emma.t@example.com",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    nationality: "En",
    location: "New York",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    lastActive: "23 minutes ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    nationality: "By",
    location: "Los Angeles",
    status: "On Leave",
    statusColor: "bg-yellow-100 text-yellow-800",
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    name: "Sofia Rodriguez",
    email: "sofia.r@example.com",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    nationality: "Pl",
    location: "Miami",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    lastActive: "1 day ago",
  },
];

export default ModelsManagement;
