export default (c, m) => {
    let code = c || 500;
    let message = m || 'No error message provided';
    return { code: code, message: message};
}