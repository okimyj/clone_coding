import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState();
  const getMovieDetail = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovieDetail(json.data.movie);
    console.log(json);
  };
  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <div>
      {movieDetail ? (
        <div>
          <h1>{movieDetail.title}</h1>
          <img src={movieDetail.background_image} />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
export default Detail;
