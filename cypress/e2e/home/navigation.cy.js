import homePage from '../../pages/homePagePage'
import detailPage from '../../pages/detailPage'

// mocks
import { mockCountries } from '../../support/mocks/countriesMocks'
import { mockActivitiesEmpty } from '../../support/mocks/activitiesMocks'
import { mockCountryDetail } from '../../support/mocks/countriesMocks'

describe('Country Detail Navigation', () => {

  beforeEach(() => {
    mockCountries([
      { id: 'COL', name: 'Colombia', continent: 'South America' }
    ])

    mockActivitiesEmpty()
  })


  it('should navigate and display correct country details', () => {

    mockCountryDetail([
      {
        id: 'COL',
        name: 'colombia',
        capital: 'bogotá',
        population: 53057212,
        activities: []
      }
    ])

    homePage.visit()

    homePage.goToCountryDetail('Colombia')

    detailPage.shouldBeOnDetailPage('COL')

    detailPage.waitForDetail()

    detailPage.shouldNotShowLoading()

    detailPage.shouldDisplayCountry('colombia')
    detailPage.shouldDisplayCode('col')
    detailPage.shouldDisplayCapital('bogotá')
    detailPage.shouldDisplayPopulation()
  })


  it('should show message when there are no activities', () => {

    mockCountryDetail([
      {
        id: 'COL',
        name: 'colombia',
        activities: []
      }
    ])

    homePage.visit()

    homePage.goToCountryDetail('Colombia')

    detailPage.waitForDetail()

    detailPage.shouldShowNoActivities()
  })


  it('should show activities when they exist', () => {

    mockCountryDetail([
      {
        id: 'COL',
        name: 'colombia',
        activities: [
          { id: 1, name: 'Soccer' },
          { id: 2, name: 'Music' }
        ]
      }
    ])

    homePage.visit()

    homePage.goToCountryDetail('Colombia')

    detailPage.waitForDetail()

    detailPage.shouldShowActivity('Soccer')
    detailPage.shouldShowActivity('Music')
  })

})