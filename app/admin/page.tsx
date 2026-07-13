// app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [active, setActive] = useState<string[]>([]);
  const [agentRequests, setAgentRequests] = useState<string[]>([]);
  const [humanHandledList, setHumanHandledList] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [number, setNumber] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [convRes, assignRes, humanRes] = await Promise.all([
        fetch('/api/conversations'),
        fetch('/api/assign'),
        fetch('/api/human-handled'),
      ]);

      const convData = await convRes.json();
      const assignData = await assignRes.json();
      const humanData = await humanRes.json();

      setActive(convData.active || []);
      setAgentRequests(convData.agentRequests || []);
      setHumanHandledList(humanData.humanHandled || []);
      setAssignments(assignData.assignments || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!number || !assignedTo) return;
    try {
      await fetch('/api/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, assignedTo }),
      });
      setNumber('');
      setAssignedTo('');
      fetchData();
    } catch (error) {
      console.error('Assignment error:', error);
    }
  };

  const handleMarkHuman = async (number: string) => {
    try {
      await fetch('/api/human-handled', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
      });
      fetchData();
    } catch (error) {
      console.error('Error marking human:', error);
    }
  };

  const handleUnmarkHuman = async (number: string) => {
    try {
      await fetch('/api/human-handled', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
      });
      fetchData();
    } catch (error) {
      console.error('Error unmarking human:', error);
    }
  };

  const handleReactivate = async (number: string) => {
    try {
      await fetch('/api/reactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
      });
      fetchData();
    } catch (error) {
      console.error('Error reactivating:', error);
    }
  };

  const handleDeleteRequest = async (number: string) => {
    try {
      await fetch('/api/agent-request', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">WhatsApp Admin Dashboard</h1>

      {/* Agent Requests */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">🙋 Agent Requests</h2>
        {agentRequests.length === 0 ? (
          <p className="text-gray-500">No client requested an agent.</p>
        ) : (
          <ul className="divide-y">
            {agentRequests.map((num) => (
              <li key={num} className="py-3 flex justify-between items-center">
                <span className="font-mono text-sm">{num}</span>
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
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Human Handled Clients */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">👤 Human-Handled Clients</h2>
        {humanHandledList.length === 0 ? (
          <p className="text-gray-500">No clients marked as handled by human.</p>
        ) : (
          <ul className="divide-y">
            {humanHandledList.map((num) => (
              <li key={num} className="py-3 flex justify-between items-center">
                <span className="font-mono text-sm">{num}</span>
                <button
                  onClick={() => handleUnmarkHuman(num)}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                >
                  Reactivate AI
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Assignment Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 border border-gray-200">
        <h2 className="text-xl font-bold mb-4">📌 Assign a Number to Agent</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Client number (e.g., 447123456789)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="flex-1 p-2 border rounded min-w-[200px]"
          />
          <input
            type="text"
            placeholder="Agent name (e.g., Sarah)"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="flex-1 p-2 border rounded min-w-[150px]"
          />
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={!number || !assignedTo}
          >
            Assign
          </button>
        </div>
      </div>

      {/* Active Conversations */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-bold mb-4">💬 Active AI Conversations</h2>
        {active.length === 0 ? (
          <p className="text-gray-500">No active AI chats.</p>
        ) : (
          <ul className="divide-y">
            {active.map((num) => (
              <li key={num} className="py-3 flex justify-between items-center">
                <span className="font-mono text-sm">{num}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {assignments[num] ? `→ ${assignments[num]}` : 'Unassigned'}
                  </span>
                  <button
                    onClick={() => handleMarkHuman(num)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Mark as Human
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}