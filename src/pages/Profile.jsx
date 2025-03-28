import React, { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  FileText,
  Building2,
  Calendar,
} from "lucide-react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const { t } = useTranslation();

  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    title: "",
    location: "",
    phone: "",
    email: "",
    measurements: {
      height: "",
      bust: "",
      waist: "",
      hips: "",
      foot_size: ""
    },
    documents: [],
    agencies: [],
    events: [],
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchProfile() {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(res.data.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <div className="profile-avatar-container">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="profile-avatar"
              />
              <button className="profile-camera-btn">
                <Camera size={20} />
              </button>
            </div>
            <div>
              <h1 className="profile-name">{profileData.name}</h1>
              <p className="profile-age">{profileData.age} years</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div>
          <div className="profile-section">
            <h1>{t("profile.contactInformation")}</h1>
            <div>
              <div className="profile-contact-item">
                <MapPin size={20} />
                <span>{profileData.location}</span>
              </div>
              <div className="profile-contact-item">
                <Phone size={20} />
                <span>{profileData.phone}</span>
              </div>
              <div className="profile-contact-item">
                <Mail size={20} />
                <span>{profileData.email}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>{t("profile.measurements")}</h2>
            <div className="profile-measurements">
              <div>
                <p>{t("profile.height")}</p>
                <p>{profileData.measurements.height}</p>
              </div>
              <div>
                <p>{t("profile.bust")}</p>
                <p>{profileData.measurements.bust}</p>
              </div>
              <div>
                <p>{t("profile.waist")}</p>
                <p>{profileData.measurements.waist}</p>
              </div>
              <div>
                <p>{t("profile.hips")}</p>
                <p>{profileData.measurements.hips}</p>
              </div>
              <div>
                <p>{t("profile.foot_size")}</p>
                <p>{profileData.measurements.foot_size}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="profile-section">
            <div className="profile-button">
              <h2>{t("profile.documents")}</h2>
              <button className="btn btn-primary">
                {t("profile.uploadNew")}
              </button>
            </div>
            {profileData.documents.map((doc) => (
              <div key={doc.id} className="profile-list-item">
                <div className="documents-list">
                  <FileText size={20} />
                  <div className="documents-list-item">
                    <p>{doc.title}</p>
                    <p>Added {doc.date}</p>
                  </div>
                </div>
                <div>
                  <button className="btn btn-secondary">View</button>
                  <button className="btn btn-secondary">Download</button>
                </div>
              </div>
            ))}
          </div>
          <div className="profile-section">
            <h2>{t("profile.upcomingContracts")}</h2>
            {/* {profileData.events.map((event) => (
              <div key={event.id} className="profile-list-item">
                <div className="documents-list">
                  <Calendar size={20} />
                  <div className="documents-list-item">
                    <p>{event.title}</p>
                    <p>{event.date}</p>
                  </div>
                </div>
                <span>{event.status}</span>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
