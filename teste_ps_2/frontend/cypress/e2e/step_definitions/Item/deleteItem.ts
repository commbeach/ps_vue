cypress/e2e/step_definitions/deleteItem/deleteItem.ts

import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import IndexItem from '../../../pageObjects/IndexItem';
import DetailsItem from '../../../pageObjects/DetailsItem';

Given('Visito a pagina de Item', () => {
    IndexItem.visitPage();
});

When('Eu clico no botao de detalhes de Item', () => {
    IndexItem.detailsItem();
});

And('Clico para deletar Item', () => {
    DetailsItem.deleteItem();
});

And('Clico para confirmar', () => {
    DetailsItem.confirmDeleteItem();
});

Then('A mensagem de sucesso aparece', () => {
    DetailsItem.successMessage();
});