import { useWallet } from '../hooks/useWallet';

export default function UserProfile() {
    const { address, disconnect, profile, balance } = useWallet();

    const truncatedAddress = address 
        ? `${address.slice(0, 4)}...${address.slice(-4)}`
        : "Not Connected";

    return (
        <div className="space-y-6">
            {/* Profile Header Section */}
            <section className="flex items-center space-x-5 py-4">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden editorial-shadow border-4 border-surface-container-lowest bg-surface-container-highest flex items-center justify-center">
                        {profile?.avatar ? (
                            <img
                                alt={profile.name}
                                className="w-full h-full object-cover"
                                src={profile.avatar}
                            />
                        ) : address ? (
                            <img
                                alt="Default Avatar"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6QmDJAV8NDHJtjXp5oXzZ5rknOxcQUK-JBVrTk1lYQyx500CychpnCPs2lIeaxkQYi_DdeN0bJPhR_Q0_ebnBxevFCC77kTFg3nSg2-ImX8phFpusm4r8IxubGCzHD1ZRqXGBpoZGg8WgxavHT0_FOKfrXV5tg9kU7VKnbaRmb13VCJs85bbXKUCWS_yZqAlxoV1PPZAKPjiUygc-xSKxwmy5-W3TqEs1OQNNI6TSIAqJgqml85BOo7mYtj590m7P1HhJu6T2mag"
                            />
                        ) : (
                            <span className="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
                        )}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full border-2 border-surface">
                        <span
                            className="material-symbols-outlined text-[14px] text-white"
                            style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                            verified
                        </span>
                    </div>
                </div>
                <div className="space-y-1">
                    <h2 className="font-headline font-bold text-2xl tracking-tight text-on-surface">
                        {profile?.name || (address ? "Guest User" : "Guest User")}
                    </h2>
                    <p className="font-body text-sm font-semibold text-primary uppercase tracking-wide">
                        {profile?.role || (address ? "Unverified" : "Unverified")}
                    </p>
                    {profile?.region && (
                        <div className="flex items-center text-on-surface-variant text-xs">
                            <span
                                className="material-symbols-outlined text-sm mr-1"
                                data-icon="location_on"
                            >
                                location_on
                            </span>
                            {profile.region}
                        </div>
                    )}
                </div>
            </section>
            
            {/* Stats Row: Bento Style */}
            <section className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-5 rounded-xl space-y-2">
                    <span
                        className="material-symbols-outlined text-primary"
                        data-icon="handshake"
                        style={{ fontVariationSettings: '"FILL" 0' }}
                    >
                        handshake
                    </span>
                    <div>
                        <p className="text-[32px] font-headline font-extrabold text-on-surface leading-none">
                            12
                        </p>
                        <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                            Completed Trades
                        </p>
                    </div>
                </div>
                <div className="bg-surface-container-low p-5 rounded-xl space-y-2">
                    <span
                        className="material-symbols-outlined text-tertiary-container"
                        data-icon="star"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                        star
                    </span>
                    <div>
                        <p className="text-[32px] font-headline font-extrabold text-on-surface leading-none">
                            99.8%
                        </p>
                        <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                            Trust Score
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Wallet Card: Glassmorphic Editorial Style */}
            <section className="relative overflow-hidden bg-gradient-to-br from-secondary to-on-secondary-fixed-variant p-6 rounded-[32px] text-white editorial-shadow">
                {/* Decorative watermark */}
                <div className="absolute -right-8 -top-8 opacity-10">
                    <span
                        className="material-symbols-outlined text-[160px]"
                        data-icon="agriculture"
                    >
                        agriculture
                    </span>
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-xs font-medium opacity-80 uppercase tracking-widest">
                                Freighter Wallet
                            </p>
                            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                                <div className={`w-2 h-2 ${address ? 'bg-secondary-fixed animate-pulse' : 'bg-outline'} rounded-full`} />
                                <span className="text-[10px] font-bold tracking-tighter">
                                    {address ? 'CONNECTED' : 'DISCONNECTED'}
                                </span>
                            </div>
                        </div>
                        <span
                            className="material-symbols-outlined opacity-80"
                            data-icon="token"
                        >
                            token
                        </span>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-xs opacity-60">Total Balance</p>
                        <p className="text-4xl font-headline font-extrabold tracking-tight">
                            {balance} <span className="text-lg font-medium opacity-80">XLM</span>
                        </p>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <code className="text-[10px] tracking-widest opacity-80">{truncatedAddress}</code>
                        <button className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider backdrop-blur-md">
                            VIEW ASSETS
                        </button>
                    </div>
                </div>
            </section>
            
            {/* Settings List */}
            <section className="space-y-2">
                <h3 className="font-headline font-bold text-lg px-2 text-on-surface">
                    Account Settings
                </h3>
                <div className="bg-surface-container-lowest rounded-[24px] overflow-hidden editorial-shadow">
                    {/* Group 1 */}
                    <div className="divide-y divide-outline-variant/10">
                        <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <span
                                        className="material-symbols-outlined"
                                        data-icon="person_edit"
                                    >
                                        person_edit
                                    </span>
                                </div>
                                <span className="font-medium text-on-surface">Edit Profile</span>
                            </div>
                            <span
                                className="material-symbols-outlined text-outline"
                                data-icon="chevron_right"
                            >
                                chevron_right
                            </span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <span
                                        className="material-symbols-outlined"
                                        data-icon="security"
                                    >
                                        security
                                    </span>
                                </div>
                                <span className="font-medium text-on-surface">
                                    Security &amp; PIN
                                </span>
                            </div>
                            <span
                                className="material-symbols-outlined text-outline"
                                data-icon="chevron_right"
                            >
                                chevron_right
                            </span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <span
                                        className="material-symbols-outlined"
                                        data-icon="notifications"
                                    >
                                        notifications
                                    </span>
                                </div>
                                <span className="font-medium text-on-surface">
                                    Notification Settings
                                </span>
                            </div>
                            <span
                                className="material-symbols-outlined text-outline"
                                data-icon="chevron_right"
                            >
                                chevron_right
                            </span>
                        </button>
                        <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <span
                                        className="material-symbols-outlined"
                                        data-icon="language"
                                    >
                                        language
                                    </span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-medium text-on-surface">Language</span>
                                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">
                                        English / Tagalog
                                    </span>
                                </div>
                            </div>
                            <span
                                className="material-symbols-outlined text-outline"
                                data-icon="chevron_right"
                            >
                                chevron_right
                            </span>
                        </button>
                    </div>
                    {/* Support Section */}
                    <div className="border-t-8 border-surface-container-low divide-y divide-outline-variant/10">
                        <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <span
                                        className="material-symbols-outlined"
                                        data-icon="help_center"
                                    >
                                        help_center
                                    </span>
                                </div>
                                <span className="font-medium text-on-surface">Help Center</span>
                            </div>
                            <span
                                className="material-symbols-outlined text-outline"
                                data-icon="chevron_right"
                            >
                                chevron_right
                            </span>
                        </button>
                        {address && (
                            <button 
                                onClick={disconnect}
                                className="w-full flex items-center justify-between p-5 hover:bg-error/5 transition-colors group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center text-error">
                                        <span className="material-symbols-outlined" data-icon="logout">
                                            logout
                                        </span>
                                    </div>
                                    <span className="font-medium text-error">Sign Out</span>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
