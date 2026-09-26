
import { APIRequestContext } from "@playwright/test";

export class APIHelper{

    private readonly request : APIRequestContext;
    private readonly baseURL : string;


    constructor(request: APIRequestContext, baseURL:string)
    {
        this.request = request;
        this.baseURL = baseURL;
    }

    //GET CALL
    async get(endPoint: string, headers?: Record<string,string>)
    {
        let response  = await this.request.get(`${this.baseURL}${endPoint}`,{ headers:headers });
        return{
            status: response.status(),
            statusText: response.statusText(),
            body: await response.json()
        }
    }


    //POST CALL
    async post(endPoint: string, payloadData: object,headers?: Record<string,string>)
    {
        let response  = await this.request.post(`${this.baseURL}${endPoint}`,{ 
            
            headers:headers,
            data: payloadData
        
        });

        return{
            status: response.status(),
            statusText: response.statusText(),
            body: await response.json()
        }
    }



     //PUt CALL
    async put(endPoint: string, payloadData: object,headers?: Record<string,string>)
    {
        let response  = await this.request.put(`${this.baseURL}${endPoint}`,{ 
            
            headers:headers,
            data: payloadData
        
        });
        
        return{
            status: response.status(),
            statusText: response.statusText(),
            body: await response.json()
        }
    }


     //DELETE CALL
    async delete(endPoint: string,headers?: Record<string,string>)
    {
        let response  = await this.request.delete(`${this.baseURL}${endPoint}`,{ 
            
            headers:headers
        
        });
        
        return{
            status: response.status(),
            statusText: response.statusText()
        }
    }


}