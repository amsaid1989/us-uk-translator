// IMPORT ALL DICTIONARIES
const americanPhrases = require("./american-only.js");
const britishPhrases = require("./british-only.js");
const spelling = require("./american-to-british-spelling.js");
const titles = require("./american-to-british-titles.js");

// Make sure all keys are lowercase
const americanOnly = Object.entries(americanPhrases).reduce(
    (obj, cur) => ({ ...obj, [cur[0].toLowerCase()]: cur[1] }),
    {}
);

// Make sure all keys are lowercase
const britishOnly = Object.entries(britishPhrases).reduce(
    (obj, cur) => ({ ...obj, [cur[0].toLowerCase()]: cur[1] }),
    {}
);

// Get American to British spelling with all keys in lowercase
const americanToBritishSpelling = Object.entries(spelling).reduce(
    (obj, cur) => ({ ...obj, [cur[0].toLowerCase()]: cur[1] }),
    {}
);

// Get British to American spelling with all keys in lowercase
const britishToAmericanSpelling = Object.entries(spelling).reduce(
    (obj, cur) => ({ ...obj, [cur[1].toLowerCase()]: cur[0] }),
    {}
);

// Get American to British titles with all keys in lowercase
const americanToBritishTitles = Object.entries(titles).reduce(
    (obj, cur) => ({ ...obj, [cur[0].toLowerCase()]: cur[1] }),
    {}
);

// Get British to American titles with all keys in lowercase
const britishToAmericanTitles = Object.entries(titles).reduce(
    (obj, cur) => ({ ...obj, [cur[1].toLowerCase()]: cur[0] }),
    {}
);

function getDictionary(locale) {
    if (locale === "american-to-british") {
        return [
            americanToBritishTitles,
            americanOnly,
            americanToBritishSpelling,
        ];
    } else if (locale === "british-to-american") {
        return [
            britishToAmericanTitles,
            britishOnly,
            britishToAmericanSpelling,
        ];
    }
}

module.exports = getDictionary;
