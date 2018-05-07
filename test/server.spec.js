var chai = require('chai');
//var request = require('request');
var expect = chai.expect;
var chaiHttp = require('chai-http');

// Add promise support if this does not exist natively.
if (!global.Promise) {
    global.Promise = require('q');
}

chai.use(chaiHttp);

describe('Validating basic server setup', function () {
    describe('HTTP Server Should Be Healthy', function () {
        const http_health_url = 'http://localhost:3003';
        it("http returns status 200", function () {
            chai.request(http_health_url).get('/v1/health').end((err, res, body) => {
                expect(res.statusCode).to.not.be.null.and.to.not.be.undefined;
                expect(res.statusCode).to.equal(200);
            });
        });
        it("http returns health object", function () {
            chai.request(http_health_url).get('/v1/health').end((err, res, body) => {
                expect(body).to.not.be.null.and.to.not.be.undefined;
                expect(body).to.equal({
                    health: 'UP'
                });
            });
        });
        it("http returns status 500", function () {
            chai.request(http_health_url).get('/v1/health').end((err, res, body) => {
                expect(res.statusCode).to.not.be.null.and.to.not.be.undefined;
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        it("http returns health object with down", function () {
            chai.request(http_health_url).get('/v1/health').end((err, res, body) => {
                expect(body).to.not.be.null.and.to.not.be.undefined;
                expect(body).to.equal({
                    health: 'DOWN'
                });
                done();
            });
        });

    });

    describe('HTTPS Server Should Be Healthy', function () {
        const https_health_url = 'https://localhost:3443';
        it("https returns status 200", function () {
            chai.request(https_health_url).get('/v1/health').end((err, res, body) => {
                expect(res.statusCode).to.not.be.null.and.to.not.be.undefined;
                expect(res).to.have.status(200);
            });
        });

        it("https returns health object", function () {
            chai.request(https_health_url).get('/v1/health').end((err, res, body) => {
                expect(body).to.not.be.null.and.to.not.be.undefined;
                expect(body).to.equal({
                    health: 'UP'
                });
            });
        });

        it("https returns status 500", function () {
            chai.request(https_health_url).get('/v1/health').end((err, res, body) => {
                expect(res.statusCode).to.not.be.null.and.to.not.be.undefined;
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        it("https returns health object with down", function () {
            chai.request(https_health_url).get('/v1/health').end((err, res, body) => {
                expect(body).to.not.be.null.and.to.not.be.undefined;
                expect(body).to.equal({
                    health: 'DOWN'
                });
                done();
            });
        });

    });

});