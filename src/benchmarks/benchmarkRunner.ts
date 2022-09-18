import * as puppeteer from 'puppeteer';
import http from 'http';
import {server} from './dataServer';
import path from 'path';
import fs from 'fs';
import os from 'os';

const REMOVE_TOP_SLOWEST = 0;

const pageContent = `
    <head><title>Benchmark</title></head>
    <body>
    <h2 id="title">Running benchmarks... please wait</h2>
    <script>
        function loadScript(url, callback) {
            // Adding the script tag to the head as suggested before
            const head = document.head;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
        
            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = callback;
            script.onload = callback;
        
            // Fire the loading
            head.appendChild(script);
        }
    </script>
    <script>
        const REPEAT_DATA = 1;  // max 200
        const NUM_RUNS = 1;
        const timeInMillis = (start, end) => {
            return (end - start).toFixed(3);
        };
        
        loadScript("http://localhost:9876/?path=../../build/benchmarks/benchmarks.min.js", () => {
            console.log(document.getElementById('title').textContent);
            const query = new URLSearchParams({
                path: '../../src/tests/benchmarks/generated_data/data_500000.json',
            });
            
            console.log('Loading json data from disk...');
            const dataLoadStart = performance.now();
            fetch('http://localhost:9876/?' + query)
                .then(res => res.json())
                .then(async (out) => {
                    console.log('Loading json took ' + timeInMillis(dataLoadStart, performance.now()) + 'ms');
                    
                    try {
                        await runBenchmarks(out, REPEAT_DATA, NUM_RUNS);
                    } catch (e) {
                        console.error(e.message);
                    }
                    
                    // signal to the outer process that it's time to close the browser and finish the benchmark
                    console.log('EXIT');
                }).catch(err => console.error(err));
        });

    </script>    
</body>

`;

export const benchmarkRunner = async () => {
    // await http.createServer(server).listen(9876);
    const fileServer = await http.createServer(server).listen(9876);

    const humanFileSize = (bytes: number, precision = 2) => {
        if (Math.abs(bytes) < 1024) {
            return bytes + ' B';
        }

        const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let u = -1;
        const r = 10 ** precision;

        do {
            bytes /= 1024;
            ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= 1024 && u < units.length - 1);

        return bytes.toFixed(precision) + ' ' + units[u];
    };

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-web-security'],
    });

    const page = await browser.newPage();
    const timings: {[key: string]: number[]} = {};
    page.on('console', async (msg: puppeteer.ConsoleMessage) => {
        if (msg.text().startsWith('>>')) {
            const parts = msg.text().substring(2).split(',');
            const title = parts[0];
            const duration = parseFloat(parts[1]);
            if (typeof timings[title] !== 'undefined') {
                timings[title]?.push(duration);
            } else {
                timings[title] = [duration];
            }
        }
        console.log('[' + msg.type() + '] - ' + msg.text());

        if (msg.text() === 'EXIT') {
            const average = (array: number[]) => {
                // remove the two large numbers
                let max = Math.max(...array);
                for (let i = 0; i < REMOVE_TOP_SLOWEST; i++) {
                    array = array.filter((number) => number !== max);
                    max = Math.max(...array);
                }

                // average the results
                return array.reduce((a, b) => a + b) / array.length;
            };

            console.log('Final results:');
            Object.entries(timings).forEach(entry => {
                const key = entry[0];
                const value = entry[1];
                console.log(`\t${key}: ` + average(value).toFixed(3));
            });

            // update documentation with the latest results
            const benchmarksTemplatePath = path.join(__dirname, '../../docs/benchmarks_template.md');
            let benchmarksTemplate = fs.readFileSync(benchmarksTemplatePath, 'utf8');

            const browserVersion = await page.browser().version();
            const osDetails = `${os.platform()} - ${os.arch()} - ${os.release()}`;
            const machineDetails = `${os.cpus()[0].model} [${os.cpus()[0].times}, ${
                os.cpus().length
            } threads] CPUs, ${humanFileSize(os.totalmem())} of memory`;

            benchmarksTemplate = benchmarksTemplate.replace('%CHROME_VERSION%', browserVersion);
            benchmarksTemplate = benchmarksTemplate.replace('%OS_DETAILS%', osDetails);
            benchmarksTemplate = benchmarksTemplate.replace('%MACHINE_DETAILS%', machineDetails);

            benchmarksTemplate = benchmarksTemplate.replace('%BENCHMARKS%', JSON.stringify(timings, null, 4));


            fs.writeFileSync(path.join(__dirname, '../../docs/benchmarks.md'), benchmarksTemplate);

            await browser.close();
            await fileServer.close();
        }
    });

    // setting the content will benchmarkRunner the benchmarks
    await page.setContent(pageContent);
};

benchmarkRunner().then(() => void 0);
