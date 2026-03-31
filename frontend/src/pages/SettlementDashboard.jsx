import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { confirmDelivery, refundEscrow } from '../services/soroban';
import SuccessModal from '../components/SuccessModal';

const MOCK_ESCROWS = [
    {
        id: "STR-8291-KAP-2024",
        buyer: "Manila Grain Co.",
        seller: "Bukidnon Coop",
        amount: "2,450.00",
        wallet: "GAT3...P4ZQ2",
        bgBubble: "bg-primary/5",
        wrapperClass: "",
    },
    {
        id: "STR-1102-PAL-2024",
        buyer: "Central Rice Mill",
        seller: "Davao Farms",
        amount: "12,800.00",
        wallet: "GBX6...F9LMK",
        bgBubble: "bg-secondary/5",
        wrapperClass: "",
    },
    {
        id: "STR-4432-COCO-2024",
        buyer: "Export Direct",
        seller: "Bicol Organics",
        amount: "5,000.00",
        wallet: "GCDF...L9XW7",
        bgBubble: "bg-tertiary/5",
        wrapperClass: "opacity-80 scale-[0.98]",
    }
];

export default function SettlementDashboard() {
    const { address } = useWallet();
    const [submittingId, setSubmittingId] = useState(null);
    const [error, setError] = useState(null);
    
    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleAction = async (escrow, actionType) => {
        if (!address) {
            setError("Please connect Arbiter wallet first.");
            return;
        }

        setSubmittingId(`${escrow.id}-${actionType}`);
        setError(null);
        try {
            let hashObj;
            let title = "";
            let message = "";

            if (actionType === "refund") {
                hashObj = await refundEscrow(address);
                title = "Refund Issued";
                message = `100% of the funds have been reverted back to ${escrow.buyer} successfully.`;
            } else {
                hashObj = await confirmDelivery(address);
                title = "Delivery Confirmed";
                message = `Escrow funds have been securely transferred to the partner farmer, ${escrow.seller}.`;
            }

            const hash = hashObj?.hash || hashObj;
            
            setModalData({
                title,
                message,
                amount: escrow.amount,
                walletAddress: escrow.wallet,
                txHash: typeof hash === 'string' ? hash : "Pending",
            });
            setModalOpen(true);

        } catch (err) {
            console.error(err);
            setError(err.message || "Action failed. Check console.");
        } finally {
            setSubmittingId(null);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 pb-16">
            {/* Hero Editorial Header */}
            <section className="mb-12">
                <div className="flex items-baseline gap-4 mb-2">
                    <h2 className="font-headline font-extrabold text-5xl tracking-tighter text-on-surface">
                        Settlements
                    </h2>
                    <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-lg font-bold">
                        12
                    </span>
                </div>
                <p className="font-body text-on-surface-variant max-w-md leading-relaxed">
                    Arbiter Oversight: Review and settle pending escrows for the current harvest cycle.
                </p>
                {error && <p className="text-red-500 mt-4 font-semibold bg-red-50 p-3 rounded-xl border border-red-200">{error}</p>}
            </section>

            {/* Bento Grid Layout for Transactions */}
            <div className="space-y-6">
                {MOCK_ESCROWS.map((escrow) => (
                    <div 
                        key={escrow.id} 
                        className={`bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-outline-variant/30 relative overflow-hidden group transition-all ${escrow.wrapperClass}`}
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 ${escrow.bgBubble} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed font-bold text-xs mb-6 tracking-widest uppercase shadow-sm">
                                    <span className="material-symbols-outlined text-[14px]">lock</span>
                                    Funded
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                                            Contract ID
                                        </span>
                                        <span className="font-mono text-sm font-semibold">
                                            {escrow.id}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                                                Buyer
                                            </span>
                                            <span className="font-headline font-bold text-lg text-on-surface">
                                                {escrow.buyer}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                                                Seller
                                            </span>
                                            <span className="font-headline font-bold text-lg text-primary">
                                                {escrow.seller}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col justify-between items-end text-right">
                                <div className="mb-4">
                                    <span className="block text-sm text-on-surface-variant font-bold uppercase tracking-wider">
                                        Escrow Balance
                                    </span>
                                    <div className="flex items-center justify-end gap-2 text-secondary font-headline">
                                        <span className="text-4xl font-extrabold">{escrow.amount}</span>
                                        <span className="text-xl font-bold opacity-70 tracking-tight">XLM</span>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 w-full md:w-auto">
                                    <button 
                                        onClick={() => handleAction(escrow, 'refund')}
                                        disabled={submittingId !== null}
                                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all shadow-sm ${
                                            submittingId === `${escrow.id}-refund` 
                                                ? 'bg-outline text-white opacity-50 cursor-not-allowed'
                                                : 'bg-tertiary-container text-on-tertiary-fixed hover:opacity-90 active:scale-95'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined">
                                            {submittingId === `${escrow.id}-refund` ? 'sync' : 'undo'}
                                        </span>
                                        {submittingId === `${escrow.id}-refund` ? '...' : 'Trigger Refund'}
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleAction(escrow, 'confirm')}
                                        disabled={submittingId !== null}
                                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg ${
                                            submittingId === `${escrow.id}-confirm`
                                                ? 'bg-surface-container-highest opacity-70 cursor-not-allowed text-on-surface-variant'
                                                : 'bg-gradient-to-r from-primary to-primary-container text-white hover:opacity-90 active:scale-95'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined">
                                            {submittingId === `${escrow.id}-confirm` ? 'sync' : 'verified'}
                                        </span>
                                        {submittingId === `${escrow.id}-confirm` ? 'Signing...' : 'Confirm Delivery'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reusable Success UI */}
            {modalData && (
                <SuccessModal 
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={modalData.title}
                    message={modalData.message}
                    amount={modalData.amount}
                    walletAddress={modalData.walletAddress}
                    txHash={modalData.txHash}
                />
            )}
        </div>
    );
}
