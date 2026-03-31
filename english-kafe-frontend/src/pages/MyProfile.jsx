import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "../services/authService";

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const { user, setUser } = useAuth();

  const userEmail = user?.email || "user@example.com";
  const userName = user?.name || "John Doe";

  const [formData, setFormData] = useState({
    userName: userName,
    email: userEmail,
    avatarFile: null,
    avatarPreview: "",
  });

  const profileImage =
    formData.avatarPreview ||
    user?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`;

  useEffect(() => {
    setFormData({
      userName,
      email: userEmail,
      avatarFile: null,
      avatarPreview: "",
    });
  }, [userEmail, userName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatarFile: file,
      avatarPreview: previewUrl,
    }));
    setMessage("");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");
    setMessageType("info");

    try {
      const updatedUser = await updateProfile({
        name: formData.userName,
        avatarFile: formData.avatarFile,
      });
      setUser(updatedUser);
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        avatarFile: null,
        avatarPreview: "",
      }));
      setMessage("Profile updated successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      userName: userName,
      email: userEmail,
      avatarFile: null,
      avatarPreview: "",
    });
    setIsEditing(false);
    setMessage("");
  };

  return (
    <div className=" min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="px-4 md:px-10 py-12 text-center bg-blue-50">
        <h1 className=" text-4xl md:text-5xl font-bold text-gray-900">
          My Profile
        </h1>
      </div>

      {/* Profile Content */}
      <div className=" px-4 md:px-10 py-16">
        <div className=" max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Profile Image */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-68 h-68 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                  />

                  {isEditing ? (
                    <label className="cursor-pointer rounded-lg bg-[#F8B2C0] px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-[#F8C2C0]">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  ) : null}
                </div>
              </div>


              {/* Right Side - Personal Information */}
              <div className="order-3 md:order-3 border-2 border-blue-300 rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Personal Information
                </h2>

                <div className="space-y-6">
                  {message ? (
                    <div
                      className={`rounded-lg px-4 py-3 text-sm ${
                        messageType === "success"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                          : messageType === "error"
                            ? "border border-red-200 bg-red-50 text-red-700"
                            : "border border-gray-200 bg-gray-50 text-gray-700"
                      }`}
                    >
                      {message}
                    </div>
                  ) : null}

                  {/* User Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500 font-medium">
                      User Name
                    </label>

                    {!isEditing ? (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 text-lg font-medium">
                        {formData.userName}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500 font-medium">
                      Email Address
                    </label>

                    <div className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 text-gray-700">
                      {formData.email}
                    </div>

                    <p className="text-sm text-gray-500">
                      Want to update your email? Contact support via{" "}
                      <a
                        href="#"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        LINE (English Kafe)
                      </a>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-[#F8B2C0] text-gray-900 font-semibold rounded-lg hover:bg-[#F8C2C0] transition"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="px-6 py-2 bg-[#F8B2C0] text-gray-900 font-semibold rounded-lg hover:bg-[#F8C2C0] transition"
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyProfile;
