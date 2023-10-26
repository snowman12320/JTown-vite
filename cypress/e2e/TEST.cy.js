// 用官方示範檔案，看各種cy檔實際運作，並套用方法 https://github.com/cypress-io/cypress-example-kitchensink/blob/master/README.md
// https://on.cypress.io/api

describe('TEST DOC', () => {
  // only
  it.only('Does not do much!', () => {
    expect(true).to.equal(true);
  });
  // it('visits root url', () => {
  //   cy.visit('#/login');
  // });
});
