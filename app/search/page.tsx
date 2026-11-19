"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

type RecordType = Record<string, unknown>

type SearchRecord = RecordType & {
  __source?: string
}

interface ApiConfig {
  name: string
  endpoint: string
  dataPath?: string
}

const APIs: ApiConfig[] = [
  { name: "Customers", endpoint: "/api/customers", dataPath: "data" },
  { name: "Groups", endpoint: "/api/groups", dataPath: "data" },
  { name: "All Groups", endpoint: "/api/all-groups", dataPath: "data" },
  { name: "Pending", endpoint: "/api/pending", dataPath: "data" },
  { name: "Pending Daily", endpoint: "/api/pending/daily", dataPath: "data" },
  { name: "Pending Weekly", endpoint: "/api/pending/weekly", dataPath: "data" },
  { name: "Pending Monthly", endpoint: "/api/pending/monthly", dataPath: "data" },
  { name: "Pending Wealth", endpoint: "/api/pending/wealth", dataPath: "data" },
  { name: "Pending Target", endpoint: "/api/pending/target", dataPath: "data" },
  { name: "Pending Instant", endpoint: "/api/pending/instant", dataPath: "data" },
  { name: "Pending Flexible", endpoint: "/api/pending/flexible", dataPath: "data" },
  { name: "KYC", endpoint: "/api/kyc", dataPath: "data" },
  { name: "Notifications", endpoint: "/api/notification-show", dataPath: "data" },
]

const SECTION_API_MAP: Record<string, string[]> = {
  "/customer": ["Customers"],
  "/group": ["Groups"],
  "/wealth-rotation/daily": ["Pending Daily"],
  "/wealth-rotation/weekly": ["Pending Weekly"],
  "/wealth-rotation/monthly": ["Pending Monthly"],
  "/wealth-rotation/overview": ["Pending Wealth"],
  "/save-cave/flexible-savings": ["Pending Flexible"],
  "/save-cave/instant-access": ["Pending Instant"],
  "/save-cave/target-achievers": ["Pending Target"],
  "/kyc": ["KYC"],
  "/notifications": ["Notifications"],
}

function getArrayFromPayload(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload

  if (!payload || typeof payload !== "object") return []

  const record = payload as Record<string, unknown>
  const preferredKeys = [
    "data",
    "details",
    "records",
    "rows",
    "items",
    "result",
    "results",
    "list",
    "groups",
    "customers",
    "users",
    "transactions",
    "notifications",
  ]

  for (const key of preferredKeys) {
    const value = record[key]
    if (Array.isArray(value)) return value
  }

  const nestedArrays = Object.values(record).filter(Array.isArray)
  if (nestedArrays.length > 0) {
    return nestedArrays.flatMap((entry) => entry as unknown[])
  }

  return []
}

function extractRecords(payload: unknown, dataPath?: string): unknown[] {
  if (dataPath) {
    if (payload && typeof payload === "object") {
      const record = payload as Record<string, unknown>
      const nested = record[dataPath]

      if (Array.isArray(nested)) {
        return nested
      }

      const fallback = getArrayFromPayload(payload)
      return fallback.length > 0 ? fallback : []
    }

    return []
  }

  return getArrayFromPayload(payload)
}

function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (Array.isArray(value)) return value.map((item) => normalizeValue(item)).join(" ")
  if (typeof value === "object") return JSON.stringify(value)
  return String(value)
}

function getSearchableText(record: Record<string, unknown>): string {
  return Object.entries(record)
    .map(([key, value]) => `${key} ${normalizeValue(value)}`)
    .join(" ")
    .toLowerCase()
}

function toDisplayRecord(record: unknown, source: string): SearchRecord {
  if (!record || typeof record !== "object") {
    return { __source: source }
  }

  return {
    ...(record as RecordType),
    __source: source,
  }
}

async function fetchApiData(config: ApiConfig): Promise<SearchRecord[]> {
  try {
    const response = await fetch(config.endpoint, { cache: "no-store" })
    if (!response.ok) return []

    const json = await response.json()
    const rows = extractRecords(json, config.dataPath)

    return rows
      .filter((row): row is RecordType => !!row && typeof row === "object")
      .map((row) => toDisplayRecord(row, config.name))
  } catch {
    return []
  }
}

function SearchContent() {
  const searchParams = useSearchParams()
  const query = (searchParams.get("q") ?? "").trim().toLowerCase()
  const scope = (searchParams.get("scope") ?? "").trim().toLowerCase()

  const [allRecords, setAllRecords] = useState<SearchRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)

      const scopedApis = scope ? APIs.filter((api) => SECTION_API_MAP[scope]?.includes(api.name)) : APIs
      const settledResults = await Promise.allSettled(scopedApis.map((api) => fetchApiData(api)))
      const results = settledResults.flatMap((result) =>
        result.status === "fulfilled" ? result.value : []
      )

      setAllRecords(results)
      setLoading(false)
    }

    loadAllData()
  }, [scope])

  const filteredRecords = useMemo(() => {
    if (!query) return allRecords

    return allRecords.filter((record) => getSearchableText(record).includes(query))
  }, [query, allRecords])

  const columns = useMemo(() => {
    const sourceOfColumns = filteredRecords.length > 0 ? filteredRecords : allRecords

    const keys = new Set<string>()
    sourceOfColumns.forEach((record) => {
      Object.keys(record).forEach((key) => keys.add(key))
    })

    return Array.from(keys)
  }, [filteredRecords, allRecords])

  const renderCellValue = (record: SearchRecord, column: string) => {
    const value = record[column]
    return normalizeValue(value)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Searching...</h1>
        <p className="text-muted-foreground">Loading data from all sources</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Search results</h1>
        <p className="text-muted-foreground">
          {query
            ? `Found ${filteredRecords.length} record(s) matching "${query}"`
            : `Showing all ${allRecords.length} records`}
        </p>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3 text-left font-medium capitalize">
                    {column.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={`${record.__source ?? "source"}-${index}`} className="border-t border-border hover:bg-muted/50">
                  {columns.map((column) => (
                    <td key={`${record.__source ?? "source"}-${column}-${index}`} className="px-4 py-3 text-sm align-top">
                      {renderCellValue(record, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
          No records matched your search {query && `for "${query}"`}.
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading search page...</div>}>
      <SearchContent />
    </Suspense>
  )
}