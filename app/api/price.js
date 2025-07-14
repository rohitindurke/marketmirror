// pages/api/price.js

export default async function handler(req, res) {
    try {
      const binanceRes = await fetch(
        'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
      );
      const data = await binanceRes.json();
  
      res.status(200).json({ price: data.price });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch price' });
    }
  }
  