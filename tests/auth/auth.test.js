const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const User = require('../../models/users');


let user;

describe("User", () => {

    after((done) => {
        User.collection.deleteMany({}, (err, response) => {
            if (err) { done(err) } else { done();}
        });
    })

    it("should create a user and return access token", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            "name" : "Murunga Kibaara",
            "email": "murungakibaara@gmail.com",
            "role": "doctor",
            "password": "password"
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(201)
            expect(res.body.data).to.have.property("accessToken")

            if (err) { done(err) } else { done();}
        })
    })


    it("should not create a user with an existing email", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            "name" : "Murunga Kibaara",
            "email": "murungakibaara@gmail.com",
            "role": "doctor",
            "password": "password"
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(400)
            expect(res.body).to.have.property("error")
            if (err) { done(err) } else { done();}
        })
    })


    it("should not create a user with a missing field", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            "name" : "Murunga Kibaara",
            "email": "murungakibaara@gmail.com",
            "role": "doctor",
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(400)
            expect(res.body).to.have.property("error")
            if (err) { done(err) } else { done();}
        })
    })


    it("should sign in an existing user and return access token", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signin')
        .send({
            "email": "murungakibaara@gmail.com",
            "password": "password"
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body.data).to.have.property("accessToken")

            if (err) { done(err) } else { done();}
        })
    })

    it("should not sign in a user with wrong password", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signin')
        .send({
            "email": "murungakibaara@gmail.com",
            "password": "wrongpass"
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(400)
            expect(res.body).to.have.property("error")

            if (err) { done(err) } else { done();}
        })
    })

    it("should not sign in a user with missing field", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signin')
        .send({
            "email": "murunga@gmail.com",
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(400)
            expect(res.body).to.have.property("error")

            if (err) { done(err) } else { done();}
        })
    })


    it("should not sign in a user who doesn't exist", (done) => {
        request('http://localhost:4000')
        .post('/api/auth/signin')
        .send({
            "email": "murunga@gmail.com",
            "password": "password"
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(400)
            expect(res.body).to.have.property("error")

            if (err) { done(err) } else { done();}
        })
    })






})
