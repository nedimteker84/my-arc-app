'use client';

import { useState } from 'react';
import { useWriteContract } from 'wagmi';

// Adresi küçük harflerle tanımladık (Checksum hatası için)
const CONTRACT_ADDRESS = '0x7179047321526685d3b294f31527027581699990' as `0x${string}`;

export default function Home() {
  const [lang, setLang] = useState('TR');
  const { writeContractAsync } = useWriteContract();

  const handleCheckIn = async () => {
    try {
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: [{ name: 'checkIn', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] }],
        functionName: 'checkIn',
      });
      alert(lang === 'TR' ? 'İşlem başarılı!' : 'Transaction successful!');
    } catch (err) {
      console.error('İşlem hatası:', err);
      alert(lang === 'TR' ? 'İşlem reddedildi veya hata oluştu.' : 'Transaction rejected or failed.');
    }
  };

  return (
    <main style={{ background: '#050505', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <button onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')} style={{ padding: '5px 15px', cursor: 'pointer' }}>
          {lang}
        </button>
      </div>

      <h1 style={{ marginBottom: '40px' }}>Arc OnChain</h1>
      
      <button 
        onClick={handleCheckIn}
        style={{ padding: '20px 60px', fontSize: '20px', cursor: 'pointer', borderRadius: '10px' }}
      >
        {lang === 'TR' ? 'Check-in Yap' : 'Check-in'}
      </button>
    </main>
  );
}