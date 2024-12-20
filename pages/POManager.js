const { AddEmployeePage } = require("../pages/PIM/AddEmployeePage.js");
const { BuzzPage } = require("../pages/BuzzPage");
const { EmployeeListPage } = require("../pages/PIM/EmployeeListPage.js");
const { HeaderPage } = require("../pages/HeaderPage");
const { JobTitles } = require("../pages/Admin/jobTitlesPage");
const { LoginPage } = require("../pages/LoginPage");
const { MainPage } = require("../pages/MainPage");
const { PayGrades } = require("../pages/Admin/payGradesPage");
const { ResetPasswordPage } = require("../pages/ResetPasswordPage");
const { SkilsPage } = require("../pages/Admin/SkilsPage");



class POManager{
    constructor(page) {
        this.page = page;
        this.addEmployee = new AddEmployeePage(this.page);
        this.buzzPage = new BuzzPage(this.page);
        this.employeeListPage = new EmployeeListPage(this.page);
        this.headerPage = new HeaderPage(this.page);
        this.jobTitles = new JobTitles(this.page);
        this.loginPage = new LoginPage(this.page);
        this.mainPage = new MainPage(this.page);
        this.payGrades = new PayGrades(this.page);
        this.resetPasswordPage = new ResetPasswordPage(this.page);
        this.skilsPage = new SkilsPage(this.page);
    }

    getAddEmployee(){
        return this.addEmployee;
    
    }
    getBuzzPage(){
        return this.buzzPage;
    }
    
    getEmployeeListPage(){
        return this.employeeListPage;
    }
   
    getHeaderPage(){
        return this.headerPage;
    }

    getJobTitles(){
        return this.jobTitles;
    }
    
    getLoginPage(){
        return this.loginPage;
    }

    getMainPage(){
        return this.mainPage;
    }
    
    getPayGrades(){
        return this.payGrades;
    }

    getResetPasswordPage(){
        return this.resetPasswordPage;
    }

    getSkilsPage(){
        return this.skilsPage;
    }
}

module.exports = { POManager };