const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const User = require('../../models/users');
const Appointment = require('../../models/appointments')

let user;
let id;
let appointment;

describe("Appointments", () => {
    before((done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            name: "tester",
            role: "user",
            email: "t@t.com",
            password: "test"
        })
        .end((err, res) => {
            token = res.body.data.accessToken
            if (err) {done(err) } else {done()} })
    });

    after((done) => {
        User.collection.deleteMany({}, (err, response) => {
            if (err) { done(err) } else { done();}
        });
    })

    after((done) => {
        Appointment.collection.deleteMany({}, (err, response) => {
            if (err) { done(err) } else { done();}
        });
    })

    it("should create an appointment with authorization", (done) => {
        request('http://localhost:4000')
        .post('/api/appointments')
        .set({ Authorization: `Bearer ${token}` })
        .send({
            start: Date.now(),
            finish: Date.now(),
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(201)
            if (err) {done(err)} else {done()}
        })
    })

    it("should not create an appointment without authorization", (done) => {
        request('http://localhost:4000')
        .post('/api/appointments')
        .send({
            start: Date.now(),
            finish: Date.now(),
        })
        .end((err, res) => {
            expect(res.status).to.be.eq(400)
            if (err) {done(err)} else {done()}
        })
    })
})