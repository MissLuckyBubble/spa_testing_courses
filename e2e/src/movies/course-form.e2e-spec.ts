import {browser} from "protractor";
import {CourseFormPage} from "./course-form.po";
//import {ngErrorCode} from "@angular/compiler-cli/src/ngtsc/diagnostics";

describe('Course Add Edit Page', ()=>{
  let page:CourseFormPage;
  beforeEach(()=>{
    page=new CourseFormPage();
  })
  it('should have proper labels in create mode' , () => {


    page.navigateToCreate().then(()=>{
      page.getPageTitleText().then((titleText)=>{
        expect(titleText).toEqual("Създай нов курс");
        page.getBackButtonText().then((backText)=>{
          expect(backText).toEqual("Back to list");
          page.getSubmitButtonText().then((submitText)=>{
            expect(submitText).toEqual("Save");
          })
        })
      })
    })

  });

  it('should navigate to courses list when back button is clicked', ()=>{
    page.navigateToCreate().then(()=>{
      page.getBackButton().then((button)=>{
        button.click();
        browser.getCurrentUrl().then((url)=>{
          expect(url).toEqual(browser.baseUrl);
        });
      });
    });
  });

  it('should have proper labels in edit mode' ,  () => {
    page.navigateToEditPage().then(()=>{
      page.getPageTitleText().then((titletext)=>{
        expect(titletext).toEqual('Редактирай курс');
      })
    })
  });

 /* it('should have invalid form', ()=>{
      page.populateForm("","").then(()=>{
        //page.getErrorMsg().then((errormsg)=>{
        //  expect(errormsg).toEqual("*This field is required!")
          expect(ngErrorCode).toEqual('required')
        //})
      })
  });*/
})
