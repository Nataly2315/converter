const assert = require('assert');
const request = require('supertest');
const app = require('../app');


it('test: return response', function () {
    return request(app)
        .post('/convert')
        .send({"distance": {"unit": "in", "value": 5}, "convert_to": "m"})
        .then(function (response) {
            assert.strictEqual(response.status,200);
            assert.deepStrictEqual(JSON.parse(response.text),{
                "unit": "m",
                "value": "0.13"
            })
        });
});


it('test: request format validation error', function () {
    return request(app)
        .post('/convert')
        .send({})
        .then(function (response) {
            assert.strictEqual(response.status,400);
            assert.deepStrictEqual(JSON.parse(response.text), {
               "error" : "Wrong request format"
            })
        });
});


it('test: not exist unit validation error', function () {
    return request(app)
        .post('/convert')
        .send({"distance": {"unit": "kp", "value": 3}, "convert_to": "m"})
        .then(function (response) {
            assert.strictEqual(response.status,400);
            assert.deepStrictEqual(JSON.parse(response.text), {
                "error" : "Unit kp does not exist in file"
            })
        });
});
