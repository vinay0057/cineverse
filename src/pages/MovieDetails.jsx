import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tmdbApi, endpoints, getImageUrl } from '../api/tmdb';
import { FaStar, FaCalendar, FaClock, FaArrowLeft } from 'react-icons/fa';
import Loading from '../components/Loading';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await tmdbApi.get(endpoints.movieDetails(id));
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

  return (
    <div className="bg-[#141414] min-h-screen">
      <div className="relative h-[70vh]">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-96 relative z-10 pb-12">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-white bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg mb-6 hover:bg-opacity-90 transition"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          <div className="md:w-2/3 text-white">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-gray-400 text-xl italic mb-6">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <FaStar className="text-yellow-400 text-2xl" />
                <span className="text-2xl font-semibold">
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({movie.vote_count} votes)
                </span>
              </div>

              <div className="flex items-center space-x-2 text-gray-300">
                <FaCalendar />
                <span>{movie.release_date}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-300">
                <FaClock />
                <span>{movie.runtime} min</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-red-600 px-4 py-2 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {movie.production_companies?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Production Companies</h2>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="text-gray-400">
                      {company.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.budget > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-400 mb-1">Budget</h3>
                  <p className="text-xl font-semibold">
                    ${movie.budget?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-1">Revenue</h3>
                  <p className="text-xl font-semibold">
                    ${movie.revenue?.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;