const URL = 'http://localhost:5173/Modelo/IndexModelo';

const elements = {
    addModeloBtn: () => cy.get('input[name="CreateButton"]'),
    editModeloBtn: () => cy.get(':nth-child(1) > :nth-child(5) > .mdi-pencil') // acho q nao tem q mudar esse, pega o lapizinho de editar que aparece na tela
}

class IndexModelo{
    static visitPage() {
        cy.visit(URL);
    }

    static addModelo() {
        elements.addModeloBtn().click();
    }

    static editModelo() {
        elements.editModeloBtn().click();
    }
}

export default IndexModelo