export function clearSlashes(str) {
    if (str.length > 1) {
        return str.toString().replace(/\/$/, '').replace(/^\//, '');
    }
}

export function isEmpty(input) {
    if (input === '' || input === undefined || input === null) {
        return true;
    }

    return false;
}

export default {
    clearSlashes
}