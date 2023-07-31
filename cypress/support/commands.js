// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
import './websocketCommands';

import { addStreamCommands } from '@lensesio/cypress-websocket-testing';
addStreamCommands();


Cypress.Commands.add('openWebSocket', (url, callback) => {
    cy.task("log", "url = " + url)
    const receivedMessages = [];
    const webSocket = new WebSocket(url);

    webSocket.addEventListener('open', () => {
        webSocket.addEventListener('message', (event) => {
            callback(event, receivedMessages);
        });
    });

    Cypress.on('window:before:unload', () => {
        webSocket.close();
    });

    return new Cypress.Promise((resolve) => {
        webSocket.addEventListener('close', () => {
            resolve(receivedMessages);
        });
    });
});

Cypress.Commands.add('sendWebSocketMessage', (message) => {
    cy.window().then((win) => {
        win.webSocket.send(JSON.stringify(message));
    });
});

Cypress.Commands.add('closeWebSocket', () => {
    cy.window().then((win) => {
        win.webSocket.close();
    });
});

Cypress.Commands.add('getWebSocketMessages', () => {
    return new Cypress.Promise((resolve) => {
        cy.window().then((win) => {
            resolve(win.receivedMessages);
        });
    });
});