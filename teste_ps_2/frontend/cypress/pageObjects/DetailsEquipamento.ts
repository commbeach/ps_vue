const URL = 'http://localhost:5173/Equipamento/DetailsEquipamento';

const elements = {
    deleteEquipamentoBtn: () => cy.get('input[name="DeleteButton"]'),
    confirmDeleteEquipamentoBtn: () => cy.get('input[name="confirmDeleteButton"]')
}

class FormEquipamento{
    static visitPage() {
      cy.visit(URL);
    };

    static deleteEquipamento() {
        elements.deleteEquipamentoBtn().click();
    }

    static confirmDeleteEquipamento() {
        elements.confirmDeleteEquipamentoBtn().click();
    }

    static completeDeleteEquipamento() {
        this.deleteEquipamentoBtn();
        this.confirmDeleteEquipamentoBtn();
    }

    static successMessage() {
        cy.contains('Deletado com sucesso');
    }
}

export default DetailsEquipamento