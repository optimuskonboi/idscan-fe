import PropTypes from 'prop-types';
import './GlobalStyles.module.css'
const GlobalStyles = ({children}) => {
    return children
};
GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;