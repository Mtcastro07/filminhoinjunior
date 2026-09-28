import type { genero } from "./filmes.interfaces";

export interface editarReview {
    movieId: number;
    rating: number;
    text: string;
}

export interface filmeReview {
    id: number,
    title: string,
    posterImageUrl?: string,
    releaseYear: number
    genres: genero[],

}

export interface userReview {
    id: number,
    fullName: string,
    avatarUrl?: string ,
    initials: string
}

export interface review {
    id: number,
    rating: number,
    text: string,
    user: userReview,
    movie: filmeReview,
}