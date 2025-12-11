import { useMemo, useState, type ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts'
import { Calculator, MessageCircle, X } from 'lucide-react'

const PRIMARY_GREEN = '#00D09C'
const ACCENT_RED = '#EB5B3C'
const GREY = '#E5E7EB'

const whatsappLink =
  'https://wa.me/1234567890?text=I%20want%20to%20convert%20my%20potential%20customers'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)

const toNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

const currencyLabelFormatter = (value: unknown) =>
  formatCurrency(toNumber(value))

function InputLabel({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-text-dark">{label}</span>
      {children}
    </label>
  )
}

export default function PartnerEarningsCalculator() {
  const [pendingUsers, setPendingUsers] = useState<number>(10)
  const [avgInvestment, setAvgInvestment] = useState<number>(400)
  const [commissionRate, setCommissionRate] = useState<number>(20)
  const [allTimeEarnings, setAllTimeEarnings] = useState<number>(0)
  const [hasHistoricalData, setHasHistoricalData] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [historicalEarningsInput, setHistoricalEarningsInput] = useState<string>(
    '',
  )
  const [historicalOnboardedInput, setHistoricalOnboardedInput] =
    useState<string>('')
  const [modalError, setModalError] = useState<string>('')

  const futureEarnings = useMemo(
    () => pendingUsers * avgInvestment * (commissionRate / 100),
    [avgInvestment, commissionRate, pendingUsers],
  )

  const minProjection = useMemo(
    () => pendingUsers * avgInvestment * 0.2,
    [avgInvestment, pendingUsers],
  )
  const maxProjection = useMemo(
    () => (pendingUsers * 1.5) * avgInvestment * (commissionRate / 100),
    [pendingUsers, avgInvestment, commissionRate],
  )

  const handleManualAvgChange = (value: number) => {
    setAvgInvestment(Number.isFinite(value) ? Math.max(0, value) : 0)
    setHasHistoricalData(false)
  }

  const handleApplyHistorical = () => {
    const earnings = Number.parseFloat(historicalEarningsInput)
    const onboarded = Number.parseFloat(historicalOnboardedInput)

    if (!Number.isFinite(earnings) || earnings <= 0) {
      setModalError('Enter a valid positive amount for earnings.')
      return
    }
    if (!Number.isFinite(onboarded) || onboarded <= 0) {
      setModalError('Total onboarded must be greater than zero.')
      return
    }

    const calculatedAvg = earnings / onboarded
    setAvgInvestment(
      Number.isFinite(calculatedAvg) ? Math.max(0, calculatedAvg) : 0,
    )
    setAllTimeEarnings(Math.max(0, earnings))
    setHasHistoricalData(true)
    setIsModalOpen(false)
    setModalError('')
  }

  const pieData = [
    { name: 'All Time Earnings', value: allTimeEarnings, fill: PRIMARY_GREEN },
    { name: 'Future Earnings', value: futureEarnings, fill: ACCENT_RED },
  ]

  const barData = [
    {
      name: `Current (${pendingUsers})`,
      value: futureEarnings,
      fill: PRIMARY_GREEN,
    },
    {
      name: `Projected (${Math.ceil(pendingUsers * 1.5)})`,
      value: maxProjection,
      fill: GREY,
    },
  ]

  return (
    <>
      <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 text-text-dark">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">
                Input your pending pipeline
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InputLabel label="Commission Rate">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 ring-primary focus-within:ring-2">
                      <div className="flex items-center">
                        <input
                          type="number"
                          min={20}
                          max={50}
                          value={commissionRate}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value, 10)
                            if (!Number.isNaN(val)) {
                              setCommissionRate(
                                Math.min(50, Math.max(20, val)),
                              )
                            }
                          }}
                          className="w-full bg-transparent text-base text-gray-900 outline-none"
                        />
                        <span className="ml-1 text-sm text-gray-500">%</span>
                      </div>
                    </div>
                    {/* Invisible spacer to match height of the 'Let's Calculate' button in the other column */}
                    <div className="mt-3 h-5 opacity-0">Spacer</div>
                  </div>
                </InputLabel>

                <InputLabel label="Avg Investment / Person / month">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 ring-primary focus-within:ring-2">
                      <span className="text-gray-500">₹</span>
                      <input
                        type="number"
                        min={0}
                        value={avgInvestment}
                        onChange={(e) =>
                          handleManualAvgChange(Number(e.target.value) || 0)
                        }
                        className="flex-1 bg-transparent text-base text-gray-900 outline-none"
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(true)
                          setModalError('')
                        }}
                        className="text-sm font-semibold text-primary underline hover:text-green-600"
                      >
                        Let&apos;s Calculate
                      </button>
                    </div>
                  </div>
                </InputLabel>
              </div>

              <InputLabel label="Pending Conversions">
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="range"
                      min={1}
                      max={500}
                      step={1}
                      value={pendingUsers}
                      onChange={(e) =>
                        setPendingUsers(
                          Math.max(1, Number(e.target.value) || 1),
                        )
                      }
                      className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-primary"
                      style={{
                        background: `linear-gradient(90deg, ${PRIMARY_GREEN} ${
                          ((pendingUsers - 1) / 499) * 100
                        }%, #e5e7eb ${((pendingUsers - 1) / 499) * 100}%)`,
                      }}
                    />
                    <input
                      type="number"
                      min={1}
                      value={pendingUsers}
                      onChange={(e) =>
                        setPendingUsers(
                          Math.max(1, Number(e.target.value) || 1),
                        )
                      }
                      className="w-24 rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-base font-bold text-gray-900 outline-none ring-primary focus:ring-2"
                    />
                  </div>
                </div>
              </InputLabel>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-600">
                  Future Earnings
                </div>
                <div className="text-3xl font-bold text-black sm:text-4xl">
                  {formatCurrency(futureEarnings)}
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    {hasHistoricalData ? (
                      <PieChart>
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                        />
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    ) : (
                      <BarChart data={barData} barSize={40}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(value) => formatNumber(toNumber(value))}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(value: unknown) =>
                            formatCurrency(toNumber(value))
                          }
                        />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                          {barData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                          <LabelList
                            dataKey="value"
                            position="top"
                            formatter={currencyLabelFormatter}
                            style={{ fill: '#111827', fontSize: 12, fontWeight: 600 }}
                          />
                        </Bar>
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              <a
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-base font-semibold text-white shadow-md transition hover:brightness-110"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Convert now
              </a>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-dark">
                  Let&apos;s Calculate
                </h3>
                <p className="text-sm text-gray-600">
                  Derive average investment from your historical numbers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  setModalError('')
                }}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <InputLabel label="Total Historical Earnings">
                <input
                  type="number"
                  min={0}
                  value={historicalEarningsInput}
                  onChange={(e) => setHistoricalEarningsInput(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none ring-primary focus:ring-2"
                />
              </InputLabel>
              <InputLabel label="Total Successfully Onboarded">
                <input
                  type="number"
                  min={0}
                  value={historicalOnboardedInput}
                  onChange={(e) => setHistoricalOnboardedInput(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none ring-primary focus:ring-2"
                />
              </InputLabel>

              {modalError ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-accent">
                  {modalError}
                </p>
              ) : null}

              <button
                type="button"
                onClick={handleApplyHistorical}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={
                  !historicalEarningsInput.trim() ||
                  !historicalOnboardedInput.trim()
                }
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

