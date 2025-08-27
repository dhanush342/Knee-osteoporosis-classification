import React from "react";
import BackButton from "./BackButton";

interface Scan {
  id: string;
  patientName: string;
  date: string;
}

interface RecentScansProps {
  scans: Scan[];
  onView: (id: string) => void;
}

const RecentScans: React.FC<RecentScansProps> = ({ scans, onView }) => (
  <div style={{ position: "relative" }}>
    <BackButton />
    <h2>Recent Scans</h2>
    {scans.length === 0 ? (
      <p>No recent scans.</p>
    ) : (
      <ul>
        {scans.map((scan) => (
          <li key={scan.id}>
            {scan.patientName} - {scan.date}
            <button onClick={() => onView(scan.id)}>View</button>
          </li>
        ))}
      </ul>
    )}
    {/* Removed Dr. Wilson, AI Accuracy, Model Performance, Clinical Impact, and View Development Guides */}
  </div>
);

export default RecentScans;