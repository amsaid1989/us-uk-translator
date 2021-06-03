// IMPORT ALL DICTIONARIES
const getDictionary = require("./dictionaries");

function removePunctuationMarks(phrase) {
    /*
     * Remove any punctuation marks from the end of the
     * provided phrase, so the translator can handle the
     * phrase properly.
     *
     * The punctuation marks will still be included in
     * the final translation.
     */
    const punctuation = [".", ",", ";", "?", "!"];
    const phraseLength = phrase.length;
    const lastChar = phrase[phraseLength - 1];

    return punctuation.includes(lastChar)
        ? phrase.slice(0, phraseLength - 1)
        : phrase;
}

function matchPhrases(phraseArray, matchesArray, dict, removePunctuationBool) {
    /*
     * Takes an array of phrases, and looks for each phrase
     * in the provided dictionary.
     *
     * If it finds that phrase, then it adds it to the
     * provided matches array. (NOTE: The function doesn't
     * modify the actual array. Instead, it copies it,
     * modifies this copy, and then returns it)
     *
     * The removePunctuationBool is used to indicate whether
     * any punctuation marks need to be removed or not
     * before looking for the phrase in the dictionary. This
     * is needed because the titles dictionary includes the
     * punctuation marks in the phrase, while the others
     * don't.
     */
    let matches = matchesArray;

    for (const phrase of phraseArray) {
        const key = removePunctuationBool
            ? removePunctuationMarks(phrase)
            : phrase;

        if (dict[key]) {
            matches.push(key);
        }
    }

    // Return the matches removing any duplicates
    return Array.from(new Set(matches));
}

function getMatches(phrases, locale) {
    /*
     * The entry point of the module which takes the phrases
     * array, finds any matches for them in the locale
     * dictionaries, before returning the matches array.
     */
    const dictionary = getDictionary(locale);
    const titles = dictionary[0];
    const wordsAndIdioms = dictionary.slice(1);

    let matches = matchPhrases(phrases, [], titles, false);
    matches = matchPhrases(phrases, matches, wordsAndIdioms[0], true);
    matches = matchPhrases(phrases, matches, wordsAndIdioms[1], true);

    return matches;
}

module.exports = getMatches;
