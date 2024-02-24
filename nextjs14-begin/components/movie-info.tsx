import { MOVIE_API_URL } from "../app/(home)/page";

const getMovie = async (id: string) => {
  console.log("fetching movie - ", Date.now());
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fetch(`${MOVIE_API_URL}/${id}`).then((response) => response.json());
};

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return <h6>{JSON.stringify(movie)}</h6>;
}
