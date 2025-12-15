// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaKey,
  FaCalendarAlt,
  FaPowerOff,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const defaultProfile = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@pos.com",
  role: "Admin",
  memberSince: new Date().toISOString().slice(0, 10),
  status: "Active",
  avatar: null,
};

const Profile = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [profile, setProfile] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(defaultProfile);

  // Load profile from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("pos_profile");
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {
        setProfile(defaultProfile);
      }
    }
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem("pos_profile", JSON.stringify(profile));
  }, [profile]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setProfile((p) => ({ ...p, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const startEdit = () => {
    setForm(profile);
    setEditing(true);
  };

  const cancelEdit = () => setEditing(false);
  const saveEdit = () => {
    setProfile({ ...profile, ...form });
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const cardBase = `rounded-lg shadow p-5 mb-6 ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  const inputBase = `w-full mt-1 border rounded px-3 py-2 ${
    darkMode
      ? "border-gray-600 bg-gray-700 text-black"
      : "border-gray-300 bg-white text-black"
  }`;

  return (
    <div
      className={`p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen`}
    >
      {/* Header Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl p-6 mb-6 shadow-lg flex items-center gap-6">
        <div className="lg:w-28 lg:h-28 sm:h-15 sm:w-15 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="avatar"
              className="lg:w-full lg:h-full object-cover sm:w-20 sm:h-20"
            />
          ) : (
            <FaUserCircle className="lg:text-7xl sm:text-3xl opacity-90" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="lg:text-2xl sm:text-lg font-semibold">{`${profile.firstName} ${profile.lastName}`}</h2>
          <p className="text-sm">{profile.email}</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
            <span className="text-xs">●</span>
            <span>{profile.role}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="cursor-pointer inline-flex items-center gap-2 bg-white text-indigo-700 px-3 py-2 rounded-md shadow hover:bg-white/90 hover:scale-105 active:scale-95 sm:text-sm lg:text-base">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Account Information */}
      <div className={cardBase}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Account Information</h3>
          <div>
            {!editing ? (
              <button
                onClick={startEdit}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={saveEdit}
                  className="px-3 py-2 bg-green-600 text-white rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["firstName", "lastName", "email", "role"].map((key) => (
            <div key={key}>
              <label
                className={`text-sm ${
                  darkMode ? "text-gray-200" : "text-gray-600"
                }`}
              >
                {key === "firstName"
                  ? "First Name"
                  : key === "lastName"
                  ? "Last Name"
                  : key === "email"
                  ? "Email Address"
                  : "Role"}
              </label>
              <input
                disabled={!editing}
                name={key}
                value={form[key]}
                onChange={handleChange}
                className={`${inputBase} ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className={cardBase}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Security Settings</h3>
          <button
            onClick={() => alert("Implement change password flow with backend")}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md inline-flex items-center gap-2 transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95"
          >
            <FaKey /> Change Password
          </button>
        </div>
        <p
          className={`text-sm mt-3 ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Your password is secure. Click "Change Password" to update credentials
          (requires backend).
        </p>
      </div>

      {/* Account Statistics */}
      <div className={cardBase}>
        <h3 className="font-semibold mb-4">Account Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 border rounded ${
              darkMode ? "border-gray-600" : ""
            }`}
          >
            <div
              className={`text-xs ${
                darkMode ? "text-gray-800" : "text-gray-500"
              }`}
            >
              Member Since
            </div>
            <div
              className={`font-semibold mt-2 flex items-center gap-2 ${
                darkMode ? "text-gray-800 " : ""
              }`}
            >
              <FaCalendarAlt /> {profile.memberSince}
            </div>
          </div>
          <div
            className={`p-4 border rounded ${
              darkMode ? "border-gray-600" : ""
            }`}
          >
            <div
              className={`text-xs ${
                darkMode ? "text-gray-800" : "text-gray-500"
              }`}
            >
              Account Status
            </div>
            <div
              className={`font-semibold mt-2 ${
                darkMode ? "text-gray-800 " : ""
              }`}
            >
              {profile.status}
            </div>
          </div>
          <div
            className={`p-4 border rounded ${
              darkMode ? "border-gray-600 " : ""
            }`}
          >
            <div
              className={`text-xs font-semibold ${
                darkMode ? "text-gray-800" : "text-gray-500"
              }`}
            >
              Other
            </div>
            <div
              className={`font-semibold mt-2 ${
                darkMode ? "text-gray-800 " : ""
              }`}
            >
              —
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
