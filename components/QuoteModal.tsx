'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useModal } from '@/context/ModalContext';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step1Data {
  coverageType: string;
  coverageAmount: string;
  gender: string;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
}

interface Step2Data {
  smoker: string;
  health: string;
  zipCode: string;
}

interface Step3Data {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COVERAGE_TYPES = [
  { value: 'term', label: 'Term Life', description: '10–30 year coverage' },
  { value: 'whole', label: 'Whole Life', description: 'Lifetime coverage + cash value' },
  { value: 'universal', label: 'Universal Life', description: 'Flexible lifetime coverage' },
  { value: 'final', label: 'Final Expense', description: 'Burial & end-of-life costs' },
];

const COVERAGE_AMOUNTS = [
  '$100,000', '$150,000', '$250,000', '$500,000', '$750,000',
  '$1,000,000', '$1,500,000', '$2,000,000', '$3,000,000+',
];

const HEALTH_OPTIONS = [
  { value: 'excellent', label: 'Excellent', description: 'No major health issues' },
  { value: 'good', label: 'Good', description: 'Minor or controlled conditions' },
  { value: 'fair', label: 'Fair', description: 'Some ongoing health issues' },
  { value: 'poor', label: 'Poor', description: 'Serious health conditions' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateStep1(data: Step1Data): FormErrors {
  const errors: FormErrors = {};
  if (!data.coverageType) errors.coverageType = 'Please select a coverage type';
  if (!data.coverageAmount) errors.coverageAmount = 'Please select a coverage amount';
  if (!data.gender) errors.gender = 'Please select your gender';
  if (!data.dobMonth || !data.dobDay || !data.dobYear) {
    errors.dob = 'Please enter your complete date of birth';
  } else {
    const year = parseInt(data.dobYear);
    const currentYear = new Date().getFullYear();
    if (year < 1920 || year > currentYear - 18) {
      errors.dob = 'You must be at least 18 years old to apply';
    }
  }
  return errors;
}

function validateStep2(data: Step2Data): FormErrors {
  const errors: FormErrors = {};
  if (!data.smoker) errors.smoker = 'Please indicate your smoking status';
  if (!data.health) errors.health = 'Please select your health status';
  if (!data.zipCode || data.zipCode.replace(/\D/g, '').length !== 5) {
    errors.zipCode = 'Please enter a valid 5-digit zip code';
  }
  return errors;
}

function validateStep3(data: Step3Data): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';
  if (!data.email.trim() || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length !== 10) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }
  if (!data.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms to continue';
  }
  return errors;
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepOne({
  data,
  errors,
  onChange,
}: {
  data: Step1Data;
  errors: FormErrors;
  onChange: (field: keyof Step1Data, value: string) => void;
}) {
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - 18 - i));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="form-label">Coverage Type</label>
        <div className="grid grid-cols-2 gap-3">
          {COVERAGE_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange('coverageType', type.value)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                data.coverageType === type.value
                  ? 'border-orange-DEFAULT bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className={`font-semibold text-sm ${data.coverageType === type.value ? 'text-orange-DEFAULT' : 'text-gray-800'}`}>
                {type.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{type.description}</div>
            </button>
          ))}
        </div>
        {errors.coverageType && <p className="text-red-500 text-xs mt-1.5">{errors.coverageType}</p>}
      </div>

      <div>
        <label className="form-label">Coverage Amount</label>
        <select
          className="form-select"
          value={data.coverageAmount}
          onChange={(e) => onChange('coverageAmount', e.target.value)}
        >
          <option value="">Select coverage amount...</option>
          {COVERAGE_AMOUNTS.map((amt) => (
            <option key={amt} value={amt}>{amt}</option>
          ))}
        </select>
        {errors.coverageAmount && <p className="text-red-500 text-xs mt-1.5">{errors.coverageAmount}</p>}
      </div>

      <div>
        <label className="form-label">Gender</label>
        <div className="radio-group">
          {['Male', 'Female', 'Non-binary'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onChange('gender', g)}
              className={`radio-option ${data.gender === g ? 'selected' : ''}`}
            >
              {g === 'Male' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="14" r="5" />
                  <line x1="19" y1="5" x2="14.65" y2="9.35" />
                  <line x1="15" y1="5" x2="19" y2="5" />
                  <line x1="19" y1="5" x2="19" y2="9" />
                </svg>
              )}
              {g === 'Female' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5" />
                  <line x1="12" y1="13" x2="12" y2="21" />
                  <line x1="9" y1="18" x2="15" y2="18" />
                </svg>
              )}
              {g}
            </button>
          ))}
        </div>
        {errors.gender && <p className="text-red-500 text-xs mt-1.5">{errors.gender}</p>}
      </div>

      <div>
        <label className="form-label">Date of Birth</label>
        <div className="grid grid-cols-3 gap-3">
          <select
            className="form-select"
            value={data.dobMonth}
            onChange={(e) => onChange('dobMonth', e.target.value)}
          >
            <option value="">Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
            ))}
          </select>
          <select
            className="form-select"
            value={data.dobDay}
            onChange={(e) => onChange('dobDay', e.target.value)}
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            className="form-select"
            value={data.dobYear}
            onChange={(e) => onChange('dobYear', e.target.value)}
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        {errors.dob && <p className="text-red-500 text-xs mt-1.5">{errors.dob}</p>}
      </div>
    </div>
  );
}

function StepTwo({
  data,
  errors,
  onChange,
}: {
  data: Step2Data;
  errors: FormErrors;
  onChange: (field: keyof Step2Data, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="form-label">Do you smoke or use tobacco?</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'no', label: 'No', icon: '✅', desc: 'Non-smoker rates apply' },
            { value: 'yes', label: 'Yes', icon: '🚬', desc: 'Tobacco user rates apply' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('smoker', opt.value)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                data.smoker === opt.value
                  ? 'border-orange-DEFAULT bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">{opt.icon}</div>
              <div className={`font-semibold text-sm ${data.smoker === opt.value ? 'text-orange-DEFAULT' : 'text-gray-800'}`}>
                {opt.label}
              </div>
              <div className="text-xs text-gray-400">{opt.desc}</div>
            </button>
          ))}
        </div>
        {errors.smoker && <p className="text-red-500 text-xs mt-1.5">{errors.smoker}</p>}
      </div>

      <div>
        <label className="form-label">Overall Health Status</label>
        <p className="text-gray-400 text-xs mb-3">Be as accurate as possible — this helps us find your best rates.</p>
        <div className="grid grid-cols-2 gap-3">
          {HEALTH_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('health', opt.value)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                data.health === opt.value
                  ? 'border-orange-DEFAULT bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className={`font-semibold text-sm mb-0.5 ${data.health === opt.value ? 'text-orange-DEFAULT' : 'text-gray-800'}`}>
                {opt.label}
              </div>
              <div className="text-xs text-gray-400">{opt.description}</div>
            </button>
          ))}
        </div>
        {errors.health && <p className="text-red-500 text-xs mt-1.5">{errors.health}</p>}
      </div>

      <div>
        <label className="form-label">Zip Code</label>
        <input
          type="text"
          className={`form-input ${errors.zipCode ? 'error' : ''}`}
          placeholder="e.g. 66202"
          maxLength={5}
          value={data.zipCode}
          onChange={(e) => onChange('zipCode', e.target.value.replace(/\D/g, ''))}
        />
        {errors.zipCode && <p className="text-red-500 text-xs mt-1.5">{errors.zipCode}</p>}
        <p className="text-gray-400 text-xs mt-1.5">Used to find licensed agents in your area</p>
      </div>
    </div>
  );
}

function StepThree({
  data,
  errors,
  onChange,
}: {
  data: Step3Data;
  errors: FormErrors;
  onChange: (field: keyof Step3Data, value: string | boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">First Name</label>
          <input
            type="text"
            className={`form-input ${errors.firstName ? 'error' : ''}`}
            placeholder="Jane"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1.5">{errors.firstName}</p>}
        </div>
        <div>
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className={`form-input ${errors.lastName ? 'error' : ''}`}
            placeholder="Smith"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1.5">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          placeholder="jane@example.com"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
      </div>

      <div>
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className={`form-input ${errors.phone ? 'error' : ''}`}
          placeholder="(555) 123-4567"
          value={data.phone}
          onChange={(e) => onChange('phone', formatPhone(e.target.value))}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
        <p className="text-gray-400 text-xs mt-1.5">A licensed agent will call to discuss your free quotes</p>
      </div>

      <div
        className="p-5 rounded-xl border-2 cursor-pointer select-none transition-colors duration-200"
        style={{
          borderColor: data.agreeToTerms ? '#e8722a' : errors.agreeToTerms ? '#ef4444' : '#e5e7eb',
          background: data.agreeToTerms ? 'rgba(232,114,42,0.04)' : 'white',
        }}
        onClick={() => onChange('agreeToTerms', !data.agreeToTerms)}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
            style={{
              background: data.agreeToTerms ? 'linear-gradient(135deg, #e8722a 0%, #f5a623 100%)' : 'white',
              border: data.agreeToTerms ? 'none' : '2px solid #d1d5db',
            }}
          >
            {data.agreeToTerms && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            By submitting this form, I agree to SelectQuote&apos;s{' '}
            <a href="#" className="text-orange-DEFAULT hover:underline" onClick={(e) => e.stopPropagation()}>Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-orange-DEFAULT hover:underline" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>.
            I consent to be contacted by phone, email, or text about insurance products and services.
            I understand this consent is not a condition of purchase.
          </p>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-xs mt-2">{errors.agreeToTerms}</p>}
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        256-bit SSL encryption · Your data is never sold
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-8 px-4">
      {/* Animated checkmark */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg, #e8722a 0%, #f5a623 100%)', boxShadow: '0 0 40px rgba(232, 114, 42, 0.4)' }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline className="checkmark-path" points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h3
        className="text-navy-DEFAULT text-2xl mb-3"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
      >
        You&apos;re all set, {name}!
      </h3>
      <p className="text-gray-500 mb-2 leading-relaxed max-w-sm">
        A licensed SelectQuote agent will call you within{' '}
        <strong className="text-navy-DEFAULT">1 business day</strong> with your personalized quotes.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Check your email for a confirmation and next steps.
      </p>

      {/* What to expect */}
      <div className="w-full bg-gray-50 rounded-2xl p-6 text-left mb-6">
        <h4 className="font-semibold text-navy-DEFAULT text-sm mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          What happens next:
        </h4>
        <div className="flex flex-col gap-3">
          {[
            { icon: '📞', text: 'Agent calls within 1 business day' },
            { icon: '📊', text: 'Receive quotes from 30+ carriers' },
            { icon: '✅', text: 'Choose your plan with no pressure' },
            { icon: '🛡️', text: 'Get covered — often same day!' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-base">{step.icon}</span>
              {step.text}
            </div>
          ))}
        </div>
      </div>

      {/* Call now option */}
      <div className="w-full rounded-xl border-2 border-orange-DEFAULT/30 bg-orange-DEFAULT/5 p-4 flex items-center justify-between mb-6">
        <div>
          <div className="text-navy-DEFAULT font-semibold text-sm">Can&apos;t wait? Call us now:</div>
          <div className="text-orange-DEFAULT font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
            1-800-777-8353
          </div>
        </div>
        <a
          href="tel:18007778353"
          className="btn-orange py-2.5 px-5 text-sm rounded-lg"
        >
          Call Now
        </a>
      </div>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
      >
        Close this window
      </button>
    </div>
  );
}

// ─── Main Modal Component ─────────────────────────────────────────────────────

export default function QuoteModal() {
  const { isOpen, closeModal } = useModal();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const contentRef = useRef<HTMLDivElement>(null);

  const [step1, setStep1] = useState<Step1Data>({
    coverageType: '',
    coverageAmount: '',
    gender: '',
    dobMonth: '',
    dobDay: '',
    dobYear: '',
  });

  const [step2, setStep2] = useState<Step2Data>({
    smoker: '',
    health: '',
    zipCode: '',
  });

  const [step3, setStep3] = useState<Step3Data>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreeToTerms: false,
  });

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSubmitted(false);
        setErrors({});
        setIsSubmitting(false);
        setStep1({ coverageType: '', coverageAmount: '', gender: '', dobMonth: '', dobDay: '', dobYear: '' });
        setStep2({ smoker: '', health: '', zipCode: '' });
        setStep3({ firstName: '', lastName: '', email: '', phone: '', agreeToTerms: false });
      }, 300);
    }
  }, [isOpen]);

  // Trap focus & ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeModal]);

  const scrollTop = () => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const handleStep1Change = useCallback((field: keyof Step1Data, value: string) => {
    setStep1((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '', dob: '' }));
  }, []);

  const handleStep2Change = useCallback((field: keyof Step2Data, value: string) => {
    setStep2((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const handleStep3Change = useCallback((field: keyof Step3Data, value: string | boolean) => {
    setStep3((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const goNext = () => {
    let newErrors: FormErrors = {};

    if (step === 1) {
      newErrors = validateStep1(step1);
    } else if (step === 2) {
      newErrors = validateStep2(step2);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep((s) => s + 1);
    scrollTop();
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => s - 1);
    scrollTop();
  };

  const handleSubmit = async () => {
    const newErrors = validateStep3(step3);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    setSubmitted(true);
    scrollTop();
  };

  // Progress percentage
  const progressPercent = submitted ? 100 : ((step - 1) / 3) * 100 + 33.33;

  const stepTitles = [
    'Your Coverage Needs',
    'Health & Location',
    'Your Contact Info',
  ];

  const stepDescriptions = [
    'Tell us what type of coverage you need',
    'Help us find your best available rates',
    "We'll have an agent reach out with your quotes",
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(10, 20, 40, 0.85)' }}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Get a Free Life Insurance Quote"
    >
      <div
        className="relative bg-white rounded-3xl w-full max-w-xl shadow-modal overflow-hidden flex flex-col"
        style={{ maxHeight: '92vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (sticky) */}
        <div
          className="flex-shrink-0 px-6 pt-6 pb-0"
          style={{ background: 'linear-gradient(135deg, #0f2a4a 0%, #1a3a5c 100%)' }}
        >
          {/* Top row: logo + close */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e8722a 0%, #f5a623 100%)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="white" />
                </svg>
              </div>
              <span className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>
                Select<span className="text-orange-light">Quote</span>
              </span>
            </div>
            <button
              onClick={closeModal}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Title & description */}
          {!submitted && (
            <div className="mb-4">
              <div className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-1">
                Step {step} of 3
              </div>
              <h2
                className="text-white text-xl leading-tight"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {stepTitles[step - 1]}
              </h2>
              <p className="text-white/60 text-sm mt-1">{stepDescriptions[step - 1]}</p>
            </div>
          )}

          {submitted && (
            <div className="mb-4">
              <h2 className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Quote Request Received! 🎉
              </h2>
            </div>
          )}

          {/* Progress bar */}
          {!submitted && (
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden -mx-6 mb-0">
              <div
                className="h-full progress-bar rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #e8722a, #f5a623)',
                }}
              />
            </div>
          )}

          {submitted && (
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden -mx-6 mb-0">
              <div className="h-full w-full rounded-full" style={{ background: 'linear-gradient(90deg, #e8722a, #f5a623)' }} />
            </div>
          )}
        </div>

        {/* Step indicators */}
        {!submitted && (
          <div className="flex-shrink-0 bg-white border-b border-gray-100 px-6 py-3">
            <div className="flex items-center gap-2 justify-center">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step > s
                        ? 'bg-green-500 text-white'
                        : step === s
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                    style={step === s ? { background: 'linear-gradient(135deg, #e8722a 0%, #f5a623 100%)' } : {}}
                  >
                    {step > s ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      s
                    )}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-0.5 rounded transition-colors duration-300 ${step > s ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto px-6 py-6">
          {submitted ? (
            <SuccessScreen name={step3.firstName || 'there'} onClose={closeModal} />
          ) : (
            <>
              {step === 1 && <StepOne data={step1} errors={errors} onChange={handleStep1Change} />}
              {step === 2 && <StepTwo data={step2} errors={errors} onChange={handleStep2Change} />}
              {step === 3 && <StepThree data={step3} errors={errors} onChange={handleStep3Change} />}
            </>
          )}
        </div>

        {/* Footer buttons (sticky) */}
        {!submitted && (
          <div className="flex-shrink-0 px-6 py-5 bg-white border-t border-gray-100">
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex-1 py-3.5 px-6 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-[3] py-3.5 px-6 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-orange-glow active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #e8722a 0%, #f5a623 100%)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[3] py-3.5 px-6 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-orange-glow active:scale-[0.98] disabled:opacity-80 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #e8722a 0%, #f5a623 100%)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25" />
                        <path d="M21 12a9 9 0 00-9-9" />
                      </svg>
                      Finding Your Quotes...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Get My Free Quotes →
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Trust note */}
            <p className="text-center text-gray-400 text-[11px] mt-3 flex items-center justify-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Free &amp; no obligation · Secure 256-bit encryption · No spam
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
