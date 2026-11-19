"use client";
 
import { useState, useEffect } from "react";
 
 
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
}
 
interface Group {
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
 
export function WeeklyWealthRotationGroups() {
  const [rows, setRows] = useState<UnifiedRow[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  // Search & Pagination state
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7;
 
  
  // Step 1: Fetch groups for dropdown
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when group changes or new data loads
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
 
  // Step 2: Unified fetch depending on selectedGroupName
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        let response;
        if (!selectedGroupName) {
          // All groups → GET
          response = await fetch("/api/pending/daily", { method: "GET" });
        } else {
          // Specific group → POST WITH-SLOT
          response = await fetch(
              "/api/slot",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ groupName: selectedGroupName }),
            }
          );
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
        }));
 
        setRows(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchRequests();
  }, [selectedGroupName]);
  
  // Filter rows based on search term across all fields
  const filteredRows = rows.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.name.toLowerCase().includes(term) ||
      row.mobile.toLowerCase().includes(term) ||
      row.groupCode.toLowerCase().includes(term) ||
      row.groupName.toLowerCase().includes(term) ||
      row.groupId.toLowerCase().includes(term) ||
      row.collectionDate.toLowerCase().includes(term) ||
      row.payoutStatus.toLowerCase().includes(term) ||
      row.controbution.toLowerCase().includes(term) ||
      row.fine.toLowerCase().includes(term) ||
      row.bankDetails.toLowerCase().includes(term)
    );
  });

  // Calculate paginated rows off filtered set
  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle search term input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <p className="p-6">Loading requests...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;// runs both when selecting and clearing
 
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Weekly Wealth Rotation Groups
      </h2>
 
      {/* GroupName Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Group Name</label>
        <select
          value={selectedGroupName}
          onChange={e => setSelectedGroupName(e.target.value)}
          className="border px-2 py-1 rounded min-w-[200px]"
        >
          <option value="">All Groups</option>
          {groups.map(g => (
            <option key={g.groupCode} value={g.groupName}>
              {g.groupName}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input Control */}
        <div className="flex-1 max-w-md">
          <label className="block mb-1 text-sm font-medium">Search</label>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-900"
          />
        </div>
 
      {/* Unified Table with horizontal scroll and pagination */}
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
               <th className="text-left py-3 px-4">Action</th>
             
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((req, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 border">{req.name}</td>
                <td className="px-4 py-2 border">{req.mobile}</td>
                <td className="px-4 py-2 border">{req.collectionDate}</td>
                <td className="px-4 py-2 border">{req.groupCode}</td>
                {/* <td className="px-4 py-2 border">{req.groupName}</td> */}
                <td className="px-4 py-2 border">{req.groupId}</td>
                <td className="px-4 py-2 border">{req.position}</td>
                <td className="px-4 py-2 border">{req.payoutStatus}</td>
                <td className="px-4 py-2 border">{req.controbution}</td>
                <td className="px-4 py-2 border">{req.fine}</td>
                 <td className="px-4 py-2 border">{req.bankDetails}</td>
                 <button
                            // onClick={() => savePosition(c)}
                            className="px-2 py-1 bg-purple-900 text-white rounded"
                          >
                            Payout
                          </button>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
       {/* Pagination Controls */}
      {filteredRows.length > pageSize && (
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