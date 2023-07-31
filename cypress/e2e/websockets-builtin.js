// cypress/integration/websocket.spec.js
describe('WebSocket Server Tests', () => {
    it('should establish a secure WebSocket connection, subscribe to a topic, and receive a message', () => {
        const wssUrl = 'wss://hyperdata.it:4444';
        const topicName = 'topic1';
        const message = 'Hello, WebSocket Server!';

        let receivedMessages = []; // Custom variable to store received messages

        // Open secure WebSocket connection
        cy.visit('https://hyperdata.it/hkms/');
        cy.window().then((win) => {
            const wss = new win.WebSocket(wssUrl);

            // Subscribe to a topic
            wss.addEventListener('open', () => {
                wss.send(JSON.stringify({ type: 'subscribe', topics: [topicName] }));

                // Send a message to the server
                wss.send(JSON.stringify({ type: 'publish', topic: topicName, data: message }));
            });

            // Handle received messages
            wss.addEventListener('message', (event) => {
                const receivedMessage = JSON.parse(event.data);
                receivedMessages.push(receivedMessage);
            });

            // Wait for the message to be received
            cy.wait(1000); // Add a reasonable wait time for the message to propagate

            // Close the secure WebSocket connection
            wss.close();
        });

        // Assert the message was received
        cy.wrap(receivedMessages).should('not.be.empty');
        cy.wrap(receivedMessages).its('0').should('deep.include', { type: 'publish', topic: topicName, data: message });
    });
});
