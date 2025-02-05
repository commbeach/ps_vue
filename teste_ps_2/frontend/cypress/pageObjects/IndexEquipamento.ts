const URL = 'http://localhost:5173/Equipamento/IndexEquipamento';

const elements = {
    addEquipamentoBtn: () => cy.get('input[name="CreateButton"]'),
    editEquipamentoBtn: () => cy.get(':nth-child(1) > :nth-child(5) > .mdi-pencil') // acho q nao tem q mudar esse, pega o lapizinho de editar que aparece na tela
}

class IndexEquipamento{
    static visitPage() {
        cy.visit(URL);
    }

    static addEquipamento() {
        elements.addEquipamentoBtn().click();
    }

    static editEquipamento() {
        elements.editEquipamentoBtn().click();
    }
}

export default IndexEquipamento