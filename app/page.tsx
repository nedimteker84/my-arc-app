'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

// Kontratın aktif olduğunda burayı dolduracağız, şimdilik placeholder
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';
const ABI = [{ type: 'function', name: 'gm', inputs: [], outputs: [], stateMutability: 'nonpayable' }];

export default function Home() {
  const { isConnected, address } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [lang, setLang] = useState('TR');

  // İşlem fonksiyonu
  const executeGm = () => {
    if (!isConnected) return;
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: ABI,
      functionName: 'gm',
    });
  };

  return (
    <main style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto', padding: '10px 0' }}>
        <h1 style={{ fontSize: '1.2rem' }}>Arc OnChain</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')} style={{ background: 'transparent', border: '1px solid #333', color: '#888', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>{lang}</button>
          <ConnectButton showBalance={false} chainStatus="none" />
        </div>
      </nav>

      {/* ANA PANEL */}
      <section style={{ maxWidth: '400px', margin: '80px auto', textAlign: 'center' }}>
        {!isConnected ? (
          <div style={{ border: '1px solid #1a1a1a', padding: '40px', borderRadius: '20px', background: '#0a0a0a' }}>
            <p style={{ color: '#666', marginBottom: '20px' }}>{lang === 'TR' ? 'Lütfen cüzdanınızı bağlayın' : 'Please connect your wallet'}</p>
          </div>
        ) : (
          <div style={{ background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
            <p style={{ fontSize: '0.8rem', color: '#444' }}>{address?.slice(0, 6)}...{address?.slice(-4)}</p>
            <h2 style={{ margin: '20px 0' }}>Arc Ritual</h2>
            
            <button 
              onClick={executeGm} 
              disabled={isPending}
              style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', background: isPending ? '#222' : '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
            >
              {isPending ? '...' : 'GM'}
            </button>
            
            <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
              {lang === 'TR' ? 'Sıradaki işlem: 04s 27dk' : 'Next ritual: 04h 27m'}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}