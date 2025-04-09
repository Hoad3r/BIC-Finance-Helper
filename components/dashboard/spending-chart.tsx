"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function SpendingChart() {
  // In a real app, this data would come from an API or database
  const data = [
    {
      name: "Jan",
      total: 1200,
    },
    {
      name: "Feb",
      total: 1800,
    },
    {
      name: "Mar",
      total: 1400,
    },
    {
      name: "Apr",
      total: 1300,
    },
    {
      name: "May",
      total: 1200,
    },
    {
      name: "Jun",
      total: 1500,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending</CardTitle>
        <CardDescription>Your spending patterns over the past 6 months.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
