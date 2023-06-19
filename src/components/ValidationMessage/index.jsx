import { Typography } from "@mui/material";

import theme from "../../styles/theme";

const ValidationMessage = ({ text }) => {
    return (
        <Typography color={theme.palette.success.main} mb="1rem">
            {text}
        </Typography>
    );
};

export default ValidationMessage;
