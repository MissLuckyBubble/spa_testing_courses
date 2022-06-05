import {browser, by, element, ElementFinder} from "protractor";
export class CourseFormPage{
  async navigateToCreate():Promise<unknown>{
    return browser.get(`${browser.baseUrl}course/add`);
  }
  async navigateToEditPage():Promise<unknown>{
    return browser.get(`${browser.baseUrl}course/edit/1`);
  }
  async getPageTitleText(): Promise<string>{
    return element(by.css('[data-test-selector="title"]')).getText();
  }

  async getSubmitButtonText():Promise<string>{
    return element(by.css('[data-test-selector=button-save]')).getText();
  }
  async getBackButtonText():Promise<string>{
    return element(by.css('[data-test-selector=button-back]')).getText();
  }

  getBackButton():Promise<ElementFinder>{
    return Promise.arguments([(element(by.css('[data-test-selector=button-back]')) as ElementFinder)]);
  }

  getSubmitButton():Promise<ElementFinder> {
    return Promise.arguments([(element(by.css('[data-test-selector=button-save]')) as ElementFinder)]);
  }

  async populateForm(testingTitle: string, testingDescription: string):Promise<void> {
    //name shoould be = formControlName (from html)
    element(by.name('title')).sendKeys(testingTitle);
    element(by.name('description')).sendKeys(testingDescription);
  }
  async getErrorMsg():Promise<string>{
    return element(by.css('[data-test-selector=error]')).getText();
  }
}


