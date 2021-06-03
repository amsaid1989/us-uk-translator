# [Quality Assurance Projects - American / British Translator](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator)

## Introduction

This is my submission for the freeCodeCamp [American British Translator](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator) project.

The phrases that can be translated between the two locales were provided by freeCodeCamp as a bunch of Javascript objects.

The obvious solution to this challenge would have been to loop through each object, checking if any of the phrases in it exist in the text, and then translating these phrases.

However, I wanted to try a different approach.

## Rationale

The phrase objects provided are fairly small in size, so looping through them wouldn't have been a major issue.

However, I tried to imagine a situation where these objects are much larger, with thousands or tens of thousands of phrases across all of them. This means that looping through them would take much longer, probably way too long, making this simple project very annoying to use.

Therefore, I wanted to go the other way around. Start from the text provided, break it down into phrases and then search for those specific phrases in the dictionaries.

## Breaking down my approach

The logic is broken into several modules that all live under the `components` directory.

The main module is the `translator.js`, which declares a `Translator` class with a `translate` method. This method uses the other modules to produce the final translated text.

Aside from the modules that contain the dictionary objects and the `translator.js` module itself, there are **7** modules in the `components` directory:

1) `dictionaries.js` This organises the dictionary objects provided by freeCodeCamp and provides a `getDictionary` function that returns the necessary dictionaries to translate from one locale to the other.
2) `sentenceOperations.js` This provides a group of functions that operate on a full string of text.
3) `phraseOperations.js` This provides the `getMatches` function which operates on the phrases that are genereated from each string.
4) `Index.js` This provides a simple object that has two properties: `start` and `end`. It will be used to indicate the start and end positions of a phrase within a string of text.
5) `indexOperations.js` This provides the `getMatchIndices` function which returns an array of `Index` objects for the phrases that will be translated.
6) `TranslationData.js` This provides another simple object that will include some information about the translated text and that will be returned from the `translate` method to later be used by the `highlightTranslation` method of the `Translator` class.
7) `translationDataOperations.js` This provides the `swapMatches` function which operates on a `TranslationData` object. This is the function that actually performs the translation.

#### Generating phrases from a string of text

The key part of my approach to this project is generating phrases from the provided text.

The way I achieve that is by going through the text, splitting it into single words. I then split it again into 2-word, 3-word, 4-word and 5-word phrases using the `splitString` function inside the `sentenceOperations.js` module.

Finally, I return all of these phrases in an array.

#### Matching the phrases against the dictionaries

Using this array of phrases, I start by sorting it in descending order based on the length of the phrase. This is to make sure that the translation process actually translates full phrases first before handling separate words. For instance, if we have a sentence that includes the British phrase **car boot sale**. This full phrase in American translates to **swap meet**. However, the phrase **car boot** on its own translates to **trunk**. If the phrases were not sorted in descending order, then the phrase **car boot** might be translated first into **trunk** making the final translation **trunk sale** which is not the intended meaning.

Next, I loop through the array, comparing each phrase against the dictionaries to see if it exists in any of them. If it does, the phrase gets added to an array of unique matches.

This all happens inside the `getMatches` function of the `phraseOperations.js` module.

#### Locating the matched phrases in the text

The next piece of the puzzle is the `getMatchIndices` function from the `indexOperations.js` module.

This takes the original text and the array of matched phrases and gets the start and end indices of each of these phrases in the text.

These indices will be used by the rest of the logic to restore the character case of the output text, since the `translate` method converts it to lowercase for easier comparison.

These are the key parts of my approach to this project. There are other functions used of course, but these are the main ones that enables me to start from the text to be translated rather than looping through the full dictionaries provided by freeCodeCamp.
