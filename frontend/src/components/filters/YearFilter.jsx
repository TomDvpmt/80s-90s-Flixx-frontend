import { useSelector } from "react-redux";

import store from "../../services/utils/store";
import { filtersSetYear } from "../../services/features/filters";
import { selectFiltersYear } from "../../services/utils/selectors";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import PropTypes from "prop-types";

const YearFilter = ({ setCurrentPage }) => {
    YearFilter.propTypes = {
        setCurrentPage: PropTypes.func,
    };

    const yearOption = useSelector(selectFiltersYear());

    const years = ["1980-1999"];
    for (let i = 1980; i < 2000; i++) {
        years.push(i);
    }

    const handleYearChange = (e) => {
        setCurrentPage(1);
        store.dispatch(filtersSetYear(e.target.value));
    };

    return (
        <FormControl component="fieldset">
            <InputLabel id="year-filter">Période</InputLabel>
            <Select
                labelId="year-filter"
                label="Période"
                onChange={handleYearChange}
                value={yearOption}>
                {years.map((year) => (
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default YearFilter;
