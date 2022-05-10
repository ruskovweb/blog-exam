import config from "./config.js";

describe('Create a post', function() {

    it('should contains a form with two inputs and two buttons', function(browser) {
        browser.url(`${config.baseUrl}/posts/create`);
        
        // Form
        browser.expect.element('main .container > form').to.be.present.after(1000);
        browser.expect.element('main .container > form').to.have.attribute('method').equals('post');
        browser.expect.element('main .container > form').to.have.attribute('action').equals('/posts/create');

        // Title
        browser.expect.element('main .container > form > div:nth-child(1) label').text.to.equal('Title');
        browser.expect.element('main .container > form > div:nth-child(1) input').to.have.attribute('id').equals('title');
        browser.expect.element('main .container > form > div:nth-child(1) input').to.have.attribute('name').equals('title');

        // Description
        browser.expect.element('main .container > form > div:nth-child(2) label').text.to.equal('Description');
        browser.expect.element('main .container > form > div:nth-child(2) input').to.have.attribute('id').equals('description');
        browser.expect.element('main .container > form > div:nth-child(2) input').to.have.attribute('name').equals('description');

        // Back button
        browser.expect.element('main .container > form a.btn.btn-outline-dark').to.be.visible;
        browser.expect.element('main .container > form a.btn.btn-outline-dark').text.to.equal('Back');
        browser.expect.element('main .container > form a.btn.btn-outline-dark').to.have.attribute('href').equals('/posts');

        // Create button
        browser.expect.element('main .container > form button.btn.btn-primary').to.be.visible;
        browser.expect.element('main .container > form button.btn.btn-primary').text.to.equal('Create');
        browser.expect.element('main .container > form button.btn.btn-primary').to.have.attribute('type').equals('submit');

        browser.end();
    });

    it('should show error page if the title is empty', function(browser) {
        browser.url(`${config.baseUrl}/posts/create`);
        
        browser.expect.element('main .container > form').to.be.present.after(1000);

        browser.setValue('main .container > form > div:nth-child(1) input', '');
        browser.setValue('main .container > form > div:nth-child(2) input', 'With my cool description');

        browser.click('main .container > form button.btn.btn-primary[type=submit]');

        browser.expect.element('main .container > div.alert.alert-danger').to.be.present.after(1000);
        browser.expect.element('main .container > div.alert.alert-danger').text.to.equal('Post title or description is not valid.');

        browser.end();
    });

    it('should show error page if the description is empty', function(browser) {
        browser.url(`${config.baseUrl}/posts/create`);
        
        browser.expect.element('main .container > form').to.be.present.after(1000);

        browser.setValue('main .container > form > div:nth-child(1) input', 'My new post');
        browser.setValue('main .container > form > div:nth-child(2) input', '');

        browser.click('main .container > form button.btn.btn-primary[type=submit]');

        browser.expect.element('main .container > div.alert.alert-danger').to.be.present.after(1000);
        browser.expect.element('main .container > div.alert.alert-danger').text.to.equal('Post title or description is not valid.');

        browser.end();
    });

    it('should redirect to all posts when click on the back button', function(browser) {
        browser.url(`${config.baseUrl}/posts/create`);
        
        browser.expect.element('main .container > form').to.be.present.after(1000);

        browser.click('main .container > form a.btn.btn-outline-dark');

        browser.expect.element('main .container').to.be.present.after(1000);
        browser.expect.url().to.be.equal(`${config.baseUrl}/posts`);

        browser.end();
    });

    it('should create new post', function(browser) {
        browser.url(`${config.baseUrl}/posts/create`);
        
        browser.expect.element('main .container > form').to.be.present.after(1000);

        browser.setValue('main .container > form > div:nth-child(1) input', 'My new post');
        browser.setValue('main .container > form > div:nth-child(2) input', 'With my cool description');

        browser.click('main .container > form button.btn.btn-primary[type=submit]');

        browser.expect.element('main .container > table').to.be.present.after(1000);
        browser.expect.url().to.be.equal(`${config.baseUrl}/posts`);

        browser.expect.elements('main .container > table tbody tr').count.to.equal(2);

        browser.expect.element('main .container > table tbody tr:nth-child(1) th:nth-child(1)').text.to.equal('1');
        browser.expect.element('main .container > table tbody tr:nth-child(1) td:nth-child(2)').text.to.equal('This is my first blog post');
        browser.expect.element('main .container > table tbody tr:nth-child(1) td:nth-child(3)').text.to.equal('Hello and Welcome to my first blog post!');

        browser.expect.element('main .container > table tbody tr:nth-child(2) th:nth-child(1)').text.to.equal('2');
        browser.expect.element('main .container > table tbody tr:nth-child(2) td:nth-child(2)').text.to.equal('My new post');
        browser.expect.element('main .container > table tbody tr:nth-child(2) td:nth-child(3)').text.to.equal('With my cool description');

        browser.end();
    });
});
