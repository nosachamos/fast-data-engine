'use strict';

import * as fs from 'fs';
import {basePath, dataGenerator} from './dataGenerator';

const outputPath = `${basePath}/generated_data/`;

export const generateBenchmarkDataFiles = () => {
    const data_files_to_generate = [10, 1000, 10000, 100000, 500000];

    data_files_to_generate.forEach((len) => {
        const path = `${outputPath}/data_${len}.json`;

        if (!fs.existsSync(path)) {
            console.log(`Generating test data with length: ${len}`);

            const data = dataGenerator(len);

            fs.writeFile(
                path,
                JSON.stringify(data, null, '\t'),
                {encoding: 'utf-8', flag: 'w'},
                (err: NodeJS.ErrnoException | null) => {
                    if (err) throw err;
                    console.log('complete');
                }
            );
        } else {
            console.log(`Test data file with length ${len} already exists.`);
        }
    });
};

generateBenchmarkDataFiles();
