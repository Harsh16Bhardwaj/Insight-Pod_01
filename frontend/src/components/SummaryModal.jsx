  const SummaryModal = () => {
    const getGenreName = (id) => genres.find((g) => g.id === id)?.name || "";

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm z-50">
        <div className="bg-teal-900/90 rounded-lg p-8 max-w-md w-full m-4 relative border border-teal-800/30">
          <button
            onClick={() => setShowSummary(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-white">
            Your Music Preferences
          </h2>

          <div className="space-y-6">
            {selectedGenres.map((genreId) => (
              <div key={genreId} className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400">
                  {getGenreName(genreId)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSubgenres[genreId]?.map((subgenre, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-100 animate-fadeIn"
                      style={{
                        animationDelay: `${index * 150}ms`,
                        opacity: 0,
                      }}
                    >
                      {subgenre}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-md font-semibold"
              onClick={() => setShowSummary(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default SummaryModal;