'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Arc MiniApp</h1>
        <p>Arc ağına bağlanmak için cüzdanını bağla.</p>
        <div style={{ marginTop: '20px' }}>
          <ConnectButton />
        </div>
      </div>
    </main>
  );
}