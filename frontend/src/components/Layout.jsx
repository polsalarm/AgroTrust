import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { useEffect } from 'react';

export default function Layout() {
    const { address, connect, disconnect, isConnecting, hasFreighter, profile } = useWallet();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Enforce registration if wallet connected but no profile exists
        if (address && profile === null && location.pathname !== '/register') {
            navigate('/register');
        }
    }, [address, profile, location.pathname, navigate]);

    return (
        <>
            <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-opacity-90 backdrop-blur-md bg-[#fbf9f8] dark:bg-stone-950 z-50">
                <Link to="/" className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#154212] dark:text-[#bcf0ae] text-2xl" data-icon="eco">eco</span>
                    <h1 className="font-headline font-bold text-2xl tracking-tight text-[#154212] dark:text-[#bcf0ae]">
                        AgroTrust
                    </h1>
                </Link>
                {address ? (
                    <button 
                        onClick={disconnect}
                        className="bg-surface-container-high text-on-surface px-4 py-2 rounded-xl font-semibold text-sm hover:opacity-80 transition-opacity editorial-shadow"
                    >
                        {address.slice(0,4)}...{address.slice(-4)}
                    </button>
                ) : !hasFreighter ? (
                    <a 
                        href="https://www.freighter.app/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-primary text-on-primary px-5 py-2 rounded-xl font-semibold text-sm hover:opacity-80 transition-opacity editorial-shadow"
                    >
                        Install Freighter
                    </a>
                ) : (
                    <button 
                        onClick={connect}
                        disabled={isConnecting}
                        className="bg-secondary text-on-secondary px-5 py-2 rounded-xl font-semibold text-sm hover:opacity-80 transition-opacity active:scale-95 duration-200 ease-out editorial-shadow"
                    >
                        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                )}
            </header>

            <main className="pt-24 pb-24 px-6 max-w-2xl mx-auto">
                <Outlet />
            </main>

            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-[#ffffff] dark:bg-stone-900 border-t border-[#c2c9bb]/20 shadow-[0_-10px_30px_rgba(21,66,18,0.05)] rounded-t-[32px]">
                <NavButton to="/" icon="home_max" label="Home" current={location.pathname} />
                <NavButton to="/contract" icon="gavel" label="Contract" current={location.pathname} />
                <NavButton to="/history" icon="history" label="History" current={location.pathname} />
                <NavButton to="/profile" icon="person" label="Profile" current={location.pathname} />
            </nav>
        </>
    );
}

function NavButton({ to, icon, label, current }) {
    const isActive = current === to || (to !== '/' && current.startsWith(to));
    return (
        <Link 
            to={to}
            className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all active:scale-90 duration-150 ${
                isActive ? 'bg-[#bcf0ae] dark:bg-[#154212] text-[#002201] dark:text-[#bcf0ae]' : 'text-[#42493e] dark:text-[#c2c9bb] opacity-60 hover:bg-[#f6f3f2] dark:hover:bg-stone-800'
            }`}
        >
            <span 
                className="material-symbols-outlined" 
                data-icon={icon}
                style={isActive ? { fontVariationSettings: '"FILL" 1' } : {}}
            >
                {icon}
            </span>
            <span className="font-body font-medium text-[11px] uppercase tracking-widest mt-1">
                {label}
            </span>
        </Link>
    );
}
