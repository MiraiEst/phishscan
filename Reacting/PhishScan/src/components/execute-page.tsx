import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001').replace(/\/$/, '');

const ExecutePage: React.FC = () => {

  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!url) return alert('Harap masukkan URL!');
    try {
      const response = await fetch(`${apiBaseUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error(`API mengembalikan status ${response.status}`);
      }

      const data = await response.json();
      console.log('Hasil scan: ', data);

      if (data.isPhishing) {
        navigate('/unsafe', { state: { detail: data } });
      } else {
        navigate('/safe', { state: { detail: data } });
      }

    } catch (error) {
      console.error('Error scanning URL:', error);
      alert('Pemindaian gagal. Pastikan layanan API sedang aktif, lalu coba lagi.');
    }
  };

  return (
    <div>
      <div className="top-left">
        <img
          src="/Image/phish-small.svg"
          alt="PhishScan Logo"
          className="logo"
        />
      </div>

      <div className="card-wrapper-center">
        <div className="container">
          <h2>Start Scanning</h2>
          <p>Paste your suspicious link here...</p>
          <div className="input-wrapper">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com..."
            className="container input"
          />
          </div>
          <button onClick={handleScan} className="custom-button">
            Scan
          </button>
        </div>
      </div>
      <footer>© PhishScan2025</footer>
    </div>
  );
};

export default ExecutePage;
