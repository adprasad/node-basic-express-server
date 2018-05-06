var chai = require('chai');
//var request = require('request');
var expect = chai.expect;
var chaiHttp = require('chai-http');
// Add promise support if this does not exist natively.
if (!global.Promise) {
    global.Promise = require('q');
}

chai.use(chaiHttp);

describe('When using google for authentication', function () {
    const BASE_URL = 'https://localhost:3443';
    describe('When request valid request is made', function () {
        it('Should redirect to home', function () {
            chai.request(BASE_URL)
                .get('/auth/google/callback')
                .end((err, res) => {
                    expect(res).to.have.cookie('sessionid');
                    expect(res).to.not.be.null.and.to.not.be.undefined;
                    expect(res.status).to.equal(200);
                    expect(res).to.redirectTo('/');
                });
        });
    }); // End of describe
    describe('When request invalid request is made', function () {
        it('Then should redirect to login', function () {
            chai.request(BASE_URL)
                .get('/auth/google/callback')
                .end((err, res) => {
                    expect(res).to.have.cookie('sessionid');
                    expect(res).to.not.be.null.and.to.not.be.undefined;
                    expect(res.status).to.not.equal(200);
                    expect(res).to.redirectTo('/login');
                });
        });
    }); // End of describe
    describe('When request valid request is made but user is already logged in', function () {
        it('Should redirect to home', function () {
            
            chai.request(BASE_URL)
                .get('/auth/google')
                .end((err, res) => {
                    expect(res).to.have.cookie('sessionid');
                    expect(res).to.not.be.null.and.to.not.be.undefined;
                    expect(res.status).to.equal(200);
                    expect(res).to.redirectTo('/');
                });
        });
    }); // End of describe
});