const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const User = require('../../models/users');
const Appointment = require('../../models/appointments')

let id;
let doctor;

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

    before((done) => {
        request('http://localhost:4000')
        .post('/api/auth/signup')
        .send({
            name: "tester",
            role: "doctor",
            email: "dcotari@t.com",
            password: "test"
        })
        .end((err, res) => {
            admintoken = res.body.data.accessToken
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

    it("should not get appointments without authorization", (done) => {
        request('http://localhost:4000')
        .get('/api/appointments')
        .end((err, res) => {
            
            expect(res.status).to.be.eq(400)
            if (err) {done(err)} else {done()}
        })
    })

    it("should get appointments with authorization", (done) => {
        request('http://localhost:4000')
        .get('/api/appointments')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
            for (var i = 0; i < res.body.length; i++) {
                id = res.body[i]._id;
            }

            expect(res.status).to.be.eq(200)
            if (err) {done(err)} else {done()}
        })
    })

    it("should not update appointments with authorization", (done) => {
        request('http://localhost:4000')
        .put(`/api/appointments/${id}`)
        .send({ state: 'cancelled' })
        .end((err, res) => {
            expect(res.status).to.be.eq(400)
            if (err) {done(err)} else {done()}
        })
    })

    it("should update appointments with authorization", (done) => {
        request('http://localhost:4000')
        .put(`/api/appointments/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ state: 'cancelled' })
        .end((err, res) => {
            expect(res.status).to.be.eq(200)
            if (err) {done(err)} else {done()}
        })
    })
        // TODO: Add endpoint and create test for allowing doctors to view all records
    it("should allow doctors to view all appointments", (done) => {
        request('http://localhost:4000')
        .get(`/api/appointments`)
        .set({ Authorization: `Bearer ${admintoken}` })
        .end((err, res) => {
            expect(res.body.length).to.be.eq(1)
            expect(res.status).to.be.eq(200)
            if (err) {done(err)} else {done()}
        })
    })


    it("should not delete appointments without authorization", (done) => {
        request('http://localhost:4000')
        .delete(`/api/appointments/${id}`)
        .end((err, res) => {
            expect(res.status).to.be.eq(400)
            if (err) {done(err)} else {done()}
        })
    })

    it("should delete appointments with authorization", (done) => {
        request('http://localhost:4000')
        .delete(`/api/appointments/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
            expect(res.status).to.be.eq(200)
            if (err) {done(err)} else {done()}
        })
    })

})
