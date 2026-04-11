'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  id: number;
  type: 'bot' | 'user' | 'options' | 'info';
  text: string;
  options?: { label: string; value: string }[];
}

interface UserData {
  trigger?: string;
  dependents?: string;
  age?: string;
  income?: string;
  debt?: string;
  existingCoverage?: string;
  health?: string;
  budget?: string;
  name?: string;
  phone?: string;
  email?: string;
}

const STEPS = [
  'welcome',
  'trigger',
  'dependents',
  'age',
  'income',
  'debt',
  'existing',
  'health',
  'budget',
  'education',
  'recommendation',
  'capture',
  'complete',
] as const;

type Step = typeof STEPS[number];

export default function AIGuidedChat({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [userData, setUserData] = useState<UserData>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const addBotMessage = useCallback((text: string, options?: { label: string; value: string }[]) => {
    setIsTyping(true);
    const delay = Math.min(text.length * 15, 1500);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now(), type: options ? 'options' : 'bot', text, options },
      ]);
    }, delay);
  }, []);

  const addInfoMessage = useCallback((text: string) => {
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'info', text }]);
    }, 300);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text }]);
  }, []);

  // Welcome step on mount
  useEffect(() => {
    const t1 = setTimeout(() => {
      addBotMessage("Hi there! I'm your SelectQuote Life Guide. I help families figure out if they need life insurance, how much makes sense, and which type usually fits best.");
    }, 500);
    const t2 = setTimeout(() => {
      addBotMessage("It only takes a couple minutes, and I won't ask you anything invasive. Ready to get started?", [
        { label: "Yes, let's do it", value: 'start' },
        { label: 'I have questions first', value: 'questions' },
        { label: "Just browsing", value: 'browse' },
      ]);
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [addBotMessage]);

  const goToStep = useCallback((step: Step) => {
    setCurrentStep(step);
    setStepIndex(STEPS.indexOf(step));
  }, []);

  const getRecommendation = useCallback((data: UserData) => {
    const age = parseInt(data.age || '35');
    const income = parseInt(data.income || '75000');
    const hasDependents = data.dependents !== 'none';
    const hasDebt = data.debt !== 'none';
    let coverageMin = 100000;
    let coverageMax = 250000;
    let policyType = 'Term Life';
    let termLength = '20-year';
    let estMonthly = '$20-35';

    if (hasDependents && income > 50000) {
      coverageMin = income * 10;
      coverageMax = income * 15;
    } else if (hasDependents) {
      coverageMin = income * 8;
      coverageMax = income * 12;
    } else if (hasDebt) {
      coverageMin = 150000;
      coverageMax = 400000;
    }

    if (age < 35) { termLength = '30-year'; estMonthly = '$18-30'; }
    else if (age < 45) { termLength = '20-year'; estMonthly = '$25-45'; }
    else if (age < 55) { termLength = '15-year'; estMonthly = '$40-75'; }
    else if (age < 65) { termLength = '10-year'; estMonthly = '$60-120'; policyType = 'Term or Whole Life'; }
    else { policyType = 'Guaranteed Issue / Whole Life'; termLength = 'Permanent'; estMonthly = '$80-200'; }

    const fmtMin = `$${(coverageMin / 1000).toFixed(0)}K`;
    const fmtMax = `$${(coverageMax / 1000).toFixed(0)}K`;
    return { coverageRange: `${fmtMin} - ${fmtMax}`, policyType, termLength, estMonthly };
  }, []);

  const handleOptionSelect = useCallback((value: string) => {
    switch (currentStep) {
      case 'welcome':
        if (value === 'start') {
          addUserMessage("Yes, let's do it!");
          setTimeout(() => {
            addBotMessage("Great! First, what brought you here today? Did something change recently, or are you just getting ahead of it?", [
              { label: 'Bought a home', value: 'home' },
              { label: 'Had a baby / starting a family', value: 'family' },
              { label: 'Got married', value: 'married' },
              { label: 'New job / income change', value: 'income_change' },
              { label: 'Just want to be prepared', value: 'proactive' },
              { label: 'Reviewing existing coverage', value: 'review' },
            ]);
            goToStep('trigger');
          }, 500);
        } else if (value === 'questions') {
          addUserMessage('I have some questions first');
          setTimeout(() => {
            addBotMessage("Of course! A lot of people have questions before diving in. Here are the most common ones I hear:", [
              { label: 'Is this really free?', value: 'q_free' },
              { label: 'How does SelectQuote work?', value: 'q_how' },
              { label: 'Is life insurance expensive?', value: 'q_cost' },
              { label: "I'm ready, let's start", value: 'start' },
            ]);
          }, 500);
        } else if (value === 'browse') {
          addUserMessage("Just browsing for now");
          setTimeout(() => {
            addBotMessage("No problem at all! Feel free to look around. A quick tip: a healthy 30-year-old can often get $500K in term coverage for under $25/month. Most people are surprised how affordable it is.");
            setTimeout(() => {
              addBotMessage("If you change your mind, I'm right here. Or you can call our licensed agents anytime at 1-855-875-3425.");
            }, 1500);
          }, 500);
        } else if (value === 'q_free') {
          addUserMessage('Is this really free?');
          setTimeout(() => {
            addBotMessage("100% free to you. SelectQuote is paid by the insurance carriers when you purchase a policy. That means we have no reason to push one carrier over another. We just find the best fit for you.");
            setTimeout(() => {
              addBotMessage("Want to get started now, or have another question?", [
                { label: "Let's start", value: 'start' },
                { label: 'How does SelectQuote work?', value: 'q_how' },
                { label: 'Is life insurance expensive?', value: 'q_cost' },
              ]);
            }, 1500);
          }, 500);
        } else if (value === 'q_how') {
          addUserMessage('How does SelectQuote work?');
          setTimeout(() => {
            addBotMessage("It's simple: you answer a few questions, we shop 30+ top-rated carriers simultaneously, and then present your best options side by side. You pick the winner. No pressure, no obligation.");
            setTimeout(() => {
              addBotMessage("Think of us as your personal insurance shopper. Ready to see what's out there for you?", [
                { label: "Yes, let's go", value: 'start' },
                { label: 'Is life insurance expensive?', value: 'q_cost' },
              ]);
            }, 1500);
          }, 500);
        } else if (value === 'q_cost') {
          addUserMessage('Is life insurance expensive?');
          setTimeout(() => {
            addBotMessage("This is the #1 myth! Most people dramatically overestimate the cost. A healthy 30-year-old can often get $500K in term life coverage for under $25/month. That's less than most streaming subscriptions combined.");
            setTimeout(() => {
              addBotMessage("The younger and healthier you are, the lower your rates. Want me to help you estimate what you might pay?", [
                { label: "Yes, let's find out", value: 'start' },
                { label: 'Maybe later', value: 'browse' },
              ]);
            }, 1500);
          }, 500);
        }
        break;

      case 'trigger': {
        const labels: Record<string, string> = { home: 'Bought a home', family: 'Starting a family', married: 'Got married', income_change: 'New job/income change', proactive: 'Being proactive', review: 'Reviewing coverage' };
        addUserMessage(labels[value] || value);
        setUserData(prev => ({ ...prev, trigger: value }));
        const responses: Record<string, string> = {
          home: "Smart move. A mortgage is often the biggest debt families carry. Life insurance makes sure your family keeps the house if something happens to you.",
          family: "Congratulations! This is the #1 reason people get coverage. When little ones depend on your income, protecting that income becomes critical.",
          married: "That's a great reason. Shared finances mean shared risk. Coverage protects your spouse from inheriting debt or losing financial stability.",
          income_change: "Good timing. When your income changes, your coverage needs often change too. Let's make sure you're properly protected.",
          proactive: "Love that. Getting ahead of it is the smartest approach. The younger and healthier you are, the better your rates will be.",
          review: "Smart to check. Many people find their existing coverage has gaps, especially if their life has changed since they last looked.",
        };
        setTimeout(() => {
          addBotMessage(responses[value] || "That makes sense.");
          setTimeout(() => {
            addBotMessage("Who would be financially affected if something happened to you tomorrow?", [
              { label: 'Spouse/partner', value: 'spouse' },
              { label: 'Spouse + children', value: 'spouse_kids' },
              { label: 'Children only', value: 'kids' },
              { label: 'Aging parents', value: 'parents' },
              { label: 'Business partner(s)', value: 'business' },
              { label: 'No one right now', value: 'none' },
            ]);
            goToStep('dependents');
          }, 1800);
        }, 500);
        break;
      }

      case 'dependents': {
        const labels: Record<string, string> = { spouse: 'Spouse/partner', spouse_kids: 'Spouse + children', kids: 'Children only', parents: 'Aging parents', business: 'Business partner(s)', none: 'No one right now' };
        addUserMessage(labels[value] || value);
        setUserData(prev => ({ ...prev, dependents: value }));
        const responses: Record<string, string> = {
          spouse: "Got it. Protecting a spouse's financial future is one of the most important things coverage does.",
          spouse_kids: "That's the most common situation we see. For families, the goal is usually to protect income, mortgage payments, and future expenses like childcare and education.",
          kids: "Understood. Making sure your children are provided for is priority number one.",
          parents: "That's thoughtful. Many people don't think about this, but if your parents depend on you financially, coverage can be essential.",
          business: "Key-person insurance is critical for businesses. It keeps operations running and protects everyone involved.",
          none: "No worries. Even without dependents, coverage can help with debts, funeral costs, or locking in low rates for the future.",
        };
        setTimeout(() => {
          addBotMessage(responses[value] || "That helps me understand your situation.");
          setTimeout(() => {
            addBotMessage("What age range are you in? This helps me estimate rates and recommend the right term length.", [
              { label: '18-29', value: '25' },
              { label: '30-39', value: '35' },
              { label: '40-49', value: '45' },
              { label: '50-59', value: '55' },
              { label: '60+', value: '65' },
            ]);
            goToStep('age');
          }, 1800);
        }, 500);
        break;
      }

      case 'age': {
        const labels: Record<string, string> = { '25': '18-29', '35': '30-39', '45': '40-49', '55': '50-59', '65': '60+' };
        addUserMessage(labels[value] || value);
        setUserData(prev => ({ ...prev, age: value }));
        const ageNum = parseInt(value);
        let ageResponse = "";
        if (ageNum <= 29) ageResponse = "Great age to get covered. You'll lock in the lowest rates available, and they stay level for the entire term.";
        else if (ageNum <= 39) ageResponse = "This is the sweet spot for most families. Rates are still very competitive, and this is when most people have the most to protect.";
        else if (ageNum <= 49) ageResponse = "Still plenty of excellent options available. Many carriers offer very competitive rates in this range.";
        else if (ageNum <= 59) ageResponse = "Good news: there are many strong options for your age group, including no-exam policies with fast approval.";
        else ageResponse = "There are specific products designed for your age group, including guaranteed-issue policies with no health questions.";
        setTimeout(() => {
          addBotMessage(ageResponse);
          setTimeout(() => {
            addBotMessage("About how much is your household income? You don't need an exact number. This helps me estimate the right coverage amount.", [
              { label: 'Under $50K', value: '40000' },
              { label: '$50K - $75K', value: '62000' },
              { label: '$75K - $100K', value: '87000' },
              { label: '$100K - $150K', value: '125000' },
              { label: '$150K - $250K', value: '200000' },
              { label: '$250K+', value: '300000' },
            ]);
            goToStep('income');
          }, 1800);
        }, 500);
        break;
      }

      case 'income': {
        const labels: Record<string, string> = { '40000': 'Under $50K', '62000': '$50K-$75K', '87000': '$75K-$100K', '125000': '$100K-$150K', '200000': '$150K-$250K', '300000': '$250K+' };
        addUserMessage(labels[value] || value);
        setUserData(prev => ({ ...prev, income: value }));
        setTimeout(() => {
          addBotMessage("Thanks. That helps me calibrate the right coverage amount. For most families, the goal is to replace 10-15 years of income.");
          setTimeout(() => {
            addBotMessage("Do you have any major debts we should factor in?", [
              { label: 'Mortgage', value: 'mortgage' },
              { label: 'Mortgage + other debt', value: 'mortgage_plus' },
              { label: 'Student loans', value: 'student' },
              { label: 'Other debts', value: 'other' },
              { label: 'Minimal / no debt', value: 'none' },
            ]);
            goToStep('debt');
          }, 1800);
        }, 500);
        break;
      }

      case 'debt': {
        const labels: Record<string, string> = { mortgage: 'Mortgage', mortgage_plus: 'Mortgage + other', student: 'Student loans', other: 'Other debts', none: 'Minimal/no debt' };
        addUserMessage(labels[value] || value);
        setUserData(prev => ({ ...prev, debt: value }));
        const debtResponses: Record<string, string> = {
          mortgage: "Good to know. We'll factor in your mortgage so your family can keep the home.",
          mortgage_plus: "Got it. We'll make sure coverage accounts for your mortgage and other obligations.",
          student: "Important to cover. If anyone co-signed those loans, they could become their burden.",
          other: "Understood. We'll factor that into the coverage recommendation.",
          none: "That's a strong position to be in. Your coverage needs will be more focused on income replacement.",
        };
        setTimeout(() => {
          addBotMessage(debtResponses[value] || "Noted.");
          setTimeout(() => {
            addBotMessage("Do you have any existing life insurance coverage?", [
              { label: 'Yes, through work', value: 'employer' },
              { label: 'Yes, personal policy', value: 'personal' },
              { label: 'Both employer + personal', value: 'both' },
              { label: 'No existing coverage', value: 'none' },
            ]);
            goToStep('existing');
          }, 1800);
        }, 500);
        break;
      }

      case 'existing': {
        addUserMessage(value === 'employer' ? 'Through work' : value === 'personal' ? 'Personal policy' : value === 'both' ? 'Both' : 'No coverage');
        setUserData(prev => ({ ...prev, existingCoverage: value }));
        const existResponses: Record<string, string> = {
          employer: "Good start, but here's something most people don't realize: employer plans typically only cover 1-2x your salary, and that coverage disappears if you leave your job. A personal policy fills that gap.",
          personal: "Smart that you already have something. Let's see if your current coverage still matches your needs. Life changes often outpace old policies.",
          both: "You're ahead of most people. Let's make sure the total coverage still matches your current situation.",
          none: "No problem. That's exactly why we're here. Let's find the right starting point for you.",
        };
        setTimeout(() => {
          addBotMessage(existResponses[value] || "Got it.");
          setTimeout(() => {
            addBotMessage("How would you describe your overall health? This helps me point you toward the right application path.", [
              { label: 'Excellent - no issues', value: 'excellent' },
              { label: 'Good - minor things', value: 'good' },
              { label: 'Fair - some conditions', value: 'fair' },
              { label: 'Prefer not to say', value: 'skip' },
            ]);
            goToStep('health');
          }, 1800);
        }, 500);
        break;
      }

      case 'health': {
        const labels: Record<string, string> = { excellent: 'Excellent', good: 'Good', fair: 'Fair', skip: 'Prefer not to say' };
        addUserMessage(labels[value] || value);
        setUserData(prev => ({ ...prev, health: value }));
        const healthResponses: Record<string, string> = {
          excellent: "That's great news. You'll likely qualify for the best rate classes, which means the lowest premiums.",
          good: "That's totally normal. Minor conditions like controlled blood pressure or cholesterol usually don't impact rates significantly.",
          fair: "Don't worry. Many conditions are insurable, and we work with carriers that specialize in exactly these situations. That's the advantage of shopping 30+ carriers.",
          skip: "Completely fine. We can work through the details later with a licensed agent who handles everything confidentially.",
        };
        setTimeout(() => {
          addBotMessage(healthResponses[value] || "Understood.");
          setTimeout(() => {
            addBotMessage("Last question: what monthly budget range feels comfortable if the coverage is a strong fit?", [
              { label: 'Under $25/mo', value: 'under25' },
              { label: '$25 - $50/mo', value: '25_50' },
              { label: '$50 - $100/mo', value: '50_100' },
              { label: '$100+/mo', value: 'over100' },
              { label: 'Not sure yet', value: 'unsure' },
            ]);
            goToStep('budget');
          }, 1800);
        }, 500);
        break;
      }

      case 'budget': {
        const labels: Record<string, string> = { under25: 'Under $25/mo', '25_50': '$25-$50/mo', '50_100': '$50-$100/mo', over100: '$100+/mo', unsure: 'Not sure yet' };
        addUserMessage(labels[value] || value);
        setUserData(prev => ({ ...prev, budget: value }));
        setTimeout(() => {
          addBotMessage("Perfect. You've given me everything I need to put together a recommendation.");
          const updatedData = { ...userData, budget: value };
          const rec = getRecommendation(updatedData);
          setTimeout(() => {
            addInfoMessage(`Based on your profile, here's what I'd recommend:\n\nCoverage Range: ${rec.coverageRange}\nPolicy Type: ${rec.policyType}\nSuggested Term: ${rec.termLength}\nEstimated Cost: ${rec.estMonthly}/month`);
          }, 1200);
          setTimeout(() => {
            addBotMessage(`For most families in your situation, ${rec.policyType.toLowerCase()} is the strongest starting point. It gives you the most coverage for the lowest cost, and the premiums stay locked in for the entire term.`);
          }, 2800);
          setTimeout(() => {
            addBotMessage("The next step is to connect you with personalized quotes from our top carriers. A licensed SelectQuote agent will present your best options side by side, no obligation.");
          }, 4500);
          setTimeout(() => {
            addBotMessage("To get your personalized quotes, I just need a few quick details. What's your first name?");
            goToStep('capture');
          }, 6200);
        }, 500);
        break;
      }

      default:
        break;
    }
  }, [currentStep, userData, addBotMessage, addUserMessage, addInfoMessage, goToStep, getRecommendation]);

  const handleTextSubmit = useCallback(() => {
    if (!inputValue.trim()) return;
    const val = inputValue.trim();
    setInputValue('');

    if (currentStep === 'capture') {
      if (!userData.name) {
        addUserMessage(val);
        setUserData(prev => ({ ...prev, name: val }));
        setTimeout(() => {
          addBotMessage(`Nice to meet you, ${val}! What's the best phone number to reach you?`);
        }, 500);
      } else if (!userData.phone) {
        addUserMessage(val);
        setUserData(prev => ({ ...prev, phone: val }));
        setTimeout(() => {
          addBotMessage("And your email address? We'll send your quote summary there.");
        }, 500);
      } else if (!userData.email) {
        addUserMessage(val);
        setUserData(prev => ({ ...prev, email: val }));
        goToStep('complete');
        setTimeout(() => {
          addBotMessage(`You're all set, ${userData.name}! Here's what happens next:`);
          setTimeout(() => {
            addInfoMessage("1. A licensed SelectQuote agent will review your profile\n2. They'll shop 30+ carriers for your best rates\n3. You'll get personalized options within 24-48 hours\n4. You choose the winner. No pressure, no obligation.");
          }, 800);
          setTimeout(() => {
            addBotMessage("You've taken a really smart step today. Most families put this off for years, and every year they wait, it gets more expensive. You're ahead of the curve.");
          }, 2500);
          setTimeout(() => {
            addBotMessage("If you want to speed things up, you can also call us directly at 1-855-875-3425. A licensed agent is standing by right now.");
          }, 4000);
        }, 500);
      }
    }
  }, [inputValue, currentStep, userData, addBotMessage, addUserMessage, addInfoMessage, goToStep]);

  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="flex flex-col h-full bg-[#0f172a]">
      {/* Progress Bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">Your Coverage Guide</span>
          <span className="text-xs text-slate-500">Step {stepIndex + 1} of {STEPS.length}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#e8722a] to-[#f5a623] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map(msg => (
          <div key={msg.id}>
            {msg.type === 'bot' && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-lg bg-[#e8722a]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#e8722a] text-xs font-bold">SQ</span>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[85%]">
                  <p className="text-sm text-slate-200 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            )}
            {msg.type === 'user' && (
              <div className="flex justify-end">
                <div className="bg-[#e8722a] rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[80%]">
                  <p className="text-sm text-white">{msg.text}</p>
                </div>
              </div>
            )}
            {msg.type === 'options' && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-lg bg-[#e8722a]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#e8722a] text-xs font-bold">SQ</span>
                </div>
                <div className="max-w-[85%]">
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-md px-4 py-2.5 mb-2">
                    <p className="text-sm text-slate-200 leading-relaxed">{msg.text}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {msg.options?.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => handleOptionSelect(opt.value)}
                        className="px-3 py-1.5 text-xs font-medium bg-slate-800 border border-slate-600 hover:border-[#e8722a] hover:bg-[#e8722a]/10 text-slate-200 rounded-full transition-all cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {msg.type === 'info' && (
              <div className="mx-9 bg-gradient-to-r from-[#e8722a]/10 to-[#f5a623]/10 border border-[#e8722a]/30 rounded-xl px-4 py-3">
                <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{msg.text}</p>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-start">
            <div className="w-7 h-7 rounded-lg bg-[#e8722a]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[#e8722a] text-xs font-bold">SQ</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {currentStep === 'capture' && (
        <div className="px-4 py-3 border-t border-slate-700/50">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTextSubmit()}
              placeholder={!userData.name ? 'Enter your first name...' : !userData.phone ? 'Enter phone number...' : 'Enter email address...'}
              className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#e8722a]"
            />
            <button
              onClick={handleTextSubmit}
              className="bg-[#e8722a] hover:bg-[#d4611f] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      {currentStep !== 'capture' && currentStep !== 'complete' && (
        <div className="px-4 py-2 border-t border-slate-700/50 text-center">
          <p className="text-xs text-slate-500">
            Prefer to talk? Call <a href="tel:1-855-875-3425" className="text-[#e8722a] hover:underline">1-855-875-3425</a>
          </p>
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="px-4 py-3 border-t border-slate-700/50">
          <a
            href="tel:1-855-875-3425"
            className="block w-full bg-[#e8722a] hover:bg-[#d4611f] text-white text-center py-3 rounded-xl text-sm font-bold transition-colors"
          >
            Call Now: 1-855-875-3425
          </a>
        </div>
      )}
    </div>
  );
}
