'use client'; // only needed in /app directory; safe to skip here

import { useState, useEffect } from 'react';

export default function Home() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('api/price'); // calling your own API
      const data = await res.json();
      setPrice(data.price);
    }, 5000); // every 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <h1>Live BTC Price</h1>
      <p>BTC/USDT: {price ? `$${price}` : 'Loading...'}</p>
    </main>
  );
}
