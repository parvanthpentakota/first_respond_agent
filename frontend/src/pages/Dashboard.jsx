import MapView from "../components/MapView.jsx";
import SOSButton from "../components/SOSButton.jsx";
import HealthPredictor from "../components/HealthPredictor.jsx";
import RecentEmergencies from "../components/RecentEmergencies.jsx";
import PatientsList from "../components/PatientsList.jsx";
import AIVoiceAssistant from "../components/AIVoiceAssistant.jsx";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="urgent-action-zone">
        <SOSButton />
      </div>
      
      <div className="dashboard-layout">
        <div className="dashboard-left">
          <MapView />
        </div>
        <div className="dashboard-right scrollable-panel">
          <div className="dashboard-card">
            <AIVoiceAssistant />
          </div>

          <div className="dashboard-card">
            <PatientsList />
          </div>

          <div className="dashboard-card">
            <HealthPredictor />
          </div>

          <div className="dashboard-card">
            <RecentEmergencies />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
