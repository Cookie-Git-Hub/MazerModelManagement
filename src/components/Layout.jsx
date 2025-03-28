import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { useSettings } from "../context/SettingsContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  Bell,
  Home,
  User,
  Book,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  Mail,
  TrendingUp,
  LayoutDashboard,
  Sun,
  Moon,
} from "lucide-react";
import "./Layout.css";

const Layout = ({ children }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useSettings();
  const isAdmin = user && user.isAdmin === true;

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

  const adminNavItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: t("admin.dashboard"),
      path: "/admin",
    },
    {
      icon: <Users size={20} />,
      label: t("admin.models"),
      path: "/admin/models",
    },
    {
      icon: <Mail size={20} />,
      label: t("admin.communications"),
      path: "/admin/communications",
    }
  ];

  const modelNavItems = [
    { icon: <Home size={20} />, label: t("common.dashboard"), path: "/" },
    { icon: <User size={20} />, label: t("common.profile"), path: "/profile" },
    {
      icon: <Book size={20} />,
      label: t("common.training"),
      path: "/training",
    },
    {
      icon: <MessageSquare size={20} />,
      label: t("common.feedback"),
      path: "/feedback",
    },
    {
      icon: <Settings size={20} />,
      label: t("common.settings"),
      path: "/settings",
    },
  ];

  const navItems = isAdmin ? adminNavItems : modelNavItems;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="layout-sidebar">
        <div className="layout-logo">
          {isAdmin ? t("admin.adminPanel") : "ModelHub"}
        </div>
        <nav className="layout-nav">
          <ul>
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}
          </ul>
        </nav>

        <div className="layout-bottom">
          <button className="nav-item" onClick={() => logout()}>
            <LogOut size={20} />
            <span>{t("common.logout")}</span>
          </button>
          <div className="flex items-center justify-between px-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <Moon size={20} className="text-white-600 dark:text-gray-500" />
              ) : (
                <Sun size={20} className="text-white-600 dark:text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="layout-main">
        {/* Top Bar */}
        <div className="layout-topbar">
          <div>
            <h2 className="text-2xl font-semibold">
              {isAdmin
                ? t("admin.agencyAdmin")
                : t("common.welcome", { name: profileData.name })}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {isAdmin ? t("admin.manageAgency") : t("common.manageCareer")}
            </p>
          </div>

          <div className="layout-profile flex items-center space-x-4">
            <button className="relative p-2">
              <Bell size={24} className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                0
              </span>
            </button>
            <img src={profileData.avatar} alt="Profile" />
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`nav-item ${active ? "active" : ""}`}
      >
        {icon}
        <span>{label}</span>
      </button>
    </li>
  );
};

export default Layout;
