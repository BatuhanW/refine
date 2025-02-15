/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("auth-google-login", () => {
    const BASE_URL = "http://localhost:3000";

    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.visit(BASE_URL);
    });

    it("has google button", () => {
        cy.get('head script[src*="https://accounts.google.com/gsi/client"]');
        cy.get("#login-with-google-button");
        cy.get(".ant-typography").contains("Powered by Google");
    });
});
