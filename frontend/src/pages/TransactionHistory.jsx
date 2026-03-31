export default function TransactionHistory() {
    return (
        <div className="space-y-4">
            {/* Search & Filter Section */}
            <section className="mb-8">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-outline">search</span>
                    </div>
                    <input
                        className="w-full h-14 pl-12 pr-4 bg-surface-container-high rounded-xl border-none focus:ring-2 focus:ring-secondary transition-all font-medium text-on-surface placeholder:text-on-surface-variant/50"
                        placeholder="Search name or contract ID..."
                        type="text"
                    />
                </div>
                {/* Quick Filters (Asymmetric Layout) */}
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    <button className="px-5 py-2.5 bg-primary text-on-primary rounded-full font-label text-sm font-semibold whitespace-nowrap active:scale-95 duration-200">
                        All Activity
                    </button>
                    <button className="px-5 py-2.5 bg-surface-container-lowest text-on-surface-variant rounded-full font-label text-sm font-semibold whitespace-nowrap active:scale-95 duration-200">
                        Pending
                    </button>
                    <button className="px-5 py-2.5 bg-surface-container-lowest text-on-surface-variant rounded-full font-label text-sm font-semibold whitespace-nowrap active:scale-95 duration-200">
                        Settled
                    </button>
                    <button className="px-5 py-2.5 bg-surface-container-lowest text-on-surface-variant rounded-full font-label text-sm font-semibold whitespace-nowrap active:scale-95 duration-200">
                        Refunds
                    </button>
                </div>
            </section>

            {/* Date Header */}
            <h2 className="font-headline font-extrabold text-sm tracking-[0.2em] uppercase text-on-surface-variant/60 ml-1 mb-2">
                Today, Oct 24
            </h2>
            {/* Transaction Card 1: Settled */}
            <div className="bg-surface-container-lowest p-5 rounded-xl transition-all shadow-[0_10px_30px_rgba(21,66,18,0.03)] group border border-transparent hover:border-outline-variant/20">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
                            <span
                                className="material-symbols-outlined text-on-primary-fixed"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                agriculture
                            </span>
                        </div>
                        <div>
                            <p className="font-headline text-lg font-bold text-on-surface">
                                Elena Rodriguez
                            </p>
                            <p className="font-body text-xs text-on-surface-variant">
                                Contract: #TRAD-88219
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-headline text-lg font-bold text-primary">
                            450.00 XLM
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-fixed text-on-primary-fixed">
                            Settled
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-surface-container">
                    <button className="flex items-center gap-2 text-secondary font-label text-xs font-bold hover:underline">
                        <span className="material-symbols-outlined text-sm">
                            visibility
                        </span>
                        VIEW DETAILS
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant font-label text-[10px] bg-surface-container-low px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
                        TX: b6f2...9a1e
                        <span className="material-symbols-outlined text-xs">
                            open_in_new
                        </span>
                    </button>
                </div>
            </div>
            {/* Transaction Card 2: Pending (Bento Style Variation) */}
            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_10px_30px_rgba(21,66,18,0.03)] border border-transparent">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
                            <span
                                className="material-symbols-outlined text-on-tertiary-fixed"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                local_shipping
                            </span>
                        </div>
                        <div>
                            <p className="font-headline text-lg font-bold text-on-surface">
                                AgriCorp Southern
                            </p>
                            <p className="font-body text-xs text-on-surface-variant">
                                Contract: #TRAD-88224
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-headline text-lg font-bold text-tertiary">
                            1,200.00 XLM
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container text-on-tertiary-fixed">
                            In Escrow
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-surface-container">
                    <button className="flex items-center gap-2 text-secondary font-label text-xs font-bold hover:underline">
                        <span className="material-symbols-outlined text-sm">
                            assignment
                        </span>
                        RELEASE FUNDS
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant font-label text-[10px] bg-surface-container-low px-3 py-1.5 rounded-lg">
                        TX: 4d2e...a8c1
                        <span className="material-symbols-outlined text-xs">
                            open_in_new
                        </span>
                    </button>
                </div>
            </div>
            {/* Date Header */}
            <h2 className="font-headline font-extrabold text-sm tracking-[0.2em] uppercase text-on-surface-variant/60 ml-1 mb-2 mt-8">
                Oct 22, 2023
            </h2>
            {/* Transaction Card 3: Refunded */}
            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_10px_30px_rgba(21,66,18,0.03)]">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                            <span
                                className="material-symbols-outlined text-outline"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                person
                            </span>
                        </div>
                        <div>
                            <p className="font-headline text-lg font-bold text-on-surface">
                                Mateo Santos
                            </p>
                            <p className="font-body text-xs text-on-surface-variant">
                                Contract: #TRAD-88152
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-headline text-lg font-bold text-on-surface-variant">
                            325.50 XLM
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-error-container text-on-error-container">
                            Refunded
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-surface-container">
                    <button className="flex items-center gap-2 text-secondary font-label text-xs font-bold hover:underline">
                        <span className="material-symbols-outlined text-sm">history</span>
                        VIEW REASON
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant font-label text-[10px] bg-surface-container-low px-3 py-1.5 rounded-lg">
                        TX: a1b2...f3g4
                        <span className="material-symbols-outlined text-xs">
                            open_in_new
                        </span>
                    </button>
                </div>
            </div>
            {/* Aesthetic Interstitial: Promotional/Info Bento */}
            <div className="relative overflow-hidden bg-primary-container p-6 rounded-2xl my-8">
                <div className="relative z-10 max-w-[70%]">
                    <h3 className="font-headline text-xl font-extrabold text-on-primary-container leading-tight mb-2">
                        Sustainable Farming Rewards
                    </h3>
                    <p className="font-body text-sm text-on-primary-container/80 mb-4">
                        Complete 5 more trades to earn a 'Green Grower' badge and reduced
                        fees.
                    </p>
                    <button className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-xl font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform">
                        Learn More
                    </button>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
                    <span className="material-symbols-outlined text-[140px] text-primary-fixed">
                        potted_plant
                    </span>
                </div>
            </div>
            {/* Transaction Card 4: Cancelled */}
            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_10px_30px_rgba(21,66,18,0.03)]">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                            <span
                                className="material-symbols-outlined text-on-surface-variant"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                block
                            </span>
                        </div>
                        <div>
                            <p className="font-headline text-lg font-bold text-on-surface">
                                Cavite Rice Co-op
                            </p>
                            <p className="font-body text-xs text-on-surface-variant">
                                Contract: #TRAD-88110
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-headline text-lg font-bold text-on-surface-variant/40 line-through">
                            890.00 XLM
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">
                            Cancelled
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-surface-container opacity-60">
                    <button className="flex items-center gap-2 text-on-surface-variant font-label text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">info</span>
                        CANCELLED BY BUYER
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant font-label text-[10px] bg-surface-container-low px-3 py-1.5 rounded-lg">
                        TX: e9d8...c3b2
                        <span className="material-symbols-outlined text-xs">
                            open_in_new
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
