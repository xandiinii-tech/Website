export const BiographySection = () => {
  return (
    <section id="biography" className="py-20 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Biography</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/profil_web.jpg" 
              alt="Artist" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              x andini is a renowned electronic music artist and DJ known for his captivating performances 
              and innovative sound design. With a passion for trance and progressive house, he has established 
              himself as a leading figure in the global electronic music scene.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              His journey in music began in his early years, and through dedication and artistic excellence, 
              he has performed at major festivals and venues worldwide. His unique blend of melodic elements 
              and powerful beats has earned him a dedicated fan base across the globe.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Known for his energetic stage presence and technical expertise, x andini continues to push 
              the boundaries of electronic music and inspire audiences with unforgettable performances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
