import { FileText, Calendar, Users } from "lucide-react";
import StatCard from "../components/StatCard";
import { useTranslation } from "../hooks/useTranslation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const { t, lang, setLang } = useTranslation();

  const [profileData, setProfileData] = useState({
    stats: {
      documents: 0,
      upcoming: 0,
      agencies: 0,
      jobs: 0,
    },
    recentDocuments: [],
    upcomingSchedule: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchProfile() {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }

    fetchProfile();
  }, []);

  return (
    <>
      <div className="dashboard-cards">
        <StatCard
          icon={<FileText style={{ color: "#3B82F6" }} />}
          value={profileData.stats.documents}
          title={t("dashboard.documents")}
          description={t("dashboard.activeDocuments")}
        />
        <StatCard
          icon={<Calendar style={{ color: "#10B981" }} />}
          value={profileData.stats.upcoming}
          title={t("dashboard.upcoming")}
          description={t("dashboard.scheduledContracts")}
        />
      </div>
      <div className="dashboard">
        <div className="recent-documents">
          <h3>{t("dashboard.recentDocuments")}</h3>
          {/* <div>
            {profileData.recentDocuments.length > 0 ? (
              profileData.recentDocuments.map((doc) => (
                <div key={doc._id} className="document-item">
                  <p>
                    <strong>{doc.title}</strong>
                  </p>
                  <p>
                    {t("dashboard.date")}: {doc.date}
                  </p>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("dashboard.viewDocument")}
                  </a>
                </div>
              ))
            ) : (
              <p>{t("dashboard.noRecentDocuments")}</p>
            )}
          </div> */}
        </div>

        <div className="upcoming-schedule">
          <h3>{t("dashboard.upcomingSchedule")}</h3>
          <div>
            {profileData.upcomingSchedule.length > 0 ? (
              profileData.upcomingSchedule.map((contract) => (
                <div key={contract._id} className="schedule-item">
                  <p>
                    <strong>{contract.title}</strong>
                  </p>
                  <p>
                    {t("dashboard.date")}: {contract.date}
                  </p>
                  <p>
                    {t("dashboard.status")}: {contract.status}
                  </p>
                </div>
              ))
            ) : (
              <p>{t("dashboard.noUpcoming")}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
