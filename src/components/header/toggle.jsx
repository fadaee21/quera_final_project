import PropTypes from "prop-types";

const Toggle = ({ checked, toggleThemeMode, label = "" }) => {

    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={checked}
                onChange={toggleThemeMode}
            />
            <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault">
                {label}
            </label>
        </div>
    );
};

Toggle.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string,
};

export { Toggle };