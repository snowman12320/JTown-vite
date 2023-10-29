// 用官方示範檔案，看各種cy檔實際運作，並套用方法 https://github.com/cypress-io/cypress-example-kitchensink/blob/master/README.md
// https://on.cypress.io/api

describe('TEST DOC', () => {
  // only
  it.only('Does not do much!', () => {
    expect(true).to.equal(true);

    cy.visit('http://localhost:5173/#/products-view/products-item/-NapFRkOpiKvfoMLZiH5');
    cy.get('.form-check:nth-child(1) > .form-check-label').click();
    cy.get('#S').click();
    cy.get('#plus').click();
    cy.get('.btn-outline-nbaBlue').click();
    cy.get('.d-flex > .btn-danger').click();
    cy.get('tr:nth-child(2) .bi').click();
    cy.get('#offTicket').click();
    cy.get('#offTicket').type('gooaya');
    cy.get('.list-group-item:nth-child(4) div:nth-child(1) > label').click();
    cy.get('#buy_person').click();
    cy.get('.text-decoration-underline').click();
    cy.get('.btn-nbaRed').click();
    cy.get('.mb-3:nth-child(2) span').click();
    cy.get('#buyCheck').click();
    cy.get('#_cartCheckout').click();
    cy.get('#cartForm').submit();
  });
  // it('visits root url', () => {
  //   cy.visit('#/login');
  // });
});
