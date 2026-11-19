"use client";

import { useEffect, useState } from "react";

export function usePackAssignment() {
  const [rows, setRows] = useState([]);
  const [groupMode, setGroupMode] = useState("");
  const [groupCode, setGroupCode] = useState("");

  // fetch data or receive from props
  useEffect(() => {
    // fetch contributions here
  }, []);

  const filteredRows = rows.filter(
    r => r.groupMode === groupMode && r.groupCode === groupCode
  );

  function assignNextPack(requestID: string) {
    const used = rows
      .filter(
        r =>
          r.groupMode === groupMode &&
          r.groupCode === groupCode &&
          r.packNo != null
      )
      .map(r => r.packNo);

    const next = used.length ? Math.max(...used) + 1 : 1;

    setRows(prev =>
      prev.map(r =>
        r.requestID === requestID ? { ...r, packNo: next } : r
      )
    );
  }

  async function submitPackNumbers() {
    // validation + API submit
  }

  return {
    rows,
    groupMode,
    groupCode,
    setGroupMode,
    setGroupCode,
    filteredRows,
    assignNextPack,
    submitPackNumbers
  };
}