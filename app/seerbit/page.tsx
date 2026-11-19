"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
{/* createdAt, mobile, email, amount, status, transactionId */}
interface UnifiedRow {
  createdAt: string;
  mobile: string;
  email: string;
  amount: string;
  status: string;
  transactionId: string;
  groupCode?: string;
  groupName: string;
  groupTag: string;
}

interface Group {
  groupName: string;
  groupTag: string;
  groupCode?: string;
}

const safeJson = async (res: Response) => {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Server did not return valid JSON");
  }
};

export default function Seerbit() {
  const [rows, setRows] = useState<UnifiedRow[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Filter rows based on search term across all fields
  const filteredRows = rows.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.createdAt.toLowerCase().includes(term) ||
      row.mobile.toLowerCase().includes(term) ||
      row.email.toLowerCase().includes(term) ||
      row.amount.toLowerCase().includes(term) ||
      row.status.toLowerCase().includes(term) ||
      row.transactionId.toLowerCase().includes(term) ||
      row.groupTag.toLowerCase().includes(term) ||
      (row.groupCode && row.groupCode.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Step 1: Fetch groups for dropdown
  useEffect(() => {
    setCurrentPage(1);
    const fetchGroups = async () => {
      try {
        const res = await fetch("/api/all-groups");
        const data = await safeJson(res);

        const formatted: Group[] = (data.details || []).map((item: any) => ({
          groupName: item.groupName ?? "",
          groupTag: item.groupTag ?? "",
          groupCode: item.groupCode ?? "",
        }));

        setGroups(formatted);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch groups";
        setError(message);
      }
    };
    fetchGroups();
  }, []);

  // Step 2: Fetch requests depending on selectedGroupName
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        let response;
        if (!selectedGroupName) {
          response = await fetch("/api/payment-seerbit", { method: "GET" });
        } else {
          response = await fetch("", {
            method: "POST", // ✅ use POST when sending a body
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupTag: selectedGroupName }), // ✅ send groupTag
          });
        }

        if (!response.ok) throw new Error("Failed to fetch requests");
        const json = await response.json();
        const items = Array.isArray(json.details) ? json.details : [];

        const formatted: UnifiedRow[] = items.map((item: any) => ({
          groupName: item.groupName ?? selectedGroupName ?? "N/A",
          groupTag: item.groupTag ?? "N/A",
          createdAt: item.createdAt ?? "N/A",
          mobile: item.mobile ?? "N/A",
          email: item.email ?? "N/A",
          amount: item.amount ?? "N/A",
          status: item.status ?? "N/A",
          transactionId: item.transactionId ?? "N/A",
          groupCode: item.groupCode ?? "N/A",
        }));
        {/* createdAt, mobile, email, amount, status, transactionId */}

        setRows(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [selectedGroupName]);

  if (loading) return <p className="p-6">Loading requests...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              All Seerbit transaction details
            </h2>

            {/* Search Input Control */}
            <div className="mb-4 max-w-md">
              <input
                type="text"
                placeholder="Search transactions by email"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page on query change
                }}
                className="w-full border px-3 py-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* GroupName Dropdown */}
            {/* <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Group Name</label>
              <select
                value={selectedGroupName}
                onChange={e => setSelectedGroupName(e.target.value)}
                className="border px-2 py-1 rounded min-w-[200px]"
              >
                <option value="">All Groups</option>
                {groups.map((g, idx) => (
                  <option key={`${g.groupCode}-${idx}`} value={g.groupTag}>
                    {g.groupTag}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="min-w-max w-full">
                <thead>
                  <tr className="border-b border-border">
                    {/* createdAt, mobile, email, amount, status, transactionId */}
                    <th className="text-left py-3 px-4">CREATED AT</th>
                    <th className="text-left py-3 px-4">MOBILE</th>
                    <th className="text-left py-3 px-4">EMAIL</th>
                    <th className="text-left py-3 px-4">AMOUNT</th>
                    <th className="text-left py-3 px-4">STATUS</th>
                    {/* <th className="text-left py-3 px-4">GROUPTAG</th> */}
                    <th className="text-left py-3 px-4">TRANSACTION ID</th>
                    {/* <th className="text-left py-3 px-4">GROUP CODE</th> */}
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.length > 0 ? (
                    paginatedRows.map((req, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 border">{req.createdAt}</td>
                        <td className="px-4 py-2 border">{req.mobile}</td>
                        <td className="px-4 py-2 border">{req.email}</td>
                        <td className="px-4 py-2 border">{req.amount}</td>
                        <td className="px-4 py-2 border">{req.status}</td>
                        <td className="px-4 py-2 border">{req.transactionId}</td>
                        {/* <td className="px-4 py-2 border">{req.groupTag}</td> */}
                        
                        {/* <td className="px-4 py-2 border">{req.groupCode}</td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-500 border">
                        No records matching &quot;{searchTerm}&quot;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredRows.length > pageSize && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  className="px-3 py-1 rounded border disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 rounded border disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}