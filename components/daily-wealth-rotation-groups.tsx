"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UnifiedRow {
  groupName: string;
  groupCode: string;
  name: string;
  mobile: string;
  collectionDate: string;
  groupId: string;
  position: string;
  payoutStatus: string;
  controbution: string;
  fine: string;
  bankDetails: string;
  paymentRequest: string;
}

export interface Group {
  groupName: string;
  groupCode: string;
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

export default function DailyWealthRotationGroups() {
  const { toast } = useToast();
  const [rows, setRows] = useState<UnifiedRow[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // <-- Search state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payoutLoadingGroupId, setPayoutLoadingGroupId] = useState<string | null>(null);
  const [paidGroupIds, setPaidGroupIds] = useState<string[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Filter rows based on search input (checks name, mobile, group code, group ID, etc.)
  const filteredRows = rows.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.name.toLowerCase().includes(term) ||
      row.mobile.toLowerCase().includes(term) ||
      row.groupCode.toLowerCase().includes(term) ||
      row.groupId.toLowerCase().includes(term) ||
      row.bankDetails.toLowerCase().includes(term)
    );
  });

  // Calculate paginated rows off filteredRows instead of rows
  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset pagination when search query or selected group changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroupName(e.target.value);
    setCurrentPage(1);
  };

  // Step 1: Fetch groups for dropdown
  useEffect(() => {
    setCurrentPage(1);
    const fetchGroups = async () => {
      try {
        const res = await fetch("/api/all-groups");
        const data = await safeJson(res);

        const formatted: Group[] = (data.details || []).map((item: any) => ({
          groupName: item.grouptag ?? "",
          groupCode: item.groupCode ?? "",
        }));

        setGroups(formatted);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch groups";
        setError(message);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("paidGroupIds");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as string[];
      if (Array.isArray(parsed)) {
        setPaidGroupIds(parsed);
      }
    } catch {
      // ignore invalid localStorage state
    }
  }, []);

  useEffect(() => {
    if (paidGroupIds.length === 0 || rows.length === 0) return;
    setRows((prev) =>
      prev.map((row) =>
        paidGroupIds.includes(row.groupId)
          ? { ...row, payoutStatus: "Paid" }
          : row,
      ),
    );
  }, [paidGroupIds, rows.length]);

  // Step 2: Unified fetch depending on selectedGroupName
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        let response;
        if (!selectedGroupName) {
          response = await fetch("/api/pending/daily", { method: "GET" });
        } else {
          response = await fetch("/api/slot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupName: selectedGroupName }),
          });
        }

        if (!response.ok) throw new Error("Failed to fetch requests");
        const json = await response.json();
        const items = Array.isArray(json.details) ? json.details : [];

        const formatted: UnifiedRow[] = items.map((item: any) => ({
          groupName: item.groupName ?? selectedGroupName ?? "N/A",
          groupCode: item.groupCode ?? "N/A",
          name: item.name ?? "N/A",
          mobile: item.mobile ?? "N/A",
          collectionDate: item.collectionDate ?? "N/A",
          groupId: item.groupId ?? "N/A",
          position: item.position ?? "N/A",
          payoutStatus: item.payoutStatus ?? "N/A",
          controbution: item.controbution ?? "N/A",
          fine: item.fine ?? "N/A",
          bankDetails: item.bankDetails ?? "N/A",
          paymentRequest: item.paymentRequest ?? "N/A",
        }));

        setRows(
          formatted.map((row) =>
            paidGroupIds.includes(row.groupId)
              ? { ...row, payoutStatus: "Paid" }
              : row,
          ),
        );
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
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Daily Wealth Rotation Groups
      </h2>

      {/* Controls: Group Dropdown & Search Bar */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Group Name</label>
          <select
            value={selectedGroupName}
            onChange={handleGroupChange}
            className="border px-3 py-2 rounded min-w-[200px]"
          >
            <option value="">All Groups</option>
            {groups.map((g) => (
              <option key={g.groupCode} value={g.groupName}>
                {g.groupName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[220px]">
          <label className="block mb-1 text-sm font-medium">Search</label>
          <input
            type="text"
            placeholder="Search by name, mobile, group code..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-900"
          />
        </div>
      </div>

      {/* Unified Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-max w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">NAME</th>
              <th className="text-left py-3 px-4">MOBILE</th>
              <th className="text-left py-3 px-4">COLLECTION Date</th>
              <th className="text-left py-3 px-4">GROUPCODE</th>
              <th className="text-left py-3 px-4">GROUPID</th>
              <th className="text-left py-3 px-4">POSITION</th>
              <th className="text-left py-3 px-4">PAYOUTSTATUS</th>
              <th className="text-left py-3 px-4">CONTRIBUTION</th>
              <th className="text-left py-3 px-4">FINE</th>
              <th className="text-left py-3 px-4">BANKDETAILS</th>
              <th className="text-left py-3 px-4">PAYMENT REQUEST</th>
              <th className="text-left py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((req, idx) => {
                const isPaidOut = req.payoutStatus?.toLowerCase().includes("paid");
                return (
                  <tr key={idx}>
                    <td className="px-4 py-2 border">{req.name}</td>
                    <td className="px-4 py-2 border">{req.mobile}</td>
                    <td className="px-4 py-2 border">{req.collectionDate}</td>
                    <td className="px-4 py-2 border">{req.groupCode}</td>
                    <td className="px-4 py-2 border">{req.groupId}</td>
                    <td className="px-4 py-2 border">{req.position}</td>
                    <td className="px-4 py-2 border">{req.payoutStatus}</td>
                    <td className="px-4 py-2 border">{req.controbution}</td>
                    <td className="px-4 py-2 border">{req.fine}</td>
                    <td className="px-4 py-2 border">{req.bankDetails}</td>
                    <td className="px-4 py-2 border">{req.paymentRequest}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={async () => {
                          if (isPaidOut) return;
                          const groupId = req.groupId;
                          if (!groupId) return setError("Missing groupId");
                          try {
                            setPayoutLoadingGroupId(groupId);
                            setError(null);
                            const res = await fetch("/api/payout", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ groupId }),
                            });

                            const json = await safeJson(res);
                            if (!res.ok) {
                              throw new Error(json?.message || res.statusText || "Payout failed");
                            }

                            setRows((prev) =>
                              prev.map((r) =>
                                r.groupId === groupId ? { ...r, payoutStatus: "Paid" } : r
                              )
                            );

                            setPaidGroupIds((prev) => {
                              const next = prev.includes(groupId) ? prev : [...prev, groupId];
                              if (typeof window !== "undefined") {
                                window.localStorage.setItem(
                                  "paidGroupIds",
                                  JSON.stringify(next)
                                );
                              }
                              return next;
                            });

                            toast({
                              title: "Payment made successfully",
                              description: `Group ${req.groupName || req.groupId} has been paid out.`,
                            });
                          } catch (err: any) {
                            setError(err?.message || "Payout request failed");
                          } finally {
                            setPayoutLoadingGroupId(null);
                          }
                        }}
                        disabled={isPaidOut || payoutLoadingGroupId === req.groupId}
                        className={
                          `px-2 py-1 text-white rounded disabled:opacity-50 ` +
                          (isPaidOut
                            ? "bg-emerald-600 cursor-not-allowed"
                            : "bg-purple-900 hover:bg-purple-800")
                        }
                      >
                        {isPaidOut
                          ? "Paid out"
                          : payoutLoadingGroupId === req.groupId
                          ? "Paying..."
                          : "Payout"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={12} className="text-center py-6 text-muted-foreground">
                  No records matching &quot;{searchTerm}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
  );
}