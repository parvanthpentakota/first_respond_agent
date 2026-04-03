import { useState, useEffect } from "react";
import { Activity, Pill, RefreshCcw } from "lucide-react";

export const HealthPredictor = () => {
  const [age, setAge] = useState(30);
  const [conditions, setConditions] = useState([]);
  const [medications, setMedications] = useState(false);
  const [riskScore, setRiskScore] = useState(15);
  
  const allConditions = ["Asthma", "Diabetes", "Heart Condition", "Hypertension", "None"];

  // Heuristic Algorithm to calculate risk score
  useEffect(() => {
    let score = 5; // Base risk
    
    // Age factor
    if (age > 60) score += 25;
    else if (age > 45) score += 15;
    
    // Conditions factor
    if (conditions.includes("Heart Condition")) score += 30;
    if (conditions.includes("Asthma")) score += 20;
    if (conditions.includes("Diabetes")) score += 15;
    if (conditions.includes("Hypertension")) score += 15;
    
    // Medication factor
    if (medications && conditions.length > 0) score -= 10; // Medication mitigates known conditions

    // Cap at 95% for MVP realism
    setRiskScore(Math.min(95, score));
  }, [age, conditions, medications]);

  const toggleCondition = (cond) => {
    if (cond === "None") {
      setConditions([]);
      return;
    }
    if (conditions.includes(cond)) {
      setConditions(conditions.filter(c => c !== cond));
    } else {
      setConditions([...conditions.filter(c => c !== "None"), cond]);
    }
  };

  const getRiskColor = () => {
    if (riskScore < 30) return "#22c55e"; // Green
    if (riskScore < 60) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  return (
    <div className="health-predictor">
      <div className="predictor-header">
        <h3 className="section-subtitle">AI Health Risk Predictor</h3>
        <p>Analyze your current risk profile for proactive emergency awareness.</p>
      </div>

      <div className="predictor-form">
        <label>Age: {age}</label>
        <input 
          type="range" min="18" max="90" value={age} 
          onChange={(e) => setAge(parseInt(e.target.value))} 
        />

        <div className="conditions-grid">
          {allConditions.map(cond => (
            <button 
              key={cond}
              className={`condition-tag ${conditions.includes(cond) || (cond === "None" && conditions.length === 0) ? "selected" : ""}`}
              onClick={() => toggleCondition(cond)}
            >
              {cond}
            </button>
          ))}
        </div>

        <div className="medication-toggle">
          <label>
            <input 
              type="checkbox" 
              checked={medications} 
              onChange={(e) => setMedications(e.target.checked)}
            /> 
            Currently taking prescribed medications?
          </label>
        </div>
      </div>

      <div className="risk-score-display">
        <div className="score-circle" style={{ borderColor: getRiskColor(), color: getRiskColor() }}>
          <h2>{riskScore}%</h2>
        </div>
        <div className="score-info">
          <h4>Vulnerability Rating</h4>
          <p>
            {riskScore < 30 ? "Low Risk: Keep up the good work!" : 
             riskScore < 60 ? "Moderate Risk: Ensure your medical profile is up-to-date." : 
             "High Risk: Emergency contacts should be aware of your status."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthPredictor;
