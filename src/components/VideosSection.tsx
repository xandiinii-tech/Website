export const VideosSection = () => {
  return (
    <section id="videos" className="py-20 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">Videos</h2>
        <p className="text-gray-300 text-lg mb-8">Check out my latest videos and performances on YouTube</p>
        <a 
          href="https://www.youtube.com/@Xandiinii" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition text-lg"
        >
          Visit YouTube
        </a>
      </div>
    </section>
  );
};
