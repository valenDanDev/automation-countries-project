export const interceptCreateActivitySuccess = () => {
  cy.intercept('POST', '**/activities/create', {
    statusCode: 200,
    body: 'activity created successfully'
  }).as('createActivity')
}

export const spyCreateActivity = () => {
  cy.intercept('POST', '**/activities/create').as('createActivity')
}

export const mockActivitiesEmpty = () => {
  cy.intercept('GET', '**/activities', {
    statusCode: 200,
    body: []
  }).as('getActivities')
}

