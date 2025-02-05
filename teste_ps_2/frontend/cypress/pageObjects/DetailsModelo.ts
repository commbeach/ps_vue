const URL = 'http://localhost:5173/Modelo/DetailsModelo';

const elements = {
    deleteModeloBtn: () => cy.get('input[name="DeleteButton"]'),
    confirmDeleteModeloBtn: () => cy.get('input[name="confirmDeleteButton"]')
}

class FormModelo{
    static visitPage() {
      cy.visit(URL);
    };

    static deleteModelo() {
        elements.deleteModeloBtn().click();
    }

    static confirmDeleteModelo() {
        elements.confirmDeleteModeloBtn().click();
    }

    static completeDeleteModelo() {
        this.deleteModeloBtn();
        this.confirmDeleteModeloBtn();
    }

    static successMessage() {
        cy.contains('Deletado com sucesso');
    }
}

export default DetailsModelo