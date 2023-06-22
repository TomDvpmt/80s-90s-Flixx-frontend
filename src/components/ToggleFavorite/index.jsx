import { useDispatch, useSelector } from "react-redux";

import {
    addToFavorites,
    removeFromFavorites,
    selectUserToken,
    selectUserId,
    selectUserFavorites,
} from "../../features/userSlice";
import { setShowLoggedOnlyDialog } from "../../features/dialogsSlice";
import { setDestination } from "../../features/pageSlice";

import { updateUserMoviesInDB } from "../../utils/user";

import theme from "../../styles/theme";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

import PropTypes from "prop-types";

const ToggleFavorite = ({ movieId }) => {
    ToggleFavorite.propTypes = {
        movieId: PropTypes.number.isRequired,
    };

    const dispatch = useDispatch();
    const token = useSelector(selectUserToken);
    const userId = useSelector(selectUserId);
    const favorites = useSelector(selectUserFavorites);
    const isFavorite = favorites.includes(movieId);

    const addMovieToFavorites = () => {
        dispatch(addToFavorites(movieId));
        try {
            updateUserMoviesInDB(userId, {
                favorites: [...favorites, movieId],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeMovieFromFavorites = () => {
        dispatch(removeFromFavorites(movieId));
        try {
            updateUserMoviesInDB(userId, {
                favorites: favorites.filter((id) => id !== movieId),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFavoriteCheckbox = () => {
        if (token === "") {
            dispatch(setDestination(`/movies/${movieId}`));
            dispatch(setShowLoggedOnlyDialog(true));
            return;
        }
        if (isFavorite) {
            removeMovieFromFavorites();
        } else {
            addMovieToFavorites();
        }
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    inputProps={{ "aria-label": "add to favorite" }}
                    icon={
                        <StarBorder
                            sx={{
                                color: theme.palette.brandingWarm.main,
                            }}
                        />
                    }
                    checkedIcon={
                        <Star
                            sx={{
                                color: theme.palette.brandingWarm.main,
                            }}
                        />
                    }
                    checked={isFavorite}
                    onChange={handleFavoriteCheckbox}
                />
            }
            label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        />
    );
};

export default ToggleFavorite;
