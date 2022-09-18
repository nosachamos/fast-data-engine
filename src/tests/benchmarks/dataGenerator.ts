// seeded uuid so benchmark stays consistent
import getUuid from 'uuid-by-string';
import seedrandom from 'seedrandom';
import { Country, Region, Row } from './GeneratorTypes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export const basePath = 'src/tests/benchmarks/';
const dataPath = `${basePath}/data/`;

// Do not change the seed. If you do all benchmark data and tests will become invalid as we rely on the generated data
// structure remaining the same for precise performance comparisons and assertions, as well as to perform tests.
const seed = 'make it fast';

// use a seed so that we can always regenerate the same data and keep our benchmarks comparable
const seededRandom = seedrandom(seed);

const readJsonFromFile = <T>(filename: string): T => {
    return JSON.parse(fs.readFileSync(filename));
};

// read source data
const getRandomItem = <T>(array: T[]): T => {
    return array[Math.floor(seededRandom() * array.length)];
};

const getRandomNumber = (min: number, max: number): number => {
    return seededRandom() * (max - min) + min;
};

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(seededRandom() * (max - min + 1)) + min;
};

const REGION_CODES = readJsonFromFile<Region[]>(`${dataPath}/zipcodes.us.json`);
const COUNTRIES = readJsonFromFile<Country[]>(`${dataPath}/countries.json`);

const LASTNAMES = readJsonFromFile<string[]>(`${dataPath}/lastnames.json`);
const MAN_NAMES = readJsonFromFile<string[]>(`${dataPath}/man_names.json`);
const WOMAN_NAMES = readJsonFromFile<string[]>(`${dataPath}/woman_names.json`);
const TLD = readJsonFromFile<string[]>(`${dataPath}/tld.json`);
const BOOLEAN = [true, false];
const GENDERS = ['M', 'F'];
const OPTIONAL_CODE = ['001', '100', null];
const MARITAL_STATUS = ['Married', 'Single', 'Divorced', 'Widowed', 'Unknown'];
const PROCESSING_STATUS = ['Pending', 'Submitted', 'Error', 'Complete', 'InReview', 'Rejected', 'Closed', 'Cancelled'];

export const dataGenerator = (len: number) => {
    const data: Row[] = [];

    for (let index = 0; index < len; index++) {
        // generate row data
        const gender = getRandomItem(GENDERS);

        const firstName = gender === 'M' ? getRandomItem(MAN_NAMES) : getRandomItem(WOMAN_NAMES);

        const lastName = getRandomItem(LASTNAMES);
        const regionCode = getRandomItem(REGION_CODES);
        const zipCode = parseInt(regionCode.zipcode);
        const place = regionCode.place;
        const stateName = regionCode.state;
        const stateAbbreviation = regionCode.state_code;
        const province = regionCode.province;
        const provinceCode = regionCode.province_code;
        const community = regionCode.community;
        const communityCode = regionCode.community_code;
        const latitude = parseFloat(regionCode.latitude);
        const longitude = parseFloat(regionCode.longitude);

        const eligible = getRandomItem(BOOLEAN);
        const notificationsEnabled = getRandomItem(BOOLEAN);
        const tld = getRandomItem(TLD);
        const country = getRandomItem(COUNTRIES);
        const countryName = country.name;
        const countryCode = country.code;
        const marital_status = getRandomItem(MARITAL_STATUS);
        const id = getUuid(seed + index);

        const testCode = getRandomInt(0, 100) % 10;
        const age = getRandomInt(1, 100);
        const subscribers = getRandomInt(1, 10000);
        const gpa = getRandomNumber(0, 5);
        const itemsReported = getRandomInt(0, 500);
        const averageScore = getRandomNumber(0, 100);
        const heightCm = parseFloat(getRandomNumber(120, 200).toFixed(2));
        const weight = parseFloat(getRandomNumber(110, 250).toFixed(2));
        const width = parseFloat(getRandomNumber(1000, 10000).toFixed(2));
        const height = parseFloat(getRandomNumber(1000, 10000).toFixed(2));

        const processingStatus = getRandomItem(PROCESSING_STATUS);
        const optionalCode = getRandomItem(OPTIONAL_CODE);

        data.push({
            id,
            index,
            firstName,
            lastName,
            eligible,
            age,
            gpa,
            heightCm,
            weight,
            marital_status,
            tld,
            subscribers,
            notificationsEnabled,
            itemsReported,
            averageScore,

            countryName,
            countryCode,
            stateName,
            stateAbbreviation,
            width,
            height,
            zipCode,
            place,
            province,
            provinceCode,
            community,
            communityCode,
            latitude,
            longitude,

            testCode,
            processingStatus,
            optionalCode,
        });
    }

    return data;
};
