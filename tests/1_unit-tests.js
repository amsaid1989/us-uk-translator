const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", function () {
    suite("Translator", function () {
        suite("translate", function () {
            suite("American to British", function () {
                test("Translate Mangoes are my favorite fruit. to British English", function () {
                    const translationObj = translator.translate(
                        "Mangoes are my favorite fruit.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Mangoes are my favourite fruit."
                    );
                });

                test("Translate I ate yogurt for breakfast. to British English", function () {
                    const translationObj = translator.translate(
                        "I ate yogurt for breakfast.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "I ate yoghurt for breakfast."
                    );
                });

                test("Translate We had a party at my friend's condo. to British English", function () {
                    const translationObj = translator.translate(
                        "We had a party at my friend's condo.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "We had a party at my friend's flat."
                    );
                });

                test("Translate Can you toss this in the trashcan for me? to British English", function () {
                    const translationObj = translator.translate(
                        "Can you toss this in the trashcan for me?",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Can you toss this in the bin for me?"
                    );
                });

                test("Translate The parking lot was full. to British English", function () {
                    const translationObj = translator.translate(
                        "The parking lot was full.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "The car park was full."
                    );
                });

                test("Translate Like a high tech Rube Goldberg machine. to British English", function () {
                    const translationObj = translator.translate(
                        "Like a high tech Rube Goldberg machine.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Like a high tech Heath Robinson device."
                    );
                });

                test("Translate To play hooky means to skip class or work. to British English", function () {
                    const translationObj = translator.translate(
                        "To play hooky means to skip class or work.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "To bunk off means to skip class or work."
                    );
                });

                test("Translate No Mr. Bond, I expect you to die. to British English", function () {
                    const translationObj = translator.translate(
                        "No Mr. Bond, I expect you to die.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "No Mr Bond, I expect you to die."
                    );
                });

                test("Translate Dr. Grosh will see you now. to British English", function () {
                    const translationObj = translator.translate(
                        "Dr. Grosh will see you now.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Dr Grosh will see you now."
                    );
                });

                test("Translate Lunch is at 12:15 today. to British English", function () {
                    const translationObj = translator.translate(
                        "Lunch is at 12:15 today.",
                        "american-to-british"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Lunch is at 12.15 today."
                    );
                });
            });

            suite("British to American", function () {
                test("Translate We watched the footie match for a while. to American English", function () {
                    const translationObj = translator.translate(
                        "We watched the footie match for a while.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "We watched the soccer match for a while."
                    );
                });

                test("Translate Paracetamol takes up to an hour to work. to American English", function () {
                    const translationObj = translator.translate(
                        "Paracetamol takes up to an hour to work.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Tylenol takes up to an hour to work."
                    );
                });

                test("Translate First, caramelise the onions. to American English", function () {
                    const translationObj = translator.translate(
                        "First, caramelise the onions.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "First, caramelize the onions."
                    );
                });

                test("Translate I spent the bank holiday at the funfair. to American English", function () {
                    const translationObj = translator.translate(
                        "I spent the bank holiday at the funfair.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "I spent the public holiday at the carnival."
                    );
                });

                test("Translate I had a bicky then went to the chippy. to American English", function () {
                    const translationObj = translator.translate(
                        "I had a bicky then went to the chippy.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "I had a cookie then went to the fish-and-chip shop."
                    );
                });

                test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
                    const translationObj = translator.translate(
                        "I've just got bits and bobs in my bum bag.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "I've just got odds and ends in my fanny pack."
                    );
                });

                test("Translate The car boot sale at Boxted Airfield was called off. to American English", function () {
                    const translationObj = translator.translate(
                        "The car boot sale at Boxted Airfield was called off.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "The swap meet at Boxted Airfield was called off."
                    );
                });

                test("Translate Have you met Mrs Kalyani? to American English", function () {
                    const translationObj = translator.translate(
                        "Have you met Mrs Kalyani?",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Have you met Mrs. Kalyani?"
                    );
                });

                test("Translate Prof Joyner of King's College, London. to American English", function () {
                    const translationObj = translator.translate(
                        "Prof Joyner of King's College, London.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Prof. Joyner of King's College, London."
                    );
                });

                test("Translate Tea time is usually around 4 or 4.30. to American English", function () {
                    const translationObj = translator.translate(
                        "Tea time is usually around 4 or 4.30.",
                        "british-to-american"
                    );

                    assert.isNotEmpty(translationObj);
                    assert.containsAllKeys(translationObj, [
                        "indices",
                        "lengths",
                        "translation",
                    ]);
                    assert.equal(
                        translationObj.translation,
                        "Tea time is usually around 4 or 4:30."
                    );
                });
            });
        });
    });
});
