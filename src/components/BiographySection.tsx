export const BiographySection = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <section id="biography" className="py-20 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Biography</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={`${baseUrl}profil_web.jpg`}
              alt="Artist" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              x andini is a Berlin-based DJ exploring the space between depth and movement. His sound blends melodic textures with subtle, driving energy - crafted for both introspection and the dancefloor.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Each set is an exchange. Emotional, intimate, and unforced - leaving space for the night to unfold naturally.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Born in Baku in 1993, he developed an early connection to sound, shaped by long hours by the sea and a fascination with rhythm in its purest form.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              After moving to Berlin in 2019 and following a conventional career path, he made a decisive shift - choosing music as the only direction that felt real.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Today, x andini creates immersive journeys that invite connection, presence, and escape.
            </p>
            <p className="text-purple-300 text-lg leading-relaxed font-medium">
              Creating space for feeling, connection, and release. A space to feel, connect, and lose yourself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
