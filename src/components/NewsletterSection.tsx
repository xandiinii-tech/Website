import { useState } from 'react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-dark-900">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-5xl sm:text-6xl font-black text-white mb-4">Stay Updated</h2>
        <p className="text-gray-400 mb-8 text-xl">Get notified about new releases, tour dates, and exclusive drops</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-4 bg-dark-800 border-2 border-dark-700 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 transition text-lg"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 text-lg"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && <p className="text-green-400 font-bold text-lg">✓ Thanks for subscribing!</p>}
        {status === 'error' && <p className="text-red-400 font-bold text-lg">✗ Something went wrong. Try again.</p>}
      </div>
    </section>
  );
};
