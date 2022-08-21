import {IncomingMessage, ServerResponse} from "http";

const fs = require('fs');
const path = require('path');

export const server = (req: IncomingMessage, res: ServerResponse) => {
    console.log(`${req.method} ${req.url}`);

    const {url} = req;
    if (!url) {
        throw new Error('Unable to serve request: no URL.');
    }

    const decodedQueryString = decodeURIComponent(url).replace(/\+/g, '%20');

    // parse URL
    const parsedUrl = new URL(decodedQueryString, `http://${req.headers.host}`);

    // extract URL path
    let pathname = path.join(__dirname, parsedUrl.search.split('=')[1]);

    console.log(pathname);
    // maps file extension to MIME types
    const map = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.min.js': 'text/javascript',
        '.json': 'application/json',
    };

    // based on the URL path, extract the file extension. e.g. .js, .doc, ...
    const ext: keyof typeof map = path.parse(pathname).ext;

    const exists = fs.existsSync(pathname);
    if (!exists) {
        // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
    }

    // if is a directory search for index file matching the extension
    if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

    // read file from file system
    fs.readFile(pathname, function (err: Error, data: Buffer) {
        if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        } else {
            // if the file is found, set Content-type and send data
            res.setHeader('Content-type', map[ext] || 'text/plain');
            res.end(data);
        }
    });

}

