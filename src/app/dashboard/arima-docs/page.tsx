import { ModelValidation } from "@/components/arima/model-validation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArimaDocumentation() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Sales Forecast ARIMA Model Documentation</h1>
        <p className="text-muted-foreground">
          Technical documentation of our enhanced ARIMA implementation for sales forecasting
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
                  <li>Time range: Dynamic based on available data</li>
                  <li>Key metrics: Daily total sales amount with outlier detection</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Data Preparation Steps</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Missing dates filled with zero sales</li>
                  <li>Outlier detection using IQR method</li>
                  <li>Data normalization and smoothing</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">ARIMA Configuration</h2>
            <div className="space-y-4">
              <pre className="bg-muted p-4 rounded-lg">
                {`// Enhanced ARIMA Model Parameters
const p = 9;  // AR terms (Autoregressive)
const d = 1;  // Differencing order
const q = 4;  // MA terms (Moving average)
const s = 7;  // Weekly seasonality

// Advanced features:
- Adaptive weights based on volatility
- Exponential decay weights for AR/MA components
- Weekly seasonal patterns
- Trend and intercept calculation
- Outlier detection and handling`}
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
                  <li>calculateVolatility() - Measures data volatility</li>
                  <li>determineWeights() - Adaptive weight calculation</li>
                  <li>calculateSeasonalFactors() - Handles weekly patterns</li>
                  <li>exponentialSmoothing() - Smooths time series data</li>
                  <li>generateForecastData() - 7-day forecast with confidence</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Error Handling</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Null checks for authentication</li>
                  <li>Minimum data length validation</li>
                  <li>Outlier detection and correction</li>
                  <li>Non-negative forecast enforcement</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}