import {browser, by, element, ElementArrayFinder, ElementFinder} from "protractor";

export class CourseListPage{

  async navigateTo(): Promise<unknown>{
    return browser.get(browser.baseUrl)
  }

  async getPageTitleText():Promise<string>{
    return element(by.tagName('h3')).getText();
  }

async getAddButtonText():Promise<string>{
    return element(by.css('[data-test-selector=button-add]')).getText();
}
async getFavoriteLabelText():Promise<String>{
    return element((by.css('[data-test-selector="favorite"]'))).getText();
}


getAddButton():Promise<ElementFinder>{
  return Promise.arguments([(element(by.css('[data-test-selector=button-add]')) as unknown as ElementFinder)]);
  //return await element(by.css('[data-test-selector=button-add]'));
}

async getListElements():Promise<ElementArrayFinder>{
    return element.all(by.tagName('app-course-item'));
}


}
