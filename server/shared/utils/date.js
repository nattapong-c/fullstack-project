module.exports.isValidDate = (string) => {
    return !Number.isNaN(new Date(string).getTime());
}