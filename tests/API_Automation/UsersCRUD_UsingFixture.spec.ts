
import { APIHelper } from '../../src/API_Utils/APIHelper';
import{ test, expect} from '../../src/fixtures/APIFixtures';

const TOKEN =process.env.API_TOKEN!;
let AUTH_HEADER = {Authorization :`Bearer ${TOKEN}`};
let userId: number;


test.describe.serial("Ruuning e2e GoRest Crud API",async()=>{

//GET
test('GET User using Utility and Fixtures',async({apiHelper})=>{
    let response = await apiHelper.get('/public/v2/users',AUTH_HEADER);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
});

//POST
test('@smoke Create User using Utility and Fixtures',async({apiHelper})=>{

      let UserData ={

        name:'vikashAPI',
        gender:'Male',
        email:`automation_${Date.now()}@open.com`,
        status:'active'
        //id: 8634121

    };

    let response = await apiHelper.post('/public/v2/users',UserData,AUTH_HEADER);
    console.log(response);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(UserData.name);
    expect(response.body.status).toBe(UserData.status);

    userId  = response.body.id;
    console.log("Id is : ", userId);
});

//PUT
test('@sanity Update User using Utility and Fixtures',async({apiHelper})=>{

      let updatedUserData ={

        name:'vikashAPI',
        gender:'Male',
        email:`automation_${Date.now()}@open.com`,
        status:'inactive'
        //id: 8634121

    };

    let response = await apiHelper.put(`/public/v2/users/${userId}`,updatedUserData,AUTH_HEADER);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUserData.name);

    let id  = response.body.id;
    console.log("Id is : ", id);
});


test('Delete User using Utility and Fixtures',async({apiHelper})=>{
    let response = await apiHelper.put(`/public/v2/users/${userId}`,AUTH_HEADER);
    console.log(response);
    expect(response.status).toBe(404);
});

});