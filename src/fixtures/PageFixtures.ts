
import {test as BaseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvReaderUtil } from '../Utilities/CsvReaderUtil';
import { SearchPageResultPage } from '../pages/SearchResultPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';



//define the Type of Page Fixtures
//define all the page classes objects vraible here with their type (class name) & use same varibale name while extending in PageFixtures (like line 19,22,26, 29)
type PageFixtures = {
    loginPage : LoginPage,
    homePage  : HomePage,
    searchPageResultPage  : SearchPageResultPage,
    productInfoPage : ProductInfoPage,
    testData  : Record<string,string>[]

};


//extend Playwright BaseTest
//create similar for every page so dont need to create the Object of page class in our tests
export let test = BaseTest.extend<PageFixtures>({

    loginPage: async({ page }, use)=>
    {
        let loginPage = new LoginPage(page);// create object of the class using the varible that we defined in Page Fixtures as type
        await use(loginPage);
    },

    homePage: async({ page }, use)=>
    {
        let homePage = new HomePage(page);//create object of the class using the varible that we defined in Page Fixtures as type
        await use(homePage);
    },

      searchPageResultPage : async({ page }, use)=>
    {
        let searchPageResultPage = new SearchPageResultPage(page);//create object of the class using the varible that we defined in Page Fixtures as type
        await use(searchPageResultPage );
    },

          productInfoPage : async({ page }, use)=>
    {
        let productInfoPage = new ProductInfoPage(page);//create object of the class using the varible that we defined in Page Fixtures as type
        await use(productInfoPage);
    },

    testData: async({ }, use)=>
    {
        let testData = CsvReaderUtil.readCsv('src/TestData/loginData.csv')
         await use(testData);
    }


});

export {expect} from '@playwright/test';