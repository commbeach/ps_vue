const URL = 'http://localhost:5173/OrdemServico/IndexOrdemServico';

const elements = {
    addOrdemServicoBtn: () => cy.get('input[name="CreateButton"]'),
    editOrdemServicoBtn: () => cy.get(':nth-child(1) > :nth-child(5) > .mdi-pencil') // acho q nao tem q mudar esse, pega o lapizinho de editar que aparece na tela
}

class IndexOrdemServico{
    static visitPage() {
        cy.visit(URL);
    }

    static addOrdemServico() {
        elements.addOrdemServicoBtn().click();
    }

    static editOrdemServico() {
        elements.editOrdemServicoBtn().click();
    }
}

export default IndexOrdemServico