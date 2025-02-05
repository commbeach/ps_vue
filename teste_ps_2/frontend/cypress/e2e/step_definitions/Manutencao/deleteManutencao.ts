cypress/e2e/step_definitions/deleteManutencao/deleteManutencao.ts

import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import IndexManutencao from '../../../pageObjects/IndexManutencao';
import DetailsManutencao from '../../../pageObjects/DetailsManutencao';

Given('Visito a pagina de Manutencao', () => {
    IndexManutencao.visitPage();
});

When('Eu clico no botao de detalhes de Manutencao', () => {
    IndexManutencao.detailsManutencao();
});

And('Clico para deletar Manutencao', () => {
    DetailsManutencao.deleteManutencao();
});

And('Clico para confirmar', () => {
    DetailsManutencao.confirmDeleteManutencao();
});

Then('A mensagem de sucesso aparece', () => {
    DetailsManutencao.successMessage();
});