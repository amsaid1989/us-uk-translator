// IMPORT ALL DICTIONARIES
const getDictionary = require("./dictionaries");

function swapMatches(translationData, matchesArray, locale) {
    if (matchesArray.length === 0) {
        return translationData;
    }

    let output = translationData;

    const dictionaries = getDictionary(locale);

    for (const dict of dictionaries) {
        for (const match of matchesArray) {
            const regex = new RegExp(match, "g");

            if (dict[match]) {
                output.replacements.push(dict[match]);
                output.translation = output.translation.replace(
                    regex,
                    dict[match]
                );
            }
        }
    }

    output.replacements = Array.from(new Set(output.replacements));

    return output;
}

module.exports = swapMatches;
