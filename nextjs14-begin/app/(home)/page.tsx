import Link from "next/link";
import Movie from "../../components/movie";
import styles from "../../styles/home.module.css";
export const metadata = {
  title: "HOME",
};
export const MOVIE_API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
const getMovies = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return fetch(MOVIE_API_URL).then((response) => response.json());
};
export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie key={movie.id} id={movie.id} title={movie.title} posterPath={movie.poster_path} />
      ))}
    </div>
  );
}
