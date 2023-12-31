// https://on.cypress.io/api
// 官方示範檔，cy檔實際運作 https://github.com/cypress-io/cypress-example-kitchensink/blob/master/README.md

```
cy.get('[data-v-inspector="src/views/frontend/ProductsItem.vue:284:15"] > .form-check-label');
cy.get('[data-v-inspector="src/views/frontend/ProductsItem.vue:301:15"] > .form-check-label').check();


cy.get(':nth-child(3) > .col > .card > .newproduct_cloth > .position-relative > .fa-cart-plus');
cy.get(
  '#el-id-8412-4 > .d-flex > [data-v-inspector="src/components/ProductsList.vue:320:23"] > .form-check-label'
);
cy.get('.bg-transparent > .fa-sharp');


cy.wait(1000)

cy.get('.flex-column > .btn-danger').click()

cy.visit('http://localhost:5173/#/cart-view/cart-list');
```