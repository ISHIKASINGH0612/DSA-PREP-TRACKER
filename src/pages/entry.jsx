function Entry({ goToLogin, goToSignup }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Top Right Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
          gap: "10px"
        }}
      >
        <button onClick={goToLogin}>Login</button>
        <button onClick={goToSignup}>Signup</button>
      </div>

      {/* Center Title */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            letterSpacing: "2px"
          }}
        >
          DSA PREP TRACKER
        </h1>
      </div>
    </div>
  );
}

export default Entry;
