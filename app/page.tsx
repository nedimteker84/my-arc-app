'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Arc App</h1>
        <p>Ağa bağlanmak için cüzdanınızı bağlayın.</p>
        <div style={{ marginTop: '20px' }}>
          <ConnectButton />
        </div>
      </div>
    </main>
  );
}