"use client";

import PackRow from "./PackRow";

type Props = {
  rows: any[];
  onAssignPack: (requestID: string) => void;
};

export default function ContributorsTable({ rows, onAssignPack }: Props) {
  if (!rows.length) {
    return <p>No contributors found for this group.</p>;
  }

  return (
    <table width="100%" border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Mobile</th>
          <th>Amount</th>
          <th>Pack No</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {rows.map(row => (
          <PackRow
            key={row.requestID}
            row={row}
            onAssignPack={onAssignPack}
          />
        ))}
      </tbody>
    </table>
  );
}