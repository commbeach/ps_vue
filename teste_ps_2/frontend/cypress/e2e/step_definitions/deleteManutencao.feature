cypress/e2e/step_definitions/deleteManutencao.feature

Feature: Deletar Manutencao
    Background: Acessar a pagina de Manutencao
        Given Visito a pagina de Manutencao
        When Eu clico no botao de detalhes de Manutencao

    Scenario: Deletar Manutencao corretamente
        And Clico para deletar Manutencao
        And Clico para confirmar
        Then A mensagem de sucesso aparece