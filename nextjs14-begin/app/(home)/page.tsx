import Link from "next/link";

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
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}
