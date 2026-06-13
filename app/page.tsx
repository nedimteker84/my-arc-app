'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>Arc OnChain</h1>
        <ConnectButton />
      </header>

      {isConnected ? (
        <section style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px' }}>
          <h2>Arc Testnet</h2>
          <p style={{ color: '#94a3b8' }}>GM Ritual</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
            <button style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}>
              GM on Arc
            </button>
            <button style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#10b981', color: 'white', cursor: 'pointer' }}>
              Deploy on Arc
            </button>
          </div>
          
          <div style={{ marginTop: '30px', textAlign: 'center', color: '#f59e0b' }}>
            <p>Sonraki GM: 04h 27m</p>
          </div>
        </section>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <p>Lütfen devam etmek için cüzdanınızı bağlayın.</p>
        </div>
      )}
    </main>
  );
}