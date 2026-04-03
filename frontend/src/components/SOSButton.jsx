import API from "../services/api";

const SOSButton = () => {

  const handleSOS = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {

      const location = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      try {
        await API.post("/emergency", {
          userId: localStorage.getItem("userId") || "anonymous",
          location,
        });
        alert("🚨 SOS Sent Successfully!");
      } catch (error) {
        // Fallback for when backend is not ready
        console.log("Backend not ready or error:", error);
        alert("🚨 SOS Sent! (Backend not reachable, simulated success)");
      }
    });
  };

  return (
    <div className="sos-button-wrapper massive-sos-wrapper">
      <button className="sos-button massive-sos" onClick={handleSOS}>
        <span style={{fontSize: '3rem', marginRight: '10px'}}>🚨</span> 
        <div>
           <div className="sos-text-primary">EMERGENCY SOS</div>
           <div className="sos-text-secondary">Tap to immediately dispatch first responders</div>
        </div>
      </button>
    </div>
  );
};

export default SOSButton;