import config from "./config.js";

describe('Edit a post', function() {

    it('should contains a form with two inputs and two buttons', function(browser) {
        browser.url(`${config.baseUrl}/posts/edit/1`);
        
        // Form
        browser.waitForElementPresent('main .container > form', 1000);
        browser.verify.attributeEquals('main .container > form', 'method', 'post');
        browser.verify.attributeEquals('main .container > form', 'action', '/posts/edit/1');

        // Title
        browser.verify.textEquals('main .container > form > div:nth-child(1) label', 'Title');
        browser.verify.attributeEquals('main .container > form > div:nth-child(1) input', 'id', 'title');
        browser.verify.attributeEquals('main .container > form > div:nth-child(1) input', 'name', 'title');
        browser.verify.valueEquals('main .container > form > div:nth-child(1) input', 'This is my first blog post')

        // Description
        browser.verify.textEquals('main .container > form > div:nth-child(2) label', 'Description');
        browser.verify.attributeEquals('main .container > form > div:nth-child(2) input', 'id', 'description');
        browser.verify.attributeEquals('main .container > form > div:nth-child(2) input', 'name', 'description');
        browser.verify.valueEquals('main .container > form > div:nth-child(2) input', 'Hello and Welcome to my first blog post!')

        // Back button
        browser.verify.visible('main .container > form a.btn.btn-outline-dark');
        browser.verify.textEquals('main .container > form a.btn.btn-outline-dark', 'Back');
        browser.verify.attributeEquals('main .container > form a.btn.btn-outline-dark', 'href', '/posts');

        // Create button
        browser.verify.visible('main .container > form button.btn.btn-warning');
        browser.verify.textEquals('main .container > form button.btn.btn-warning', 'Edit');
        browser.verify.attributeEquals('main .container > form button.btn.btn-warning', 'type', 'submit');

        browser.end();
    });
  
    it('should show error page if the post doesn\'t exist', function(browser) {
        browser.url(`${config.baseUrl}/posts/edit/100000`);
        
        browser.waitForElementPresent('main .container > div.alert.alert-danger', 1000);
        browser.verify.textEquals('main .container > div.alert.alert-danger', 'Post with ID \'100000\' was not found.');

        browser.end();
    });

    it('should show error page if the post doesn\'t exist after sending a POST request', function(browser) {
        browser.url(`${config.baseUrl}/posts/edit/1`);
        
        browser.execute("document.querySelector('main .container > form').setAttribute('action', '/posts/edit/100000');")

        browser.click('main .container > form button.btn.btn-warning[type=submit]');

        browser.waitForElementPresent('main .container > div.alert.alert-danger', 1000);
        browser.verify.textEquals('main .container > div.alert.alert-danger', 'Post with ID \'100000\' was not found.');

        browser.end();
    });

    it('should redirect to all posts when click on the back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/edit/1`);
        
        browser.waitForElementPresent('main .container > form', 1000);

        browser.click('main .container > form a.btn.btn-outline-dark');

        browser.waitForElementPresent('main .container', 1000);
        browser.verify.urlEquals(`${config.baseUrl}/posts`);

        browser.end();
    });

    it('should show error page if the title is empty', function(browser) {
        browser.url(`${config.baseUrl}/posts/edit/1`);
        
        browser.waitForElementPresent('main .container > form', 1000);

        browser.setValue('main .container > form > div:nth-child(1) input', '');
        browser.setValue('main .container > form > div:nth-child(2) input', 'With my new cool description');

        browser.click('main .container > form button.btn.btn-warning[type=submit]');

        browser.waitForElementPresent('main .container > div.alert.alert-danger', 1000);
        browser.verify.textEquals('main .container > div.alert.alert-danger', 'Post title or description is not valid.');

        browser.end();
    });

    it('should show error page if the description is empty', function(browser) {
        browser.url(`${config.baseUrl}/posts/edit/1`);
        
        browser.waitForElementPresent('main .container > form', 1000);

        browser.setValue('main .container > form > div:nth-child(1) input', 'My new post');
        browser.setValue('main .container > form > div:nth-child(2) input', '');

        browser.click('main .container > form button.btn.btn-warning[type=submit]');

        browser.waitForElementPresent('main .container > div.alert.alert-danger', 1000);
        browser.verify.textEquals('main .container > div.alert.alert-danger', 'Post title or description is not valid.');

        browser.end();
    });

    it('should edit existing post', function(browser) {
        browser.url(`${config.baseUrl}/posts/edit/1`);
        
        browser.waitForElementPresent('main .container > form', 1000);

        browser.setValue('main .container > form > div:nth-child(1) input', 'My edited post');
        browser.setValue('main .container > form > div:nth-child(2) input', 'With my edited cool description!');

        browser.click('main .container > form button.btn.btn-warning[type=submit]');

        browser.waitForElementPresent('main .container > table', 1000);
        browser.verify.urlEquals(`${config.baseUrl}/posts`);

        browser.verify.elementsCount('main .container > table tbody tr', 2);

        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) th:nth-child(1)', '1');
        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) td:nth-child(2)', 'My edited post');
        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) td:nth-child(3)', 'With my edited cool description!');

        browser.verify.textEquals('main .container > table tbody tr:nth-child(2) th:nth-child(1)', '2');
        browser.verify.textEquals('main .container > table tbody tr:nth-child(2) td:nth-child(2)', 'My new post');
        browser.verify.textEquals('main .container > table tbody tr:nth-child(2) td:nth-child(3)', 'With my cool description');

        browser.end();
    });
});
