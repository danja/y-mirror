/*
     cy.route({
            method: 'GET',
            url: 'wss://hyperdata.it:4444/',
            status: 101,
        }).as('websocket');
        */
describe('WebSocket Server Tests', () => {
    it('should establish a WebSocket connection, subscribe to a topic, and receive a message', () => {
        cy.openWebSocket('wss://hyperdata.it:4444');

        cy.webSocketSend({
            type: 'subscribe',
            topics: ['topic1']
        });

        cy.webSocketSend({
            type: 'publish',
            topic: 'topic1',
            data: 'Hello, WebSocket Server!'
        });

        // Wait for the message to be received
        cy.wait(1000); // Add a reasonable wait time for the message to propagate

        cy.closeWebSocket();

        // Assert the message was received
        cy.get('@receivedWebSocketMessages').should('contain', 'Hello, WebSocket Server!');
    });
});