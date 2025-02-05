cypress/e2e/step_definitions/deleteEquipamento/deleteEquipamento.ts

import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import IndexEquipamento from '../../../pageObjects/IndexEquipamento';
import DetailsEquipamento from '../../../pageObjects/DetailsEquipamento';

Given('Visito a pagina de Equipamento', () => {
    IndexEquipamento.visitPage();
});

When('Eu clico no botao de detalhes de Equipamento', () => {
    IndexEquipamento.detailsEquipamento();
});

And('Clico para deletar Equipamento', () => {
    DetailsEquipamento.deleteEquipamento();
});

And('Clico para confirmar', () => {
    DetailsEquipamento.confirmDeleteEquipamento();
});

Then('A mensagem de sucesso aparece', () => {
    DetailsEquipamento.successMessage();
});