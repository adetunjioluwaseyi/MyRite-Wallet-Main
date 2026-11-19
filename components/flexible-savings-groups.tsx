"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

interface JoinRequest {
  groupName: string;
  duration: string;
  name: string;
  mobile: string;
  balance: string;
  groupCode: string;
  // status?: "pending" | "approved" | "declined"
}

export function FlexibleSavingsGroups() {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/pending/flexible");
        if (!response.ok) throw new Error("Failed to fetch requests");

        const json = await response.json();
        const items = Array.isArray(json.details) ? json.details : [];

        const formatted: JoinRequest[] = items.map((item: any) => ({
          name: item.name ?? "Unknown",
          mobile: item.mobile ?? "N/A",
          balance: item.balance ?? "N/A",
          groupCode: item.groupCode ?? "N/A",
          groupName: item.groupName ?? "N/A",
          duration: item.duration ?? "N/A",
        }));

        setRequests(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter requests based on search term across multiple fields
  const filteredRequests = requests.filter((req) => {
    const term = searchTerm.toLowerCase();
    return (
      req.name.toLowerCase().includes(term) ||
      req.mobile.toLowerCase().includes(term) ||
      req.groupCode.toLowerCase().includes(term) ||
      req.groupName.toLowerCase().includes(term)
    );
  });

  // Calculate pagination based on filtered items
  const totalPages = Math.ceil(filteredRequests.length / pageSize) || 1;
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset pagination when searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Approve action handler
  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(
        "http://94.72.111.23:2000/myritewallet/v1/FLEXIBLE/VIEW",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: id }),
        }
      );
      if (!response.ok) throw new Error("Failed to approve request");

      setRequests((prev) =>
        prev.map((req) =>
          req.mobile === id ? { ...req, status: "approved" } : req
        )
      );
    } catch (err) {
      console.error("Approve failed:", err);
      alert("Failed to approve request");
    }
  };

  // Decline action handler
  const handleDecline = async (id: string) => {
    try {
      const response = await fetch(
        "http://94.72.111.23:2000/myritewallet/v1/FLEXIBLE/VIEW",
        {
          method: "POST", // Note: Changed to POST as GET shouldn't have a body payload
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: id }),
        }
      );
      if (!response.ok) throw new Error("Failed to decline request");

      setRequests((prev) =>
        prev.map((req) =>
          req.mobile === id ? { ...req, status: "declined" } : req
        )
      );
    } catch (err) {
      console.error("Decline failed:", err);
      alert("Failed to decline request");
    }
  };

  if (loading) return <p className="p-6">Loading requests...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Flexible Savings Groups
      </h2>

      {/* Controls / Search input */}
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

      {/* Table Section */}
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
                DURATION
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                GROUPCODE
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                GROUPNAME
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req, idx) => (
                <tr key={req.mobile || idx}>
                  <td className="px-4 py-2 border">{req.name}</td>
                  <td className="px-4 py-2 border">{req.mobile}</td>
                  <td className="px-4 py-2 border">{req.balance}</td>
                  <td className="px-4 py-2 border">{req.duration}</td>
                  <td className="px-4 py-2 border">{req.groupCode}</td>
                  <td className="px-4 py-2 border">{req.groupName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
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