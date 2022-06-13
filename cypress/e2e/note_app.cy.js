describe('Note app', ()=>{
    beforeEach(()=>{
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
            name:'benito',
            username:'benito',
            password:'123'
        }

        cy.request('POST', 'http://localhost:3001/api/users', user)

        cy.visit('http://localhost:3000')
    })
    it('frontpage can be opened', ()=>{
        cy.contains('Notes')
    })

    it('login form can be opened', ()=>{
        cy.contains('Show login').click()
    })

    it('user can login', ()=>{
        cy.contains('Show login').click()
        cy.get('[placeholder="username"]').type('benito')
        cy.get('[placeholder="password"]').type('123')
        cy.get('#login-form-button').click()
        cy.get('#logout-button')
    })

    it('login fails with wrong password', ()=>{
        cy.contains('Show login').click()
        cy.get('[placeholder="username"]').type('benito')
        cy.get('[placeholder="password"]').type('iincorrect')
        cy.get('#login-form-button').click()

        cy.get('.error').should('contain', 'Wrong credentials')
    })

    describe('when logged in', ()=>{
        beforeEach(()=>{
            cy.login({username: 'benito', password:'123'})
        
        })
        it('a new note can be created', ()=>{
            const noteContent = 'a note created by cypress'
            cy.contains('Show notes').click()
            cy.get('#note-form input[name="note-input"]').type(noteContent)
            cy.get('#note-form [name="submit"]').click()
        })

        describe.only('when a note exists', ()=>{
            beforeEach(()=>{
               cy.createNote({content:'first note created from cypress', important:false})
               cy.createNote({content:'second note created from cypress', important:false})
               cy.createNote({content:'third note created from cypress', important:false})
               cy.visit('http://localhost:3000')
            })
            it('it can be made important', ()=>{
                cy.contains('first note created from cypress').as('firstNote')
                cy.get('@firstNote').contains('Make important').click()
                cy.get('@firstNote').contains('Make not important')
            })
        })
    })
})