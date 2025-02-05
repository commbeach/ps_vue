const URL = 'http://localhost:5173/Equipamento/FormEquipamento';

const elements = {
    fieldEquipamentoTipo: () => cy.get('input[name="Tipo"]'),
    fieldEquipamentoHorimetroOuOdometro: () => cy.get('input[name="HorimetroOuOdometro"]'),

    saveEquipamentoBtn: () => cy.get('input[name="salvarEquipamentoBtn"]'),
    cancelEquipamentoBtn: () => cy.get('input[name="cancelarEquipamentoBtn"]')
}

class FormEquipamento{
    static visitPage() {
      cy.visit(URL);
    };

    static fillAllFields(Tipovalue: string, HorimetroOuOdometrovalue: number) {
        this.fillFieldEquipamentoTipo(Tipovalue);
        this.fillFieldEquipamentoHorimetroOuOdometro(HorimetroOuOdometrovalue);

    };

    static editAllFields(Tipovalue: string, HorimetroOuOdometrovalue: number) {

        this.editFieldEquipamentoTipo(Tipovalue);
        this.editFieldEquipamentoHorimetroOuOdometro(HorimetroOuOdometrovalue);

    }


    static fillFieldEquipamentoTipo(Tipovalue: string) {
        elements.fieldEquipamentoTipo().type(Tipovalue);
    };

    static clearFieldEquipamentoTipo() {
        elements.fieldEquipamentoTipo().clear();
    };

    static editFieldEquipamentoTipo(Tipovalue: string) {
        this.clearFieldEquipamentoTipo();
        if (Tipovalue != '') {
            this.fillFieldEquipamentoTipo(Tipovalue);
        };
    };

    static fillFieldEquipamentoHorimetroOuOdometro(HorimetroOuOdometrovalue: number) {
        elements.fieldEquipamentoHorimetroOuOdometro().type(HorimetroOuOdometrovalue);
    };

    static clearFieldEquipamentoHorimetroOuOdometro() {
        elements.fieldEquipamentoHorimetroOuOdometro().clear();
    };

    static editFieldEquipamentoHorimetroOuOdometro(HorimetroOuOdometrovalue: number) {
        this.clearFieldEquipamentoHorimetroOuOdometro();
        if (HorimetroOuOdometrovalue != '') {
            this.fillFieldEquipamentoHorimetroOuOdometro(HorimetroOuOdometrovalue);
        };
    };


    static cancelEquipamento() {
        elements.cancelEquipamentoBtn().click();
    }

    static saveEquipamento() {
        elements.saveEquipamentoBtn().click();
    }

    static successMessage() {
        cy.contains('Salvo com sucesso');
    }

    static errorMessage() {
        cy.contains('Salvo com sucesso').should('not.exist');
    }
}

export default FormEquipamento