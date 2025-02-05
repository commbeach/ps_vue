cypress/e2e/step_definitions/deleteModelo/deleteModelo.ts

import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import IndexModelo from '../../../pageObjects/IndexModelo';
import DetailsModelo from '../../../pageObjects/DetailsModelo';

Given('Visito a pagina de Modelo', () => {
    IndexModelo.visitPage();
});

When('Eu clico no botao de detalhes de Modelo', () => {
    IndexModelo.detailsModelo();
});

And('Clico para deletar Modelo', () => {
    DetailsModelo.deleteModelo();
});

And('Clico para confirmar', () => {
    DetailsModelo.confirmDeleteModelo();
});

Then('A mensagem de sucesso aparece', () => {
    DetailsModelo.successMessage();
});