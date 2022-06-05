import {browser, logging} from "protractor";
import {AppPage} from "./app.po";

describe('workspace-project App', ()=>{
  let page: AppPage;
  beforeEach(()=>{
    page = new AppPage();
  });

  afterEach(async ()=>{
    //Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('should have proper labeling in header and footer', async () => {

    page.navigateTo().then(()=>{
      page.getPageTitleText().then((title)=>{
        expect(title).toEqual("Courses")
          page.getPageFooterText().then((footer)=>{
          expect(footer).toEqual("Курсов Проект по SPA TESTING от Силвия Данчева, Ф№:2101321099, СИ, 3ти курс")
            page.getPageDateText().then((favorite)=>{
              expect(favorite).toEqual("Дата: 05-06-2022")
            })
      })
      })
    })
  });
});
