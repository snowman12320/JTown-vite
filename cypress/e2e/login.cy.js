
describe('login view ', () => {
  it('login', () => {
    cy.visit('http://localhost:5173/#/login');
    cy.get('#email').should('exist').click({ force: true }).type('snowman12320@gmail.com');
    cy.get('#password').should('exist').click({ force: true }).type('');

    cy.get('form > .text-center > .btn').should('exist').click();
    cy.visit('http://localhost:5173/#/dashboard/members');
  });
});
