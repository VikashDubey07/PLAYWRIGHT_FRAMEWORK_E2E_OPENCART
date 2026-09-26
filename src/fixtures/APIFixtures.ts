
import {test as BaseTest} from '@playwright/test';
import { APIHelper } from '../API_Utils/APIHelper';


//define our own cutome fixtures
type APIFixtures = {
    apiHelper: APIHelper;
}

export let test = BaseTest.extend<APIFixtures>({


     apiHelper : async({ request }, use)=>
        {
            let apiHelper = new APIHelper(request,process.env.API_BASE_URL!);//create object of the class using the varible that we defined in Page Fixtures as type
            await use(apiHelper);
        },

});

export { expect } from '@playwright/test';