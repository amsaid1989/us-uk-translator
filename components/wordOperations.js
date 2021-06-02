// IMPORT ALL DICTIONARIES
const getDictionary = require("./dictionaries");

function removePunctuationMarks(phrase) {
    const punctuation = [".", ",", ";", "?", "!"];
    const phraseLength = phrase.length;
    const lastChar = phrase[phraseLength - 1];

    return punctuation.includes(lastChar)
        ? phrase.slice(0, phraseLength - 1)
        : phrase;
}

function matchPhrases(phraseArray, matchesArray, dict, removePuctuationBool) {
    let matches = matchesArray;

    for (const phrase of phraseArray) {
        const key = removePuctuationBool
            ? removePunctuationMarks(phrase)
            : phrase;

        if (dict[key]) {
            matches.push(key);
        }
    }

    return Array.from(new Set(matches));
}

function getMatches(phrases, locale) {
    const dictionary = getDictionary(locale);
    const titles = dictionary[0];
    const wordsAndIdioms = dictionary.slice(1);

    let matches = matchPhrases(phrases, [], titles, false);
    matches = matchPhrases(phrases, matches, wordsAndIdioms[0], true);
    matches = matchPhrases(phrases, matches, wordsAndIdioms[1], true);

    return matches;
}

module.exports = getMatches;
