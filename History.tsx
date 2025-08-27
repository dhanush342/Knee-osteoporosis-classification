import BackButton from "./BackButton";

interface HistoryProps {
  history: { id: string; patientName: string; date: string }[];
  onView: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onView }) => (
  <div style={{ position: "relative" }}>
    <BackButton />
    <h2>Patient Scan History</h2>
    {history.length === 0 ? (
      <p>No scan history available.</p>
    ) : (
      <ul>
        {history.map((record) => (
          <li key={record.id}>
            {record.patientName} - {record.date}
            <button onClick={() => onView(record.id)}>View</button>
          </li>
        ))}
      </ul>
    )}
    {/* Removed Dr. Wilson, AI Accuracy, Model Performance, Clinical Impact, and View Development Guides */}
  </div>
);

export default History;
