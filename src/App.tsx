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
      <div className="h-screen flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
        {/* Gold Wave Animation */}
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        
        <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md border border-amber-500/30 relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl sm:text-2xl font-bold">Au</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Gold Price Calculator</h1>
            <p className="text-sm sm:text-base text-gray-300">Philippines Gold Rate Calculator</p>
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
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
              >
                Continue as Guest
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-800 text-white"
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
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
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
    <div className="h-screen p-2 sm:p-4 lg:p-6 overflow-hidden relative">
      {/* Gold Wave Animation */}
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      <div className="h-full max-w-none mx-auto flex flex-col relative z-10">
        <header className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 mb-6 border border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
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

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto no-scrollbar">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Gold Calculator</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Gold Purity</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {Object.entries(purityRates).map(([karat, purity]) => (
                    <button
                      key={karat}
                      onClick={() => setSelectedPurity(karat)}
                      className={`py-3 px-2 sm:px-3 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                        selectedPurity === karat
                          ? 'bg-amber-500 text-white border-amber-500 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                      }`}
                    >
                      <div className="font-bold">{karat.toUpperCase()}</div>
                      <div className="text-xs opacity-75">{(purity * 100).toFixed(1)}%</div>
                    </button>
                  ))}
                </div>
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

          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Price Breakdown</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Gold Rate ({selectedPurity})</span>
                <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(calculation.goldRate)}/gram</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Weight</span>
                <span className="text-sm sm:text-base font-bold text-gray-900">{calculation.grams} grams</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Gold Value</span>
                <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(calculation.goldRate * calculation.grams)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Making Charge</span>
                <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(calculation.makingCharge)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Subtotal</span>
                <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(calculation.goldRate * calculation.grams + calculation.makingCharge)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Tax (12%)</span>
                <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(calculation.tax)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 sm:py-4 bg-yellow-100 rounded-lg px-3 sm:px-5 shadow-inner">
                <span className="text-lg sm:text-xl font-bold text-gray-900">Final Price</span>
                <span className="text-xl sm:text-2xl font-extrabold text-yellow-700">{formatCurrency(calculation.finalPrice)}</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs sm:text-sm text-blue-900 font-medium">
                <strong>Formula:</strong> (Gold Rate × Grams × Purity) + Making Charge + 12% Tax = Final Price
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20 flex-shrink-0">
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
