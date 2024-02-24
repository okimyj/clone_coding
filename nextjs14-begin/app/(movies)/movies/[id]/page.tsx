import { MOVIE_API_URL } from "../../../(home)/page";

const getMovie = async (id: string) => {
  console.log("fetching movie - ", Date.now());
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fetch(`${MOVIE_API_URL}/${id}`).then((response) => response.json());
};
const getVideos = async (id: string) => {
  console.log("fetching videos - ", Date.now());
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fetch(`${MOVIE_API_URL}/${id}/videos`).then((response) => response.json());
};
export default async function MovieDetail({ params: { id } }) {
  console.log("start fetching");
  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  // const movie = await getMovie(id);
  // const videos = await getVideos(id);
  console.log("end fetching");
  return <h1>{movie.title}</h1>;
}

// nomad-movies.nomadcoders.workers.dev
