import { MOVIE_API_URL } from "../app/(home)/page";
import styles from "../styles/movie-videos.module.css";
const getVideos = async (id: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return fetch(`${MOVIE_API_URL}/${id}/videos`).then((response) => response.json());
};
export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return (
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe key={video.id} src={`https://youtube.com/embed/${video.key}`} title={video.name} />
      ))}
    </div>
  );
}
