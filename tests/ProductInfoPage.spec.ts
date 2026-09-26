import {test, expect} from '../src/fixtures/PageFixtures';



//writing repated steps here so it will run before every test
test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME1!,process.env.PASSWORD1!);
});


    test('Verify Product Data after search', async({homePage,searchPageResultPage,productInfoPage})=>{
    await homePage.doSearch('macbook');
    await searchPageResultPage.selectProduct('MacBook Pro');
    let imgCount = await productInfoPage.getProdcutImagesCount();
    console.log("Total Images :",imgCount);
    expect(imgCount).toBe(4);
});


    test('Verify Product Data/MetaData', async({homePage,searchPageResultPage,productInfoPage})=>{
    await homePage.doSearch('macbook');
    await searchPageResultPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log("Actual Product Details are : ", actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
});



