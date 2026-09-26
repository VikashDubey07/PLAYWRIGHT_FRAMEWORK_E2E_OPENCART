import {test, expect} from '../src/fixtures/PageFixtures';
import { CsvReaderUtil } from '../src/Utilities/CsvReaderUtil';


//writing repated steps here so it will run before every test
test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME1!,process.env.PASSWORD1!);
});


//Reading Data from CSV (its kind of DataProvider)
const productData = CsvReaderUtil.readCsv('src/TestData/productData.csv');


//used Csv Data in below two tests
for(const row of productData)
{

    test(`Verify Search Results test with ${row.searchKey}`, async({homePage,searchPageResultPage})=>{
    await homePage.doSearch(row.searchKey);
    let totalCount = await searchPageResultPage.getProdcutResultCount();
    console.log(totalCount);
    expect(totalCount).toBe(Number(row.resultcount));
});

}


for(const row of productData)
{

    test(`Verify user is able to land on the product page ${row.searchKey} and ${row.productname}`, async({homePage,searchPageResultPage,page})=>{
    await homePage.doSearch(row.searchKey);
    let totalCount = await searchPageResultPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
   
});

}

