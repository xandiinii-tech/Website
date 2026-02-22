import QRCode from 'qrcode.react';

export const QRCodeSection = () => {
  const pageUrl = 'https://zesterdaz.com'; // Replace with your actual domain

  const downloadQR = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas?.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url || '';
    link.download = 'zesterdaz-qrcode.png';
    link.click();
  };

  return (
    <section className="min-h-screen bg-dark-900 flex items-center justify-center py-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Scan & Join</h2>
        <p className="text-gray-400 mb-12">Scan this QR code at our parties</p>
        
        <div className="bg-white p-8 rounded-lg inline-block mb-8 shadow-2xl">
          <QRCode 
            value={pageUrl} 
            size={256} 
            level="H" 
            includeMargin={true}
          />
        </div>

        <button
          onClick={downloadQR}
          className="mt-8 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
        >
          Download QR Code
        </button>
      </div>
    </section>
  );
};
