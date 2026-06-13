'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

export default function Home() {
  const { isConnected, address } = useAccount();
  const [lang, setLang] = useState('TR');
  const [lastCheckIn, setLastCheckIn] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) setLastCheckIn(Date.now());
  }, [isConfirmed]);

  useEffect(() => {
    if (!lastCheckIn) return;
    const interval = setInterval(() => {
      const remaining = 86400000 - (Date.now() - lastCheckIn);
      if (remaining <= 0) { setTimeLeft('00:00:00'); clearInterval(interval); }
      else {
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${h}s ${m}d ${s}sn`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastCheckIn]);

  return (
    <main style={{ background: '#050505', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'Inter' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.2rem' }}>Arc OnChain</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer' }}>{lang}</button>
          <ConnectButton />
        </div>
      </nav>

      <section style={{ maxWidth: '400px', margin: '80px auto', background: '#0a0a0a', padding: '30px', borderRadius: '20px', border: '1px solid #222', textAlign: 'center' }}>
        {!isConnected ? (
          <p>{lang === 'TR' ? 'Lütfen cüzdanınızı bağlayın' : 'Please connect your wallet'}</p>
        ) : (
          <div>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>{address?.slice(0, 6)}...{address?.slice(-4)}</p>
            <button 
              disabled={isPending || (lastCheckIn !== null && timeLeft !== '00:00:00')}
              onClick={() => writeContract({ 
                address: '0x000...', // BURAYA KONTRA ADRESİNİ YAZ
                abi: [{ name: 'checkIn', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] }],
                functionName: 'checkIn' 
              })}
              style={{ width: '100%', padding: '16px', margin: '20px 0', borderRadius: '12px', border: 'none', background: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {isPending ? 'Processing...' : 'Check-in'}
            </button>
            <p style={{ color: '#888' }}>{lang === 'TR' ? 'Sıradaki ritüel:' : 'Next ritual:'} {timeLeft}</p>
          </div>
        )}
      </section>
    </main>
  );
}