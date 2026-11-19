"use client";

type Props = {
  groupMode: string;
  setGroupMode: (val: string) => void;
  groupCode: string;
  setGroupCode: (val: string) => void;
  rows: any[];
};

export default function GroupFilter({
  groupMode,
  setGroupMode,
  groupCode,
  setGroupCode,
  rows
}: Props) {
  const groupModes = Array.from(new Set(rows.map(r => r.groupMode)));

  const subGroups = groupMode
    ? Array.from(
        new Set(
          rows
            .filter(r => r.groupMode === groupMode)
            .map(r => r.groupCode)
        )
      )
    : [];

  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
      <select
        value={groupMode}
        onChange={e => {
          setGroupMode(e.target.value);
          setGroupCode("");
        }}
      >
        <option value="">Select Group</option>
        {groupModes.map(g => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        value={groupCode}
        onChange={e => setGroupCode(e.target.value)}
        disabled={!groupMode}
      >
        <option value="">Select Sub‑Group</option>
        {subGroups.map(sg => (
          <option key={sg} value={sg}>
            {sg}
          </option>
        ))}
      </select>
    </div>
  );
}