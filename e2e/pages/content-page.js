import {
  t,
  Selector
} from 'testcafe';

class Page {
  constructor() {
    this.nextButton = Selector('button').withAttribute('class', 'ld-btn ld-ext-right btn btn-primary btn-lg btn navbar-btn btn-pv-nt-kiosk ');
    this.submitFormButton = Selector('button').withAttribute('data-action', 'submit-form');
    this.questionRadioButton = Selector('div').withAttribute('class', 'radio-list__check');
    this.questionRadioOption = Selector('input').withAttribute('type', 'radio');
    this.nextModalButton = Selector('button').withAttribute('class', 'ld-btn ld-ext-right btn btn-primary btn-lg btn navbar-btn ');
    this.startCheckInButton = Selector('li').withAttribute('data-type', 'check_in');
    this.acceptButton = Selector('label.btn.bg-success.btn-xs.accept.white');
    this.signInWithLicensePlateButton = Selector('div.box.text-center');
    this.beginCheckInButton = Selector('div.box.text-center.check-in-box');
    this.carLicensePlateInput = Selector('#car_registration_number');
  }

  async clickBeginCheckInButton() {
    await t.click(this.beginCheckInButton);
  };

  async clickSignInWithLicensePlateButton() {
    await t.click(this.signInWithLicensePlateButton);
  };

  async clickStartCheckInButton() {
    await t.click(this.startCheckInButton);
  };

  async clickSubmitFormButton() {
   await t.click(this.submitFormButton);
  };

  async clickNextButton() {
    await t.click(this.nextButton);
  };

  async clickNextModalButton() {
    await t.click(this.nextModalButton);
  };

  async clickAcceptButton() {
    await t.click(this.acceptButton);
  };
}

export default new Page();
