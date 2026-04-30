class landingPagePage {

  visit() {
    cy.visit('/')
  }

  title() {
    return cy.contains('Welcome to countries project')
  }

  enterButton() {
    return cy.contains('ENTER')
  }

  clickEnter() {
    this.enterButton().click()
  }

}

export default new landingPagePage()