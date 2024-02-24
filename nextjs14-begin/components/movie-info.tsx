import { MOVIE_API_URL } from "../app/constants";
import styles from "../styles/movie-info.module.css";
export const getMovie = async (id: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("test error..");
  return fetch(`${MOVIE_API_URL}/${id}`).then((response) => response.json());
};

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return (
    <div className={styles.container}>
      <img className={styles.poster} src={movie.poster_path} />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h3>⭐️{movie.vote_average.toFixed(1)}</h3>
        <p>{movie.overview}</p>
        <a href={movie.homepage} target={"_blank"}>
          HomePage &rarr;
        </a>
      </div>
    </div>
  );
}
