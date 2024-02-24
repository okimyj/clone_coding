import { useEffect, useState } from "react";
import Movie from "../components/Movie";

const Home = () => {
  //https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
              coverImage={movie.medium_cover_image}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
