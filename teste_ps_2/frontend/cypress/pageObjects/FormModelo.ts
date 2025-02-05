const URL = 'http://localhost:5173/Modelo/FormModelo';

const elements = {
    fieldModeloTipo: () => cy.get('input[name="Tipo"]'),
    fieldModeloMarca: () => cy.get('input[name="Marca"]'),

    saveModeloBtn: () => cy.get('input[name="salvarModeloBtn"]'),
    cancelModeloBtn: () => cy.get('input[name="cancelarModeloBtn"]')
}

class FormModelo{
    static visitPage() {
      cy.visit(URL);
    };

    static fillAllFields(Tipovalue: string, Marcavalue: string) {
        this.fillFieldModeloTipo(Tipovalue);
        this.fillFieldModeloMarca(Marcavalue);

    };

    static editAllFields(Tipovalue: string, Marcavalue: string) {

        this.editFieldModeloTipo(Tipovalue);
        this.editFieldModeloMarca(Marcavalue);

    }


    static fillFieldModeloTipo(Tipovalue: string) {
        elements.fieldModeloTipo().type(Tipovalue);
    };

    static clearFieldModeloTipo() {
        elements.fieldModeloTipo().clear();
    };

    static editFieldModeloTipo(Tipovalue: string) {
        this.clearFieldModeloTipo();
        if (Tipovalue != '') {
            this.fillFieldModeloTipo(Tipovalue);
        };
    };

    static fillFieldModeloMarca(Marcavalue: string) {
        elements.fieldModeloMarca().type(Marcavalue);
    };

    static clearFieldModeloMarca() {
        elements.fieldModeloMarca().clear();
    };

    static editFieldModeloMarca(Marcavalue: string) {
        this.clearFieldModeloMarca();
        if (Marcavalue != '') {
            this.fillFieldModeloMarca(Marcavalue);
        };
    };


    static cancelModelo() {
        elements.cancelModeloBtn().click();
    }

    static saveModelo() {
        elements.saveModeloBtn().click();
    }

    static successMessage() {
        cy.contains('Salvo com sucesso');
    }

    static errorMessage() {
        cy.contains('Salvo com sucesso').should('not.exist');
    }
}

export default FormModelo