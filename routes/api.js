"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
    const translator = new Translator();

    app.route("/api/translate").post((req, res) => {
        const text = req.body.text;
        const locale = req.body.locale;

        if (
            !req.body.hasOwnProperty("text") ||
            !req.body.hasOwnProperty("locale")
        ) {
            res.json({ error: "Required field(s) missing" });
        } else if (text === "") {
            res.json({ error: "No text to translate" });
        } else if (
            locale !== "american-to-british" &&
            locale !== "british-to-american"
        ) {
            res.json({ error: "Invalid value for locale field" });
        } else {
            const translation = translator.translate(text, locale);

            if (!translation.translated) {
                res.json({
                    text: text,
                    translation: "Everything looks good to me!",
                });
            } else {
                const highlight = translator.highlightTranslation(translation);

                res.json({ text: text, translation: highlight });
            }
        }
    });
};
