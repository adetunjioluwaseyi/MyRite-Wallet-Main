"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
{/* createdAt, mobile, email, amount, status, transactionId */}
interface UnifiedRow {
  name: string;
  mobile: string;
  amount: string;
  email: string;
  status: string;
  createdAt: string;
  bankDetails: string;
  requestId: string;
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

export default function UpdateWithdrawal() {
  const [rows, setRows] = useState<UnifiedRow[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null);
  const { toast } = useToast();
  const pageSize = 7;

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Filter rows across all fields based on search input
  const filteredRows = rows.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.name.toLowerCase().includes(term) ||
      row.mobile.toLowerCase().includes(term) ||
      row.amount.toLowerCase().includes(term) ||
      row.email.toLowerCase().includes(term) ||
      row.status.toLowerCase().includes(term) ||
      row.createdAt.toLowerCase().includes(term) ||
      row.bankDetails.toLowerCase().includes(term) ||
      row.requestId.toLowerCase().includes(term)
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
          response = await fetch("/api/withdrawals-view", { method: "GET" });
        } else {
          response = await fetch("/api/withdrawals-view", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupTag: selectedGroupName }),
          });
        }

        if (!response.ok) throw new Error("Failed to fetch requests");
        const json = await response.json();
        const items = Array.isArray(json.details) ? json.details : [];

        const formatted: UnifiedRow[] = items.map((item: any) => ({
          groupName: item.groupName ?? selectedGroupName ?? "N/A",
          groupTag: item.groupTag ?? "N/A",
          name: item.name ?? "N/A",
          mobile: item.mobile ?? "N/A",
          amount: item.amount ?? "N/A",
          email: item.email ?? "N/A",
          status: item.status ?? "N/A",
          createdAt: item.createdAt ?? "N/A",
          bankDetails: item.bankDetails ?? "N/A",
          requestId: item.requestId ?? item.requestID ?? "N/A",
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
              Withdrawals update
            </h2>

            {/* Search Input */}
            <div className="mb-4 max-w-md">
              <input
                type="text"
                placeholder="Search withdrawals by name, mobile, email, request ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on query change
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
                    <th className="text-left py-3 px-4">NAME</th>
                    <th className="text-left py-3 px-4">MOBILE</th>
                    <th className="text-left py-3 px-4">AMOUNT</th>
                    <th className="text-left py-3 px-4">EMAIL</th>
                    <th className="text-left py-3 px-4">STATUS</th>
                    <th className="text-left py-3 px-4">CREATED AT</th>
                    <th className="text-left py-3 px-4">BANK DETAILS</th> 
                    <th className="text-left py-3 px-4">REQUEST ID</th>
                    <th className="text-left py-3 px-4">ACTION</th>
                    {/* <th className="text-left py-3 px-4">GROUP CODE</th> */}
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.length > 0 ? (
                    paginatedRows.map((req, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 border">{req.name}</td>
                        <td className="px-4 py-2 border">{req.mobile}</td>
                        <td className="px-4 py-2 border">{req.amount}</td>
                        <td className="px-4 py-2 border">{req.email}</td>
                        <td className="px-4 py-2 border">{req.status}</td>
                        <td className="px-4 py-2 border">{req.createdAt}</td>
                        <td className="px-4 py-2 border">{req.bankDetails}</td>
                        <td className="px-4 py-2 border">{req.requestId}</td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={async () => {
                              if (!req.mobile || !req.requestId) {
                                setError("Missing mobile number or request ID");
                                return;
                              }

                              if (req.status === "withdrawn") return;

                              setUpdatingRequestId(req.requestId);
                              setError(null);

                              try {
                                const res = await fetch("/api/withdrawals-update", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    mobile: req.mobile,
                                    requestId: req.requestId,
                                  }),
                                });

                                const json = await safeJson(res);
                                if (!res.ok) {
                                  throw new Error(json?.message || res.statusText || "Withdrawal update failed");
                                }

                                setRows((prev) =>
                                  prev.map((row) =>
                                    row.requestId === req.requestId ? { ...row, status: "withdrawn" } : row
                                  )
                                );

                                toast({
                                  title: "Withdrawal updated",
                                  description: `Request ${req.requestId} has been marked as withdrawn.`,
                                });
                              } catch (err: any) {
                                setError(err?.message || "Withdrawal update failed");
                              } finally {
                                setUpdatingRequestId(null);
                              }
                            }}
                            disabled={req.status === "withdrawn" || updatingRequestId === req.requestId}
                            className={`px-2 py-1 text-white rounded disabled:opacity-50 ${
                              req.status === "withdrawn"
                                ? "bg-emerald-600 cursor-not-allowed"
                                : "bg-purple-900 hover:bg-purple-800"
                            }`}
                          >
                            {req.status === "withdrawn"
                              ? "Updated"
                              : updatingRequestId === req.requestId
                              ? "Updating..."
                              : "Update"}
                          </button>
                        </td>
                        {/* <td className="px-4 py-2 border">{req.groupTag}</td> */}
                        {/* <td className="px-4 py-2 border">{req.groupCode}</td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-6 text-gray-500 border">
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