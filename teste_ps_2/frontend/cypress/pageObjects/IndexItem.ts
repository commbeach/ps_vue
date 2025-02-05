const URL = 'http://localhost:5173/Item/IndexItem';

const elements = {
    addItemBtn: () => cy.get('input[name="CreateButton"]'),
    editItemBtn: () => cy.get(':nth-child(1) > :nth-child(5) > .mdi-pencil') // acho q nao tem q mudar esse, pega o lapizinho de editar que aparece na tela
}

class IndexItem{
    static visitPage() {
        cy.visit(URL);
    }

    static addItem() {
        elements.addItemBtn().click();
    }

    static editItem() {
        elements.editItemBtn().click();
    }
}

export default IndexItem