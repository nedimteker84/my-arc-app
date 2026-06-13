'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

export default function Home() {
  const { isConnected, address } = useAccount();
  const [lang, setLang] = useState('TR');
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  
  const { writeContractAsync, isPending } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleCheckIn = async () => {
    try {
      const txHash = await writeContractAsync({
        address: '0x000...', // Buraya Kendi Kontrat Adresini Yaz
        abi: [{ name: 'checkIn', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] }],
        functionName: 'checkIn',
      });
      setHash(txHash);
    } catch (err) {
      console.error("İşlem hatası:", err);
      alert("İşlem reddedildi veya hata oluştu.");
    }
  };

  return (
    <main style={{ background: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Inter' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Arc OnChain</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')} style={{ background: '#111', border: '1px solid #333', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer' }}>{lang}</button>
          <ConnectButton />
        </div>
      </nav>

      <section style={{ maxWidth: '400px', margin: '80px auto', background: '#0a0a0a', padding: '30px', borderRadius: '20px', border: '1px solid #222', textAlign: 'center' }}>
        {!isConnected ? (
          <p>{lang === 'TR' ? 'Lütfen cüzdanınızı bağlayın' : 'Please connect your wallet'}</p>
        ) : (
          <div>
            <button 
              disabled={isPending}
              onClick={handleCheckIn}
              style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {isPending ? 'Cüzdanda Onayla...' : 'Check-in'}
            </button>
            <p style={{ marginTop: '20px', color: '#666' }}>{timeLeft}</p>
          </div>
        )}
      </section>
    </main>
  );
}