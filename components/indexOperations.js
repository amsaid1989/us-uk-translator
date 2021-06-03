const Index = require("./Index");

function sortIndices(a, b) {
    /*
     * Sorts two Index objects based on their start and end values.
     * The object with the smaller start value comes first.
     *
     * If two Index objects have the same start value, then the one
     * with the greater end value is sorted first. This is because
     * a greater end value means a longer phrase, and the translator
     * handles longer phrases first.
     *
     * If both start and end are equal in the same objects, then
     * they are treated as equal objects.
     */
    if (a.start < b.start || (a.start === b.start && a.end > b.end)) {
        return -1;
    } else if (b.start < a.start || (b.start === a.start && b.end > a.end)) {
        return 1;
    } else if (a.start === b.start && a.end === b.end) {
        return 0;
    }
}

function filterIndices(index, i, indices) {
    /*
     * A helper function that removes indices with duplicate start
     * values leaving only the one with the greater end value.
     */
    if (i === 0 || (i > 0 && index.start !== indices[i - 1].start)) {
        return true;
    }

    return false;
}

function getMatchIndices(sentence, matchesArray) {
    /*
     * This function takes an array of phrases that are in the
     * provided sentence and that will be translated. It finds
     * these phrases in the sentence and returns a sorted array
     * of Index objects that contain information on where
     * exactly each of these phrases start and end.
     */
    let indices = [];

    for (const match of matchesArray) {
        const regex = new RegExp(match, "g");

        for (const result of sentence.matchAll(regex)) {
            const startIndex = result.index;
            const endIndex = startIndex + match.length;

            indices.push(new Index(startIndex, endIndex));
        }
    }

    return indices.sort(sortIndices).filter(filterIndices);
}

module.exports = getMatchIndices;
