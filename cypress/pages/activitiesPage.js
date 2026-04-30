class activitiesPage {

  visit() {
    cy.visit('/activitiesCreate')
  }

  typeName(name) {
    cy.get('input[name="name"]').type(name)
  }

typeDuration(duration) {
  if (duration !== undefined && duration !== null && duration !== '') {
    cy.get('input[name="duration"]').type(duration)
  }
}

  selectDifficulty(value) {
    cy.get('select[name="dificulty"]').select(value)
  }

  selectSeason(season) {
    cy.contains('label', 'Season')
      .parent()
      .find('select')
      .select(season)
  }

  selectCountry(country) {
    cy.contains('label', 'Countries')
      .parent()
      .find('select')
      .select(country)
      .trigger('change')
  }

  createActivity(activity) {
    this.typeName(activity.name)
    this.typeDuration(activity.duration)
    this.selectDifficulty(activity.difficulty)
    this.selectSeason(activity.season)
    this.selectCountry(activity.country)
  }

  getSelectedCountry(code) {
    return cy.contains('div', code)
  }

  submit() {
    cy.contains(/add activity/i).click()
  }

  successMessage() {
    return cy.contains('activity created succesfully')
  }

  removeCountry(code) {
    cy.contains(code)
      .parent()
      .find('input[value="X"]')
      .click()
  }
}

export default new activitiesPage()