const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", function () {
    suite("/api/translate", function () {
        suite("POST", function () {
            test("Translation with text and locale fields: POST request to /api/translate", function (done) {
                chai.request(server)
                    .post("/api/translate")
                    .send({
                        text: "I want to play footie today.",
                        locale: "british-to-american",
                    })
                    .then((res) => {
                        assert.ok(res);
                        assert.equal(res.status, 200);
                        assert.isNotEmpty(res.body);
                        assert.containsAllKeys(res.body, [
                            "text",
                            "translation",
                        ]);
                        assert.equal(
                            res.body.translation,
                            'I want to play <span class="highlight">soccer</span> today.'
                        );

                        done();
                    })
                    .catch((err) => {
                        console.error(err);

                        done(err);
                    });
            });

            test("Translation with text and invalid locale field: POST request to /api/translate", function (done) {
                chai.request(server)
                    .post("/api/translate")
                    .send({
                        text: "I want to play footie today.",
                        locale: "british-to-arabic",
                    })
                    .then((res) => {
                        assert.ok(res);
                        assert.equal(res.status, 200);
                        assert.isNotEmpty(res.body);
                        assert.containsAllKeys(res.body, ["error"]);
                        assert.equal(
                            res.body.error,
                            "Invalid value for locale field"
                        );

                        done();
                    })
                    .catch((err) => {
                        console.error(err);

                        done(err);
                    });
            });

            test("Translation with missing text field: POST request to /api/translate", function (done) {
                chai.request(server)
                    .post("/api/translate")
                    .send({
                        locale: "british-to-american",
                    })
                    .then((res) => {
                        assert.ok(res);
                        assert.equal(res.status, 200);
                        assert.isNotEmpty(res.body);
                        assert.containsAllKeys(res.body, ["error"]);
                        assert.equal(
                            res.body.error,
                            "Required field(s) missing"
                        );

                        done();
                    })
                    .catch((err) => {
                        console.error(err);

                        done(err);
                    });
            });

            test("Translation with missing locale field: POST request to /api/translate", function (done) {
                chai.request(server)
                    .post("/api/translate")
                    .send({
                        text: "I want to play footie today.",
                    })
                    .then((res) => {
                        assert.ok(res);
                        assert.equal(res.status, 200);
                        assert.isNotEmpty(res.body);
                        assert.containsAllKeys(res.body, ["error"]);
                        assert.equal(
                            res.body.error,
                            "Required field(s) missing"
                        );

                        done();
                    })
                    .catch((err) => {
                        console.error(err);

                        done(err);
                    });
            });

            test("Translation with empty text: POST request to /api/translate", function (done) {
                chai.request(server)
                    .post("/api/translate")
                    .send({
                        text: "",
                        locale: "british-to-american",
                    })
                    .then((res) => {
                        assert.ok(res);
                        assert.equal(res.status, 200);
                        assert.isNotEmpty(res.body);
                        assert.containsAllKeys(res.body, ["error"]);
                        assert.equal(res.body.error, "No text to translate");

                        done();
                    })
                    .catch((err) => {
                        console.error(err);

                        done(err);
                    });
            });

            test("Translation with text that needs no translation: POST request to /api/translate", function (done) {
                chai.request(server)
                    .post("/api/translate")
                    .send({
                        text: "I want to play footie today.",
                        locale: "american-to-british",
                    })
                    .then((res) => {
                        assert.ok(res);
                        assert.equal(res.status, 200);
                        assert.isNotEmpty(res.body);
                        assert.containsAllKeys(res.body, [
                            "text",
                            "translation",
                        ]);
                        assert.equal(
                            res.body.translation,
                            "Everything looks good to me!"
                        );

                        done();
                    })
                    .catch((err) => {
                        console.error(err);

                        done(err);
                    });
            });
        });
    });
});
