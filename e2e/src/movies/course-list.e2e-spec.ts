import {browser} from "protractor";
import {CourseListPage} from "./course-list.po";
import { CourseFormPage} from "./course-form.po";

describe('Course list page', () => {
  let page: CourseListPage;

  beforeEach(() => {
    page = new CourseListPage();
  });

  it('should have proper labeling', async () => {

    page.navigateTo().then(()=>{
      page.getPageTitleText().then((title)=>{
        expect(title).toEqual("Списък със всички Курсове")
      }).then(page.getAddButtonText).then((addbuttontext)=>{
        expect(addbuttontext).toEqual("Добави Нов")
      }).then(page.getFavoriteLabelText).then((favorite)=>{
        expect(favorite).toEqual("Любим курс:")
      })
    })
  });


  it('should list all courses when page is loaded', async()=>{

    page.navigateTo().then(()=>{
      page.getListElements().then((items)=>{
        expect(items.get.length).toBe(-1);
      })
    })
  });

  it('should navigate to create course page, ', ()=>{
    page.navigateTo().then(()=>{
      page.getAddButton().then((button)=>{
        button.click();
       browser.getCurrentUrl().then((url)=>{
         expect(url).toEqual(`${browser.baseUrl}course/add`)
       });
      });
    });
  });


  it('should navigate to list after new course is added', ()=>{
    const courseFormPage = new CourseFormPage();
    page.navigateTo().then(()=>{
      page.getAddButton().then((addbutton)=>{
        addbutton.click();
        courseFormPage.getSubmitButton().then((submitButton)=>{
          browser.ExpectedConditions.visibilityOf(submitButton);
          courseFormPage.populateForm('testing title','testing description').then(()=>{
            submitButton.click();
            browser.getCurrentUrl().then((url)=>{
              expect(url).toEqual(`${browser.baseUrl}`);
            })
          })
        })
      })
    })
  });

  it('should add course to list',()=>{
    const courseFormPage = new CourseFormPage();
    page.navigateTo().then(()=>{
      page.getAddButton().then((addbutton)=>{
        addbutton.click();
        courseFormPage.getSubmitButton().then((submitbutton)=>{
          browser.ExpectedConditions.visibilityOf(submitbutton);
          courseFormPage.populateForm('testing course','testing course').then(()=>{
            submitbutton.click();
            browser.ExpectedConditions.presenceOf(addbutton);
            page.getListElements().then((elements)=>{
              expect(elements.get.length).toBe(3)
            })
          })
        });
      })
    })
  });



});

