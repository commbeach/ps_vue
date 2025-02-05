const URL = 'http://localhost:5173/Item/DetailsItem';

const elements = {
    deleteItemBtn: () => cy.get('input[name="DeleteButton"]'),
    confirmDeleteItemBtn: () => cy.get('input[name="confirmDeleteButton"]')
}

class FormItem{
    static visitPage() {
      cy.visit(URL);
    };

    static deleteItem() {
        elements.deleteItemBtn().click();
    }

    static confirmDeleteItem() {
        elements.confirmDeleteItemBtn().click();
    }

    static completeDeleteItem() {
        this.deleteItemBtn();
        this.confirmDeleteItemBtn();
    }

    static successMessage() {
        cy.contains('Deletado com sucesso');
    }
}

export default DetailsItem