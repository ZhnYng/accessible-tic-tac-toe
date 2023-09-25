// Import the dependencies for testing
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../control/app')
const sinon = require('sinon')
const faker = require('faker')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe("Users", () => {
    describe('GET /', () => { 
        // Test to get single user record
        it("should get a single user record", (done) => {
            const id = 1
            chai.request(app)
                .get(`/user/getUser/${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })

        // Test to get unknown single user record
        it("should not get a single user record", (done) => {
            const id = 999
            chai.request(app)
                .get(`/user/getUser/${id}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })
    
    const newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
    const dupUser = {
        username: "test",
        email: "test@gmail.com",
        password: "test"
    }
    describe('POST /', () => {
        // Test to insert a new user record
        it("should successfully insert a user record", (done) => {
            chai.request(app)
                .post(`/user/addUser`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    done()
                })
        })

        // Test to insert a duplicate user record
        it("should not successfully insert a duplicate user record", (done) => {
            chai.request(app)
                .post(`/user/addUser`)
                .send(dupUser)
                .end((err, res) => {
                    res.should.have.status(409)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })

    describe('DELETE /', () => {
        // Test to delete a user record
        it("should successfully delete a user record", (done) => {
            const username = newUser.username
            chai.request(app)
                .delete(`/user/delete/${username}`)
                .end((err, res) => {
                    res.should.have.status(204)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })
})