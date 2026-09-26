
import {test, expect} from '../src/fixtures/PageFixtures';


//writing repated steps here so it will run before every test
test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin("abc1@gamil.com","Xyz@123")
});



test('Home Page Title test', async({homePage})=>{
    const homePageTitle = await homePage.getHomePageTitle();
    console.log("Home Page title is : ", homePageTitle)
    expect(homePageTitle).toBe("My Account");
})

test('Logout Link exist on Home Page test', async({homePage})=>{
    let homePageLogoutLink = await homePage.isLogoutLinkExist();
    expect(homePageLogoutLink).toBeTruthy();
})

test('Headres on home Page test', async({homePage})=>{
    let allHeaders = await homePage.getHomePageHeadres();
    console.log("Home Psge Headers are : ",allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);

})
