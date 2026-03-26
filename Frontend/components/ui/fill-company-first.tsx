"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Building2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function FillCompanyFirst() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-6">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Company Details Required
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              To access our comprehensive business analytics, please first fill in your company details.
            </p>
          </div>

          {/* Message Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Before You Continue
                </h3>
                <p className="text-gray-600 mb-4">
                  Our advanced analytics system requires company information to provide personalized insights, predictions, and recommendations tailored to your business.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-1">📊 Business Analysis</h4>
                    <p className="text-sm text-blue-700">Get detailed health scores and insights</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-1">🎯 Growth Predictions</h4>
                    <p className="text-sm text-green-700">AI-powered forecasts and scenarios</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-1">📈 Risk Assessment</h4>
                    <p className="text-sm text-purple-700">Comprehensive risk analysis</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/company-input">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                      <Building2 className="w-5 h-5 mr-2" />
                      Fill Company Details
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-all duration-200">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              It only takes 2-3 minutes to fill in your company details
            </p>
            <p className="text-sm text-gray-500 mt-1">
              All your data is processed securely and confidentially
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
