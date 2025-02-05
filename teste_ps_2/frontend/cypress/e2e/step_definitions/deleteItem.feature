cypress/e2e/step_definitions/deleteItem.feature

Feature: Deletar Item
    Background: Acessar a pagina de Item
        Given Visito a pagina de Item
        When Eu clico no botao de detalhes de Item

    Scenario: Deletar Item corretamente
        And Clico para deletar Item
        And Clico para confirmar
        Then A mensagem de sucesso aparece