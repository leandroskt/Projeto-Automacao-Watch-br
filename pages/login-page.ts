import { Page, TestInfo, expect } from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    readonly testInfo: TestInfo;

    constructor(page: Page, testInf: TestInfo) {
        this.page = page;
        this.testInfo = testInf;
    }

    async printScr(nome: string) {
        await this.testInfo.attach(nome, {
          body: await this.page.screenshot(),
          contentType: 'image/png',
        });
    }
    
    async acessar(urlTarget: string) {
        await this.page.goto(urlTarget);
    }

    async logar(email: string, senha: string) {
       await this.page.getByRole('textbox', { name: 'email' }).click();
       await this.page.getByRole('textbox', { name: 'Digite seu email' }).fill(email);
       await this.page.getByRole('textbox', { name: 'Digite sua senha' }).click();
       await this.page.getByRole('textbox', { name: 'Digite sua senha' }).fill(senha);
       if (await this.page.getByRole('button', { name: 'Entrar' }).isEnabled()) {
            await this.page.getByRole('button', { name: 'Entrar' }).click();
       }
       
       
    }
      
    async paginaInicial(termo: string){
        await this.page.getByText('Olá Leandro, qual vai ser o play de hoje?').click();
        await this.page.getByRole('img', { name: 'search logo' }).click();
        await this.page.getByPlaceholder('O que você está procurando?').click();
        await this.page.getByPlaceholder('O que você está procurando?').fill(termo);
        await this.page.getByPlaceholder('O que você está procurando?').press('Enter');
    }
    async alerta(mensagem: string){
        //const regex = new RegExp("^" + mensagem + "\\.$");
        // await expect (this.page.locator('div.error.ng-star-inserted.p').innerText).toBe(mensagem);

        const element = this.page.locator('div.error.ng-star-inserted > p');
        const text = await element.innerText();

        expect (text).toBe (mensagem);
    }
}