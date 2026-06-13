'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

// Basit bir örnek akıllı sözleşme ABI'si (kendi kontratına göre güncelleyebilirsin)
const contractAddress = '0x0000000000000000000000000000000000000000';
const abi = [{ type: 'function', name: 'gm', inputs: [], outputs: [], stateMutability: 'nonpayable' }];

export default function Home() {
  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  const handleGm = () => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi,
      functionName: 'gm',
    });
  };

  return (
    <main style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>Arc OnChain</h1>
        <ConnectButton label="Cüzdanı Bağla" />
      </header>

      {isConnected ? (
        <section style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '16px' }}>
          <h2>Arc Testnet</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
            <button onClick={handleGm} style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}>GM on Arc</button>
            <button style={{ padding: '15px', borderRadius: '8px', border: 'none', backgroundColor: '#10b981', color: 'white', cursor: 'pointer' }}>Deploy</button>
          </div>
        </section>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>Bağlanmak için yukarıdaki butonu kullanın.</div>
      )}
    </main>
  );
}