
import{test,expect} from '../../src/fixtures/APIFixtures';
import Ajv from 'ajv';

let TOKEN = process.env.API_TOKEN;
let AUTH_HEADER ={Authorization:`Bearer ${TOKEN}`};


//set up the AJV
let ajvObject =new Ajv();

//define JSON Schema
let userSchema ={
    "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
};


test('GET -- get user',async({apiHelper})=>
{

    let userData={

        name:"vikash",
        email:`automation${Date.now()}@open.com`,
        gender:"male",
        status:"active"
    }


    let createResponse  = await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
    let userId = createResponse.body.id;
    
    let getUserResponse  = await apiHelper.get(`/public/v2/users/${userId}`,AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);


    //Validating Schema here..
   let validate =  ajvObject.compile(userSchema);
   let isSchmaValid = validate(getUserResponse.body);

   if(!isSchmaValid)
   {
    console.log("Schema Erros", validate.errors)
   }

   expect(isSchmaValid).toBeTruthy();

});


