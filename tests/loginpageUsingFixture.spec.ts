
import {test, expect} from '../src/fixtures/PageFixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvReaderUtil } from '../src/Utilities/CsvReaderUtil';
import { ExcelReaderUtil } from '../src/Utilities/ExcelReaderUtil';
import { JsonReaderUtil } from '../src/Utilities/JsonReaderUtil';


//writing repated steps here so it will run before every test
test.beforeEach(async({loginPage})=>{
    
    await loginPage.goToLoginPage();

});



test('Login Page test', async({loginPage})=>{
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('Forgot Password Lonk Exist Test', async({loginPage})=>{
    await loginPage.goToLoginPage();//calling LognPage methods
    let link = await loginPage.isForgotPsswordLinkExist();
    //expect(link).toBe(true);
    expect(link).toBeTruthy();
});

test('User is logged in to opencart Application', async({loginPage,homePage})=>{
    await loginPage.doLogin(process.env.USERNAME1!,process.env.PASSWORD1!);
    let homePagelogoutLink =  await homePage.isLogoutLinkExist();
    expect.soft(homePagelogoutLink).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe("My Account");
    
});


//Reading CSV Data here using Fixture where fixture name is testData and CSV Fields are : UserName and Password
test('User is logging in with wrong credentials to opencart Application with data driven test', async({loginPage,testData})=>{
    for(let row of testData)
    {
        await loginPage.doLogin(row.UserName, row.Password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
    
});


//Reading Data directly without using fixture from CSV
//Reading CSV Data directly using CsvReader Utility which have

let testdata =  CsvReaderUtil.readCsv('src/TestData/loginData.csv');
for(let row of testdata)
{
    test(`Invalid login test Scenarios with CSV Data - ${row.UserName} and  ${row.Password}`,async({loginPage})=>{

        await loginPage.doLogin(row.UserName,row.Password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

    }); 
}



//Reading Excel Data directly 
let loginTestdata =  ExcelReaderUtil.readExcel('src/TestData/OpenCartData.xlsx');
for(let row of loginTestdata)
{
    test(`Invalid login test Scenarios with Excel Data - ${row.userName} and  ${row.Password}`,async({loginPage})=>{

        await loginPage.doLogin(row.userName,row.Password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
        
    });
}


//Reading  Data directly form JSON File 
let JsonTestdata =  JsonReaderUtil.readJson('src/TestData/loginData.json');
for(let row of JsonTestdata)
{
    test(`Invalid login test Scenarios with JSON Data- ${row.userName} and  ${row.Password}`,async({loginPage})=>{

        await loginPage.doLogin(row.userName,row.Password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
        
    });
}



