'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';

export default function Home() {
  const { isConnected, address } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [lang, setLang] = useState('EN');

  const handleCheckIn = () => {
    // BURAYA GERÇEK KONTRATININ ADRESİNİ VE ABI'SİNİ YAZMALISIN
    writeContract({
      address: '0x0000000000000000000000000000000000000000',
      abi: [{ type: 'function', name: 'checkIn', inputs: [], outputs: [], stateMutability: 'nonpayable' }],
      functionName: 'checkIn',
    });
  };

  return (
    <main style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Inter' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.2rem' }}>Arc OnChain</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setLang(lang === 'EN' ? 'TR' : 'EN')} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer' }}>{lang}</button>
          <ConnectButton />
        </div>
      </nav>

      <section style={{ maxWidth: '400px', margin: '80px auto', textAlign: 'center', background: '#111', padding: '30px', borderRadius: '20px' }}>
        {!isConnected ? (
          <p>{lang === 'EN' ? 'Please connect your wallet' : 'Lütfen cüzdanınızı bağlayın'}</p>
        ) : (
          <div>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>{address?.slice(0, 8)}...</p>
            <button 
              onClick={handleCheckIn} 
              disabled={isPending}
              style={{ width: '100%', padding: '16px', marginTop: '20px', borderRadius: '12px', border: 'none', background: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {isPending ? 'Processing...' : 'Check-in'}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}