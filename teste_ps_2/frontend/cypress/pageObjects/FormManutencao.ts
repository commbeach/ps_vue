const URL = 'http://localhost:5173/Manutencao/FormManutencao';

const elements = {
    fieldManutencaoTipo: () => cy.get('input[name="Tipo"]'),
    fieldManutencaoRecorrencia: () => cy.get('input[name="Recorrencia"]'),
    fieldManutencaoStatus: () => cy.get('input[name="Status"]'),

    saveManutencaoBtn: () => cy.get('input[name="salvarManutencaoBtn"]'),
    cancelManutencaoBtn: () => cy.get('input[name="cancelarManutencaoBtn"]')
}

class FormManutencao{
    static visitPage() {
      cy.visit(URL);
    };

    static fillAllFields(Tipovalue: string, Recorrenciavalue: number, Statusvalue: string) {
        this.fillFieldManutencaoTipo(Tipovalue);
        this.fillFieldManutencaoRecorrencia(Recorrenciavalue);
        this.fillFieldManutencaoStatus(Statusvalue);

    };

    static editAllFields(Tipovalue: string, Recorrenciavalue: number, Statusvalue: string) {

        this.editFieldManutencaoTipo(Tipovalue);
        this.editFieldManutencaoRecorrencia(Recorrenciavalue);
        this.editFieldManutencaoStatus(Statusvalue);

    }


    static fillFieldManutencaoTipo(Tipovalue: string) {
        elements.fieldManutencaoTipo().type(Tipovalue);
    };

    static clearFieldManutencaoTipo() {
        elements.fieldManutencaoTipo().clear();
    };

    static editFieldManutencaoTipo(Tipovalue: string) {
        this.clearFieldManutencaoTipo();
        if (Tipovalue != '') {
            this.fillFieldManutencaoTipo(Tipovalue);
        };
    };

    static fillFieldManutencaoRecorrencia(Recorrenciavalue: number) {
        elements.fieldManutencaoRecorrencia().type(Recorrenciavalue);
    };

    static clearFieldManutencaoRecorrencia() {
        elements.fieldManutencaoRecorrencia().clear();
    };

    static editFieldManutencaoRecorrencia(Recorrenciavalue: number) {
        this.clearFieldManutencaoRecorrencia();
        if (Recorrenciavalue != '') {
            this.fillFieldManutencaoRecorrencia(Recorrenciavalue);
        };
    };

    static fillFieldManutencaoStatus(Statusvalue: string) {
        elements.fieldManutencaoStatus().type(Statusvalue);
    };

    static clearFieldManutencaoStatus() {
        elements.fieldManutencaoStatus().clear();
    };

    static editFieldManutencaoStatus(Statusvalue: string) {
        this.clearFieldManutencaoStatus();
        if (Statusvalue != '') {
            this.fillFieldManutencaoStatus(Statusvalue);
        };
    };


    static cancelManutencao() {
        elements.cancelManutencaoBtn().click();
    }

    static saveManutencao() {
        elements.saveManutencaoBtn().click();
    }

    static successMessage() {
        cy.contains('Salvo com sucesso');
    }

    static errorMessage() {
        cy.contains('Salvo com sucesso').should('not.exist');
    }
}

export default FormManutencao