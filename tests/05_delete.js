import config from "./config.js";

describe('Post details', function() {

    it('should contains a card component with Title, Description and a back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/1`);
        
        // Card
        browser.expect.element('main .container > .card').to.be.present.after(1000);
        browser.expect.element('main .container > .card .card-body .card-title').text.to.equal('My edited post');
        browser.expect.element('main .container > .card .card-body .card-text').text.to.equal('With my edited cool description!');

        // Alert
        browser.expect.element('main .container > .card .card-body div.alert.alert-danger').text.to.equal('Are you sure?');

        // Form
        browser.expect.element('main .container > .card .card-body > form').to.be.present.after(1000);
        browser.expect.element('main .container > .card .card-body > form').to.have.attribute('method').equals('post');
        browser.expect.element('main .container > .card .card-body > form').to.have.attribute('action').equals('/posts/delete/1');

        // Back button
        browser.expect.element('main .container > .card .card-body > form a.btn.btn-outline-dark').to.be.visible;
        browser.expect.element('main .container > .card .card-body > form a.btn.btn-outline-dark').text.to.equal('Back');
        browser.expect.element('main .container > .card .card-body > form a.btn.btn-outline-dark').to.have.attribute('href').equals('/posts');

        // Delete button
        browser.expect.element('main .container > .card .card-body > form button.btn.btn-danger').to.be.visible;
        browser.expect.element('main .container > .card .card-body > form button.btn.btn-danger').text.to.equal('Delete');
        browser.expect.element('main .container > .card .card-body > form button.btn.btn-danger').to.have.attribute('type').equals('submit');

        browser.end();
    });
  
    it('should show error page if the post doesn\'t exist', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/100000`);
        
        browser.expect.element('main .container > div.alert.alert-danger').to.be.present.after(1000);
        browser.expect.element('main .container > div.alert.alert-danger').text.to.equal('Post with ID \'100000\' was not found.');

        browser.end();
    });

    it('should show error page if the post doesn\'t exist after sending a POST request', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/1`);
        
        browser.execute("document.querySelector('main .container > .card .card-body > form').setAttribute('action', '/posts/delete/100000');")

        browser.click('main .container > .card .card-body > form button.btn.btn-danger[type=submit]');

        browser.expect.element('main .container > div.alert.alert-danger').to.be.present.after(1000);
        browser.expect.element('main .container > div.alert.alert-danger').text.to.equal('Post with ID \'100000\' was not found.');

        browser.end();
    });

    it('should redirect to all posts when click on the back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/1`);
        
        browser.expect.element('main .container > .card').to.be.present.after(1000);

        browser.click('main .container > .card .card-body > form a.btn.btn-outline-dark');

        browser.expect.element('main .container').to.be.present.after(1000);
        browser.expect.url().to.be.equal(`${config.baseUrl}/posts`);

        browser.end();
    });

    it('should delete a post and redirect to home page', function(browser) {
        browser.url(`${config.baseUrl}/posts/delete/1`);
        
        browser.expect.element('main .container > .card').to.be.present.after(1000);

        browser.click('main .container > .card .card-body > form button.btn.btn-danger');

        browser.expect.element('main .container').to.be.present.after(1000);
        browser.expect.url().to.be.equal(`${config.baseUrl}/posts`);

        browser.expect.elements('main .container > table tbody tr').count.to.equal(1);

        browser.expect.element('main .container > table tbody tr:nth-child(1) th:nth-child(1)').text.to.equal('2');
        browser.expect.element('main .container > table tbody tr:nth-child(1) td:nth-child(2)').text.to.equal('My new post');
        browser.expect.element('main .container > table tbody tr:nth-child(1) td:nth-child(3)').text.to.equal('With my cool description');

        browser.end();
    });

});
