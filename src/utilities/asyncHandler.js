/**
 * @action Use it as a wrapper for  any function that requires a try/catch block.
 * @author Collins <collinspro18@gmail.com> <02/12/2021 4:09am>
 */

module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);
