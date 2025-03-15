const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  dateOfBirth: { type: Date },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  profilePicture: String,
  isActive: { type: Boolean, default: true },
  role: { type: String, enum: ['user', 'admin', 'premium'], default: 'user' },
  kycStatus: { type: String, enum: ['not_submitted', 'pending', 'verified', 'rejected'], default: 'not_submitted' },
  twoFactorEnabled: { type: Boolean, default: false },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: false }
  },
  referralCode: String,
  referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
  lastLoginAt: Date
}, { timestamps: true });

/**
 * KYC Document Schema - User verification documents
 */
const KYCDocumentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  documentType: { type: String, enum: ['passport', 'national_id', 'drivers_license', 'utility_bill'], required: true },
  documentNumber: { type: String },
  documentFront: { type: String, required: true },
  documentBack: String,
  issuedDate: Date,
  expiryDate: Date,
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  rejectionReason: String,
  verifiedAt: Date
}, { timestamps: true });

/**
 * Risk Profile Schema - User's investment risk assessment
 */
const RiskProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  riskTolerance: { type: String, enum: ['conservative', 'moderate', 'aggressive'], required: true },
  investmentGoals: [{ type: String }],
  timeHorizon: { type: String, enum: ['short_term', 'mid_term', 'long_term'] },
  incomeLevel: { type: String, enum: ['low', 'medium', 'high', 'very_high'] },
  liquidityNeeds: { type: String, enum: ['low', 'medium', 'high'] },
  existingAssets: { type: Schema.Types.Mixed },
  questionsAnswers: { type: Schema.Types.Mixed },
  score: { type: Number, min: 0, max: 100 }
}, { timestamps: true });

// FINANCIAL MODELS

/**
 * Wallet Schema - User's financial account
 */
const WalletSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0, min: 0 },
  currency: { type: String, default: 'USD' },
  isActive: { type: Boolean, default: true },
  accountNumber: { type: String, unique: true },
  dailyWithdrawalLimit: { type: Number, default: 10000 },
  monthlyWithdrawalLimit: { type: Number, default: 50000 }
}, { timestamps: true });

/**
 * Payment Method Schema - User's payment methods
 */
const PaymentMethodSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  type: { type: String, enum: ['bank_account', 'credit_card', 'upi', 'paypal'], required: true },
  isDefault: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  details: {
    // For bank accounts
    accountNumber: String,
    ifscCode: String,
    accountHolderName: String,
    bankName: String,
    
    // For credit cards
    cardNumber: String, // Stored encrypted or last 4 digits only
    cardholderName: String,
    expiryMonth: Number,
    expiryYear: Number,
    
    // For UPI
    upiId: String,
    
    // For PayPal
    email: String
  }
}, { timestamps: true });

/**
 * Transaction Schema - Financial transactions
 */
const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'purchase', 'sale', 'dividend', 'fee', 'transfer'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'pending' },
  reference: String,
  description: String,
  fee: { type: Number, default: 0 },
  paymentMethodId: { type: Schema.Types.ObjectId, ref: 'PaymentMethod' },
  assetId: { type: Schema.Types.ObjectId, refPath: 'assetModel' },
  assetModel: { type: String, enum: ['Stock', 'Bond', 'Insurance'] },
  quantity: Number,
  pricePerUnit: Number,
  completedAt: Date,
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

// INVESTMENT MODELS

/**
 * Portfolio Schema - User's collection of investments
 */
const PortfolioSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  isDefault: { type: Boolean, default: false },
  totalValue: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  targetAllocation: {
    stocks: { type: Number, default: 0 }, // Percentage
    bonds: { type: Number, default: 0 },  // Percentage
    insurance: { type: Number, default: 0 }, // Percentage
    cash: { type: Number, default: 100 }  // Percentage
  },
  performance: {
    daily: Number,
    weekly: Number,
    monthly: Number,
    yearly: Number,
    allTime: Number
  },
  riskScore: { type: Number, min: 0, max: 100 }
}, { timestamps: true });

/**
 * Portfolio Item Schema - Individual investments in a portfolio
 */
const PortfolioItemSchema = new Schema({
  portfolioId: { type: Schema.Types.ObjectId, ref: 'Portfolio', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assetId: { type: Schema.Types.ObjectId, refPath: 'assetModel', required: true },
  assetModel: { type: String, enum: ['Stock', 'Bond', 'Insurance'], required: true },
  quantity: { type: Number, required: true, min: 0 },
  averageBuyPrice: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  profit: { type: Number, default: 0 },
  profitPercentage: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

/**
 * Stock Schema - Stock assets available for investment
 */
const StockSchema = new Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  exchange: String,
  sector: String,
  industry: String,
  currentPrice: { type: Number, required: true },
  previousClose: Number,
  openPrice: Number,
  dayHigh: Number,
  dayLow: Number,
  volume: Number,
  marketCap: Number,
  peRatio: Number,
  dividendYield: Number,
  priceHistory: [{
    date: Date,
    price: Number,
    volume: Number
  }],
  description: String,
  logoUrl: String,
  website: String,
  isActive: { type: Boolean, default: true },
  country: String,
  currency: { type: String, default: 'USD' },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
}, { timestamps: true });

/**
 * Bond Schema - Bond assets available for investment
 */
const BondSchema = new Schema({
  issuerName: { type: String, required: true },
  bondType: { type: String, enum: ['government', 'corporate', 'municipal'], required: true },
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  faceValue: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  couponRate: { type: Number, required: true }, // Interest rate
  issueDate: { type: Date, required: true },
  maturityDate: { type: Date, required: true },
  yieldToMaturity: Number,
  creditRating: String,
  interestPaymentFrequency: { type: String, enum: ['monthly', 'quarterly', 'semi_annual', 'annual'] },
  isCallable: { type: Boolean, default: false },
  callDate: Date,
  callPrice: Number,
  description: String,
  isActive: { type: Boolean, default: true },
  currency: { type: String, default: 'USD' },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' }
}, { timestamps: true });

/**
 * Insurance Schema - Insurance products available for investment
 */
const InsuranceSchema = new Schema({
  provider: { type: String, required: true },
  policyType: { type: String, enum: ['life', 'health', 'property', 'investment'], required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  minimumInvestment: { type: Number, required: true },
  termLength: { type: Number }, // In months
  premiumPaymentFrequency: { type: String, enum: ['monthly', 'quarterly', 'semi_annual', 'annual'] },
  coverageAmount: Number,
  expectedReturns: Number, // For investment-linked policies
  taxBenefits: { type: Boolean, default: false },
  eligibilityCriteria: { type: Schema.Types.Mixed },
  maturityBenefits: String,
  surrenderValue: String,
  isActive: { type: Boolean, default: true },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  currency: { type: String, default: 'USD' }
}, { timestamps: true });

// ANALYTICAL MODELS

/**
 * Investment Suggestion Schema - AI-generated investment recommendations
 */
const InvestmentSuggestionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assetId: { type: Schema.Types.ObjectId, refPath: 'assetModel' },
  assetModel: { type: String, enum: ['Stock', 'Bond', 'Insurance'] },
  title: { type: String, required: true },
  description: { type: String, required: true },
  suggestedAllocation: { type: Number, required: true }, // Percentage
  potentialReturn: Number,
  riskLevel: { type: String, enum: ['low', 'medium', 'high'] },
  timeHorizon: { type: String, enum: ['short_term', 'mid_term', 'long_term'] },
  reasoning: String,
  isViewed: { type: Boolean, default: false },
  isImplemented: { type: Boolean, default: false },
  expiresAt: { type: Date }, // When the suggestion is no longer valid
  source: { type: String, enum: ['ai_algorithm', 'analyst', 'system'] }
}, { timestamps: true });

/**
 * Market News Schema - Financial news and updates
 */
const MarketNewsSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: String,
  source: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  url: String,
  imageUrl: String,
  category: { type: String, enum: ['stocks', 'bonds', 'forex', 'crypto', 'economy', 'general'] },
  relatedAssets: [{
    assetId: { type: Schema.Types.ObjectId, refPath: 'assetModel' },
    assetModel: { type: String, enum: ['Stock', 'Bond', 'Insurance'] }
  }],
  sentiment: { type: String, enum: ['positive', 'negative', 'neutral'] },
  impactLevel: { type: String, enum: ['low', 'medium', 'high'] }
}, { timestamps: true });

/**
 * Notification Schema - User alerts and notifications
 */
const NotificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['price_alert', 'transaction', 'system', 'suggestion', 'news', 'dividend', 'promotion'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  actionUrl: String,
  relatedAssetId: { type: Schema.Types.ObjectId, refPath: 'relatedAssetModel' },
  relatedAssetModel: { type: String, enum: ['Stock', 'Bond', 'Insurance'] },
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });