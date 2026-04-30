import homePage from '../../pages/homePagePage'

// mocks
import { mockCountriesList } from '../../support/mocks/countriesMocks'
import { mockActivitiesEmpty } from '../../support/mocks/activitiesMocks'

describe('Pagination (mocked data)', () => {

  const TOTAL = 34
  const FIRST_PAGE = 10
  const PER_PAGE = 9

  const remaining = TOTAL - FIRST_PAGE
  const TOTAL_PAGES = 1 + Math.ceil(remaining / PER_PAGE)
  const lastPageItems = remaining % PER_PAGE || PER_PAGE

  beforeEach(() => {
    mockCountriesList(TOTAL)
    mockActivitiesEmpty()

    homePage.visit()
  })

  it('should handle pagination correctly (dynamic)', () => {

    // Page 1
    homePage.getCountriesCards()
      .should('have.length', FIRST_PAGE)

    homePage.paginationLabel()
      .should('contain', `1/${TOTAL_PAGES}`)

    // Iterate pages
    for (let page = 2; page <= TOTAL_PAGES; page++) {

      homePage.goToPage(page)

      homePage.paginationLabel()
        .should('contain', `${page}/${TOTAL_PAGES}`)

      const expectedCount =
        page === TOTAL_PAGES
          ? lastPageItems
          : PER_PAGE

      homePage.getCountriesCards()
        .should('have.length', expectedCount)
    }
  })


  it('should navigate with Next and Previous buttons', () => {

    homePage.clickNext()
    homePage.paginationLabel()
      .should('contain', '2')

    homePage.clickPrevious()
    homePage.paginationLabel()
      .should('contain', '1')
  })

})