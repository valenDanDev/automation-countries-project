import activitiesPage from '../../pages/activitiesPage'
import { mockCountries } from '../../support/mocks/countriesMocks'
import {
  interceptCreateActivitySuccess,
  spyCreateActivity
} from '../../support/mocks/activitiesMocks'
import countries from '../../fixtures/countries.json'
import activityData from '../../fixtures/activities.json'

describe('Activity Creation', () => {

  const activity = activityData.validActivity

  beforeEach(() => {
    mockCountries(countries)
    activitiesPage.visit()
    cy.wait('@getCountries')
  })

  it('should create activity successfully', () => {

    interceptCreateActivitySuccess()

    activitiesPage.createActivity(activity)

    activitiesPage.getSelectedCountry(activity.countryCode)
      .should('be.visible')

    activitiesPage.submit()

    cy.wait('@createActivity')

    activitiesPage.successMessage()
      .should('be.visible')
  })

  it('should not allow create activity due to missing fields', () => {

    spyCreateActivity()

    const invalidActivity = {
      ...activity,
      duration: ''
    }

    activitiesPage.createActivity(invalidActivity)

    activitiesPage.getSelectedCountry(activity.countryCode)
      .should('be.visible')

    activitiesPage.submit()

    cy.get('@createActivity.all').should('have.length', 0)

    cy.contains(/Ohhh!/i).should('be.visible')
    cy.contains('Please check and complete all the fields')
      .should('be.visible')
  })

  it('should remove a country when selecting X', () => {

    activitiesPage.createActivity(activity)

    activitiesPage.getSelectedCountry(activity.countryCode)
      .should('be.visible')

    activitiesPage.removeCountry(activity.countryCode)

    activitiesPage.getSelectedCountry(activity.countryCode)
      .should('not.exist')
  })

})