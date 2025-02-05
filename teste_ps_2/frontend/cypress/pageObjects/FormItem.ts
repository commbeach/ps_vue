const URL = 'http://localhost:5173/Item/FormItem';

const elements = {
    fieldItemTipo: () => cy.get('input[name="Tipo"]'),
    fieldItemUnidadeDeMedida: () => cy.get('input[name="UnidadeDeMedida"]'),
    fieldItemDescricao: () => cy.get('input[name="Descricao"]'),
    fieldItemQuantidade: () => cy.get('input[name="Quantidade"]'),

    saveItemBtn: () => cy.get('input[name="salvarItemBtn"]'),
    cancelItemBtn: () => cy.get('input[name="cancelarItemBtn"]')
}

class FormItem{
    static visitPage() {
      cy.visit(URL);
    };

    static fillAllFields(Tipovalue: string, UnidadeDeMedidavalue: number, Descricaovalue: string, Quantidadevalue: string) {
        this.fillFieldItemTipo(Tipovalue);
        this.fillFieldItemUnidadeDeMedida(UnidadeDeMedidavalue);
        this.fillFieldItemDescricao(Descricaovalue);
        this.fillFieldItemQuantidade(Quantidadevalue);

    };

    static editAllFields(Tipovalue: string, UnidadeDeMedidavalue: number, Descricaovalue: string, Quantidadevalue: string) {

        this.editFieldItemTipo(Tipovalue);
        this.editFieldItemUnidadeDeMedida(UnidadeDeMedidavalue);
        this.editFieldItemDescricao(Descricaovalue);
        this.editFieldItemQuantidade(Quantidadevalue);

    }


    static fillFieldItemTipo(Tipovalue: string) {
        elements.fieldItemTipo().type(Tipovalue);
    };

    static clearFieldItemTipo() {
        elements.fieldItemTipo().clear();
    };

    static editFieldItemTipo(Tipovalue: string) {
        this.clearFieldItemTipo();
        if (Tipovalue != '') {
            this.fillFieldItemTipo(Tipovalue);
        };
    };

    static fillFieldItemUnidadeDeMedida(UnidadeDeMedidavalue: number) {
        elements.fieldItemUnidadeDeMedida().type(UnidadeDeMedidavalue);
    };

    static clearFieldItemUnidadeDeMedida() {
        elements.fieldItemUnidadeDeMedida().clear();
    };

    static editFieldItemUnidadeDeMedida(UnidadeDeMedidavalue: number) {
        this.clearFieldItemUnidadeDeMedida();
        if (UnidadeDeMedidavalue != '') {
            this.fillFieldItemUnidadeDeMedida(UnidadeDeMedidavalue);
        };
    };

    static fillFieldItemDescricao(Descricaovalue: string) {
        elements.fieldItemDescricao().type(Descricaovalue);
    };

    static clearFieldItemDescricao() {
        elements.fieldItemDescricao().clear();
    };

    static editFieldItemDescricao(Descricaovalue: string) {
        this.clearFieldItemDescricao();
        if (Descricaovalue != '') {
            this.fillFieldItemDescricao(Descricaovalue);
        };
    };

    static fillFieldItemQuantidade(Quantidadevalue: string) {
        elements.fieldItemQuantidade().type(Quantidadevalue);
    };

    static clearFieldItemQuantidade() {
        elements.fieldItemQuantidade().clear();
    };

    static editFieldItemQuantidade(Quantidadevalue: string) {
        this.clearFieldItemQuantidade();
        if (Quantidadevalue != '') {
            this.fillFieldItemQuantidade(Quantidadevalue);
        };
    };


    static cancelItem() {
        elements.cancelItemBtn().click();
    }

    static saveItem() {
        elements.saveItemBtn().click();
    }

    static successMessage() {
        cy.contains('Salvo com sucesso');
    }

    static errorMessage() {
        cy.contains('Salvo com sucesso').should('not.exist');
    }
}

export default FormItem