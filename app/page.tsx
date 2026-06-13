'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useBalance } from 'wagmi';
import { useState } from 'react';

export default function Home() {
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { writeContract, isPending } = useWriteContract();

  return (
    <main style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'system-ui' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.2rem' }}>Arc OnChain</h1>
        <ConnectButton showBalance={false} />
      </nav>

      {isConnected && (
        <section style={{ maxWidth: '400px', margin: '50px auto', background: '#111', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{address}</p>
          <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>{balance?.formatted.slice(0, 6)} {balance?.symbol}</h2>
          
          <button 
            onClick={() => writeContract({ 
              address: '0x5042002...', // Kontrat adresini buraya gir
              abi: [{ name: 'gm', type: 'function', stateMutability: 'nonpayable', inputs: [] }], 
              functionName: 'gm' 
            })}
            disabled={isPending}
            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isPending ? 'Onay bekleniyor...' : 'GM'}
          </button>
        </section>
      )}
    </main>
  );
}