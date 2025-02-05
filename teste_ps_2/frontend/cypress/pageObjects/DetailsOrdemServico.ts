const URL = 'http://localhost:5173/OrdemServico/DetailsOrdemServico';

const elements = {
    deleteOrdemServicoBtn: () => cy.get('input[name="DeleteButton"]'),
    confirmDeleteOrdemServicoBtn: () => cy.get('input[name="confirmDeleteButton"]')
}

class FormOrdemServico{
    static visitPage() {
      cy.visit(URL);
    };

    static deleteOrdemServico() {
        elements.deleteOrdemServicoBtn().click();
    }

    static confirmDeleteOrdemServico() {
        elements.confirmDeleteOrdemServicoBtn().click();
    }

    static completeDeleteOrdemServico() {
        this.deleteOrdemServicoBtn();
        this.confirmDeleteOrdemServicoBtn();
    }

    static successMessage() {
        cy.contains('Deletado com sucesso');
    }
}

export default DetailsOrdemServico