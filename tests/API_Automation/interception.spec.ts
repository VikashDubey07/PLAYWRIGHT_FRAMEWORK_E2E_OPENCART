

// import{test,expect} from '@playwright/test';

// //intercept network calls
// test('Intercept and log request',async({page})=>
// {

//     await page.route('**/*',async(route)=>
//     {

//         console.log(route.request().method(), route.request().url());
//         await route.continue();
//     });

//     await page.goto("https://www.makemytrip.com");

// });