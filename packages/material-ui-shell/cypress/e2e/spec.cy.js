describe('My React App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('renders the app', () => {
    cy.get('#root').should('exist')
  })

  it('renders "app container top" text', () => {
    cy.contains('Cool Landing Page').should('exist')
  })
})
