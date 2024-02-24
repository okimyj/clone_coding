import { MOVIE_API_URL } from "../app/(home)/page";

const getVideos = async (id: string) => {
  console.log("fetching videos - ", Date.now());
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return fetch(`${MOVIE_API_URL}/${id}/videos`).then((response) => response.json());
};
export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return <h6> {JSON.stringify(videos)}</h6>;
}
