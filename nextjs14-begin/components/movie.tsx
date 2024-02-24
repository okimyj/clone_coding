"use client";
import Link from "next/link";
import styles from "../styles/movie.module.css";
import { useRouter } from "next/navigation";

interface IMovieProps {
  id: string;
  title: string;
  posterPath: string;
}
export default function Movie({ id, title, posterPath }: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };
  return (
    <div className={styles.movie}>
      <img src={posterPath} alt={title} onClick={onClick} />
      <Link prefetch href={`movies/${id}`}>
        {title}
      </Link>
    </div>
  );
}
