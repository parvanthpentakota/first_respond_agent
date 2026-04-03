import { Users, FileText } from "lucide-react";

export const PatientsList = () => {
  const patients = [
    { id: 1, name: "John Doe", age: 45, condition: "Hypertension", medication: "Lisinopril 10mg" },
    { id: 2, name: "Jane Smith", age: 62, condition: "Type 2 Diabetes", medication: "Metformin 500mg" },
    { id: 3, name: "Robert Johnson", age: 28, condition: "Severe Asthma", medication: "Albuterol Inhaler" }
  ];

  return (
    <div className="patients-list-container">
      <h3 className="section-subtitle">
        <Users size={18} style={{ display: 'inline', marginRight: '8px', position: 'relative', top: '3px' }} /> 
        Active Patient Roster
      </h3>
      <p className="section-desc">Quick view of patient vitals and critical medications.</p>
      
      <div className="patient-list">
        {patients.map(patient => (
          <div key={patient.id} className="patient-card-small">
            <div className="patient-header">
              <h4>{patient.name}</h4>
              <span className="patient-age">{patient.age} yrs</span>
            </div>
            <div className="patient-details">
              <p className="patient-condition"><strong>Risk:</strong> {patient.condition}</p>
              <p className="patient-medication">
                <FileText size={14} style={{ display: 'inline', marginRight: '4px', position: 'relative', top: '2px' }} /> 
                {patient.medication}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
