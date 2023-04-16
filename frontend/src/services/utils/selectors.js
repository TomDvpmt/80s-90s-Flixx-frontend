// User

export const selectUserInfo = () => {
    return (state) => state.user;
};

export const selectUserIsSignedIn = () => {
    return (state) => state.user.isSignedIn;
};

export const selectUserId = () => {
    return (state) => state.user.id;
};

export const selectUserUsername = () => {
    return (state) => state.user.username;
};

export const selectUserMoviesSeen = () => {
    return (state) => state.user.moviesSeen;
};

export const selectUserMoviesToSee = () => {
    return (state) => state.user.moviesToSee;
};

export const selectUserLanguage = () => {
    return (state) => state.user.language;
};

// Filters

export const selectFiltersYear = () => {
    return (state) =>
        state.filters.allFilters.filter(
            (filter) => filter.name === "primaryReleaseYear"
        )[0].value || "1980-1999";
};

export const selectFiltersActiveGenres = () => {
    return (state) => state.filters.activeGenres;
};

export const selectFiltersAll = () => {
    return (state) => state.filters.allFilters;
};

// Theme

export const selectThemeMode = () => {
    return (state) => state.theme.darkMode;
};

// TMDB config

export const selectTmdbImagesSecureUrl = () => {
    return (state) => state.tmdbConfig.images.secure_base_url;
};

export const selectTmdbImagesPosterSizes = () => {
    return (state) => state.tmdbConfig.images.poster_sizes;
};
