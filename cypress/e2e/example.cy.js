// https://on.cypress.io/api

// #region
// it('Does not do much!', () => {
//   expect(true).to.equal(true);
// });
// it('visits root url', () => {
//   cy.visit('http://localhost:5173/');
// });
// #endregion

describe('home view ', () => {
  it('login', () => {
    cy.visit('http://localhost:5173/#/login');
    cy.get('#email').should('exist').click({ force: true }).type('snowman12320@gmail.com');
    cy.get('#password').should('exist').click({ force: true }).type('');

    cy.get('form > .text-center > .btn').should('exist').click();
    cy.visit('http://localhost:5173/#/dashboard/members');
    // cy.get('##el-id-7556-17')
    //   .find('option')
    //   .eq(1)
    //   .then(($option) => {
    //     cy.wrap($option)
    //       .invoke('val')
    //       .then((value) => {
    //         cy.get('##el-id-7556-17').select(value);
    //       });
    //   });
  });
});
