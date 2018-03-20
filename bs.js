// To run this script use this command
// node bs.js yourBSUserName yourBSKey

var webdriver = require('selenium-webdriver')

// Input capabilities
var capabilities = {
  'browserName': 'iPhone',
  'device': 'iPhone 7',
  'realMobile': 'true',
  'os_version': '10.3',
  'browserstack.user': process.argv[2],
  'browserstack.key': process.argv[3]
}

var driver = new webdriver.Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities(capabilities)
  .build()

driver.get('http://www.react-most-wanted.com').then(function () {
  driver.findElement(webdriver.By.className('firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button')).click().then(() => {
    driver.findElement(webdriver.By.name('email')).sendKeys('test@test.com').then(() => {
      driver.findElement(webdriver.By.name('email')).sendKeys(webdriver.Key.ENTER).then(() => {
        driver.findElement(webdriver.By.className('firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored')).click().then(() => {
          driver.findElement(webdriver.By.name('password')).sendKeys('123456').then(() => {
            driver.findElement(webdriver.By.name('password')).sendKeys(webdriver.Key.ENTER).then(() => {
              driver.findElement(webdriver.By.className('firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored')).click().then(() => {
                driver.quit()
              })
            })
          })
        })
      })
    })
  })
})
