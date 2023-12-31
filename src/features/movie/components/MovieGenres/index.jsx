import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addActiveGenre, selectFiltersActiveGenres } from "../../movieSlice";

import { Box, Button } from "@mui/material";

import PropTypes from "prop-types";

const MovieGenres = ({ genres }) => {
    MovieGenres.propTypes = {
        genres: PropTypes.arrayOf(PropTypes.object.isRequired),
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeGenres = useSelector(selectFiltersActiveGenres);

    const handleGenreClick = (e) => {
        const genreId = parseInt(e.target.id);

        if (!activeGenres?.includes(genreId)) {
            dispatch(addActiveGenre(genreId));
        }
        navigate("/");
    };

    return (
        genres?.length > 0 && (
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".5rem",
                }}>
                {genres.map((genre, index) => (
                    <Button
                        key={index}
                        id={genre.id}
                        variant="contained"
                        size="small"
                        onClick={handleGenreClick}
                        sx={{ color: "white" }}>
                        {genre.name}
                    </Button>
                ))}
            </Box>
        )
    );
};

export default MovieGenres;
