import React, { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import "./Feedback.css";

const agencyQuestions = [
  {
    id: 1,
    text: "How would you rate the communication with your agency?",
    options: ["Excellent", "Good", "Fair", "Poor", "Very Poor"],
  },
  {
    id: 2,
    text: "How satisfied are you with the job opportunities provided?",
    options: [
      "Very Satisfied",
      "Satisfied",
      "Neutral",
      "Dissatisfied",
      "Very Dissatisfied",
    ],
  },
  {
    id: 3,
    text: "How well does your agency support your career development?",
    options: [
      "Extremely Well",
      "Very Well",
      "Moderately Well",
      "Slightly Well",
      "Not Well at All",
    ],
  },
];

const trainingQuestions = [
  {
    id: 1,
    text: "Which training resources have you used in the last 6 months?",
    type: "checkbox",
    options: ["AI Assistant", "Quick Guides"],
  },
  {
    id: 2,
    text: "What additional training would you like to see?",
    type: "checkbox",
    options: [
      "Advanced Runway Techniques",
      "Commercial Modeling Skills",
      "Social Media Management",
      "Personal Branding",
      "Industry Networking",
    ],
  },
];

function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Bi-Annual Feedback Survey</h1>
        <p>
          Your feedback helps us improve our services and support your modeling
          career better. Please take a moment to complete this survey.
        </p>
      </div>

      {submitted ? (
        <div className="feedback-submitted">
          <CheckCircle className="feedback-icon" size={48}  style={{ margin: "0 auto", marginBottom: "1rem" }}/>
          <h2>Thank You for Your Feedback!</h2>
          <p>
            Your responses have been recorded. We appreciate your time and will
            use your feedback to improve our services.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn btn-primary"
          >
            Submit Another Response
          </button>
        </div>
      ) : (
        <form className="space-y-6">
          <div className="feedback-section">
            <h2>Career Progress</h2>
            <div>
              <label>
                How satisfied are you with your career progress in the last 6
                months?
              </label>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button key={rating} type="button" className="rating-button">
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label>
                What are your biggest achievements in the past 6 months?
              </label>
              <textarea
                className="feedback-textarea"
                rows={4}
                placeholder="Share your achievements..."
              ></textarea>
            </div>
          </div>

          <div className="feedback-section">
            <h2>Agency Support</h2>
            {agencyQuestions.map((question) => (
              <div key={question.id}>
                <label>{question.text}</label>
                <select className="feedback-select">
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Training & Development */}
          <div className="feedback-section">
            <h2>Training & Development</h2>
            {trainingQuestions.map((question) => (
              <div key={question.id}>
                <label>{question.text}</label>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label key={option} className="flex gap-1 items-center space-x-3">
                      <input
                        type={question.type}
                        name={`question_${question.id}`}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Comments */}
          <div className="feedback-section">
            <h2>Additional Comments</h2>
            <div>
              <label>Is there anything else you'd like to share with us?</label>
              <textarea
                className="feedback-textarea"
                rows={6}
                placeholder="Your thoughts and suggestions..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center space-x-2 text-yellow-700">
              <AlertCircle size={20} />
              <span className="text-sm">All fields are required</span>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="btn btn-primary"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Feedback;
