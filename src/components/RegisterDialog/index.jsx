import { useDispatch, useSelector } from "react-redux";

import {
    setShowRegisterDialog,
    selectShowRegisterDialog,
} from "../../features/dialogsSlice";
import { selectUserLanguage } from "../../features/userSlice";

import RegisterForm from "../RegisterForm";

import theme from "../../styles/theme";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const RegisterDialog = () => {
    const showRegisterDialog = useSelector(selectShowRegisterDialog);
    const language = useSelector(selectUserLanguage);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setShowRegisterDialog(false));
    };

    return (
        <Dialog open={showRegisterDialog} onClose={handleClose} fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                {theme.languages[language].components.registerDialog.title}
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <RegisterForm isDialogForm={true} />
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog;
