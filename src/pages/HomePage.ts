import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

        private readonly logOutLink:Locator;
        private readonly headers:Locator;
        private readonly search:Locator;
        private readonly searchIcon:Locator;


        //constructor of the class ..it does have any name in typescript just write constructor keyword
        constructor(page:Page)
        {
            super(page);
            this.logOutLink = page.getByRole('link',{name:'Logout'});
            this.headers = page.getByRole('heading',{level: 2});
            this.search = page.getByRole('textbox', { name: 'Search' });
            this.searchIcon = page.locator('div#search button');
        
        }

        async getHomePageTitle(): Promise<string>
        {
            return await this.page.title();
        }

        async isLogoutLinkExist(): Promise<boolean>
        {
            return await this.logOutLink.isVisible();
        }

         async getHomePageHeadres() : Promise<string[]>
        {
            return await this.headers.allInnerTexts();
        }


        async doSearch(searchKey: string)
        {
            console.log(`Serach key is : ${searchKey}`);
            await this.search.fill(searchKey);
            await this.searchIcon.click();
        }


}