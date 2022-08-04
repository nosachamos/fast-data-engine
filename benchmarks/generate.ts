'use strict';
import uuid from 'uuid';

import {MAN_NAMES} from "./data/man_names";
import {WOMAN_NAMES} from "./data/woman_names";
import {STATES} from "./data/states";
import {COUNTRIES} from "./data/countries";
import {TDL} from "./data/tld";

// read source data
const getRandomItem = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
}

const GENDERS = ['M', 'F'];

const gender = getRandomItem(GENDERS);

const firstName = gender === 'M'
    ? getRandomItem(MAN_NAMES)
    : getRandomItem(WOMAN_NAMES)

const tdl = getRandomItem(TDL);
const country = getRandomItem(COUNTRIES);
const state = getRandomItem(STATES);
const stateName = state.name;
const stateAbbreviation = state.abbreviation;
const id = uuid.v4();
