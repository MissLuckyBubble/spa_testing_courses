import {browser, by, element} from "protractor";

export  class AppPage{
  async navigateTo(): Promise<unknown>{
    return browser.get((browser.baseUrl));
  }
  async getPageTitleText():Promise<string>{
    return element(by.tagName('h1')).getText();
  }
  async getPageFooterText():Promise<string>{
    return element(by.tagName('footer')).getText();
  }
  async getPageDateText():Promise<string>{
    return element((by.css('[data-test-selector=date]'))).getText();
  }

}
