describe('WebSocket Server Tests', () => {
    it('should establish a secure WebSocket connection, subscribe to a topic, and receive a message', () => {
        const wssUrl = 'wss://hyperdata.it:4444';
        const topicName = 'topic1';
        const message = 'Hello, WebSocket Server!';

        //  cy.task("log", "A")

        cy.openWebSocket(wssUrl, (event, receivedMessages) => {
            cy.task("log", "B")
            const receivedMessage = JSON.parse(event.data);
            cy.task("log", "receivedMessage = " + receivedMessage)
            receivedMessages.push(receivedMessage);
            cy.task("log", "C")
        }).then((receivedMessages) => {
            cy.sendWebSocketMessage({ type: 'subscribe', topics: [topicName] });
            cy.sendWebSocketMessage({ type: 'publish', topic: topicName, data: message });

            // cy.task("log", "D")
            // Wait for the message to be received (optional, you can also use Cypress' built-in cy.wait or any other assertion)
            // In this example, we'll wait for 1 second to give some time for the message to propagate.
            cy.wait(5000);

            cy.task("log", "E")

            cy.closeWebSocket();
        });

        cy.getWebSocketMessages().then((receivedMessages) => {
            console.log('E')
            // Assert the message was received
            expect(receivedMessages).to.not.be.empty;
            expect(receivedMessages[0]).to.deep.include({ type: 'publish', topic: topicName, data: message });
        });
    });
});