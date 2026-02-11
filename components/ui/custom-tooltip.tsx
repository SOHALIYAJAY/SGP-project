export const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}: {typeof entry.value === "number" ? 
              (entry.name.includes("Revenue") || entry.name.includes("MRR") || entry.name.includes("ARR") || entry.name.includes("Cost") || entry.name.includes("Profit")) 
                ? `$${(entry.value / 1000).toFixed(1)}K` 
                : entry.value.toLocaleString() 
              : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}
