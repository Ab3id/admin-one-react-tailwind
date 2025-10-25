"use client"

import ChartLineSampleComponentBlock from "./_components/ChartLineSample/ComponentBlock";
import { useEffect, useState } from "react";
import axiosClient from "../_lib/axiosClient";
import CircularLoader from "../_components/CircularLoader";


interface DashboardSummary {
  sentMesages: number,
  deliveredMessages: number,
  pendingMessages: number,
  creditBalance?: number,
  chartData: ChartDataResponse[]
}

interface ChartDataResponse {
  messageCount: number,
  month: number,
  year: number,
  status: string
}

export default function DashboardPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary>();
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
      const fetchDashboardSummary = async () => {
        try {
          const response = await axiosClient.get<DashboardSummary>('/manage/stats')
          setDashboardSummary(response.data)
        } catch (err) {
            setError('Summary fetch failed')
            console.error(err)
        } finally {
          setIsLoading(false)
        }
      } 

      fetchDashboardSummary()
  },[])
  console.log(error)
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {isLoading && <CircularLoader/>}
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Monitor your SMS campaigns across Tanzania</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Sent SMS</p>
              <p className="text-3xl font-bold text-white">
                {dashboardSummary?.sentMesages?.toLocaleString() ?? 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Delivered SMS</p>
              <p className="text-3xl font-bold text-white">
                {dashboardSummary?.deliveredMessages?.toLocaleString() ?? 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Pending SMS</p>
              <p className="text-3xl font-bold text-white">
                {dashboardSummary?.pendingMessages?.toLocaleString() ?? 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Credit Balance</p>
              <p className="text-3xl font-bold text-white">
                {dashboardSummary?.creditBalance?.toLocaleString() ?? '0'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">SMS Analytics</h2>
          <p className="text-gray-400">Track your message performance across Tanzanian networks</p>
        </div>
        <div className="h-96">
          <ChartLineSampleComponentBlock dataResponse={dashboardSummary?.chartData}/>
        </div>
      </div>
    </div>
  );
}
