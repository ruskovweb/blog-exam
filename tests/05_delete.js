import config from "./config.js";

describe('Post details', function() {

    it('should contains a card component with Title, Description and a back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/1`);
        
        // Card
        browser.waitForElementPresent('main .container > .card', 1000);
        browser.verify.textEquals('main .container > .card .card-body .card-title', 'My edited post');
        browser.verify.textEquals('main .container > .card .card-body .card-text', 'With my edited cool description!');

        // Alert
        browser.verify.textEquals('main .container > .card .card-body div.alert.alert-danger', 'Are you sure?');

        // Form
        browser.waitForElementPresent('main .container > .card .card-body > form', 1000);
        browser.verify.attributeEquals('main .container > .card .card-body > form', 'method', 'post');
        browser.verify.attributeEquals('main .container > .card .card-body > form', 'action', '/posts/delete/1');

        // Back button
        browser.verify.visible('main .container > .card .card-body > form a.btn.btn-outline-dark');
        browser.verify.textEquals('main .container > .card .card-body > form a.btn.btn-outline-dark', 'Back');
        browser.verify.attributeEquals('main .container > .card .card-body > form a.btn.btn-outline-dark', 'href', '/posts');

        // Delete button
        browser.verify.visible('main .container > .card .card-body > form button.btn.btn-danger');
        browser.verify.textEquals('main .container > .card .card-body > form button.btn.btn-danger', 'Delete');
        browser.verify.attributeEquals('main .container > .card .card-body > form button.btn.btn-danger', 'type', 'submit');

        browser.end();
    });
  
    it('should show error page if the post doesn\'t exist', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/100000`);
        
        browser.waitForElementPresent('main .container > div.alert.alert-danger', 1000);
        browser.verify.textEquals('main .container > div.alert.alert-danger', 'Post with ID \'100000\' was not found.');

        browser.end();
    });

    it('should show error page if the post doesn\'t exist after sending a POST request', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/1`);
        
        browser.execute("document.querySelector('main .container > .card .card-body > form').setAttribute('action', '/posts/delete/100000');")

        browser.click('main .container > .card .card-body > form button.btn.btn-danger[type=submit]');

        browser.waitForElementPresent('main .container > div.alert.alert-danger', 1000);
        browser.verify.textEquals('main .container > div.alert.alert-danger', 'Post with ID \'100000\' was not found.');

        browser.end();
    });

    it('should redirect to all posts when click on the back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/1`);
        
        browser.waitForElementPresent('main .container > .card', 1000);

        browser.click('main .container > .card .card-body > form a.btn.btn-outline-dark');

        browser.waitForElementPresent('main .container', 1000);
        browser.verify.urlEquals(`${config.baseUrl}/posts`);

        browser.end();
    });

    it('should delete a post and redirect to home page', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/1`);
        
        browser.waitForElementPresent('main .container > .card', 1000);

        browser.click('main .container > .card .card-body > form button.btn.btn-danger');

        browser.waitForElementPresent('main .container', 1000);
        browser.verify.urlEquals(`${config.baseUrl}/posts`);

        browser.verify.elementsCount('main .container > table tbody tr', 1);

        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) th:nth-child(1)', '2');
        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) td:nth-child(2)', 'My new post');
        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) td:nth-child(3)', 'With my cool description');

        browser.end();
    });

});
