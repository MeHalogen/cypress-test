/// <reference types="cypress" />
//copied thus from commans.js

//You can use either describe or context

//in describe brackets, mention the name of the test suite
describe('First test suite', () => {

    it('First Test',() => {
        //put the code of the test
    })

    it('Second Test',() => {
        //put the code of the test
    })

    it('Third Test',() => {
        //put the code of the test
    })


})

describe('Sceond test suite', () => {

    describe('Sub test suite', () => {

        beforeEach('login', () => {
            //repeat for every test
        })

        it('Sub Test',() => {
            //put the code of the test
        })

    })

    it('First Test',() => {
        //put the code of the test
    })

    it('Second Test',() => {
        //put the code of the test
    })

    it('Third Test',() => {
        //put the code of the test
    })


})

