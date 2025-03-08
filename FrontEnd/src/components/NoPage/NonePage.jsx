import React from 'react';
import PropTypes from "prop-types";
import Wrapper from "./Wrapper.jsx";

const NonePage = (title , message) => {
    return <>
    </>;
};
NonePage.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
};

export default NonePage;
