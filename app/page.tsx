'use client';

import { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';

const CONTRACT_ADDRESS = '0x7179047321526685d3b294f31527027581699990' as `0x${string}`;

export default function Home() {
  const [lang, setLang] = useState('TR');
  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract();

  const handleCheckIn = () => {
    if (!isConnected) {
      alert(lang === 'TR' ? 'Lütfen önce cüzdanınızı bağlayın.' : 'Please connect your wallet first.');
      return;
    }
    
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: [{ name: 'checkIn', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] }],
      functionName: 'checkIn',
    });
  };

  return (
    <main style={{ background: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <button onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')} style={{ position: 'absolute', top: 20, right: 20, padding: '5px 15px', cursor: 'pointer' }}>
        {lang}
      </button>

      <h1>Arc OnChain</h1>
      
      <button 
        onClick={handleCheckIn}
        style={{ padding: '20px 40px', fontSize: '18px', cursor: 'pointer' }}
      >
        {lang === 'TR' ? 'Check-in Yap' : 'Check-in'}
      </button>
    </main>
  );
}