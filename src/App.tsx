import { useState } from 'react'
import './App.css'

interface User {
  name: string
  email: string
  phone: string
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showRegister, setShowRegister] = useState(false)
  
  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  
  // Calculator state
  const [goldRate, setGoldRate] = useState(4350) // Current Philippines gold rate per gram
  const [grams, setGrams] = useState(0)
  const [makingCharge, setMakingCharge] = useState(0)
  const [selectedPurity, setSelectedPurity] = useState('24k')
  
  const purityRates: Record<string, number> = {
    '24k': 1.0,
    '22k': 0.916,
    '21k': 0.875,
    '18k': 0.75,
    '14k': 0.583,
    '10k': 0.417
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const calculateFinalPrice = () => {
    const purityMultiplier = purityRates[selectedPurity]
    const goldValue = goldRate * grams * purityMultiplier
    const subtotal = goldValue + makingCharge
    const tax = subtotal * 0.12
    const finalPrice = subtotal + tax
    
    return {
      goldRate: goldRate * purityMultiplier,
      grams,
      makingCharge,
      tax,
      finalPrice
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: User = {
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone
    }
    setCurrentUser(newUser)
    setIsLoggedIn(true)
    setShowRegister(false)
  }

  const calculation = calculateFinalPrice()

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl sm:text-2xl font-bold">Au</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Gold Price Calculator</h1>
            <p className="text-sm sm:text-base text-gray-600">Philippines Gold Rate Calculator</p>
          </div>

          {!showRegister ? (
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => setShowRegister(true)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
              >
                Register New Account
              </button>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
              >
                Continue as Guest
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl font-bold">Au</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Gold Price Calculator</h1>
                <p className="text-xs sm:text-sm text-gray-600">Philippines Live Gold Rates</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-gray-600">Welcome, {currentUser?.name || 'Guest'}</p>
              <button
                onClick={() => {
                  setIsLoggedIn(false)
                  setCurrentUser(null)
                }}
                className="text-xs sm:text-sm text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Gold Calculator</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Gold Purity</label>
                <select
                  value={selectedPurity}
                  onChange={(e) => setSelectedPurity(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="24k">24 Karat (99.9% Pure)</option>
                  <option value="22k">22 Karat (91.6% Pure)</option>
                  <option value="21k">21 Karat (87.5% Pure)</option>
                  <option value="18k">18 Karat (75% Pure)</option>
                  <option value="14k">14 Karat (58.3% Pure)</option>
                  <option value="10k">10 Karat (41.7% Pure)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Gold Rate (₱/gram) - Current Philippines Rate
                </label>
                <input
                  type="number"
                  value={goldRate}
                  onChange={(e) => setGoldRate(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <p className="text-xs text-gray-500 mt-1">Live rate: {formatCurrency(goldRate)}/gram for 24k</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Weight (grams)</label>
                <input
                  type="number"
                  value={grams}
                  onChange={(e) => setGrams(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Making Charge (₱)</label>
                <input
                  type="number"
                  value={makingCharge}
                  onChange={(e) => setMakingCharge(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Price Breakdown</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-gray-600">Gold Rate ({selectedPurity})</span>
                <span className="text-xs sm:text-sm font-semibold">{formatCurrency(calculation.goldRate)}/gram</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-gray-600">Weight</span>
                <span className="text-xs sm:text-sm font-semibold">{calculation.grams} grams</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-gray-600">Gold Value</span>
                <span className="text-xs sm:text-sm font-semibold">{formatCurrency(calculation.goldRate * calculation.grams)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-gray-600">Making Charge</span>
                <span className="text-xs sm:text-sm font-semibold">{formatCurrency(calculation.makingCharge)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-gray-600">Subtotal</span>
                <span className="text-xs sm:text-sm font-semibold">{formatCurrency(calculation.goldRate * calculation.grams + calculation.makingCharge)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-xs sm:text-sm text-gray-600">Tax (12%)</span>
                <span className="text-xs sm:text-sm font-semibold">{formatCurrency(calculation.tax)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 sm:py-3 bg-yellow-50 rounded-lg px-2 sm:px-4">
                <span className="text-base sm:text-lg font-bold text-gray-800">Final Price</span>
                <span className="text-lg sm:text-xl font-bold text-yellow-600">{formatCurrency(calculation.finalPrice)}</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>Formula:</strong> (Gold Rate × Grams × Purity) + Making Charge + 12% Tax = Final Price
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Quick Reference - Philippines Gold Purity</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {Object.entries(purityRates).map(([karat, purity]) => (
              <div key={karat} className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="text-sm sm:text-base font-bold text-gray-800">{karat.toUpperCase()}</div>
                <div className="text-xs text-gray-600">{(purity * 100).toFixed(1)}% Pure</div>
                <div className="text-xs sm:text-sm font-semibold text-yellow-600">{formatCurrency(goldRate * purity)}/g</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
