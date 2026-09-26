import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage{

        private readonly header:Locator;
        private readonly productImages:Locator;
        private readonly productMetaData:Locator;
        private readonly productPricing:Locator;
        private map: Map<string,string | number>;


        //constructor of the class ..it does have any name in typescript just write constructor keyword
        constructor(page:Page)
        {
            super(page);
            this.header = page.getByRole('heading',{level:1});
            this.productImages = page.locator('div#content li img');
            this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
            this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
            this.map = new Map<string,string>();

        
        }


        async getProductHeader() : Promise<string>
        {
            return await this.header.innerText();
        }


        async getProdcutImagesCount() : Promise<number>
        {
            //await this.page.waitForTimeout(4000);
            await this.productImages.first().waitFor({state:'visible'});
            return (await this.productImages.count());
        }


/**
 * 
 * @returns this method is returning the actual product data: such as header,images,metadata,pricing data
 */
        async getProductInfo() : Promise<Map<string,string | number>>
        {

            this.map.set('ProductHeader', await this.getProductHeader());
            this.map.set('ProductImages',await this.getProdcutImagesCount());
            await this.getProductMetData();
            await this.getProductPricingData();
            return this.map;
        }


       private async getProductMetData() : Promise<void>
        {
            let metData = await this.productMetaData.allInnerTexts();
            for(let data of metData)
            {
                let meta = data.split(':');
                let metaKey = meta[0].trim();
                let metaValue = meta[1].trim();
                this.map.set(metaKey,metaValue);
            }
        }

        private async getProductPricingData() :Promise<void>
        {
            let priceData = await this.productPricing.allInnerTexts();
            let productPrice = priceData[0].trim();
            let exTaxPrice = priceData[1].split(":")[1].trim();
            this.map.set('ProductPrice',productPrice);
            this.map.set('ExTaxPrice',exTaxPrice);

        }

}