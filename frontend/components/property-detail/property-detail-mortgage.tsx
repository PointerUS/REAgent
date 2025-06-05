"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyDetailMortgageProps {
  property: Property
  dictionary: Dictionary
}

export function PropertyDetailMortgage({ property, dictionary }: PropertyDetailMortgageProps) {
  const [downPayment, setDownPayment] = useState(30) // Higher down payment typical in Vietnam
  const [interestRate, setInterestRate] = useState(8.5) // Vietnamese bank rates
  const [loanTerm, setLoanTerm] = useState(20) // Shorter terms common in Vietnam

  // Convert USD to VND for Vietnamese market
  const propertyPriceVND = property.price * 25000
  const downPaymentAmount = (propertyPriceVND * downPayment) / 100
  const loanAmount = propertyPriceVND - downPaymentAmount
  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12

  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const propertyTaxMonthly = (propertyPriceVND * 0.005) / 12 // 0.5% annual property tax
  const insuranceMonthly = (propertyPriceVND * 0.002) / 12 // 0.2% annual insurance
  const managementFee = 3000000 // 3 million VND monthly management fee

  const totalMonthly = monthlyPayment + propertyTaxMonthly + insuranceMonthly + managementFee

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {dictionary.mortgage?.mortgageCalculator || "Tính Toán Vay Mua Nhà"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Price */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(propertyPriceVND)}</div>
              <div className="text-sm text-gray-600">{dictionary.mortgage?.propertyPrice || "Giá Bất Động Sản"}</div>
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {dictionary.mortgage?.downPayment || "Tiền Trả Trước"}: {downPayment}%
            </Label>
            <Slider
              value={[downPayment]}
              onValueChange={(value) => setDownPayment(value[0])}
              max={70}
              min={20}
              step={5}
              className="w-full"
            />
            <div className="text-sm text-gray-600 text-center">{formatCurrency(downPaymentAmount)}</div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              {dictionary.mortgage?.interestRate || "Lãi Suất"}
            </Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
              step="0.1"
              min="5"
              max="15"
              className="text-center"
            />
            <div className="text-xs text-gray-500 text-center">Lãi suất ngân hàng Việt Nam thường 7-10%</div>
          </div>

          {/* Loan Term */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {dictionary.mortgage?.loanTerm || "Thời Hạn Vay"} (Năm)
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 25].map((term) => (
                <Button
                  key={term}
                  variant={loanTerm === term ? "default" : "outline"}
                  onClick={() => setLoanTerm(term)}
                  className="text-sm"
                >
                  {term} năm
                </Button>
              ))}
            </div>
          </div>

          {/* Monthly Payment Result */}
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(monthlyPayment)}</div>
              <div className="text-sm text-gray-600">
                {dictionary.mortgage?.monthlyPayment || "Thanh Toán Hàng Tháng"}
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold">{dictionary.mortgage?.paymentBreakdown || "Chi Tiết Thanh Toán"}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{dictionary.mortgage?.principalInterest || "Gốc & Lãi"}</span>
                <span>{formatCurrency(monthlyPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span>{dictionary.mortgage?.propertyTax || "Thuế Tài Sản"} (ước tính)</span>
                <span>{formatCurrency(propertyTaxMonthly)}</span>
              </div>
              <div className="flex justify-between">
                <span>{dictionary.mortgage?.insurance || "Bảo Hiểm"} (ước tính)</span>
                <span>{formatCurrency(insuranceMonthly)}</span>
              </div>
              <div className="flex justify-between">
                <span>{dictionary.mortgage?.hoaFees || "Phí Quản Lý"}</span>
                <span>{formatCurrency(managementFee)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>{dictionary.mortgage?.totalMonthly || "Tổng Hàng Tháng"}</span>
                <span>{formatCurrency(totalMonthly)}</span>
              </div>
            </div>
          </div>

          {/* Vietnamese Banking Options */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-2">Ngân Hàng Hỗ Trợ</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Vietcombank</span>
                <span className="text-green-600">7.5-9.5%</span>
              </div>
              <div className="flex justify-between">
                <span>BIDV</span>
                <span className="text-green-600">7.8-9.8%</span>
              </div>
              <div className="flex justify-between">
                <span>VietinBank</span>
                <span className="text-green-600">8.0-10.0%</span>
              </div>
            </div>
          </div>

          {/* Get Pre-approved */}
          <Button className="w-full bg-green-600 hover:bg-green-700">
            {dictionary.mortgage?.getPreApproved || "Được Duyệt Trước"}
          </Button>

          <div className="text-xs text-gray-500 text-center">
            {dictionary.mortgage?.disclaimer ||
              "*Ước tính chỉ mang tính chất tham khảo. Lãi suất và thanh toán thực tế có thể khác."}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
