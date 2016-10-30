/**
 * @since 2016-10-30 14:49
 * @author vivaxy
 */

const attributesToCheck = {
    hidden: true,
};

export default (element) => {
    return !Object.keys(attributesToCheck).some((attr) => {
        return element[attr] === attributesToCheck[attr];
    });
};
