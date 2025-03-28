import React from "react";
import "./Training.css";

function Training() {
  return (
    <div className="training-container">
      {/* Header */}
      <div className="training-header">
        <h1>Training & Development</h1>
        <p>
          Enhance your modeling career with our comprehensive training materials
          and AI-powered assistant.
        </p>
      </div>
      <div className="training-courses">
        <div>
          <h2>Quick Resources</h2>

          {/* AI Assistant */}
          <div className="training-resource">
            <h3>AI Career Assistant</h3>
            <p>
              Get personalized career advice, portfolio tips, and answers to
              your modeling industry questions.
            </p>
            <button className="btn btn-primary w-full">
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Training;
