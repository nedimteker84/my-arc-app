'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useBlockNumber } from 'wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber({ watch: true });

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Arc MiniApp</h1>
      
      <div style={{ margin: '20px 0' }}>
        <ConnectButton />
      </div>

      {isConnected && (
        <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
          <h2>Hoş Geldin!</h2>
          <p><strong>Cüzdan:</strong> {address}</p>
          <p><strong>Bakiye:</strong> {balance?.formatted} {balance?.symbol}</p>
          <p><strong>Güncel İşlem Sayısı (Blok):</strong> {blockNumber?.toString()}</p>
          
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => alert('GM!')} style={{ marginRight: '10px', padding: '10px' }}>GM</button>
            <button onClick={() => alert('GN!')} style={{ padding: '10px' }}>GN</button>
          </div>
        </div>
      )}
    </main>
  );
}