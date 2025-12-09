// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaKey, FaCalendarAlt, FaPowerOff } from "react-icons/fa";

/**
 * Profile Page
 * - Stores profile in localStorage under key "pos_profile"
 * - Avatar stored as base64 dataURL
 */

const defaultProfile = {
  id: 1,
  fullName: "Admin User",
  email: "admin@pos.com",
  role: "Admin",
  memberSince: new Date().toISOString().slice(0, 10),
  status: "Active",
  avatar: null, // base64 dataURL
};

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(defaultProfile);

  useEffect(() => {
    const raw = localStorage.getItem("pos_profile");
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch (e) {
        console.warn("Invalid profile in localStorage", e);
        setProfile(defaultProfile);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pos_profile", JSON.stringify(profile));
  }, [profile]);

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfile((p) => ({ ...p, avatar: ev.target.result }));
    };
    reader.readAsDataURL(f);
  };

  const startEdit = () => {
    setForm(profile);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const saveEdit = () => {
    setProfile({ ...profile, ...form });
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleLogout = () => {
    // clear local storage profile or other auth bits as desired:
    // localStorage.removeItem("pos_profile");
    alert("Logged out (client-side). Implement real auth logout with backend.");
  };

  return (
    <div className="p-6">
      {/* Header card */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl p-6 mb-6 shadow-lg flex items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white">
          {profile.avatar ? (
            <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <FaUserCircle className="text-7xl opacity-90" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{profile.fullName}</h2>
          <p className="text-sm">{profile.email}</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
            <span className="text-xs">●</span>
            <span>{profile.role}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="cursor-pointer inline-flex items-center gap-2 bg-white text-indigo-700 px-3 py-2 rounded-md shadow hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95">
            Change Avatar
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
          <button
            onClick={startEdit}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-md inline-flex items-center gap-2 transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95">
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Account Information</h3>
          <div>
            {!editing ? (
              <button onClick={startEdit} className="px-3 py-2 bg-indigo-600 text-white rounded-md transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95">Edit Profile</button>
            ) : (
              <>
                <button onClick={saveEdit} className="px-3 py-2 bg-green-600 text-white rounded-md mr-2">Save</button>
                <button onClick={cancelEdit} className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md">Cancel</button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">User ID</label>
            <input disabled={!editing} name="id" value={form.id} onChange={handleChange}
              className="w-full mt-1 border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input disabled={!editing} name="fullName" value={form.fullName} onChange={handleChange}
              className="w-full mt-1 border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input disabled={!editing} name="email" value={form.email} onChange={handleChange}
              className="w-full mt-1 border rounded px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Role</label>
            <input disabled={!editing} name="role" value={form.role} onChange={handleChange}
              className="w-full mt-1 border rounded px-3 py-2" />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Security Settings</h3>
          <button onClick={() => alert("Implement change password flow with backend")} className="px-3 py-2 bg-indigo-600 text-white rounded-md inline-flex items-center gap-2 transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95">
            <FaKey /> Change Password
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Your password is secure. Click "Change Password" to update credentials (requires backend).
        </p>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <h3 className="font-semibold mb-4">Account Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <div className="text-xs text-gray-500">Member Since</div>
            <div className="font-semibold mt-2 flex items-center gap-2"><FaCalendarAlt /> {profile.memberSince}</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-xs text-gray-500">Account Status</div>
            <div className="font-semibold mt-2">{profile.status}</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-xs text-gray-500">Other</div>
            <div className="font-semibold mt-2">—</div>
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-white rounded-lg shadow p-5 mb-6 border-l-4 border-red-200">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h4 className="font-semibold text-red-600">Session Management</h4>
            <p className="text-sm text-gray-600 mt-2">Logout from your account. End your current session and return to the login page.</p>
          </div>
          <div>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded inline-flex items-center gap-2 transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95">
              <FaPowerOff /> Logout from Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
