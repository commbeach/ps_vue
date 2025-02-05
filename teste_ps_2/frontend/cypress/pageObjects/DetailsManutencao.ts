const URL = 'http://localhost:5173/Manutencao/DetailsManutencao';

const elements = {
    deleteManutencaoBtn: () => cy.get('input[name="DeleteButton"]'),
    confirmDeleteManutencaoBtn: () => cy.get('input[name="confirmDeleteButton"]')
}

class FormManutencao{
    static visitPage() {
      cy.visit(URL);
    };

    static deleteManutencao() {
        elements.deleteManutencaoBtn().click();
    }

    static confirmDeleteManutencao() {
        elements.confirmDeleteManutencaoBtn().click();
    }

    static completeDeleteManutencao() {
        this.deleteManutencaoBtn();
        this.confirmDeleteManutencaoBtn();
    }

    static successMessage() {
        cy.contains('Deletado com sucesso');
    }
}

export default DetailsManutencao