class Index {
    /*
     * A simple object that stores two properties.
     * start: is the start index of a word in a sentence.
     * end: is the end index of that same word.
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

module.exports = Index;
