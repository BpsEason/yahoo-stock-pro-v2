import React, { useState } from 'react';

function App() {
  const [symbol, setSymbol] = useState('2330.TW');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStock = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api.php?symbol=${symbol}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setData({ error: "連線後端失敗" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center px-6">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl font-black mb-6 text-center tracking-tighter text-white">STOCK MASTER</h1>
        
        <div className="flex gap-2 mb-8">
          <input 
            className="flex-1 bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            placeholder="代號 (如: AAPL)"
          />
          <button onClick={fetchStock} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-xl transition-colors">
            {loading ? '...' : '搜尋'}
          </button>
        </div>

        {data && !data.error && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{data.symbol}</p>
                <h2 className="text-3xl font-bold text-white">{data.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-4xl font-mono font-medium text-cyan-400 italic">${data.price}</p>
                <p className={`text-sm font-bold ${parseFloat(data.change) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {parseFloat(data.change) >= 0 ? '▲' : '▼'} {data.change} ({data.percent})
                </p>
              </div>
            </div>
          </div>
        )}

        {data?.error && <p className="text-rose-400 text-sm text-center bg-rose-400/10 py-2 rounded-lg">{data.error}</p>}
      </div>
    </div>
  );
}
export default App;
