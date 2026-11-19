"use client";

type Props = {
  row: any;
  onAssignPack: (requestID: string, packNo: string) => void;
};

export default function PackRow({ row, onAssignPack }: Props) {
  const [editing, setEditing] = useState(false);
  const [packNo, setPackNo] = useState(row.packNo ?? "");

  return (
    <tr>
      <td>{row.name}</td>
      <td>{row.mobile}</td>
      <td>₦{Number(row.amount).toLocaleString()}</td>
      <td>
        {editing ? (
          <input
            type="number"
            value={packNo}
            onChange={e => setPackNo(e.target.value)}
            style={{ width: 60 }}
          />
        ) : (
          row.packNo ?? "-"
        )}
      </td>
      <td>
        {editing ? (
          <>
            <button onClick={() => { onAssignPack(row.requestID, packNo); setEditing(false); }}>Save</button>
            <button onClick={() => { setEditing(false); setPackNo(row.packNo ?? ""); }}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>
            {row.packNo ? "Edit" : "Assign Pack"}
          </button>
        )}
      </td>
    </tr>
  );
}