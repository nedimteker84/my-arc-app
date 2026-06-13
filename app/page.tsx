'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';

export default function Home() {
  const { isConnected, address } = useAccount();
  const [lastGm, setLastGm] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');
  
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // GM basıldığında zamanlayıcıyı başlat
  useEffect(() => {
    if (isConfirmed) {
      setLastGm(Date.now());
    }
  }, [isConfirmed]);

  // Geri sayım mantığı
  useEffect(() => {
    if (!lastGm) return;
    const interval = setInterval(() => {
      const diff = 24 * 60 * 60 * 1000 - (Date.now() - lastGm);
      if (diff <= 0) { setTimeLeft('00:00:00'); clearInterval(interval); }
      else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${h}s ${m}d ${s}sn`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastGm]);

  return (
    <main style={{ background: '#050505', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'Inter' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Arc OnChain</h1>
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button onClick={openConnectModal} style={{ background: '#111', border: '1px solid #333', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}>
              {isConnected ? `${address?.slice(0,6)}...${address?.slice(-4)}` : 'Bağlan'}
            </button>
          )}
        </ConnectButton.Custom>
      </nav>

      {isConnected && (
        <section style={{ maxWidth: '500px', margin: '60px auto', background: '#0a0a0a', padding: '30px', borderRadius: '20px', border: '1px solid #222', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Arc Ritual</h2>
          <button 
            disabled={isPending || isConfirming || timeLeft !== '00:00:00' && lastGm !== null}
            onClick={() => writeContract({ address: '0x0000000000000000000000000000000000000000', abi: [], functionName: 'gm' })}
            style={{ width: '100%', padding: '20px', fontSize: '1.2rem', borderRadius: '15px', background: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isPending || isConfirming ? 'İşleniyor...' : 'GM'}
          </button>
          <div style={{ marginTop: '20px', color: '#666' }}>
            <p>Sıradaki: {timeLeft}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '0.9rem' }}>
              <span>Günlük: 1</span>
              <span>Haftalık: 5</span>
              <span>Toplam: 12</span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}