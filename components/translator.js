// HELPER FUNCTIONS
const sentenceOp = require("./sentenceOperations");
const getMatches = require("./phraseOperations");
const getMatchIndices = require("./indexOperations");
const swapMatches = require("./translationDataOperations");

class Translator {
    translate(string, locale) {
        let output = sentenceOp.formatTime(string, locale);

        const originalSentence = output.translation;
        output.translation = output.translation.toLowerCase();

        // Generate a set of different phrases from the provided
        // sentence and sort them in descending order based on
        // their lengths.
        const phrases = sentenceOp
            .getVaryingLengthPhrases(output.translation)
            .sort((a, b) => b.length - a.length);

        // Check the generated phrases against the locale
        // dictionaries and see if any of these phrases exists in
        // any of the dictionaries. The phrases that do exist
        // will be included in the array returned from the
        // getMatches function.
        const matches = getMatches(phrases, locale);

        // Use the array of the matched phrases and find where
        // each of these phrases actually start and end in the
        // sentence that will be translated.
        const indices = getMatchIndices(output.translation, matches);

        output.translation = sentenceOp.restoreCase(
            output.translation,
            originalSentence,
            indices
        );

        output = swapMatches(output, matches, locale);

        return output;
    }

    highlightTranslation(translationData) {
        /*
         * Highlights the translated phrases in the translation property
         * of the provided translationData object. It wraps each phrase
         * with a <span class="highlight"></span> HTML element and then
         * return the final translation as a string.
         */
        let output;

        for (const replacement of translationData.replacements) {
            const regex = new RegExp(replacement, "g");

            output = translationData.translation.replace(regex, (match) => {
                return `<span class="highlight">${match}</span>`;
            });
        }

        return output;
    }
}

module.exports = Translator;
