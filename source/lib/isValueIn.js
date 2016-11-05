/**
 * @since 2016-11-05 11:11
 * @author vivaxy
 */

export default (value, object) => {
    return Object.keys(object).some((constant) => {
        return object[constant] === value;
    });
};
