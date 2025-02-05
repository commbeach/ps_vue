cypress/e2e/step_definitions/deleteModelo.feature

Feature: Deletar Modelo
    Background: Acessar a pagina de Modelo
        Given Visito a pagina de Modelo
        When Eu clico no botao de detalhes de Modelo

    Scenario: Deletar Modelo corretamente
        And Clico para deletar Modelo
        And Clico para confirmar
        Then A mensagem de sucesso aparece