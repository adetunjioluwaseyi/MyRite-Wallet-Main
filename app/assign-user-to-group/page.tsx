"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AssignUserToGroupPage() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [packNumber, setPackNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/customers")
      .then(res => res.json())
      .then(data => setUsers(data?.data || []));
    fetch("/api/groups")
      .then(res => res.json())
      .then(data => setGroups(data?.data || []));
  }, []);

  const filteredUsers = users.filter(u =>
    u?.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u?.name?.toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredGroups = groups.filter(g =>
    g?.name?.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const handleAssign = async () => {
    if (!selectedUser || !selectedGroup || !packNumber) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/groups/assign-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser?._id || selectedUser?.id,
          groupId: selectedGroup?._id || selectedGroup?.id,
          packNumber,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to assign user");
      setSuccess("User assigned to group successfully!");
      setSelectedUser(null);
      setSelectedGroup(null);
      setPackNumber("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Users Panel */}
      <Card className="flex-1 min-w-[300px]">
        <div className="font-bold mb-2">Select Users</div>
        <Input
          placeholder="Search users..."
          value={userSearch}
          onChange={e => setUserSearch(e.target.value)}
          className="mb-3"
        />
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredUsers.map(user => (
            <label
              key={user._id || user.id}
              className={`flex items-center justify-between p-2 rounded cursor-pointer border ${selectedUser?._id === user._id ? "border-primary bg-muted" : "hover:bg-muted"}`}
            >
              <div>
                <div className="font-medium">{user.name || user.email}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
              <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                {user.status || "Active"}
              </Badge>
              <input
                type="radio"
                name="selectedUser"
                checked={selectedUser?._id === user._id}
                onChange={() => setSelectedUser(user)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </Card>

      {/* Groups Panel */}
      <Card className="flex-1 min-w-[300px]">
        <div className="font-bold mb-2">Select Groups</div>
        <Input
          placeholder="Search groups..."
          value={groupSearch}
          onChange={e => setGroupSearch(e.target.value)}
          className="mb-3"
        />
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredGroups.map(group => (
            <label
              key={group._id || group.id}
              className={`flex items-center justify-between p-2 rounded cursor-pointer border ${selectedGroup?._id === group._id ? "border-primary bg-muted" : "hover:bg-muted"}`}
            >
              <div>
                <div className="font-medium">{group.name}</div>
                <div className="text-xs text-muted-foreground">{group.type}</div>
              </div>
              <Badge variant="secondary">{group.memberCount || group.members?.length || 0} members</Badge>
              <input
                type="radio"
                name="selectedGroup"
                checked={selectedGroup?._id === group._id}
                onChange={() => setSelectedGroup(group)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </Card>

      {/* Assignment Panel */}
      <Card className="flex-1 min-w-[300px] flex flex-col justify-between">
        <div>
          <div className="font-bold mb-2">Assign Pack Number</div>
          <Input
            placeholder="Pack Number"
            value={packNumber}
            onChange={e => setPackNumber(e.target.value)}
            className="mb-3"
            disabled={!selectedUser || !selectedGroup}
          />
          <Button
            onClick={handleAssign}
            disabled={loading || !selectedUser || !selectedGroup || !packNumber}
            className="w-full"
          >
            {loading ? "Assigning..." : "Assign User to Group"}
          </Button>
          {success && <div className="text-green-600 mt-2">{success}</div>}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
      </Card>
    </div>
  );
}
