import config from "./config.js";

describe('Post details', function() {

    it('should contains a card component with Title, Description and a back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/details/1`);
        
        // Card
        browser.expect.element('main .container > .card').to.be.present.after(1000);
        browser.expect.element('main .container > .card .card-body .card-title').text.to.equal('This is my first blog post');
        browser.expect.element('main .container > .card .card-body .card-text').text.to.equal('Hello and Welcome to my first blog post!');

        // Back button
        browser.expect.element('main .container > .card .card-body a.btn.btn-outline-dark').to.be.visible;
        browser.expect.element('main .container > .card .card-body a.btn.btn-outline-dark').text.to.equal('Back');
        browser.expect.element('main .container > .card .card-body a.btn.btn-outline-dark').to.have.attribute('href').equals('/posts');

        browser.end();
    });
  
    it('should show error page if the post doesn\'t exist', function(browser) {
        browser.url(`${config.baseUrl}/posts/details/100000`);
        
        browser.expect.element('main .container > div.alert.alert-danger').to.be.present.after(1000);
        browser.expect.element('main .container > div.alert.alert-danger').text.to.equal('Post with ID \'100000\' was not found.');

        browser.end();
    });

    it('should redirect to all posts when click on the back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/details/1`);
        
        browser.expect.element('main .container > .card').to.be.present.after(1000);

        browser.click('main .container > .card .card-body a.btn.btn-outline-dark');

        browser.expect.element('main .container').to.be.present.after(1000);
        browser.expect.url().to.be.equal(`${config.baseUrl}/posts`);

        browser.end();
    });

});
