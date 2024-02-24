import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
interface IParams {
  params: { id: string };
}
export const generateMetadata = async ({ params: { id } }: IParams) => {
  const movie = await getMovie(id);
  return { title: movie.title };
};
export default function MovieDetail({ params: { id } }: IParams) {
  // 병렬 fetching.
  //const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  // const movie = await getMovie(id);
  // const videos = await getVideos(id);

  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie video</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

// nomad-movies.nomadcoders.workers.dev
