class detailPage {

  shouldBeOnDetailPage(id) {
    cy.url().should('include', `/countries/country/${id}`)
  }

  waitForDetail() {
    cy.wait('@getCountryDetail')
  }

  shouldNotShowLoading() {
    cy.contains(/loading/i).should('not.exist')
  }

  shouldDisplayCountry(name) {
    cy.contains('h3', new RegExp(name, 'i')).should('be.visible')
  }

  shouldDisplayCode(code) {
    cy.contains(new RegExp(`code:\\s*${code}`, 'i')).should('be.visible')
  }

  shouldDisplayCapital(capital) {
    cy.contains(new RegExp(`capital:\\s*${capital}`, 'i')).should('be.visible')
  }

  shouldDisplayPopulation() {
    cy.contains(/population/i).should('be.visible')
  }

  shouldShowNoActivities() {
    cy.contains(/there are no activities/i).should('be.visible')
  }

  shouldShowActivity(name) {
    cy.contains(new RegExp(name, 'i')).should('be.visible')
  }

}

export default new detailPage()