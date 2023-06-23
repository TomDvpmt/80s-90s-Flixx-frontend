import { Link } from "react-router-dom";

import logo from "../../assets/logo/Flixx-logo.webp";

import theme from "../../styles/theme";
import { Box, useMediaQuery } from "@mui/material";

import PropTypes from "prop-types";

const Branding = ({ location }) => {
    Branding.propTypes = {
        location: PropTypes.string.isRequired,
    };

    const isWiderThanSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const isWiderThanMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

    let headerWidth = "250px";

    if (isWiderThanSmallScreen) {
        headerWidth = "350px";
    }
    if (isWiderThanMediumScreen) {
        headerWidth = "500px";
    }

    return (
        <Box
            component="div"
            sx={{
                gridColumn: "1 / 3",
                ml: { md: "3rem" },
                pt:
                    location === "header" && isWiderThanSmallScreen
                        ? "6rem"
                        : "2rem",
                pb:
                    location === "header" && isWiderThanSmallScreen
                        ? "6rem"
                        : "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Link to="/">
                <img
                    src={logo}
                    alt="Logo"
                    width={location === "header" ? headerWidth : "250"}
                />
            </Link>
        </Box>
    );
};

export default Branding;
