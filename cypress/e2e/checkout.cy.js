
describe('ADD CART TO ORDER ', () => {
  it('checkout order!', () => {
    cy.visit('http://localhost:5173/#/products-view/products-item/-NapFRkOpiKvfoMLZiH5');
    cy.get('.form-check:nth-child(1) > .form-check-label').click();
    // cy.get('#S').click();
    cy.get('#plus').click();
    cy.get('.btn-outline-nbaBlue').click();
    cy.get('.d-flex > .btn-danger').click();
    cy.get('tr:nth-child(2) .bi').click();
    cy.wait(1000);
    // cy.get('#offTicket').select('gooaya'); //! COUPON API NOT WORKING
    cy.get('.list-group-item:nth-child(4) div:nth-child(1) > label').click();
    cy.get('#buy_person').click();
    cy.get('.text-decoration-underline').click();
    cy.get('.btn-nbaRed').click();
    cy.wait(1000);
    cy.get('.modal-body > :nth-child(2) > .btn').click();
    cy.get('#buyCheck').click();
    // cy.get('#cartForm').submit();
  });
});
