describe("Blog app", function () {
  before(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      name: "Testi Käyttäjä",
      username: "testuser",
      password: "secret",
    };
    const user2 = {
      name: "Testi Käyttäjä",
      username: "test",
      password: "secret",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user1);
    cy.request("POST", "http://localhost:3003/api/users/", user2);
  });

  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("testuser");
      cy.get("input:last").type("secret");
      cy.contains("login").click();
      cy.contains("Testi Käyttäjä is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("test");
      cy.get("input:last").type("test");
      cy.contains("login").click();
      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "secret" });
    });

    it("a blog can be created", function () {
      cy.contains("New blog").click();
      cy.get('input[placeholder="Blog title"').type("Blog by cypress");
      cy.get('input[placeholder="Blog author"').type("Cypress Blogger");
      cy.get('input[placeholder="Blog url"').type("www.cypressblog.com");
      cy.contains("create").click();
      cy.contains("Added new blog");
    });

    it("a blog can be liked", function () {
      cy.contains("view").click();
      cy.contains("likes 0");
      cy.contains("like").click();
      cy.contains("likes 1");
    });

    it("a blog cannot be deleted by a user who didnt create it", function () {
      cy.login({ username: "test", password: "secret" });
      cy.contains("view").click();
      cy.contains("Remove").should("not.exist");
    });

    it("a blog can be deleted by the user who created it", function () {
      cy.contains("view").click();
      cy.contains("Remove").click();
      cy.contains("Blog by cypress").should("not.exist");
    });

    it("shows the blogs in correct order", function () {
      cy.contains("New blog").click();
      cy.get('input[placeholder="Blog title"').type("First testblog");
      cy.get('input[placeholder="Blog author"').type("test");
      cy.get('input[placeholder="Blog url"').type("www.cypressblog.com");
      cy.contains("create").click();
      cy.contains("New blog").click();
      cy.get('input[placeholder="Blog title"').type("Second testblog");
      cy.get('input[placeholder="Blog author"').type("test");
      cy.get('input[placeholder="Blog url"').type("www.cypressblog.com");
      cy.contains("create").click();
      cy.contains("Second testblog, test").parent().find("button").click();
      cy.contains("like").click();
      cy.contains("likes 1");
      cy.contains("hide").click();
      cy.get(".blog").eq(0).should("contain", "Second testblog");
      cy.get(".blog").eq(1).should("contain", "First testblog");
      cy.contains("First testblog, test").parent().find("button").click();
      cy.contains("like").click();
      cy.contains("likes 1");
      cy.contains("like").click();
      cy.contains("likes 2");
      cy.get(".blog").eq(0).should("contain", "First testblog");
      cy.get(".blog").eq(1).should("contain", "Second testblog");
    });
  });
});
