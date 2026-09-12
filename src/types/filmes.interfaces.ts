export interface genero{
    id: number,
    name: string,
}

export interface filme {
    id: number,
    title: string,
    synopsis: string,
    posterImageUrl: string,
    bannerImageUrl: string,
    releaseYear: number,
    durationMinute: number,
    ageRating: string,
    contentWarning: string,
    cast: string[],
    avgRating?: number,
    reviewCount: number,
    isFavorite: boolean,
    isWatched: boolean,
    genres: genero[]
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