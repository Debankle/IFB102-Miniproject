import morgan from 'morgan';
import chalk from 'chalk';

export const morganMiddleware = morgan((tokens, req, res) => {
    var status = tokens.status(req, res);
    var statusColor = status >= 500 ? 'red' : status >= 400 ? 'yellow' : status >= 300 ? 'cyan' : 'green';

    return chalk.reset(padRight((tokens.date['clf'] || '-') + ' ' +
        tokens['remote-addr'](req, res) + ' HTTP/' + tokens['http-version'](req, res) + ' ' +
        tokens.method(req, res) + ' ' + tokens.url(req, res), 60)) + ' ' +
        padLeft(chalk[statusColor](status) + ' ' + chalk.reset(tokens['response-time'](req, res) + ' ms'), 0)
});

/* --- https://github.com/expressjs/morgan/issues/53 --- */
function padLeft(str, len) {
    return len > str.length ? (new Array(len - str.length + 1)).join(' ') + str : str
}

function padRight(str, len) {
    return len > str.length ? str + (new Array(len - str.length + 1)).join(' ') : str
}

export default morganMiddleware;