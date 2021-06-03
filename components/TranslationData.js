class TranslationData {
    /*
     * A simple object that is returned by the translate
     * method of the Translator class to contain some
     * information about the translated text.
     *
     * The translated boolean indicates whether the
     * method did any translation or not.
     *
     * The replacements array will be used by the highlight
     * method to highlight the translations in the
     * output.
     *
     * The translation string will hold the translated
     * sentence.
     */
    constructor(translation) {
        this.translated = false;
        this.replacements = [];
        this.translation = translation;
    }
}

module.exports = TranslationData;
