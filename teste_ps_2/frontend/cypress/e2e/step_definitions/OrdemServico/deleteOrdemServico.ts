cypress/e2e/step_definitions/deleteOrdemServico/deleteOrdemServico.ts

import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import IndexOrdemServico from '../../../pageObjects/IndexOrdemServico';
import DetailsOrdemServico from '../../../pageObjects/DetailsOrdemServico';

Given('Visito a pagina de OrdemServico', () => {
    IndexOrdemServico.visitPage();
});

When('Eu clico no botao de detalhes de OrdemServico', () => {
    IndexOrdemServico.detailsOrdemServico();
});

And('Clico para deletar OrdemServico', () => {
    DetailsOrdemServico.deleteOrdemServico();
});

And('Clico para confirmar', () => {
    DetailsOrdemServico.confirmDeleteOrdemServico();
});

Then('A mensagem de sucesso aparece', () => {
    DetailsOrdemServico.successMessage();
});