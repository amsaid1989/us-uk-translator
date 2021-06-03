const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", function () {
    suite("Translator", function () {
        suite("translate", function () {
            suite("American to British", function () {
                test("Translate Mangoes are my favorite fruit. to British English", function () {
                    const output = translator.translate(
                        "Mangoes are my favorite fruit.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Mangoes are my favourite fruit."
                    );
                });

                test("Translate I ate yogurt for breakfast. to British English", function () {
                    const output = translator.translate(
                        "I ate yogurt for breakfast.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "I ate yoghurt for breakfast."
                    );
                });

                test("Translate We had a party at my friend's condo. to British English", function () {
                    const output = translator.translate(
                        "We had a party at my friend's condo.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "We had a party at my friend's flat."
                    );
                });

                test("Translate Can you toss this in the trashcan for me? to British English", function () {
                    const output = translator.translate(
                        "Can you toss this in the trashcan for me?",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Can you toss this in the bin for me?"
                    );
                });

                test("Translate The parking lot was full. to British English", function () {
                    const output = translator.translate(
                        "The parking lot was full.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(output.translation, "The car park was full.");
                });

                test("Translate Like a high tech Rube Goldberg machine. to British English", function () {
                    const output = translator.translate(
                        "Like a high tech Rube Goldberg machine.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Like a high tech Heath Robinson device."
                    );
                });

                test("Translate To play hooky means to skip class or work. to British English", function () {
                    const output = translator.translate(
                        "To play hooky means to skip class or work.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "To bunk off means to skip class or work."
                    );
                });

                test("Translate No Mr. Bond, I expect you to die. to British English", function () {
                    const output = translator.translate(
                        "No Mr. Bond, I expect you to die.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "No Mr Bond, I expect you to die."
                    );
                });

                test("Translate Dr. Grosh will see you now. to British English", function () {
                    const output = translator.translate(
                        "Dr. Grosh will see you now.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Dr Grosh will see you now."
                    );
                });

                test("Translate Lunch is at 12:15 today. to British English", function () {
                    const output = translator.translate(
                        "Lunch is at 12:15 today.",
                        "american-to-british"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Lunch is at 12.15 today."
                    );
                });
            });

            suite("British to American", function () {
                test("Translate We watched the footie match for a while. to American English", function () {
                    const output = translator.translate(
                        "We watched the footie match for a while.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "We watched the soccer match for a while."
                    );
                });

                test("Translate Paracetamol takes up to an hour to work. to American English", function () {
                    const output = translator.translate(
                        "Paracetamol takes up to an hour to work.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Tylenol takes up to an hour to work."
                    );
                });

                test("Translate First, caramelise the onions. to American English", function () {
                    const output = translator.translate(
                        "First, caramelise the onions.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "First, caramelize the onions."
                    );
                });

                test("Translate I spent the bank holiday at the funfair. to American English", function () {
                    const output = translator.translate(
                        "I spent the bank holiday at the funfair.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "I spent the public holiday at the carnival."
                    );
                });

                test("Translate I had a bicky then went to the chippy. to American English", function () {
                    const output = translator.translate(
                        "I had a bicky then went to the chippy.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "I had a cookie then went to the fish-and-chip shop."
                    );
                });

                test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
                    const output = translator.translate(
                        "I've just got bits and bobs in my bum bag.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "I've just got odds and ends in my fanny pack."
                    );
                });

                test("Translate The car boot sale at Boxted Airfield was called off. to American English", function () {
                    const output = translator.translate(
                        "The car boot sale at Boxted Airfield was called off.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "The swap meet at Boxted Airfield was called off."
                    );
                });

                test("Translate Have you met Mrs Kalyani? to American English", function () {
                    const output = translator.translate(
                        "Have you met Mrs Kalyani?",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Have you met Mrs. Kalyani?"
                    );
                });

                test("Translate Prof Joyner of King's College, London. to American English", function () {
                    const output = translator.translate(
                        "Prof Joyner of King's College, London.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Prof. Joyner of King's College, London."
                    );
                });

                test("Translate Tea time is usually around 4 or 4.30. to American English", function () {
                    const output = translator.translate(
                        "Tea time is usually around 4 or 4.30.",
                        "british-to-american"
                    );

                    assert.isObject(output);
                    assert.isNotEmpty(output);
                    assert.containsAllKeys(output, [
                        "replacements",
                        "translation",
                    ]);
                    assert.equal(
                        output.translation,
                        "Tea time is usually around 4 or 4:30."
                    );
                });
            });
        });

        suite("highlightTranslation", function () {
            test("Highlight translation in Mangoes are my favorite fruit.", function () {
                const translation = translator.translate(
                    "Mangoes are my favorite fruit.",
                    "american-to-british"
                );

                const highlight = translator.highlightTranslation(translation);

                assert.isString(highlight);
                assert.equal(
                    highlight,
                    'Mangoes are my <span class="highlight">favourite</span> fruit.'
                );
            });

            test("Highlight translation in I ate yogurt for breakfast.", function () {
                const translation = translator.translate(
                    "I ate yogurt for breakfast.",
                    "american-to-british"
                );

                const highlight = translator.highlightTranslation(translation);

                assert.isString(highlight);
                assert.equal(
                    highlight,
                    'I ate <span class="highlight">yoghurt</span> for breakfast.'
                );
            });

            test("Highlight translation in We watched the footie match for a while.", function () {
                const translation = translator.translate(
                    "We watched the footie match for a while.",
                    "british-to-american"
                );

                const highlight = translator.highlightTranslation(translation);

                assert.isString(highlight);
                assert.equal(
                    highlight,
                    'We watched the <span class="highlight">soccer</span> match for a while.'
                );
            });

            test("Highlight translation in Paracetamol takes up to an hour to work.", function () {
                const translation = translator.translate(
                    "Paracetamol takes up to an hour to work.",
                    "british-to-american"
                );

                const highlight = translator.highlightTranslation(translation);

                assert.isString(highlight);
                assert.equal(
                    highlight,
                    '<span class="highlight">Tylenol</span> takes up to an hour to work.'
                );
            });
        });
    });
});
