// HELPER FUNCTIONS
const sentenceOp = require("./sentenceOperations");
const getMatches = require("./wordOperations");
const getMatchIndices = require("./indexOperations");
const swapMatches = require("./translationDataOperations");

class Translator {
    translate(string, locale) {
        let output = sentenceOp.formatTime(string, locale);

        const originalSentence = output.translation;
        output.translation = output.translation.toLowerCase();

        const phrases = sentenceOp
            .getVaryingLengthPhrases(output.translation)
            .sort((a, b) => b.length - a.length);

        const matches = getMatches(phrases, locale);

        const indices = getMatchIndices(output.translation, matches);

        output.translation = sentenceOp.restoreCase(
            output.translation,
            originalSentence,
            indices
        );

        output = swapMatches(output, matches, locale);

        return output;
    }
}

module.exports = Translator;
