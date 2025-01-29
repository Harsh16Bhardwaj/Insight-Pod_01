import React, { useState } from "react";
import { CheckCircle2, Music2, ChevronDown, ChevronUp, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences } from "../store/slices/authSlice.js"; // Adjust path based on your file structure
import { podcastGenres as genres } from "../utils/genres.js"; // Adjust the import path
import SummaryModal from "../components/SummaryModal.jsx";
import axiosInstance from "../utils/axios.js"; // Ensure the correct import path
import { useNavigate } from "react-router-dom";

const PrefrencePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedSubgenres, setSelectedSubgenres] = useState({});
  const [expandedGenre, setExpandedGenre] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const MAX_GENRES = 3;
  const MAX_SUBGENRES_PER_GENRE = 2;
  const { user } = useSelector((state) => state.auth); // Redux selector for auth state

  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
      setSelectedSubgenres((prev) => {
        const updated = { ...prev };
        delete updated[genreId];
        return updated;
      });
    } else if (selectedGenres.length < MAX_GENRES) {
      setSelectedGenres([...selectedGenres, genreId]);
      setExpandedGenre(genreId);
      setSelectedSubgenres((prev) => ({
        ...prev,
        [genreId]: [],
      }));
    }
  };

  const toggleSubgenre = (genreId, subgenre) => {
    setSelectedSubgenres((prev) => {
      const genreSubgenres = prev[genreId] || [];
      const isSelected = genreSubgenres.includes(subgenre);

      if (isSelected) {
        return {
          ...prev,
          [genreId]: genreSubgenres.filter((sg) => sg !== subgenre),
        };
      } else if (genreSubgenres.length < MAX_SUBGENRES_PER_GENRE) {
        return {
          ...prev,
          [genreId]: [...genreSubgenres, subgenre],
        };
      }
      return prev;
    });
  };

  const toggleExpand = (genreId) => {
    setExpandedGenre(expandedGenre === genreId ? null : genreId);
  };

  const getGenreSubgenreCount = (genreId) => {
    return selectedSubgenres[genreId]?.length || 0;
  };

  const isSubgenreSelectable = (genreId, subgenre) => {
    const currentSelected = selectedSubgenres[genreId]?.length || 0;
    const isAlreadySelected = selectedSubgenres[genreId]?.includes(subgenre);
    return isAlreadySelected || currentSelected < MAX_SUBGENRES_PER_GENRE;
  };

  const isValid = () => {
    return (
      selectedGenres.length === MAX_GENRES &&
      selectedGenres.every(
        (genreId) => getGenreSubgenreCount(genreId) === MAX_SUBGENRES_PER_GENRE
      )
    );
  };

  const handleContinue = async () => {
    try {
      const allSelectedSubgenres = Object.values(selectedSubgenres).flat();

      if (allSelectedSubgenres.length === 0) {
        alert("Please select at least one subgenre.");
        return;
      }
      // Prepare preferences payload
      const preferences = allSelectedSubgenres;

      // Dispatch to Redux if needed
      dispatch(setPreferences(preferences));

      // Hit the API to store preferences
      const response = await axiosInstance.put(
        "/user/preference",
        preferences,
        { withCredentials: true }
      );
      console.log("Preferences saved successfully:", response.data);

      setShowSummary(true);
    } catch (error) {
      console.error("Error saving preferences:", error);
      navigate("/dashboard"); // Redirect to dashboard on error
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 to-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Music Preference Selection
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Choose {MAX_GENRES} genres you like.
          </p>
          <p className="text-gray-400 text-sm">
            Select {MAX_SUBGENRES_PER_GENRE} subgenres for each genre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="flex flex-col bg-teal-900/30 rounded-lg shadow-lg backdrop-blur-sm border border-teal-800/30"
            >
              <button
                onClick={() => toggleGenre(genre.id)}
                className={`p-6 rounded-t-lg relative overflow-hidden transition-all
                  ${
                    selectedGenres.includes(genre.id)
                      ? "bg-cyan-500/20"
                      : "hover:bg-teal-800/30"
                  }
                  ${
                    !selectedGenres.includes(genre.id) &&
                    selectedGenres.length >= MAX_GENRES
                      ? "opacity-50"
                      : ""
                  }`}
                disabled={
                  !selectedGenres.includes(genre.id) &&
                  selectedGenres.length >= MAX_GENRES
                }
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-xl font-semibold">{genre.name}</span>
                    {selectedGenres.includes(genre.id) && (
                      <div className="text-sm text-cyan-300">
                        {getGenreSubgenreCount(genre.id)}/
                        {MAX_SUBGENRES_PER_GENRE} subgenres selected
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedGenres.includes(genre.id) ? (
                      <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                    ) : (
                      <Music2 className="w-6 h-6 text-cyan-400" />
                    )}
                  </div>
                </div>
              </button>

              {selectedGenres.includes(genre.id) && (
                <>
                  <button
                    onClick={() => toggleExpand(genre.id)}
                    className="p-2 flex items-center justify-center hover:bg-teal-800/30 transition-all border-t border-teal-800/30"
                  >
                    {expandedGenre === genre.id ? (
                      <ChevronUp className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-cyan-400" />
                    )}
                  </button>

                  {expandedGenre === genre.id && (
                    <div className="p-4 border-t border-teal-800/30">
                      <h3 className="text-sm text-gray-300 mb-3">
                        Select {MAX_SUBGENRES_PER_GENRE} subgenres:
                      </h3>
                      <ul className="space-y-2">
                        {genre.subgenres.map((subgenre, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              isSubgenreSelectable(genre.id, subgenre) &&
                              toggleSubgenre(genre.id, subgenre)
                            }
                            className={`text-sm p-2 rounded-md cursor-pointer flex items-center justify-between
                              ${
                                selectedSubgenres[genre.id]?.includes(subgenre)
                                  ? "bg-cyan-500/20 text-cyan-100"
                                  : isSubgenreSelectable(genre.id, subgenre)
                                  ? "hover:bg-teal-800/30"
                                  : "opacity-50 cursor-not-allowed"
                              }`}
                          >
                            {subgenre}
                            {selectedSubgenres[genre.id]?.includes(
                              subgenre
                            ) && (
                              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            className={`px-8 py-3 rounded-md text-lg font-semibold transition-all
            ${
              isValid()
                ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                : "bg-teal-900/50 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValid()}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>

        {showSummary && <SummaryModal />}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PrefrencePage;
