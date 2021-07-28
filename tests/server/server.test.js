const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const server = require('../../server');

const port = parseInt(process.env.PORT)

describe("Server", () => {
    it("Server is running on expected port", () => {
        expect(server.port).to.equal(port)
    })
})