import { displayBigNumber } from "../../utils/utils";

import { Typography } from "@mui/material";

import PropTypes from "prop-types";

const MovieBudget = ({ movieLangData, budget }) => {
    MovieBudget.propTypes = {
        movieLangData: PropTypes.shape({
            budget: PropTypes.string.isRequired,
            unavailable: PropTypes.string.isRequired,
        }),
        budget: PropTypes.number.isRequired,
    };

    return (
        budget !== null && (
            <Typography paragraph>
                {movieLangData.budget}{" "}
                {!budget || budget === 0
                    ? movieLangData.unavailable
                    : "$ " + displayBigNumber(budget)}
            </Typography>
        )
    );
};

export default MovieBudget;
