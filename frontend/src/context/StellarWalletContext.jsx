import { createContext, useState, useEffect } from 'react';
import { isAllowed, setAllowed, requestAccess, getAddress, isConnected } from '@stellar/freighter-api';
import { getNativeBalance } from '../services/soroban';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [address, setAddress] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [hasFreighter, setHasFreighter] = useState(true);
    
    // Global User state
    const [balance, setBalance] = useState("0.00");
    const [profile, setProfile] = useState(undefined); // undefined = loading, null = missing

    // Initial load connection check
    useEffect(() => {
        const checkConnection = async () => {
            try {
                const connected = await isConnected();
                setHasFreighter(connected);
                
                if (connected && await isAllowed()) {
                    const result = await getAddress();
                    if (result?.address) {
                        setAddress(result.address);
                    }
                }
            } catch (e) {
                console.error("Failed to restore wallet session", e);
            }
        };
        checkConnection();
    }, []);

    // Watch for address changes: fetch profile and balance
    useEffect(() => {
        if (address) {
            // Load LocalStorage profile
            const savedProfileStr = localStorage.getItem(`agrotrust_user_${address}`);
            if (savedProfileStr) {
                try {
                    setProfile(JSON.parse(savedProfileStr));
                } catch (e) {
                    console.error("Error parsing local profile", e);
                }
            } else {
                setProfile(null);
            }

            // Fetch Live Balance
            getNativeBalance(address).then(bal => setBalance(bal)).catch(console.error);
        } else {
            setProfile(null);
            setBalance("0.00");
        }
    }, [address]);

    const connect = async () => {
        setIsConnecting(true);
        setError(null);
        try {
            const connected = await isConnected();
            if (!connected) {
                setHasFreighter(false);
                throw new Error("Freighter wallet is not installed.");
            }

            await setAllowed();
            const accessResult = await requestAccess();
            let publicKey = accessResult?.address ?? accessResult;

            if (!publicKey || typeof publicKey !== 'string') {
                const addressResult = await getAddress();
                publicKey = addressResult?.address;
            }

            if (!publicKey || typeof publicKey !== 'string') {
                throw new Error('Could not retrieve public key from Freighter.');
            }

            setAddress(publicKey);
        } catch (e) {
            console.error('Failed to connect wallet', e);
            setError(e.message ?? 'Wallet connection failed.');
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnect = () => {
        setAddress(null);
        setError(null);
        setProfile(null);
        setBalance("0.00");
    };

    const updateProfile = (newProfile) => {
        if (address) {
            localStorage.setItem(`agrotrust_user_${address}`, JSON.stringify(newProfile));
            setProfile(newProfile);
        }
    };

    return (
        <WalletContext.Provider value={{ 
            address, connect, disconnect, isConnecting, error, 
            hasFreighter, balance, profile, updateProfile 
        }}>
            {children}
        </WalletContext.Provider>
    );
};