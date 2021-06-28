import {
  Selector,
  ClientFunction,
  RequestLogger
} from 'testcafe';

import page from './pages/content-page.js'; // import pagel model from content-page.js
const getPageUrl = ClientFunction(() => window.location.href); // returns URL of the current page
const dataSet = require('./helpers/data.json'); // data-driven-tests

dataSet.forEach(data => { // data-driven-tests - calling test method in each iteration
  const headerFirstAnwser = Selector('label').withText(data.firstAnswer);

  fixture `car-service - customer group: ${data.customerGroup}`
    .page `https://daimler-shop-terminal1.tjekvik-staging.com/kiosk/car_service` // starting webpage
    .beforeEach(async t => {
      /*
      Test script:
      1. Maximize browser window
      2. Click "Check In" button
      3. Click "Anmelden mit Kennzeichen" button
      4. Enter registration number and click Start Check-In
      5. Skip Contact page
      6. Accept decalaration for marketing purposes
      7. Skip Agreements page and extra pages for "Retail" customer group
      8. Check if question + answer exist on the Answer page
      9. Confirm your choice and navigate back to the Answer page to verify that correct answer has been checked
      */

      await t.maximizeWindow()
      await page.clickBeginCheckInButton()
      await page.clickSignInWithLicensePlateButton()
      await t.typeText(page.carLicensePlateInput, data.carLicensePlateNumber)
      await page.clickStartCheckInButton()
      await t.expect(getPageUrl()).contains('check_in/contact') // verify if a web page opens after a user checks in
      await page.clickNextButton()
      await page.clickNextModalButton()
      await page.clickAcceptButton()

      while (!(await headerFirstAnwser.exists))
        await page.clickSubmitFormButton();
      await t.expect(getPageUrl()).contains('check_in/answers')

      // multiassertions: check if the question + answers exist on the page
      await t
        .expect(Selector('html').textContent).contains(data.question)
        .expect(Selector('html').textContent).contains(data.firstAnswer)
        .expect(Selector('html').textContent).contains(data.secondAnswer)
    });

  test(`As a non-waiting customer with registration number ${data.carLicensePlateNumber} (Customer group: ${data.customerGroup}) I want to pick up car before 16:00`, async t => {
    if ((data.customerGroup) == 'Fleet') {
      await t.click(page.questionRadioButton.nth(0)) // select the first answer / 1st option
    } else { // customerGroup == 'Retail'
      await t.click(page.questionRadioButton.nth(2)) // select the first answer / 3rd option
    }
    await page.clickNextButton()
    await t.expect(getPageUrl()).contains('check_in/car_parks') // check if the current url contains 'check_in/car_parks'
      .navigateTo('https://daimler-shop-terminal1.tjekvik-staging.com/kiosk/apps/car_service/check_in/answers'); // move back to the previous page
    if ((data.customerGroup) == 'Fleet') {
      await t.expect(page.questionRadioOption.nth(0).hasAttribute('checked')).ok() // verify if the second answer is checked
    } else { // customerGroup == 'Retail'
      await t.expect(page.questionRadioOption.nth(2).hasAttribute('checked')).ok() // verify if the second answer is checked
    }
  });

  test(`As a non-waiting customer with registration number ${data.carLicensePlateNumber} (Customer group: ${data.customerGroup}) I can pick up car whenever it's ready`, async t => {
    if ((data.customerGroup) == 'Fleet') {
      await t.click(page.questionRadioButton.nth(1)) // select the first answer / 1st option
    } else { // customerGroup == 'Retail'
      await t.click(page.questionRadioButton.nth(3)) // select the first answer / 3rd option
        .click(page.questionRadioButton.nth(0))
    }
    await page.clickNextButton()
    await t.expect(getPageUrl()).contains('check_in/car_parks') // check if the current url contains 'check_in/car_parks'
      .navigateTo('https://daimler-shop-terminal1.tjekvik-staging.com/kiosk/apps/car_service/check_in/answers'); // move back to the previous page
    if ((data.customerGroup) == 'Fleet') {
      await t.expect(page.questionRadioOption.nth(1).hasAttribute('checked')).ok() // verify if the second answer is checked
    } else { // customerGroup == 'Retail'
      await t.expect(page.questionRadioOption.nth(3).hasAttribute('checked')).ok() // verify if the second answer is checked
        .click(page.questionRadioButton.nth(0))
    }
  });
});
