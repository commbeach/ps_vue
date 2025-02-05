const URL = 'http://localhost:5173/Manutencao/IndexManutencao';

const elements = {
    addManutencaoBtn: () => cy.get('input[name="CreateButton"]'),
    editManutencaoBtn: () => cy.get(':nth-child(1) > :nth-child(5) > .mdi-pencil') // acho q nao tem q mudar esse, pega o lapizinho de editar que aparece na tela
}

class IndexManutencao{
    static visitPage() {
        cy.visit(URL);
    }

    static addManutencao() {
        elements.addManutencaoBtn().click();
    }

    static editManutencao() {
        elements.editManutencaoBtn().click();
    }
}

export default IndexManutencao