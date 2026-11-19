"use client"

import { Card } from "@/components/ui/card"

export function SavingsRotationInsights() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Savings Rotation Insights</h2>
      <div className="w-full h-80 flex items-end justify-between gap-2 px-4">
        <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="flexibilityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0095ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0095ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e096" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00e096" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="50" y1="250" x2="750" y2="250" stroke="#e0e1e2" strokeWidth="1" />
          <line x1="50" y1="200" x2="750" y2="200" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50" y1="150" x2="750" y2="150" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50" y1="100" x2="750" y2="100" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />

          {/* Flexibility area */}
          <path
            d="M 80 180 L 180 160 L 280 200 L 380 120 L 480 100 L 580 140 L 680 80 L 750 100 L 750 250 L 80 250 Z"
            fill="url(#flexibilityGradient)"
          />

          {/* Target Achievers area */}
          <path
            d="M 80 200 L 180 180 L 280 160 L 380 140 L 480 120 L 580 100 L 680 90 L 750 110 L 750 250 L 80 250 Z"
            fill="url(#targetGradient)"
          />

          {/* Flexibility line */}
          <polyline
            points="80,180 180,160 280,200 380,120 480,100 580,140 680,80 750,100"
            fill="none"
            stroke="#0095ff"
            strokeWidth="2"
          />

          {/* Target Achievers line */}
          <polyline
            points="80,200 180,180 280,160 380,140 480,120 580,100 680,90 750,110"
            fill="none"
            stroke="#00e096"
            strokeWidth="2"
          />

          {/* X-axis labels */}
          <text x="80" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Jan
          </text>
          <text x="180" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Feb
          </text>
          <text x="280" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Mar
          </text>
          <text x="380" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Apr
          </text>
          <text x="480" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            May
          </text>
          <text x="580" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Jun
          </text>
          <text x="680" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Jul
          </text>
        </svg>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3" style={{ backgroundColor: "#0095ff" }}></div>
          <span className="text-sm text-muted-foreground">Flexibility</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3" style={{ backgroundColor: "#00e096" }}></div>
          <span className="text-sm text-muted-foreground">Target Achievers</span>
        </div>
      </div>
      <div className="flex gap-8 mt-4 text-sm">
        <div>
          <span className="text-muted-foreground">Flexibility</span>
          <p className="font-bold text-foreground">$3,004</p>
        </div>
        <div>
          <span className="text-muted-foreground">Target Achievers</span>
          <p className="font-bold text-foreground">$4,504</p>
        </div>
      </div>
    </Card>
  )
}
