function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("doconnect_current_user"));

  return (
    <div className="container">
      <h2 className="section-title">My Profile</h2>

      <div className="profile-grid">
        <div className="profile-label">Username</div>
        <div className="profile-value">{currentUser?.username || "-"}</div>

        <div className="profile-label">Email</div>
        <div className="profile-value">{currentUser?.email || "-"}</div>

        <div className="profile-label">First Name</div>
        <div className="profile-value">{currentUser?.firstName || "-"}</div>

        <div className="profile-label">Last Name</div>
        <div className="profile-value">{currentUser?.lastName || "-"}</div>

        <div className="profile-label">Role</div>
        <div className="profile-value">{currentUser?.role || "USER"}</div>

        <div className="profile-label">Member Since</div>
        <div className="profile-value">
          {currentUser?.memberSince
            ? new Date(currentUser.memberSince).toLocaleDateString()
            : new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="mt-24">
        <button className="btn btn-primary btn-sm">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;