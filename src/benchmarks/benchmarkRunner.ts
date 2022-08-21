import * as puppeteer from 'puppeteer';
import http from "http";
import {server} from "./dataServer";

const REMOVE_TOP_SLOWEST = 2;

const pageContent = `
    <head><title>Benchmark</title></head>
    <body>
    <h1 id="title">test</h1>
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
        const NUM_RUNS = 10;
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
                        await runBenchmarks(out, 10, NUM_RUNS);
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

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--disable-web-security'],
    });

    const page = await browser.newPage();
    const timings = new Map<string, number[]>();
    page.on('console', async (msg: puppeteer.ConsoleMessage) => {
        if (msg.text().startsWith('>>')) {
            const parts = msg.text().substring(2).split(',');
            const title = parts[0];
            const duration = parseFloat(parts[1]);
            if (timings.has(title)) {
                timings.get(title)?.push((duration));
            } else {
                timings.set(title,[duration]);
            }
        }
        console.log('[' + msg.type() + '] - ' + msg.text());

        if (msg.text() === 'EXIT') {
            const average = (array: number[]) => {
                // remove the two large numbers
                let max = Math.max(...array);
                for (let i = 0; i < REMOVE_TOP_SLOWEST; i++) {
                    array = array.filter(number => number !== max);
                    max = Math.max(...array);
                }

                // average the results
                return array.reduce((a, b) => a + b) / array.length;
            }

            console.log('Final results:');
            timings.forEach((v, k) => {
                console.log(`\t${k}: ` + average(v).toFixed(3));
            });

            await browser.close();
            await fileServer.close();
        }
    });

    // setting the content will benchmarkRunner the benchmarks
    await page.setContent(pageContent);
};

benchmarkRunner().then(() => void 0);
