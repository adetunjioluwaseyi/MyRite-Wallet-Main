"use client";

import { useState, useEffect } from "react";
import { InstantAccessMetrics } from "./instant-access-metrics";

interface JoinRequest {
  name: string;
  mobile: string;
  balance: number; // ✅ numeric
  groupCode: string;
}

export function InstantAccessGroups() {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/pending/instant");
        if (!response.ok) throw new Error("Failed to fetch requests");

        const json = await response.json();
        console.log("API response:", json);

        const items = Array.isArray(json.details) ? json.details : [];

        const formatted: JoinRequest[] = items.map((item: any) => {
          console.log(
            "Raw balance from API:",
            item.balance,
            "Type:",
            typeof item.balance
          );
          return {
            name: item.name ?? "Unknown",
            mobile: item.mobile ?? "N/A",
            // ✅ safe conversion: only parse if valid number
            balance:
              item.balance && !isNaN(Number(item.balance))
                ? Number(item.balance)
                : 0,
            groupCode: item.groupCode ?? "N/A",
          };
        });

        setRequests(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter requests based on search query
  const filteredRequests = requests.filter((req) => {
    const term = searchTerm.toLowerCase();
    return (
      req.name.toLowerCase().includes(term) ||
      req.mobile.toLowerCase().includes(term) ||
      req.groupCode.toLowerCase().includes(term) ||
      req.balance.toString().includes(term)
    );
  });

  // Calculate pagination off filtered list
  const totalPages = Math.ceil(filteredRequests.length / pageSize) || 1;
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset page on search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // ✅ compute total inflow
  const totalBalance = requests.reduce((sum, req) => sum + req.balance, 0);

  if (loading) return <p className="p-6">Loading requests...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Instant Access Groups
      </h2>

      {/* Metrics card (if enabled) */}
      {/* <InstantAccessMetrics requests={requests} /> */}
      {/* <InstantAccessMetrics totalBalance={totalBalance} /> */}

      {/* Search Input Control */}
      <div className="mb-6 max-w-md">
        <label className="block mb-1 text-sm font-medium">Search</label>
        <input
          type="text"
          placeholder="Search by name, mobile, group code..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-900"
        />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                NAME
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                MOBILE
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                BALANCE
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                GROUPCODE
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req, idx) => (
                <tr key={req.mobile || idx}>
                  <td className="px-4 py-2 border">{req.name}</td>
                  <td className="px-4 py-2 border">{req.mobile}</td>
                  <td className="px-4 py-2 border">
                    {req.balance.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{req.groupCode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground"
                >
                  No records matching &quot;{searchTerm}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredRequests.length > pageSize && (
        <div className="flex items-center justify-center gap-4 mt-6">
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
  );
}