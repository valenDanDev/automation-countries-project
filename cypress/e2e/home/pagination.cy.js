describe('Pagination (mocked data)', () => {

  const TOTAL = 34
  const FIRST_PAGE = 10
  const PER_PAGE = 9

  const remaining = TOTAL - FIRST_PAGE
  const TOTAL_PAGES = 1 + Math.ceil(remaining / PER_PAGE)
  const lastPageItems = remaining % PER_PAGE || PER_PAGE

  beforeEach(() => {
    const countries = Array.from({ length: TOTAL }, (_, i) => ({
      id: `C${i}`,
      name: `Country ${i}`,
      continent: 'Test'
    }))

    cy.intercept('GET', '**/countries*', { statusCode: 200, body: countries }).as('getCountries')
    cy.intercept('GET', '**/activities*', { statusCode: 200, body: [] }).as('getActivities')

    cy.visit('/home')
    cy.wait('@getCountries')
    cy.wait('@getActivities')
  })

  it('should handle pagination correctly (dynamic)', () => {

    // Page 1
    cy.get('h3').should('have.length', FIRST_PAGE)
    cy.contains(new RegExp(`page\\s*1/${TOTAL_PAGES}`, 'i')).should('be.visible')

    // Iterate through pages 2..TOTAL_PAGES
    for (let page = 2; page <= TOTAL_PAGES; page++) {

      cy.get('[class*="Pagination_page_item"]')
        .contains(new RegExp(`^${page}$`))
        .click()

      cy.contains(new RegExp(`page\\s*${page}/${TOTAL_PAGES}`, 'i')).should('be.visible')

      // Expected items on this page
      const expectedCount =
        page === 1
          ? FIRST_PAGE
          : page === TOTAL_PAGES
            ? lastPageItems
            : PER_PAGE

      cy.get('h3').should('have.length', expectedCount)
    }
  })

  it('should navigate with Next and Previous buttons', () => {

    cy.get('[aria-label="Next"]').click()
    cy.contains(/page\s*2/i).should('be.visible')

    cy.get('[aria-label="Previous"]').click()
    cy.contains(/page\s*1/i).should('be.visible')
  })

})