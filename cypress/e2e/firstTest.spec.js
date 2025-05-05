/// <reference types="cypress" />
//copied thus from commans.js

//You can use either describe or context

//in describe brackets, mention the name of the test suite
describe('First test suite', () => {

    it('First Test',() => {

        cy.visit('/') // visit the base URL defined in cypress.config.js;
        cy.contains('Forms').click() // click on the Forms link in the left menu
        cy.contains('Form Layouts').click() // click on the Form Layouts link in the Forms page

        //ELEMENT
        //<input _ngcontent-sfh-c22="" data-cy="imputEmail1" fullwidth id="inputEmail1" nbinput placeholder="Email" type="email" ng-reflect-full-width 
        // class="input-full-width size-medium shape-rectangle">
        
        //By Tag Name
        cy.get('input')

        //By ID -> start with a # sign
        cy.get('#inputEmail1')

        //By Class Value -> start with a . sign
        cy.get('.input-full-width')

        //By Attribute Name -> within a [] sign  
        cy.get('[fullwidth]')

        //By Attribute Name and Value -> within a [] sign  
        cy.get('[placeholder="Email"]')

        //By entire Class Value -> Works just like attribute as Class is also an attribute
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //By two attributes -> no space in between
        cy.get('[fullwidth][placeholder="Email"]')

        //By Tag, ID, Attribute and class
        cy.get('input#inputEmail1[fullwidth].input-full-width')

        //By Cypress test ID
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test',() => {

        cy.visit('/') // visit the base URL defined in cypress.config.js;
        cy.contains('Forms').click() // click on the Forms link in the left menu
        cy.contains('Form Layouts').click() // click on the Form Layouts link in the Forms page

        //Theory
        //get() - Find the elements on the page by locator globally
        //find() - Find the elements on the page by locator within a specific parent element - find child elements by locator
        //contains() - Find the elements on the page by HTML text and by text and locator, can also be used with another HTML attribute and text together
        //just like here Sign in comes 2 times, but if i need to find the the specific one, I can use locator and text together separated by a comma,

        cy.contains('[status="warning"]','Sign in')

        cy.contains('nb-card', 'Horizontal form').find('button')
        //find cannot be called directly on cy, it needs to be called on the parent element just like above

        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        //another way to get child element is by using contains twice to check the text

        cy.contains('nb-card', 'Horizontal form').get('button')
        //Now, this will not return the button inside the card, but the button inside the card header and that are all the buttons on the page
        //what we learned here is that get can't be used with a contains, as it will still find elements globally
        //but find can be used with a contains, as it will find elements within the parent element

        //Cypress chains and DOM

        cy.get('#inputEmail3')
            .parents('form') // get the parent of the input field
            .find('button')
            .should('contain', 'Sign in') // check if the button contains the text Sign in
            .parents('form')
            .find('nb-checkbox') // find the checkbox inside the form
            .click() // click on the checkbox

            //This was a perfect example of how to use get, find and contains together in a chain where we used parents keyword to find the parent from child element
            //and then find the child element from the parent element


            //It is recommended to STOP chaining after action commands like click, type, check, uncheck, etc.
            //If you want to continue chaining after an action command, you start ansother chain with a new get, find or contains command

    })

    it('third test', () => {

        cy.visit('/') // visit the base URL defined in cypress.config.js;
        cy.contains('Forms').click() // click on the Forms link in the left menu
        cy.contains('Form Layouts').click() // click on the Form Layouts link in the Forms page

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email') // check if the label contains the text Email
        cy.contains('nb-card', 'Using the Grid').contains('Email') // check if the label contains the text Email using another contains

        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password') // check if the label contains the text Password
        cy.contains('nb-card', 'Using the Grid').contains('Password') // check if the label contains the text Password using another contains

        //Now observe that we are using same locator multiple times 'cy.contains('nb-card', 'Using the Grid')'

        //So, we can save it in a variable

        //CANT DO THIS IN CYPRESS

        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email') // check if the label contains the text Email
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password') // check if the label contains the text Password

        //Now let's see how to do it in Cypress

        //Approach 1 - Using Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid') // save the element in a variable
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email') // check if the label contains the text Email
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password') // check if the label contains the text Password

        //Approach 2 - Using Cypress Wrap using then() function - Now this converts the cypress locator into a callback - JQuery and then we have to typecase it back to cypress chainable using wrap

        cy.contains('nb-card', 'Using the Grid').then( usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email') // check if the label contains the text Email
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password') // check if the label contains the text Email

            //scope of usingTheGridForm is only inside the then() function
        })
    })

    it.only('extract text values', () => {

        cy.visit('/') // visit the base URL defined in cypress.config.js;
        cy.contains('Forms').click() // click on the Forms link in the left menu
        cy.contains('Form Layouts').click() // click on the Form Layouts link in the Forms page


        //1 - getting text from the element
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address') // check if the label contains the text Email address

        //2 - save the text in a variable and use it later in the code - using JQUERY
        cy.get('[for="exampleInputEmail1"]').then( label => {
            const labelText = label.text() // get the text from the label
            expect(labelText).to.equal('Email address') // check if the text is equal to Email address  //expect is only used in a JQUERY
            cy.log(labelText) // print the text in the console

        })    
        
        //3 - using Cypress Invoke method
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address') // check if the text is equal to Email address
            cy.log(text) // print the text in the console
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain', 'Email address') // check if the text is equal to Email address
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labeltext').should('contain', 'Email address') // check if the text is equal to Email address

        //4 INVOKE CLASS
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
            expect(classValue).to.equal('label') // check if the class is equal to label            
        })

        //5 INVOKE PROPERTIES - like we enter test@test.com in email address field, now how to use that we have entered to find the element
        cy.get('#exampleInputEmail1').type('test@test.com')
        //using invoke() and then()
        cy.get('#exampleInputEmail1').invoke('prop', 'value').then( emailValue => {
            expect(emailValue).to.equal('test@test.com')  
        })
        //using invoke() and should()
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain','test@test.com')
    })
})