import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: "0",
        left: "0",
        background: "rgb(0,0,0,0.6)",
        zIndex: 5000,
      }}
    >
      <CircularProgress />
      <div
        style={{
          marginTop: "24px",
          letterSpacing: "1.4px",
          fontSize: "18px",
          color: "white",
        }}
      >
        Loading Please Wait...
      </div>
    </div>
  );
};

export default LoadingSpinner;
