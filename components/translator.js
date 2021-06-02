const americanPhrases = require("./american-only.js");

// Make sure all phrases are lowercase
const americanOnly = Object.entries(americanPhrases).reduce(
    (obj, cur) => ({ ...obj, [cur[0].toLowerCase()]: cur[1].toLowerCase() }),
    {}
);

const britishPhrases = require("./british-only.js");

// Make sure all phrases are lowercase
const britishOnly = Object.entries(britishPhrases).reduce(
    (obj, cur) => ({ ...obj, [cur[0].toLowerCase()]: cur[1].toLowerCase() }),
    {}
);

const spelling = require("./american-to-british-spelling.js");

// Make sure all spelling phrases are lowercase
const americanToBritishSpelling = Object.entries(spelling).reduce(
    (obj, cur) => ({ ...obj, [cur[0].toLowerCase()]: cur[1].toLowerCase() }),
    {}
);
// Swap the objects keys and values to make searching for British phrases easier
const britishToAmericanSpelling = Object.entries(
    americanToBritishSpelling
).reduce((obj, cur) => ({ ...obj, [cur[1]]: cur[0] }), {});

const titles = require("./american-to-british-titles.js");

// Make sure all titles are lowercase
const americanToBritishTitles = Object.entries(titles).reduce(
    (obj, cur) => ({ ...obj, [cur[0].toLowerCase()]: cur[1].toLowerCase() }),
    {}
);
// Swap the objects keys and values to make searching for British phrases easier
const britishToAmericanTitles = Object.entries(americanToBritishTitles).reduce(
    (obj, cur) => ({ ...obj, [cur[1]]: cur[0] }),
    {}
);

function TranslationData(translation) {
    this.matches = [];
    this.originalIndices = [];
    this.originalLengths = [];
    this.indices = [];
    this.lengths = [];
    this.translation = translation;
}

// HELPER FUNCTIONS
function splitString(str, length) {
    /*
     * Takes a string and a number for length. Length defines how the string is
     * going to be split. If the length is less than 1, then it returns an empty
     * array. If the length equals 1, it will just split the string into words.
     * If the length is greater than 1, then the function will split the string
     * into phrases that each has an n number of words where n equals length. It
     * achieves that by concatenating as many previous words as possible to the
     * current word. If there are not enough words to match the length, then it
     * just returns what is available.
     */
    if (length < 1) {
        return [];
    } else if (length === 1) {
        return str.split(" ");
    } else {
        const splitSentence = str.split(" ");

        return splitSentence.map((word, idx) => {
            /*
             * Get the start index where the splitSentence array will be sliced.
             * This is done by going backwards from the current index by the
             * length amount plus 1. We add 1 here, so the final length of the
             * phrase will be equal to the length specified as an argument. If we
             * don't add 1, the length of the phrase will be 1 word longer than
             * the specified length.
             *
             * EXAMPLE:
             * Take the sentence: I want to learn programming.
             * Let's say we want to split it into phrases that are each 2 words long.
             * If we are currently at the word 'learn', then the current index is 3.
             * If we subtract 2, then the start index would be 1.
             * When we use the function slice(start, index), this would be slice(1, 3),
             * which will give us the words 'want to'.
             * When concatenated to 'learn', the resultant phrase would be 'want to learn',
             * which is 3 words long rather than 2.
             */
            let start = idx - length + 1;

            while (start < 0) {
                ++start;
            }

            return [...splitSentence.slice(start, idx), word].join(" ");
        });
    }
}

function getVaryingLengthPhrases(str) {
    const oneWord = str.split(" ");
    const twoWord = splitString(str, 2);
    const threeWord = splitString(str, 3);
    const fourWord = splitString(str, 4);
    const fiveWord = splitString(str, 5);

    return [...oneWord, ...twoWord, ...threeWord, ...fourWord, ...fiveWord];
}

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

function translateNonTitles(phrase, dict) {
    const punctuation = [".", ",", ";", "?", "!"];
    const lastChar = phrase[phrase.length - 1];

    let appendChar = false;

    if (punctuation.includes(lastChar)) {
        phrase = phrase.slice(0, phrase.length - 1);

        appendChar = true;
    }

    const translation = dict[phrase];

    if (translation && appendChar) {
        return translation + lastChar;
    } else if (translation) {
        return translation;
    }
}

function translateTime(sentence, locale) {
    let output = new TranslationData(sentence);

    if (locale === "american-to-british") {
        const regex = /(\d{1,2}):(\d{1,2})/g;
        output.translation = output.translation.replace(
            regex,
            (match, p1, p2, offset) => {
                output.matches.push(match);
                output.originalIndices.push(offset);
                output.indices.push(offset);
                output.originalLengths.push(match.length);
                output.lengths.push(match.length);
                return `${p1}.${p2}`;
            }
        );
    } else if (locale === "british-to-american") {
        const regex = /(\d{1,2}).(\d{1,2})/g;
        output.translation = output.translation.replace(
            regex,
            (match, p1, p2, offset) => {
                output.matches.push(match);
                output.originalIndices.push(offset);
                output.indices.push(offset);
                output.originalLengths.push(match.length);
                output.lengths.push(match.length);
                return `${p1}:${p2}`;
            }
        );
    }

    return output;
}

function checkAndUpdateCase(translation, match) {
    let output = translation;
    let loopLength;

    if (
        translation.length === match.length ||
        translation.length < match.length
    ) {
        loopLength = translation.length;
    } else {
        loopLength = match.length;
    }

    for (let i = 0; i < loopLength; i++) {
        const matchFirstChar = match[i][0];
        const translationFirstChar = output[i][0];

        if (matchFirstChar.toUpperCase() === matchFirstChar) {
            output[i] = translationFirstChar.toUpperCase() + output[i].slice(1);
        }
    }

    return output;
}

function matchCase(originalSentence, translationData) {
    let output = translationData;

    for (let i = 0; i < output.indices.length; i++) {
        const index = output.indices[i];
        const originalIndex = output.originalIndices[i];
        const length = output.lengths[i];
        const originalLength = output.originalLengths[i];
        let translation = output.translation
            .slice(index, index + length)
            .split(" ");
        const match = originalSentence
            .slice(originalIndex, originalIndex + originalLength)
            .split(" ");

        translation = checkAndUpdateCase(translation, match);

        output.translation =
            originalSentence.slice(0, originalIndex) +
            translation.join(" ") +
            originalSentence.slice(originalIndex + originalLength);
    }

    return output;
}

class Translator {
    translate(string, locale) {
        let output = translateTime(string, locale);
        const originalSentence = output.translation;
        output.translation = output.translation.toLowerCase();

        const phrases = getVaryingLengthPhrases(originalSentence).sort(
            (a, b) => b.length - a.length
        );

        const dictionary = getDictionary(locale);
        const titles = dictionary[0];
        const wordsAndIdioms = dictionary.slice(1);

        for (let phrase of phrases) {
            phrase = phrase.toLowerCase();

            let replacement;

            if (titles[phrase]) {
                replacement = titles[phrase];
            } else {
                for (let dict of wordsAndIdioms) {
                    const translation = translateNonTitles(phrase, dict);
                    if (translation) {
                        replacement = translation;
                    }
                }
            }

            if (replacement) {
                const match = output.translation.match(phrase);

                if (match) {
                    output.matches.push(
                        originalSentence.slice(
                            match.index,
                            match.index + phrase.length
                        )
                    );

                    output.originalIndices.push(match.index);
                    output.originalLengths.push(phrase.length);
                    output.lengths.push(replacement.length);

                    output.translation = output.translation.replace(
                        phrase,
                        replacement
                    );

                    output.indices.push(
                        output.translation.match(replacement).index
                    );
                }
            }
        }

        output.originalIndices = Array.from(new Set(output.originalIndices));
        output.originalLengths = Array.from(new Set(output.originalLengths));
        output.indices = Array.from(new Set(output.indices));
        output.lengths = Array.from(new Set(output.lengths));

        return matchCase(originalSentence, output);
    }
}

module.exports = Translator;
