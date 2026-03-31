import { useNavigate } from 'react-router-dom';

export default function SuccessModal({ 
    isOpen, 
    onClose, 
    title = "Transaction Successful", 
    message = "The operation was completed securely on the Stellar network.",
    amount = "0.00", 
    walletAddress = "G...", 
    txHash = "..." 
}) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const truncatedWallet = walletAddress.length > 12 
        ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-5)}`
        : walletAddress;

    const truncatedHash = txHash.length > 12
        ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}`
        : txHash;

    const openExplorer = () => {
        if (txHash && txHash !== "...") {
            window.open(`https://stellar.expert/explorer/testnet/tx/${txHash}`, '_blank');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <div 
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={onClose} 
            />
            
            <div className="relative w-full max-w-md mx-auto z-10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Background decorative element */}
                <div className="absolute -top-12 -right-12 w-64 h-64 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-[16rem]" data-icon="potted_plant">
                        potted_plant
                    </span>
                </div>
                
                {/* Success Content Container */}
                <div className="glass-panel bg-white/95 rounded-[40px] p-8 shadow-[0_20px_60px_rgba(21,66,18,0.12)] flex flex-col items-center text-center relative overflow-hidden border border-surface-container-highest/30">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
                    
                    {/* Glowing Checkmark Icon Section */}
                    <div className="mb-8 relative">
                        <div className="w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(188,240,174,0.6)] animate-pulse">
                            <span
                                className="material-symbols-outlined text-on-primary-fixed text-5xl font-bold"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                                check
                            </span>
                        </div>
                        <span
                            className="material-symbols-outlined absolute -top-2 -right-4 text-tertiary-fixed-dim text-2xl"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                            colors_spark
                        </span>
                        <span
                            className="material-symbols-outlined absolute bottom-0 -left-6 text-secondary-container text-xl"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                            star
                        </span>
                    </div>

                    {/* Heading Section */}
                    <div className="space-y-3 mb-8">
                        <h1 className="font-headline font-extrabold text-3xl text-primary tracking-tight leading-tight">
                            {title}
                        </h1>
                        <p className="text-on-surface-variant font-medium">
                            {message}
                        </p>
                    </div>

                    {/* Transaction Detail Card */}
                    <div className="w-full bg-surface-container-lowest rounded-3xl p-6 space-y-4 mb-10 text-left border border-outline-variant/10 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                                Amount
                            </span>
                            <div className="flex items-center gap-1">
                                <span className="text-xl font-headline font-bold text-primary">
                                    {amount}
                                </span>
                                <span className="text-secondary font-bold text-sm">XLM</span>
                            </div>
                        </div>
                        <div className="h-px bg-outline-variant/20 w-full" />
                        <div className="space-y-1">
                            <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                                Target Wallet
                            </span>
                            <div className="flex items-center gap-2 bg-surface-container rounded-xl p-3 border border-outline-variant/5">
                                <span className="material-symbols-outlined text-secondary text-sm">
                                    account_balance_wallet
                                </span>
                                <span className="text-xs font-mono text-on-surface font-semibold truncate">
                                    {truncatedWallet}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                                Stellar Hash
                            </span>
                            <button 
                                onClick={openExplorer}
                                className="w-full flex justify-between items-center gap-2 bg-surface-container rounded-xl p-3 border border-outline-variant/5 hover:bg-surface-container-high transition-colors text-left"
                            >
                                <span className="text-[10px] font-mono font-semibold text-outline truncate">
                                    {truncatedHash}
                                </span>
                                <span className="material-symbols-outlined text-secondary text-sm">
                                    open_in_new
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col gap-3 relative z-20">
                        <button 
                            onClick={onClose}
                            className="bg-gradient-to-r from-primary to-primary-container w-full py-4 rounded-2xl text-on-primary font-headline font-bold text-lg shadow-[0_10px_30px_rgba(21,66,18,0.15)] hover:opacity-90 active:scale-95 transition-all"
                        >
                            Return to Dashboard
                        </button>
                        <button 
                            onClick={openExplorer}
                            className="w-full py-4 rounded-2xl text-secondary font-semibold hover:bg-secondary-container/10 transition-colors flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">
                                receipt_long
                            </span>
                            View on Stellar Expert
                        </button>
                    </div>
                </div>

                {/* Footer Security Note */}
                <div className="mt-6 flex items-center justify-center gap-2 opacity-80 text-white">
                    <span className="material-symbols-outlined text-sm">
                        verified_user
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest drop-shadow-md">
                        Secured by Stellar Network
                    </span>
                </div>
            </div>
        </div>
    );
}
