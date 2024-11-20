interface Metric {
    label: string
    value: string
  }
  
  interface MetricsCardProps {
    title: string
    metrics: Metric[]
  }
  
  export function MetricsCard({ title, metrics }: MetricsCardProps) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        <h3 className="font-medium mb-4">{title}</h3>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-semibold">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }