// IMPORT OBJECTS
const TranslationData = require("./TranslationData");

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
    /*
     * Takes a string and generates different phrases with varying
     * lengths.
     *
     * Currently, it only generates phrases that are maximum 5-words-
     * long. However, this could be made more dynamic, by giving the
     * user a choice of the maximum length they require, or by
     * checking it against the available dictionaries to determine
     * what is the longest phrase stored.
     */
    const oneWord = str.split(" ");
    const twoWord = splitString(str, 2);
    const threeWord = splitString(str, 3);
    const fourWord = splitString(str, 4);
    const fiveWord = splitString(str, 5);

    return [...oneWord, ...twoWord, ...threeWord, ...fourWord, ...fiveWord];
}

function restoreCase(sentence, originalSentence, indicesArray) {
    /*
     * Because the Tanslator object converts the sentence to lowercase
     * to check it against the dictionaries, this function restores
     * the case for the words of the sentence that weren't translated.
     *
     * It does that by using the indicesArray which includes the Index
     * objects of all the phrases that will be translated. It uses these
     * indices to swap them into the original sentence.
     *
     * The sentence argument contains the lowercase version of the original
     * sentence. Up to this point, the sentence hasn't been translated
     * yet.
     */

    // If nothing was translated, then just return the original sentence
    if (indicesArray.length === 0) {
        return originalSentence;
    }

    let output = [];

    for (let i = 0; i < indicesArray.length; i++) {
        // Get the current Index object from the indices array as well
        // as the next Index object, if we are not at the last Index
        const curIndex = indicesArray[i];
        const nextIndex =
            i < indicesArray.length - 1 ? indicesArray[i + 1] : null;

        // If the current Index is the first in the array, then get
        // all words that come before from the start of the original
        // sentence, up to the start value of the current Index
        if (i === 0) {
            output.push(originalSentence.slice(0, curIndex.start));
        }

        output.push(sentence.slice(curIndex.start, curIndex.end));

        // If there is a next Index, and its start value is not the
        // same as the start value of the current Index, then get
        // all the words that come between the current Index and the
        // next one.
        if (nextIndex && nextIndex.start !== curIndex.start) {
            output.push(originalSentence.slice(curIndex.end, nextIndex.start));
        }

        // If current Index is the last in the array, then get all
        // words after the end value of the current Index and up to
        // the ending of the original sentence.
        if (i === indicesArray.length - 1) {
            output.push(originalSentence.slice(curIndex.end));
        }
    }

    return output.join("");
}

function formatTime(sentence, locale) {
    /*
     * Change the format of the any time string according to
     * the provided locale.
     */

    // Create the TranslationData object that will be passed
    // to the translate method and eventually returned from it.
    let output = new TranslationData(sentence);

    if (locale === "american-to-british") {
        const regex = /(\d{1,2}):(\d{1,2})/g;
        output.translation = output.translation.replace(
            regex,
            (match, p1, p2) => {
                const replacement = `${p1}.${p2}`;

                output.translated = true;
                output.replacements.push(replacement);

                return replacement;
            }
        );
    } else if (locale === "british-to-american") {
        const regex = /(\d{1,2}).(\d{1,2})/g;
        output.translation = output.translation.replace(
            regex,
            (match, p1, p2, offset) => {
                const replacement = `${p1}:${p2}`;

                output.translated = true;
                output.replacements.push(replacement);

                return replacement;
            }
        );
    }

    return output;
}

module.exports = { getVaryingLengthPhrases, restoreCase, formatTime };
