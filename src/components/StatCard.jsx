import "./StatCard.css";
import React from "react";

function StatCard({
  icon,
  value = "0",
  title = "Default Title",
  description = "No description",
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-content">
        <h2 className="stat-card-value">{value}</h2>
        <p className="stat-card-title">{title}</p>
        <p className="stat-card-description">{description}</p>
      </div>
    </div>
  );
}

export default StatCard;
