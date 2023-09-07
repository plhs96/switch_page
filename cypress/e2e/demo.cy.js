
require('cypress-iframe')
require('cypress-xpath')
describe('Origin with Cypress new version >=12', () => {
  it('Cypress new version', () => {
    cy.visit('https://organization-stg.tabulalearning.net/')
    cy.get('.css-16j30i3 > .MuiTypography-root').click()
    cy.get('.MuiInputBase-input').type('organization01@yopmail.com')
    cy.get('.MuiButton-contained').click()
    cy.visit('https://yopmail.com/')
    cy.get('#login').type('organization01@yopmail.com')
    cy.get('#refreshbut > .md > .material-icons-outlined').click()
    cy.iframe('#ifmail').xpath('//*[contains(text(),"Reset Password")]').should('have.attr', 'href').then((href) => {
      let url = new URL(href);
      console.log('url: ', url)
      let tabula = decodeURIComponent(url.href)
      console.log('tabula: ', tabula)
      let url2 = new URL(tabula)
      console.log('url2: ', url2)
      cy.visit(tabula)
    })
  })
})
describe.only('Origin with Cypress old version >=12', () => {
  it('Step 1', () => {
    cy.visit('https://organization-stg.tabulalearning.net/')
    cy.get('.css-16j30i3 > .MuiTypography-root').click()
    cy.get('.MuiInputBase-input').type('organization01@yopmail.com')
    cy.get('.MuiButton-contained').click()
  })
  it('Step 2', () => {
    cy.visit('https://yopmail.com/')
    cy.get('#login').type('organization01@yopmail.com')
    cy.get('#refreshbut > .md > .material-icons-outlined').click()
    cy.iframe('#ifmail').xpath('//*[contains(text(),"Reset Password")]').should('have.attr', 'href').then((href) => {
      let url = new URL(href);
            console.log('url: ', url)
            let tabula = decodeURIComponent(url.href)
            console.log('tabula: ', tabula)
            let url2 = new URL(tabula)
            console.log('url2: ', url2)
            let params = url2.searchParams;
            let url3 = `https://${params.get('subdomain')}.tabulalearning.net`;
            cy.origin(url3, { args: { pathname: url2.pathname, search: url2.search } }, ({ pathname, search }) => {
              cy.visit(pathname + search)
          })
    })
  })
})
