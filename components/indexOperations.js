const Index = require("./Index");

function sortIndices(a, b) {
    if (a.start < b.start || (a.start === b.start && a.end > b.end)) {
        return -1;
    } else if (b.start < a.start || (b.start === a.start && b.end > a.end)) {
        return 1;
    } else if (a.start === b.start && a.end === b.end) {
        return 0;
    }
}

function filterIndices(index, i, indices) {
    if (i === 0 || (i > 0 && index.start !== indices[i - 1].start)) {
        return true;
    }

    return false;
}

function getMatchIndices(sentence, matchesArray) {
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
