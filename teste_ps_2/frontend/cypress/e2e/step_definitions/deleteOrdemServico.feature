cypress/e2e/step_definitions/deleteOrdemServico.feature

Feature: Deletar OrdemServico
    Background: Acessar a pagina de OrdemServico
        Given Visito a pagina de OrdemServico
        When Eu clico no botao de detalhes de OrdemServico

    Scenario: Deletar OrdemServico corretamente
        And Clico para deletar OrdemServico
        And Clico para confirmar
        Then A mensagem de sucesso aparece