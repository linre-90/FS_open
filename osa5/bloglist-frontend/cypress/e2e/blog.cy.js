describe("Blog app", function () {
    beforeEach(function () {
        // Clears database
        cy.request("POST", "http://localhost:3003/api/testing/reset");

        // Create new user
        cy.request("POST", "http://localhost:3003/api/users", {
            username: "testUser",
            name: "Cypress Hill",
            password: "test",
        });

        cy.visit("http://localhost:3000");
    });

    it("login form is shown", function () {
        cy.get("#username").type("test");
        cy.get("#password").type("salainensana");
        cy.contains("username");
        cy.contains("password");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.get("#username").type("testUser");
            cy.get("#password").type("test");
            cy.get("#loginBtn").click();
            cy.contains("Cypress Hill logged in");
        });

        it("fails with wrong credentials", function () {
            cy.get("#username").type("testUser");
            cy.get("#password").type("testsd");
            cy.get("#loginBtn").click();
            cy.contains("Wrong credentials");
        });
    });

    describe("When logged in", function () {
        beforeEach(function () {
            cy.request("POST", "http://localhost:3003/api/login", {
                username: "testUser",
                password: "test",
            }).then((response) => {
                localStorage.setItem("bloguser", JSON.stringify(response.body));
                cy.visit("http://localhost:3000");
            });
        });

        it("new blog gets created", function () {
            cy.contains("Create new blog").click();
            cy.get("#title").type("Cypress hill, the band!");
            cy.get("#author").type("Cypress Hill");
            cy.get("#url").type("/asdasd");
            cy.get("#submitBlog").click();
            cy.contains("Cypress hill, the band! Cypress Hill");
        });

        it("blog can be liked", function () {
            cy.contains("Create new blog").click();
            cy.get("#title").type("Cypress hill, the band!");
            cy.get("#author").type("Cypress Hill");
            cy.get("#url").type("/asdasd");
            cy.get("#submitBlog").click();
            cy.contains("View").click();
            cy.contains("likes: 0");
            cy.contains("Like").click();
            cy.contains("likes: 1");
            cy.contains("Like").click();
            cy.contains("likes: 2");
        });

        it("blog can be deleted by creator", function () {
            cy.contains("Create new blog").click();
            cy.get("#title").type("Cypress hill, the band!");
            cy.get("#author").type("Cypress Hill");
            cy.get("#url").type("/asdasd");
            cy.get("#submitBlog").click();
            cy.contains("View").click();
            cy.contains("Delete").click();
            cy.get("html").should("not.contain", "Cypress hill, the band! Cypress Hill");

        });
    });
});
