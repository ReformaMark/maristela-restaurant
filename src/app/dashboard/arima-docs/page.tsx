import { ModelValidation } from "@/components/arima/model-validation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArimaDocumentation() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Sales Forecast ARIMA Model Documentation</h1>
        <p className="text-muted-foreground">
          Technical documentation of our ARIMA (p=1, d=1, q=1) implementation for sales forecasting
        </p>
      </div>

      <Tabs defaultValue="implementation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="validation">Model Validation</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
        </TabsList>

        <TabsContent value="implementation" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Data Processing</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Input Data</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Source: Confirmed orders from orders table</li>
                  <li>Time range: Last 30 days of sales data</li>
                  <li>Key metrics: Daily total sales amount</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Data Preparation Steps</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Missing dates filled with zero sales</li>
                  <li>Data sorted chronologically</li>
                  <li>First-order differencing applied (d=1)</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">ARIMA Configuration</h2>
            <div className="space-y-4">
              <pre className="bg-muted p-4 rounded-lg">
                {`// ARIMA Model Parameters
const p = 1;  // Autoregressive order
const d = 1;  // Differencing order
const q = 1;  // Moving average order

// Implementation includes:
- Correlation-based coefficient estimation
- Residual analysis
- Inverse differencing
- Random variation (±10%) for realistic forecasts`}
              </pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="validation">
          <ModelValidation />
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Technical Implementation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Key Functions</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>difference() - Applies first-order differencing</li>
                  <li>estimateARCoefficients() - Calculates AR parameters</li>
                  <li>estimateMACoefficients() - Calculates MA parameters</li>
                  <li>generateForecast() - Produces 7-day forecast</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Error Handling</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Null checks for authentication</li>
                  <li>Empty dataset validation</li>
                  <li>Date range validation</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}