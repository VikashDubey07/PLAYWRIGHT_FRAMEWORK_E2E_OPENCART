
import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { beforeEach } from 'node:test';
import { HomePage } from '../src/pages/HomePage';


let loginpage : LoginPage;// global Variable
let homepage : HomePage;

//writing repated steps here so it will run before every test
test.beforeEach(async({page})=>{
    loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();
    homepage = new HomePage(page);
});



test('Login Page test', async({page})=>{
    //creating Object of Login Class, we need import that Login also
    //let loginpage = new LoginPage(page);
    //await loginpage.goToLoginPage();//calling LognPage methods

    const pageTitle = await loginpage.getLoginPageTitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('Account Login');
})

test('Forgot Password Lonk Exist Test', async({page})=>{
    //creating Object of Login Class, we need import that Login also
    let loginpage = new LoginPage(page);

    await loginpage.goToLoginPage();//calling LognPage methods
    let link = await loginpage.isForgotPsswordLinkExist();
    //expect(link).toBe(true);
    expect(link).toBeTruthy();
})

test('User is logged in to opencart Application', async({page})=>{
    await loginpage.doLogin("abc1@gamil.com","Xyz@123");
    let homePagelogoutLink =  await homepage.isLogoutLinkExist();
    expect.soft(homePagelogoutLink).toBeTruthy();
    expect.soft(await homepage.getHomePageTitle()).toBe("My Account");
    
})

