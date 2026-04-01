import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDetailedIntelligenceReport } from '../services/gemini';

export default function MarketIntelligence() {
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchReport() {
            try {
                const data = await getDetailedIntelligenceReport();
                if (data) setReport(data);
            } catch (error) {
                console.error("Failed to fetch report:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchReport();
    }, []);
    return (
        <div className="min-h-screen bg-[#fbf9f8] pb-32">
            {/* Top Bar (Context-Specific) */}
            <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 bg-[#fbf9f8] z-50 border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <Link to="/" className="material-symbols-outlined text-slate-800 hover:opacity-70 transition-opacity">
                        arrow_back
                    </Link>
                    <h1 className="font-headline font-bold text-xl tracking-tight text-slate-800">
                        Market Intelligence
                    </h1>
                </div>
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-slate-800 cursor-pointer">
                        account_circle
                    </span>
                </div>
            </nav>

            <main className="pt-24 px-6 max-w-lg mx-auto space-y-10">
                {/* Risk Dial Section */}
                <section className="flex flex-col items-center">
                    <div className="relative w-64 h-32 flex flex-col items-center justify-end overflow-hidden">
                        <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 200 100">
                            <defs>
                                <linearGradient id="riskGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                    <stop offset="0%" stopColor="#bcf0ae" />
                                    <stop offset="50%" stopColor="#fcb600" />
                                    <stop offset="100%" stopColor="#ba1a1a" />
                                </linearGradient>
                            </defs>
                            <path 
                                d="M 20 90 A 80 80 0 0 1 180 90" 
                                fill="none" 
                                stroke="#eae8e7" 
                                strokeWidth="12" 
                                strokeLinecap="round" 
                            />
                            <path 
                                d="M 20 90 A 80 80 0 0 1 180 90" 
                                fill="none" 
                                stroke="url(#riskGradient)" 
                                strokeWidth="12" 
                                strokeLinecap="round" 
                                strokeDasharray="251" 
                                strokeDashoffset="120"
                            />
                        </svg>
                        <div className="text-center pb-2">
                            <span className="block font-headline font-black text-3xl text-slate-800 tracking-tighter">
                                STABLE
                            </span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                Market Volatility Index
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 px-5 py-2 rounded-full bg-[#f1f8f1] border border-[#e0ede0]">
                        <p className="text-[11px] font-black text-[#1a4316] uppercase tracking-wide">
                            Low impact from seasonal rain forecast
                        </p>
                    </div>
                </section>

                {/* Gemini Analysis Report */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-[#1a4316] ${isLoading ? 'animate-pulse' : ''}`} style={{ fontVariationSettings: '"FILL" 1' }}>
                            auto_awesome
                        </span>
                        <h2 className="font-headline font-black text-lg text-slate-800">
                            Gemini Intelligence Report
                        </h2>
                    </div>
                    
                    <div className="bg-[#fbfcfa] rounded-2xl border-l-[6px] border-[#1a4316] p-7 shadow-sm editorial-shadow space-y-6 min-h-[200px]">
                        {isLoading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-slate-100 rounded w-full"></div>
                                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                                <div className="h-10 bg-slate-100 rounded w-full mt-6"></div>
                            </div>
                        ) : report ? (
                            <>
                                <div className="text-[14px] text-slate-600 leading-relaxed font-medium">
                                    {report.summary}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-black text-[#1a4316] uppercase tracking-[0.15em]">
                                        Strategic Assessment
                                    </h3>
                                    <ul className="space-y-4">
                                        {report.assessments && report.assessments.map((item, index) => (
                                            <li key={index} className="flex gap-4 items-start group">
                                                <span className="text-[11px] font-black text-[#1a4316] mt-0.5">
                                                    {(index + 1).toString().padStart(2, '0')}.
                                                </span>
                                                <p className="text-sm text-slate-600 leading-snug">
                                                    {item.includes(':') ? item.split(':')[1].trim() : item}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-[#f0f1ef] rounded-xl p-4 font-mono text-[10px] text-slate-500 overflow-x-auto border border-slate-200/50">
                                    <code>{report.logic}</code>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                                    Current supply chain velocity for <span className="text-slate-800 font-black">Upland Rice</span> has 
                                    increased by <span className="text-[#1a4316] font-black">14.2%</span> over the trailing 7-day period. 
                                    This indicates a tightening of available liquidity in local regional hubs.
                                </p>

                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-black text-[#1a4316] uppercase tracking-[0.15em]">
                                        Strategic Assessment
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4 items-start group">
                                            <span className="text-[11px] font-black text-[#1a4316] mt-0.5">01.</span>
                                            <p className="text-sm text-slate-600 leading-snug">
                                                Price ceilings in North Luzon are approaching a resistance level at 
                                                <span className="font-bold text-slate-800"> 42.50 XLM/kg</span>. Expect a mean reversion within 48 hours.
                                            </p>
                                        </li>
                                        <li className="flex gap-4 items-start group">
                                            <span className="text-[11px] font-black text-[#1a4316] mt-0.5">02.</span>
                                            <p className="text-sm text-slate-600 leading-snug">
                                                Escrow finalization rates are peaking, suggesting high trust levels in decentralized settlement layers.
                                            </p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-[#f0f1ef] rounded-xl p-4 font-mono text-[10px] text-slate-500 overflow-x-auto border border-slate-200/50">
                                    <code>EXECUTE_SMART_CONTRACT --asset=UPLAND_RICE --threshold=STABLE --auto_lock=TRUE</code>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Price Velocity Chart */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h2 className="font-headline font-black text-lg text-slate-800 tracking-tight">Price Velocity</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">XLM / Metric Ton (Upland Rice)</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-black text-slate-800 tracking-tighter">312.45</p>
                            <p className="text-[11px] font-black text-[#1a4316] uppercase tracking-widest flex items-center justify-end gap-1">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                +2.4% Today
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 h-64 flex flex-col justify-between">
                        <div className="flex-1 relative mb-4">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 120">
                                {/* Horizontal Grid Lines */}
                                <g className="stroke-slate-100 stroke-[1]">
                                    <line x1="0" x2="320" y1="0" y2="0" />
                                    <line x1="0" x2="320" y1="40" y2="40" />
                                    <line x1="0" x2="320" y1="80" y2="80" />
                                    <line x1="0" x2="320" y1="120" y2="120" />
                                </g>
                                {/* Active Indicator line for the highlight day */}
                                <line x1="320" x2="320" y1="0" y2="120" className="stroke-[#1a4316]/10" strokeDasharray="4 4" />
                                {/* Trend Curve */}
                                <path 
                                    d="M 0 100 C 40 95, 60 70, 80 75 S 120 105, 160 80 S 240 30, 280 45 S 300 20, 320 10" 
                                    fill="none" 
                                    stroke="#1a4316" 
                                    strokeWidth="4" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </div>
                        <div className="grid grid-cols-7 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                            <span className="text-center">Mon</span>
                            <span className="text-center">Tue</span>
                            <span className="text-center">Wed</span>
                            <span className="text-center">Thu</span>
                            <span className="text-center">Fri</span>
                            <span className="text-center">Sat</span>
                            <span className="text-center font-black text-slate-800 border-t-2 border-[#1a4316] pt-1">Sun</span>
                        </div>
                    </div>
                </section>

                {/* Market Actions */}
                <section className="space-y-4 pb-12">
                     <h2 className="font-headline font-black text-lg text-slate-800">Market Actions</h2>
                     <div className="space-y-3">
                        <div className="bg-white p-5 rounded-2xl flex items-center justify-between border border-slate-50 shadow-sm active:scale-[0.98] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#f1f8f1] flex items-center justify-center text-[#1a4316]">
                                    <span className="material-symbols-outlined">lock_clock</span>
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-black text-sm text-slate-800">Lock Price Now</h4>
                                    <p className="text-[11px] text-slate-400 font-bold">Secure current rate before weekend fluctuations.</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl flex items-center justify-between border border-slate-50 shadow-sm active:scale-[0.98] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <span className="material-symbols-outlined">agriculture</span>
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-black text-sm text-slate-800">Wait for Harvest</h4>
                                    <p className="text-[11px] text-slate-400 font-bold">Strategic: Bulk buyers entering pool in 4 days.</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                        </div>
                     </div>
                </section>

                {/* Regional Spotlight imagery card */}
                <section className="mb-8">
                    <div className="relative h-48 rounded-[32px] overflow-hidden group shadow-xl">
                        <img 
                            src="https://images.unsplash.com/photo-1590447158019-883d8d5df707?q=80&w=1974&auto=format&fit=crop" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            alt="Cordillera Rice"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-7 flex flex-col justify-end">
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">Regional Spotlight</span>
                            <h3 className="font-headline font-black text-2xl text-white tracking-tight">Cordillera Rice Pool</h3>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="material-symbols-outlined text-green-400 text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                                <span className="text-[11px] font-black text-white/90 uppercase tracking-widest">98.4% On-Time Delivery</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
