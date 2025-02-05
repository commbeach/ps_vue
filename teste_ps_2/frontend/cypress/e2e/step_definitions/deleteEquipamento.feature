cypress/e2e/step_definitions/deleteEquipamento.feature

Feature: Deletar Equipamento
    Background: Acessar a pagina de Equipamento
        Given Visito a pagina de Equipamento
        When Eu clico no botao de detalhes de Equipamento

    Scenario: Deletar Equipamento corretamente
        And Clico para deletar Equipamento
        And Clico para confirmar
        Then A mensagem de sucesso aparece