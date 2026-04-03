import React, { useState, useEffect } from "react";
import socket from "../socket";

const MapView = () => {
  const [alerts, setAlerts] = useState([
    { id: '1', top: '40%', left: '45%', title: "Base Coordinator (New Delhi)" },
    { id: '2', top: '55%', left: '60%', title: "Emergency: Vehicle Collision" }
  ]);
  const [activeAlert, setActiveAlert] = useState(null);

  useEffect(() => {
    socket.on("emergencyAlert", (data) => {
      // Create a random position for the new alert on the image
      const randomTop = Math.floor(Math.random() * 60 + 20) + '%';
      const randomLeft = Math.floor(Math.random() * 60 + 20) + '%';
      
      const newAlert = {
        id: Date.now().toString(),
        top: randomTop,
        left: randomLeft,
        title: `Emergency: ${data.user.name}`
      };
      setAlerts(prev => [...prev, newAlert]);
    });

    return () => socket.off("emergencyAlert");
  }, []);

  return (
    <div className="real-map" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <div style={{ padding: '0.5rem 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', zIndex: 10 }}>
        <h3 className="section-subtitle" style={{marginBottom: 0, fontSize: '1.1rem'}}>🌐 Real-Time Dispatch Map (Mock Image View)</h3>
      </div>
      
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundImage: 'url("/india_map.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}>
        {/* Render simulated markers */}
        {alerts.map(alert => (
          <div 
            key={alert.id}
            onClick={() => setActiveAlert(alert)}
            style={{
              position: 'absolute',
              top: alert.top,
              left: alert.left,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: 5
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              border: '4px solid white',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              animation: 'pulse 2s infinite'
            }}></div>
          </div>
        ))}

        {activeAlert && (
          <div style={{
            position: 'absolute',
            top: activeAlert.top,
            left: activeAlert.left,
            transform: 'translate(-50%, -150%)',
            backgroundColor: 'white',
            padding: '10px 14px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 20,
            whiteSpace: 'nowrap',
            fontWeight: '600',
            fontSize: '14px',
            color: '#1e293b',
            border: '1px solid #cbd5e1'
          }}>
            {activeAlert.title}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveAlert(null);
              }}
              style={{
                marginLeft: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >×</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
};

export default React.memo(MapView);