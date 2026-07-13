// app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [active, setActive] = useState<string[]>([]);
  const [agentRequests, setAgentRequests] = useState<string[]>([]);
  const [number, setNumber] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [convRes, assignRes] = await Promise.all([
      fetch('/api/conversations'),
      fetch('/api/assign'),
    ]);
    const convData = await convRes.json();
    const assignData = await assignRes.json();
    setActive(convData.active || []);
    setAgentRequests(convData.agentRequests || []);
    setAssignments(assignData.assignments || {});
  };

  const handleAssign = async () => {
    await fetch('/api/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, assignedTo }),
    });
    setNumber('');
    setAssignedTo('');
    fetchData();
  };

  const handleReactivate = async (number: string) => {
    await fetch('/api/reactivate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number }),
    });
    fetchData();
  };

  const handleDeleteRequest = async (number: string) => {
    await fetch('/api/agent-request', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number }),
    });
    fetchData();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">WhatsApp Admin Dashboard</h1>

      {/* Agent Requests */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">🙋 Agent Requests</h2>
        {agentRequests.length === 0 ? (
          <p className="text-gray-500">No client requested an agent.</p>
        ) : (
          <ul className="divide-y">
            {agentRequests.map((num) => (
              <li key={num} className="py-2 flex justify-between items-center">
                <span className="font-mono">{num}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleReactivate(num)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Reactivate AI
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(num)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Remove Request
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Assignment Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Assign a Number to Agent</h2>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Client number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="flex-1 p-2 border rounded min-w-[200px]"
          />
          <input
            type="text"
            placeholder="Agent name"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="flex-1 p-2 border rounded min-w-[150px]"
          />
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Assign
          </button>
        </div>
      </div>

      {/* Active Conversations */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Active AI Conversations</h2>
        {active.length === 0 ? (
          <p className="text-gray-500">No active AI chats.</p>
        ) : (
          <ul className="divide-y">
            {active.map((num) => (
              <li key={num} className="py-2 flex justify-between">
                <span className="font-mono">{num}</span>
                <span className="text-sm text-gray-500">
                  {assignments[num] ? `Assigned to: ${assignments[num]}` : 'Unassigned'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}