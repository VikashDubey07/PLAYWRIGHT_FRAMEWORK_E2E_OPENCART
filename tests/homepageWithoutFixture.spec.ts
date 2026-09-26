
import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';
import { beforeEach } from 'node:test';


let loginpage : LoginPage;// global Variable
let homepage  : HomePage;// global Variable


//writing repated steps here so it will run before every test
test.beforeEach(async({page})=>{
    loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();
    await loginpage.doLogin("abc1@gamil.com","Xyz@123")

    homepage = new HomePage(page);// creating object of HomePage
});



test('Home Page Title test', async({page})=>{
    const homePageTitle = await homepage.getHomePageTitle();
    console.log("Home Page title is : ", homePageTitle)
    expect(homePageTitle).toBe("My Account");
})

test('Logout Link exist on Home Page test', async({page})=>{
    let homePageLogoutLink = await homepage.isLogoutLinkExist();
    expect(homePageLogoutLink).toBeTruthy();
})

test('Headres on home Page test', async({page})=>{
    let allHeaders = await homepage.getHomePageHeadres();
    console.log("Home Psge Headers are : ",allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);

})
