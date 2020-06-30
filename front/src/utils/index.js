export function clearSlashes(str) {
    if (str.length > 1) {
        return str.toString().replace(/\/$/, '').replace(/^\//, '');
    }
}

export default {
    clearSlashes
}