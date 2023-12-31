import { useState, useRef } from "react";

import { LOADER_LONG_WAIT_DURATION } from "../../config/timing";

import LongWaitMessage from "../LongWaitMessage";

import theme from "../../theme/theme";
import { CircularProgress, Modal, Box } from "@mui/material";

import PropTypes from "prop-types";

const Loader = ({
    size = theme.maxWidth.loader.large,
    marginY = theme.maxWidth.loader.large,
    hasMessage = false,
    modal = false,
}) => {
    Loader.propTypes = {
        size: PropTypes.string,
        marginY: PropTypes.string,
        hasMessage: PropTypes.bool,
        modal: PropTypes.bool,
    };

    const [isLongWait, setIsLongWait] = useState(false);

    let duration = useRef(0);

    if (hasMessage) {
        const timerId = setInterval(() => {
            duration.current = duration.current + 1000;
            if (duration.current > LOADER_LONG_WAIT_DURATION) {
                clearInterval(timerId);
                setIsLongWait(true);
            }
        }, 1000);
    }

    const loaderStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    return modal ? (
        <Modal
            open={true}
            sx={{
                "& .MuiModal-backdrop": {
                    backgroundColor: theme.palette.background.modal,
                },
            }}>
            <Box minWidth="100vw" minHeight="100vh" sx={loaderStyle}>
                <CircularProgress
                    className="loader"
                    sx={{
                        display: "block",
                        margin: `${theme.maxWidth.loader.large} auto`,
                    }}
                    size={theme.maxWidth.loader.large}
                />
                {isLongWait && hasMessage && <LongWaitMessage />}
            </Box>
        </Modal>
    ) : (
        <>
            <Box sx={loaderStyle}>
                <CircularProgress
                    className="loader"
                    sx={{
                        display: "block",
                        margin: `${marginY} auto`,
                    }}
                    size={size}
                />
                {isLongWait && hasMessage && <LongWaitMessage />}
            </Box>
        </>
    );
};

export default Loader;
