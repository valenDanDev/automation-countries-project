import homePage from '../../pages/homePagePage'

// mocks
import { mockCountries } from '../../support/mocks/countriesMocks'
import { mockActivitiesEmpty } from '../../support/mocks/activitiesMocks'

describe('Home Filters & Sorting', () => {

  beforeEach(() => {
    mockActivitiesEmpty()
  })

  it('should filter countries by continent', () => {

    mockCountries([
      { name: 'colombia', continent: 'south america' },
      { name: 'brazil', continent: 'south america' },
      { name: 'germany', continent: 'europe' }
    ])

    homePage.visit()

    homePage.selectContinent('South America')

    homePage.shouldContainCountry('colombia')
    homePage.shouldContainCountry('brazil')
    homePage.shouldNotContainCountry('germany')
  })


  it('should sort countries by population (descending)', () => {

    mockCountries([
      { name: 'Colombia', population: 100, continent: 'south america' },
      { name: 'Brazil', population: 300, continent: 'south america' },
      { name: 'Argentina', population: 200, continent: 'south america' }
    ])

    homePage.visit()

    homePage.sortByPopulation('higher population')

    homePage.countryNames().then(elements => {
      const names = [...elements].map(el => el.innerText.trim())

      expect(names[0]).to.eq('Brazil')
      expect(names[1]).to.eq('Argentina')
      expect(names[2]).to.eq('Colombia')
    })
  })


  it('should sort countries by name (ascending)', () => {

    mockCountries([
      { name: 'Brazil', population: 100 },
      { name: 'Argentina', population: 200 },
      { name: 'Colombia', population: 300 }
    ])

    homePage.visit()

    homePage.sortByName('asc')

    homePage.countryNames().then(elements => {
      const names = [...elements].map(el => el.innerText.trim())

      expect(names[0]).to.eq('Argentina')
      expect(names[1]).to.eq('Brazil')
      expect(names[2]).to.eq('Colombia')
    })
  })

})