'use client';
import React from 'react';

const LogsPage = () => {
  // Mock logs for demonstration
  const logs = [
    { id: 1, message: 'User JamesComp posted a job: "Programmer"', time: '2025-07-13 10:32AM' },
    { id: 2, message: 'User JamesComp deleted job: "Backend Developer"', time: '2025-07-12 04:45PM' },
    { id: 3, message: 'New applicant: james applied for "Programmer"', time: '2025-07-12 03:18PM' },
    { id: 4, message: 'James Comp Company posted a new job: "Programmer"', time: '2025-07-11 08:20AM' },
    { id: 4, message: 'james logged in"', time: '2025-07-11 08:20AM' },
    { id: 4, message: 'james1 logged in"', time: '2025-07-11 08:20AM' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0F1120] text-white">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>

        <div className="space-y-4 max-w-3xl">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-[#1E2130] border border-gray-600 p-4 rounded shadow-md"
            >
              <p className="text-sm">{log.message}</p>
              <p className="text-xs text-gray-400 mt-1">{log.time}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LogsPage;
