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

