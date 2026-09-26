import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPageResultPage extends BasePage{

        private readonly searchResults : Locator;


        //constructor of the class ..it does have any name in typescript just write constructor keyword
        constructor(page:Page)
        {
            super(page);
            this.searchResults = page.locator('div.product-layout');
            
        }

        async getProdcutResultCount() : Promise<number>
        {
            return await this.searchResults.count();
        }

        async selectProduct(productName:string):Promise<void>
        {
            await this.page.getByRole('link',{name:productName,exact:true}).first().click();

        }
}