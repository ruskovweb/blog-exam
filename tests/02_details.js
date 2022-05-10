import config from "./config.js";

describe('Post details', function() {

    it('should contains a card component with Title, Description and a back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/details/1`);
        
        browser.waitForElementPresent('main .container', 1000);

        // Card
        browser.verify.textEquals('main .container > .card .card-body .card-title', 'This is my first blog post');
        browser.verify.textEquals('main .container > .card .card-body .card-text', 'Hello and Welcome to my first blog post!');

        // Back button
        browser.verify.visible('main .container > .card .card-body a.btn.btn-outline-dark');
        browser.verify.textEquals('main .container > .card .card-body a.btn.btn-outline-dark', 'Back');
        browser.verify.attributeEquals('main .container > .card .card-body a.btn.btn-outline-dark', 'href', '/posts');

        browser.end();
    });
  
    it('should show error page if the post doesn\'t exist', function(browser) {
        browser.url(`${config.baseUrl}/posts/details/100000`);
        
        browser.waitForElementPresent('main .container > div.alert.alert-danger', 1000);
        browser.verify.textEquals('main .container > div.alert.alert-danger', 'Post with ID \'100000\' was not found.');

        browser.end();
    });

    it('should redirect to all posts when click on the back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/details/1`);
        
        browser.waitForElementPresent('main .container > .card', 1000);

        browser.click('main .container > .card .card-body a.btn.btn-outline-dark');

        browser.waitForElementPresent('main .container', 1000);
        browser.verify.urlEquals(`${config.baseUrl}/posts`);

        browser.end();
    });

});
