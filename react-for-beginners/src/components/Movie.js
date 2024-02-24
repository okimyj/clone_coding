import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Movie = ({ movieId, title, summary, genres, coverImage }) => {
  return (
    <div>
      <img src={coverImage} alt={title} />
      <div>
        <h2>
          <Link to={`/movie/${movieId}`}>{title}</Link>
        </h2>
        <p>{summary}</p>
        <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
Movie.propTypes = {
  movieId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  coverImage: PropTypes.string.isRequired,
};
export default Movie;
