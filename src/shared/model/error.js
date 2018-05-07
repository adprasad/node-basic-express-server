export default (code, message) => {
    let code = code || 500;
    let message = message || 'No error message provided';
    return { code: code, message: message};
}