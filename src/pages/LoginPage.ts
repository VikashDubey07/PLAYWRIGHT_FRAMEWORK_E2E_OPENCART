import { Locator, Page } from "playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{

    //provate Loactors with constant using readonly keyword
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginButton:Locator;
    private readonly forgotPasswordLink:Locator;
    private readonly logo:Locator;
    private readonly loginErrorMessage : Locator;

    //constructor of the class ..it does have any name in typescript just write constructor keyword
    constructor(page:Page)
    {
        super(page);
        this.emailId = page.getByRole('textbox',{name:'E-Mail Address'});
        this.password = page.getByRole('textbox',{name:'Password'});
        this.loginButton = page.getByRole('button',{name:'Login'});
        this.forgotPasswordLink = page.getByRole('link',{name:'Forgotten Password'}).first();
        this.logo = page.getByAltText('naveenopencart');
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
    }



    //Public WebPage Actions methods

    async goToLoginPage(): Promise<void>
    {

        await this.page.goto("opencart/index.php?route=account/login");
    }


     async getLoginPageTitle(): Promise<string>
    {
        return await this.page.title();
    }


    async isForgotPsswordLinkExist(): Promise<boolean>
    {
        return await this.forgotPasswordLink.isVisible();
    }

    async doLogin(username:string, password:string)
    {
        console.log(`UserName : ${username} and Password : ${password}`);

        await this.emailId.fill(username); //this keword because in typeScript we access class level varobles with this keyword even in same class 
        await this.password.fill(password);
        await this.loginButton.click();

    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean>
    {
        return await this.loginErrorMessage.isVisible();
    }
}