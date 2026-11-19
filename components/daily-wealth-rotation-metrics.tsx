// export function DailyWealthRotationMetrics() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {/* Customize your daily overview here */}
//       <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-2xl p-6 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm opacity-90 mb-1">Daily Inflow</p>
//             <p className="text-3xl font-bold">0</p>
//           </div>
//           <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
//             <span className="text-lg">📅</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

export default function DailyWealthRotationMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       {/* Customize your daily overview here */}
      <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
             <p className="text-sm opacity-90 mb-1">Daily Inflow</p>
             <p className="text-3xl font-bold">0</p>
           </div>
           <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
             <span className="text-lg">📅</span>
          </div>
         </div>       </div>
    </div>
  );
}

