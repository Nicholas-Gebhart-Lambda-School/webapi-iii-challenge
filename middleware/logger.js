module.exports = logger;

function logger(prefix) {
  return (req, res, next) => {
    const { url, method } = req;
    const time = new Date().toISOString();
    console.log(`${prefix}: [${time}] ${method} to ${url}`);
    next();
  };
}
