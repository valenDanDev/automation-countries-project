import homePage from '../../pages/homePagePage'

// mocks
import {
  mockCountries,
  mockCountriesError,
  mockCountriesNetworkError
} from '../../support/mocks/countriesMocks'

import { mockActivitiesEmpty } from '../../support/mocks/activitiesMocks'

describe('Home Page - API Handling', () => {

  beforeEach(() => {
    mockActivitiesEmpty()
  })

  // 🔴 1. HTTP error (404)
  it('should show countries error when API returns 404', () => {

    mockCountriesError(404)

    homePage.visit()

    homePage.countriesErrorMessage()
      .should('be.visible')
  })


  // 🌐 2. Network failure
  it('should handle backend failure (network error)', () => {

    mockCountriesNetworkError()

    homePage.visit()

    homePage.networkErrorMessage()
      .should('be.visible')

    homePage.shouldNotContainCountry('Colombia')
  })


  // 🟢 3. Success
  it('should display countries when API succeeds', () => {

    mockCountries([
      { name: 'Colombia' }
    ])

    homePage.visit()

    homePage.shouldContainCountry('Colombia')
  })

})