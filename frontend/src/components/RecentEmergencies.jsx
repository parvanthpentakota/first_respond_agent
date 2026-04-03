import { AlertCircle, Flame, HeartPulse, Car } from "lucide-react";

export const RecentEmergencies = () => {
  const dummyAlerts = [
    { id: 1, type: "Medical", title: "Severe Allergic Reaction", distance: "0.2 miles away", time: "2 min ago", icon: <HeartPulse className="alert-icon medical" /> },
    { id: 2, type: "Fire", title: "Residential Fire Reported", distance: "1.5 miles away", time: "10 min ago", icon: <Flame className="alert-icon fire" /> },
    { id: 3, type: "Accident", title: "Vehicle Collision", distance: "3.2 miles away", time: "25 min ago", icon: <Car className="alert-icon accident" /> },
    { id: 4, type: "General", title: "Suspicious Activity", distance: "0.8 miles away", time: "1 hr ago", icon: <AlertCircle className="alert-icon general" /> },
  ];

  return (
    <div className="recent-emergencies">
      <h3 className="section-subtitle">Local Activity Feed</h3>
      <div className="alert-feed">
        {dummyAlerts.map(alert => (
          <div key={alert.id} className="alert-item">
            <div className="alert-icon-wrapper">
              {alert.icon}
            </div>
            <div className="alert-details">
              <h4>{alert.title}</h4>
              <p className="alert-meta">{alert.distance} • {alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEmergencies;
