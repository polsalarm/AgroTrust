import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { depositEscrow } from '../services/soroban';
import SuccessModal from '../components/SuccessModal';

const MOCK_FARMERS = [
    { id: '1', name: 'Davao Farms', address: 'GBDIEFY6YZI3GXYQFZHSRHVSWPILOK2G5YQBDXORY3VKSCU74T2OSQCQ', region: 'Region XI' },
    { id: '2', name: 'Bukidnon Coop', address: 'GAJE423JXMPYVCOMOGJ3BCWWNNHWRS2ULZ2LBXLAU3FLCVCVL7GVR24Y', region: 'Region X' },
    { id: '3', name: 'Bicol Organics', address: 'GCF4N2ZDIGVYGSXUT7XCUBR3WHPT2FYTIADXUODQZ57MOWX6USIEW2CY', region: 'Region V' },
];

export default function InitiateContract() {
    const { address } = useWallet();
    const [amount, setAmount] = useState('');
    const [selectedFarmerId, setSelectedFarmerId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    
    // Success Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [txHash, setTxHash] = useState(null);

    const handleDeposit = async () => {
        if (!address) {
            setError("Please connect your wallet first.");
            return;
        }
        if (!selectedFarmerId) {
            setError("Please select a provincial farmer to deposit to.");
            return;
        }
        if (!amount || Number(amount) <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        try {
            const hashObj = await depositEscrow(address, selectedFarmer.address, amount);
            
            setTxHash(hashObj?.hash || hashObj); 
            setModalOpen(true);
            setAmount('');
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong locking funds.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedFarmer = MOCK_FARMERS.find(f => f.id === selectedFarmerId);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <section className="mb-10">
                <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight mb-2">
                    Initiate Contract
                </h2>
                <p className="font-body text-on-surface-variant text-lg">
                    Secure your produce by locking XLM in a Soroban escrow.
                </p>
                {error && <p className="text-red-500 mt-4 font-semibold bg-red-50 p-3 rounded-xl border border-red-200">{error}</p>}
            </section>

            {/* Form Canvas */}
            <div className="space-y-8">
                {/* Searchable Farmer List */}
                <div className="space-y-3">
                    <label className="font-headline font-bold text-sm uppercase tracking-wider text-on-surface-variant ml-1">
                        Select Provincial Farmer
                    </label>
                    <div className="grid gap-3">
                        {MOCK_FARMERS.map(farmer => (
                            <div 
                                key={farmer.id}
                                onClick={() => setSelectedFarmerId(farmer.id)}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer shadow-sm ${
                                    selectedFarmerId === farmer.id 
                                    ? 'border-primary bg-primary/5 shadow-primary/10' 
                                    : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/50'
                                }`}
                            >
                                <div className="flex flex-col">
                                    <span className="font-headline font-bold text-on-surface">{farmer.name}</span>
                                    <span className="text-xs text-on-surface-variant font-medium">📍 {farmer.region}</span>
                                </div>
                                <div className="bg-surface-container p-2 rounded-lg text-xs font-mono font-bold text-on-surface-variant">
                                    {farmer.address}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* XLM Deposit Amount */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end ml-1">
                        <label className="font-headline font-bold text-sm uppercase tracking-wider text-on-surface-variant">
                            XLM Amount
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            className="w-full p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-headline font-bold text-3xl text-on-surface outline-none"
                            placeholder="1000"
                            step="1"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-lg font-bold">
                            XLM
                        </div>
                    </div>
                </div>

                {/* Deposit Summary Card */}
                <div className="bg-surface-container-low p-6 rounded-[2rem] space-y-4 shadow-sm border border-outline-variant/10">
                    <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant text-sm font-medium">Network Fee</span>
                        <span className="text-on-surface font-mono text-sm font-bold">~0.0001 XLM</span>
                    </div>
                    <div className="h-[1px] bg-outline-variant opacity-20" />
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-on-surface text-lg">Total Commitment</span>
                        <span className="font-headline font-extrabold text-2xl text-primary">
                            {amount || '0.00'} XLM
                        </span>
                    </div>
                </div>

                {/* Main CTA */}
                <button 
                    onClick={handleDeposit}
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-2xl font-headline font-bold text-lg shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${
                        isSubmitting ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-70' : 'bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-primary/20 hover:opacity-90'
                    }`}
                >
                    <span className="material-symbols-outlined">{isSubmitting ? 'sync' : 'lock'}</span>
                    {isSubmitting ? 'Awaiting Wallet Signature...' : 'Lock XLM & Deposit'}
                </button>
            </div>

            {/* Reusable Success UI */}
            <SuccessModal 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="XLM Locked in Escrow"
                message={`Your deposit has been securely stored in the smart contract, awaiting delivery verification from ${selectedFarmer?.name}.`}
                amount={amount || "0.00"}
                walletAddress={selectedFarmer?.address || "G..."}
                txHash={txHash || "Pending"}
            />
        </div>
    );
}
