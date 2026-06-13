'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useState } from 'react';

export default function Home() {
  const { isConnected } = useAccount();
  const [lang, setLang] = useState('TR');

  const handleAction = (action: string) => {
    alert(`${action} işlemine tıklandı!`);
  };

  return (
    <main style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>Arc OnChain</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')} style={{ padding: '5px 10px', cursor: 'pointer' }}>{lang}</button>
          <ConnectButton />
        </div>
      </header>

      {isConnected ? (
        <section style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px' }}>
          <h2>Arc Testnet</h2>
          <p style={{ color: '#94a3b8' }}>GM Ritual</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
            <button onClick={() => handleAction('GM')} style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}>
              GM on Arc
            </button>
            <button onClick={() => handleAction('Deploy')} style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#10b981', color: 'white', cursor: 'pointer' }}>
              Deploy on Arc
            </button>
          </div>
          <p style={{ marginTop: '30px', textAlign: 'center', color: '#f59e0b' }}>Sonraki GM: 04h 27m</p>
        </section>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>Lütfen cüzdanınızı bağlayın.</div>
      )}
    </main>
  );
}