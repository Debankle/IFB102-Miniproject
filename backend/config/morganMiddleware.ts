import morgan from 'morgan';
import chalk from 'chalk';

export const morganMiddleware = morgan((tokens, req, res) => {
    const status: number = parseInt(tokens.status(req, res) ?? '500');
    var statusColor: string = (+status) >= 500 ? 'red' : status >= 400 ? 'yellow' : status >= 300 ? 'cyan' : 'green';

    return chalk.reset(padRight(' HTTP/' + tokens['http-version'](req, res) + ' ' +
        tokens.method(req, res) + ' ' + tokens.url(req, res), 60)) + ' ' +
        padLeft(chalk.keyword(statusColor)(status) + ' ' + chalk.reset(tokens['response-time'](req, res) + ' ms'), 0)
});

/* --- https://github.com/expressjs/morgan/issues/53 --- */
function padLeft(str: string, len: number) {
    return len > str.length ? (new Array(len - str.length + 1)).join(' ') + str : str
}

function padRight(str: string, len: number) {
    return len > str.length ? str + (new Array(len - str.length + 1)).join(' ') : str
}

export default morganMiddleware;