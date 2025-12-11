import PartnerEarningsCalculator from './components/PartnerEarningsCalculator'

function App() {
  return (
    <div className="min-h-screen bg-bg-light">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold text-text-dark sm:text-3xl">
          Partner Potential Calculator
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Visualize your potential earnings and convert pending users faster.
        </p>
        <div className="mt-6">
          <PartnerEarningsCalculator />
        </div>
      </div>
    </div>
  )
}

export default App
