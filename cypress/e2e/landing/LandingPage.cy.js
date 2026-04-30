import landingPage from '../../pages/landingPagePage'

describe('Landing Page', () => {

  beforeEach(() => {
    landingPage.visit()
  })

  it('should display landing page correctly', () => {

    landingPage.title()
      .should('be.visible')

    landingPage.enterButton()
      .should('be.visible')
  })

  it('should navigate to home when clicking ENTER', () => {

    landingPage.clickEnter()

    cy.url().should('include', '/home')
  })

})