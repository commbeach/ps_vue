const URL = 'http://localhost:5173/OrdemServico/FormOrdemServico';

const elements = {
    fieldOrdemServicoStatus: () => cy.get('input[name="Status"]'),
    fieldOrdemServicoDataAbertura: () => cy.get('input[name="DataAbertura"]'),
    fieldOrdemServicoDataFinalizacao: () => cy.get('input[name="DataFinalizacao"]'),

    saveOrdemServicoBtn: () => cy.get('input[name="salvarOrdemServicoBtn"]'),
    cancelOrdemServicoBtn: () => cy.get('input[name="cancelarOrdemServicoBtn"]')
}

class FormOrdemServico{
    static visitPage() {
      cy.visit(URL);
    };

    static fillAllFields(Statusvalue: string, DataAberturavalue: Date, DataFinalizacaovalue: Date) {
        this.fillFieldOrdemServicoStatus(Statusvalue);
        this.fillFieldOrdemServicoDataAbertura(DataAberturavalue);
        this.fillFieldOrdemServicoDataFinalizacao(DataFinalizacaovalue);

    };

    static editAllFields(Statusvalue: string, DataAberturavalue: Date, DataFinalizacaovalue: Date) {

        this.editFieldOrdemServicoStatus(Statusvalue);
        this.editFieldOrdemServicoDataAbertura(DataAberturavalue);
        this.editFieldOrdemServicoDataFinalizacao(DataFinalizacaovalue);

    }


    static fillFieldOrdemServicoStatus(Statusvalue: string) {
        elements.fieldOrdemServicoStatus().type(Statusvalue);
    };

    static clearFieldOrdemServicoStatus() {
        elements.fieldOrdemServicoStatus().clear();
    };

    static editFieldOrdemServicoStatus(Statusvalue: string) {
        this.clearFieldOrdemServicoStatus();
        if (Statusvalue != '') {
            this.fillFieldOrdemServicoStatus(Statusvalue);
        };
    };

    static fillFieldOrdemServicoDataAbertura(DataAberturavalue: Date) {
        elements.fieldOrdemServicoDataAbertura().type(DataAberturavalue);
    };

    static clearFieldOrdemServicoDataAbertura() {
        elements.fieldOrdemServicoDataAbertura().clear();
    };

    static editFieldOrdemServicoDataAbertura(DataAberturavalue: Date) {
        this.clearFieldOrdemServicoDataAbertura();
        if (DataAberturavalue != '') {
            this.fillFieldOrdemServicoDataAbertura(DataAberturavalue);
        };
    };

    static fillFieldOrdemServicoDataFinalizacao(DataFinalizacaovalue: Date) {
        elements.fieldOrdemServicoDataFinalizacao().type(DataFinalizacaovalue);
    };

    static clearFieldOrdemServicoDataFinalizacao() {
        elements.fieldOrdemServicoDataFinalizacao().clear();
    };

    static editFieldOrdemServicoDataFinalizacao(DataFinalizacaovalue: Date) {
        this.clearFieldOrdemServicoDataFinalizacao();
        if (DataFinalizacaovalue != '') {
            this.fillFieldOrdemServicoDataFinalizacao(DataFinalizacaovalue);
        };
    };


    static cancelOrdemServico() {
        elements.cancelOrdemServicoBtn().click();
    }

    static saveOrdemServico() {
        elements.saveOrdemServicoBtn().click();
    }

    static successMessage() {
        cy.contains('Salvo com sucesso');
    }

    static errorMessage() {
        cy.contains('Salvo com sucesso').should('not.exist');
    }
}

export default FormOrdemServico