describe('test shopping process', () => {
  it('login', () => {
    // cy.visit('http://localhost:5173/#/login');
    // cy.get('#email').should('exist').click({ force: true }).type('snowman12320@gmail.com');
    // cy.get('#password').should('exist').click({ force: true }).type('BoY4506699');
    // cy.get('form > .text-center > .btn').should('exist').click();
    // cy.wait(500);
    //
    // cy.visit('http://localhost:5173/#/cart-view/cart-list');
    // cy.visit('#/products-view/products-item/-NapFx_21qP46WymRS-_');
    // cy.get('#L').should('exist').check();
    // cy.get('#buy_person').check();
  });

  it('add coupon', () => {
    // cy.visit('http://localhost:5173/#/cart-view/cart-list');
    // cy.get('#offTicket').select('howhowhasfriend');
    // cy.visit('http://localhost:5173/#/cart-view/cart-list');
  });

  // 切分兩個it 登入後會斷掉 應該說路徑要再打一次才不會斷
  it.only('add cart', () => {
    // cy.visit('http://localhost:5173/#/products-view/products-item/-NapFx_21qP46WymRS-_');
    // cy.get('#L').should('exist').check();
    // cy.get('#L').should('be.checked');
    // cy.get(
    //   '[data-v-inspector="src/views/frontend/ProductsItem.vue:301:15"] > .form-check-label'
    // ).click();
    // cy.get('[data-v-inspector="src/views/frontend/ProductsItem.vue:374:15"]').click(3);
    // cy.wait(5000);
    // cy.get('.flex-column > .btn-danger').click();
    //
    cy.visit('http://localhost:5173/#/cart-view/cart-list');
    // cy.get('#offTicket').select('howhowhasfriend');
    cy.get('#buy_person').check();
    cy.get('#buyCheck').check();
    cy.get('.text-decoration-underline').click();
    cy.scrollTo('bottom');
    cy.get('[data-v-inspector="src/components/CartModal.vue:264:11"] > .btn').click();
    cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-header > .btn-close').click();
    //
    cy.get('#_cartCheckout').click();
    // cy.visit('http://localhost:5173/#/cart-view/checkout/-Nh_esd8GewvNikqAS4C');
  });
});
