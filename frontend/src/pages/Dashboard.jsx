import { useWallet } from '../hooks/useWallet';

export default function Dashboard() {
    const { balance } = useWallet();

    return (
        <div className="space-y-8 bg-organic-texture">
            {/* Balance Section (Hero Card) */}
            <section className="relative overflow-hidden bg-primary rounded-[32px] p-8 text-on-primary shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-20 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="font-label text-xs uppercase tracking-[0.2em] opacity-80 mb-1">
                                Available Balance
                            </p>
                            <h2 className="font-headline text-5xl font-extrabold tracking-tighter">
                                {balance}{" "}
                                <span className="text-2xl font-medium opacity-70">XLM</span>
                            </h2>
                        </div>
                        <div className="bg-primary-container p-3 rounded-2xl">
                            <span
                                className="material-symbols-outlined text-primary-fixed"
                                data-icon="show_chart"
                            >
                                show_chart
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-black/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-secondary-container" />
                        <span className="text-xs font-medium uppercase tracking-wider">
                            Stellar Testnet Active
                        </span>
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none p-4">
                    <span
                        className="material-symbols-outlined text-9xl"
                        data-icon="potted_plant"
                    >
                        potted_plant
                    </span>
                </div>
            </section>
            {/* User Roles: Entry Points */}
            <section className="space-y-4">
                <h3 className="font-headline text-xl font-bold px-1">
                    Select Your Portal
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {/* Buyer */}
                    <button className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-on-secondary-container">
                                <span
                                    className="material-symbols-outlined text-3xl"
                                    data-icon="shopping_basket"
                                >
                                    shopping_basket
                                </span>
                            </div>
                            <div className="text-left">
                                <span className="block font-headline font-bold text-lg">
                                    Metro Manila Buyer
                                </span>
                                <span className="text-sm text-on-surface-variant">
                                    Procure fresh harvests
                                </span>
                            </div>
                        </div>
                        <span
                            className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform"
                            data-icon="chevron_right"
                        >
                            chevron_right
                        </span>
                    </button>
                    {/* Farmer */}
                    <button className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all group border-l-4 border-primary">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                                <span
                                    className="material-symbols-outlined text-3xl"
                                    data-icon="agriculture"
                                >
                                    agriculture
                                </span>
                            </div>
                            <div className="text-left">
                                <span className="block font-headline font-bold text-lg">
                                    Provincial Farmer
                                </span>
                                <span className="text-sm text-on-surface-variant">
                                    Manage crop escrows
                                </span>
                            </div>
                        </div>
                        <span
                            className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform"
                            data-icon="chevron_right"
                        >
                            chevron_right
                        </span>
                    </button>
                    {/* Arbiter */}
                    <button className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                                <span
                                    className="material-symbols-outlined text-3xl"
                                    data-icon="gavel"
                                >
                                    gavel
                                </span>
                            </div>
                            <div className="text-left">
                                <span className="block font-headline font-bold text-lg">
                                    Arbiter Co-op
                                </span>
                                <span className="text-sm text-on-surface-variant">
                                    Validate trade disputes
                                </span>
                            </div>
                        </div>
                        <span
                            className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform"
                            data-icon="chevron_right"
                        >
                            chevron_right
                        </span>
                    </button>
                </div>
            </section>
            {/* Active Escrow Contracts */}
            <section className="space-y-4">
                <div className="flex justify-between items-end px-1">
                    <h3 className="font-headline text-xl font-bold text-on-surface">
                        Active Escrows
                    </h3>
                    <span className="text-secondary font-semibold text-sm">View All</span>
                </div>
                <div className="space-y-3">
                    {/* Contract 1 */}
                    <div className="p-5 bg-surface-container-low rounded-[24px] space-y-4 border border-outline-variant/10">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                    <span
                                        className="material-symbols-outlined text-xl"
                                        data-icon="grain"
                                    >
                                        grain
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-on-surface leading-tight">
                                        Upland Rice Batch #42
                                    </h4>
                                    <p className="text-[11px] text-on-surface-variant uppercase tracking-tighter">
                                        Contract: G...8X9K
                                    </p>
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase">
                                Secured
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <div className="text-sm font-semibold">500.00 XLM</div>
                            <div className="text-[11px] text-on-surface-variant italic">
                                Awaiting shipment confirmation
                            </div>
                        </div>
                    </div>
                    {/* Contract 2 */}
                    <div className="p-5 bg-surface-container-low rounded-[24px] space-y-4 border border-outline-variant/10">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-tertiary shadow-sm">
                                    <span
                                        className="material-symbols-outlined text-xl"
                                        data-icon="local_shipping"
                                    >
                                        local_shipping
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-on-surface leading-tight">
                                        Benguet Arabica Beans
                                    </h4>
                                    <p className="text-[11px] text-on-surface-variant uppercase tracking-tighter">
                                        Contract: G...3Z1A
                                    </p>
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-fixed text-[10px] font-bold uppercase">
                                Pending
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <div className="text-sm font-semibold">250.00 XLM</div>
                            <div className="text-[11px] text-on-surface-variant italic">
                                Payment verification in progress
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Insights Bento Grid */}
            <section className="grid grid-cols-2 gap-4">
                <div className="col-span-1 bg-secondary-container/10 p-5 rounded-[24px] flex flex-col justify-between aspect-square">
                    <span
                        className="material-symbols-outlined text-secondary"
                        data-icon="verified"
                    >
                        verified
                    </span>
                    <div>
                        <span className="block text-2xl font-bold text-on-secondary-container leading-none">
                            12
                        </span>
                        <span className="text-xs text-on-secondary-container/80">
                            Completed Trades
                        </span>
                    </div>
                </div>
                <div className="col-span-1 bg-surface-container-highest p-5 rounded-[24px] flex flex-col justify-between aspect-square">
                    <span
                        className="material-symbols-outlined text-on-surface-variant"
                        data-icon="history_edu"
                    >
                        history_edu
                    </span>
                    <div>
                        <span className="block text-2xl font-bold text-on-surface leading-none">
                            99.8%
                        </span>
                        <span className="text-xs text-on-surface-variant">Trust Score</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
