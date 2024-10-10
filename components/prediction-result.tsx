'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

type PredictionResult = {
  input: { image: string }
  output: [string, string, number][]
  started_at: string
  completed_at: string
  metrics: { predict_time: number }
}

export function PredictionResult({ result }: { result: PredictionResult }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Prediction Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Input Image</h3>
          <div className="relative w-full h-64">
            <Image
              src={result.input.image}
              alt="Predicted image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Predictions</h3>
          {result.output.map(([id, label, confidence], index) => (
            <div key={id} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{label}</span>
                <Badge variant={index === 0 ? "default" : "secondary"}>
                  {(confidence * 100).toFixed(2)}%
                </Badge>
              </div>
              <Progress value={confidence * 100} className="h-2" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold mb-1">Started At</h3>
            <p className="text-sm">{formatDate(result.started_at)}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-1">Completed At</h3>
            <p className="text-sm">{formatDate(result.completed_at)}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-1">Prediction Time</h3>
            <p className="text-sm">{result.metrics.predict_time.toFixed(3)} seconds</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}