
import {test, expect} from '@playwright/test';
import { request } from 'node:http';


let AUTH_TOKEN = {Authorization:'Bearer 6613a2b16fae0a48461507d7ef772b7acf5bf20310f83f03eda4499e4e8c018b'};


//GET CALL
test('Get User Test', async ({request})=>
{
    //GET Call APIwith Token
   let response  = await  request.get('https://gorest.co.in/public/v2/users', {
        headers:AUTH_TOKEN
    });

    console.log(response);
    let responseBodyInJsonFormat = await response.json();//retrun API Response in form of JSON
    console.log(responseBodyInJsonFormat);
    console.log(response.status());// it retruns the status codes such as 200,101,403,404
    console.log(response.statusText());// it return the Status Text such  as "OK", "created" etc

})


//POST CALL
test('Create User Test', async ({request})=>
{

//Paylaod as its Post call so providing Payload as JavaScript Object    
    let userData ={

        name:'vikash',
        gender:'Male',
        email:'abcgh@gmail.com',
        status:'Active'
        //id: 8634121

    };


//POST CALL API with Token and Payload(userData)
   let response  = await  request.post('https://gorest.co.in/public/v2/users', {
        headers:AUTH_TOKEN,
        data: userData
    });



    console.log(response);
    let responseBodyInJsonFormat = await response.json();//retrun API Response in form of JSON
    console.log(responseBodyInJsonFormat);
    console.log(response.status());// it retruns the status codes such as 200,101,403,404
    console.log(response.statusText());// it return the Status Text such  as "OK", "created" etc

})


//PUT CALL
test('Update User Test', async ({request})=>
{

//Paylaod as its Put call so providing Payload as JavaScript Object    
    let userData ={

        name:'vikash101',
        gender:'Male',
        email:`Automation${Date.now()}@gmail.com`,
        status:'InActive'
        //id: 8634121

    };


//PUT CALL API with Token and Payload(userData)
   let response  = await  request.put('https://gorest.co.in/public/v2/users/8634121', {
        headers:AUTH_TOKEN,
        data: userData
    });



    console.log(response);
    let responseBodyInJsonFormat = await response.json();//retrun API Response in form of JSON
    console.log(responseBodyInJsonFormat);
    console.log(response.status());// it retruns the status codes such as 200,101,403,404
    console.log(response.statusText());// it return the Status Text such  as "OK", "created" etc

})


//DELETE CALL
test('Delete User Test', async ({request})=>
{

//DELETE CALL API with Token
   let response  = await  request.delete('https://gorest.co.in/public/v2/users/8634121', {
        headers:AUTH_TOKEN
   })

    console.log(response);
    console.log(response.status());// it retruns the status codes such as 200,101,403,404
    console.log(response.statusText());// it return the Status Text such  as "OK", "created" etc
    expect(response.status()).toBe(404);

})