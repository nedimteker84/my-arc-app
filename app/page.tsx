'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

export default function Home() {
  const { isConnected, address } = useAccount();
  const [lang, setLang] = useState('EN');
  const [lastCheckIn, setLastCheckIn] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // İşlem onaylandıktan sonra geri sayımı başlat
  useEffect(() => {
    if (isConfirmed) setLastCheckIn(Date.now());
  }, [isConfirmed]);

  // Geri sayım döngüsü
  useEffect(() => {
    if (!lastCheckIn) return;
    const timer = setInterval(() => {
      const remaining = 86400000 - (Date.now() - lastCheckIn);
      if (remaining <= 0) { setTimeLeft('00:00:00'); clearInterval(timer); }
      else {
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${h}s ${m}d ${s}sn`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastCheckIn]);

  return (
    <main style={{ background: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Inter' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Arc OnChain</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setLang(lang === 'EN' ? 'TR' : 'EN')} style={{ background: '#111', border: '1px solid #333', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer' }}>{lang}</button>
          <ConnectButton />
        </div>
      </nav>

      <section style={{ maxWidth: '400px', margin: '80px auto', background: '#0a0a0a', padding: '30px', borderRadius: '20px', border: '1px solid #222', textAlign: 'center' }}>
        {!isConnected ? (
          <p>{lang === 'EN' ? 'Please connect your wallet' : 'Lütfen cüzdanınızı bağlayın'}</p>
        ) : (
          <div>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>{address}</p>
            <button 
              disabled={isPending || (lastCheckIn !== null && timeLeft !== '00:00:00')}
              onClick={() => writeContract({ 
                address: '0x000...', abi: [], functionName: 'checkIn' 
              })}
              style={{ width: '100%', padding: '15px', margin: '20px 0', borderRadius: '12px', cursor: 'pointer' }}
            >
              {isPending ? 'Processing...' : 'Check-in'}
            </button>
            <p style={{ color: '#444' }}>{lang === 'EN' ? 'Next ritual:' : 'Sıradaki ritüel:'} {timeLeft}</p>
          </div>
        )}
      </section>
    </main>
  );
}