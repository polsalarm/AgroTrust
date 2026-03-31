import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../context/StellarWalletContext';

export default function Registration() {
    const { address, profile, updateProfile } = useContext(WalletContext);
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    const [role, setRole] = useState('Buyer');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [error, setError] = useState('');

    // If profile exists, bounce to dashboard
    useEffect(() => {
        if (profile) {
            navigate('/');
        }
    }, [profile, navigate]);

    // Simple canvas-based image downscaler to fit <64KB
    const resizeImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    // Target max 256x256 for <64KB payload
                    const MAX_WIDTH = 256;
                    const MAX_HEIGHT = 256;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Compress heavily to ensure <64k
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                    resolve(dataUrl);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            setError("Please upload a valid image file.");
            return;
        }

        try {
            const base64Str = await resizeImage(file);
            setAvatarPreview(base64Str);
            setError('');
        } catch (err) {
            setError("Failed to compress image.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !region || !role) {
            setError("Please fill out all fields.");
            return;
        }
        
        if (!address) {
            setError("Please connect your wallet first.");
            return;
        }

        const newProfile = {
            name,
            region,
            role,
            avatar: avatarPreview || null, // Allow no-avatar
            registeredAt: new Date().toISOString()
        };

        updateProfile(newProfile);
        navigate('/');
    };

    if (!address) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <span className="material-symbols-outlined text-6xl text-primary opacity-50">account_balance_wallet</span>
                <p className="font-headline font-bold text-center text-on-surface">Connect your Freighter Wallet to register.</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 max-w-md mx-auto">
            <section className="mb-8">
                <h2 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight">Complete Profile</h2>
                <p className="font-body text-on-surface-variant text-base">Setup your AgroTrust identity to start trading.</p>
            </section>

            {error && <p className="mb-4 text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 font-semibold text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center space-y-3">
                    <div className="relative group w-24 h-24">
                        <div className="w-full h-full rounded-full bg-surface-container-high border-4 border-surface-container-low overflow-hidden flex items-center justify-center relative">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <span className="material-symbols-outlined text-white">photo_camera</span>
                            </div>
                        </div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    <p className="text-xs text-on-surface-variant">Profile Photo (Auto-compressed to 64kb)</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2">Full Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="e.g. Juan Dela Cruz"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2">Primary Role</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Farmer', 'Buyer', 'Arbiter'].map(r => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={`p-3 rounded-xl text-sm font-bold transition-all ${role === r ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2">Region / Province</label>
                        <input 
                            type="text" 
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="w-full p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="e.g. Region IV-A (CALABARZON)"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    className="w-full py-4 mt-8 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
                >
                    Save & Continue
                </button>
            </form>
        </div>
    );
}
