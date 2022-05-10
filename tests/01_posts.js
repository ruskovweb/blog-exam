import config from "./config.js";

describe('All posts', function() {

    it('should contains a table', function(browser) {
        browser.url(`${config.baseUrl}/posts`);
        
        // Table
        browser.expect.element('main .container > table').to.be.present.after(1000);
        browser.expect.element('main .container > table thead tr:nth-child(1) th:nth-child(1)').text.to.equal('ID');
        browser.expect.element('main .container > table thead tr:nth-child(1) th:nth-child(2)').text.to.equal('Title');
        browser.expect.element('main .container > table thead tr:nth-child(1) th:nth-child(3)').text.to.equal('Description');
        browser.expect.element('main .container > table thead tr:nth-child(1) th:nth-child(4)').text.to.equal('Actions');

        browser.expect.element('main .container > table tbody tr:nth-child(1) th:nth-child(1)').text.to.equal('1');
        browser.expect.element('main .container > table tbody tr:nth-child(1) td:nth-child(2)').text.to.equal('This is my first blog post');
        browser.expect.element('main .container > table tbody tr:nth-child(1) td:nth-child(3)').text.to.equal('Hello and Welcome to my first blog post!');

        // Create button
        browser.expect.element('main .container > a.btn.btn-primary').to.be.visible;
        browser.expect.element('main .container > a:nth-child(1)').text.to.equal('Create');
        browser.expect.element('main .container > a:nth-child(1)').to.have.attribute('href').which.contains('/posts/create');

        // Details button
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a.btn.btn-info').to.be.visible;
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(1)').text.to.equal('Details');
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(1)').to.have.attribute('href').equals('/posts/details/1');

        // Edit button
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a.btn.btn-warning').to.be.visible;
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(2)').text.to.equal('Edit');
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(2)').to.have.attribute('href').equals('/posts/edit/1');

        // Delete button
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a.btn.btn-danger').to.be.visible;
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(3)').text.to.equal('Delete');
        browser.expect.element('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(3)').to.have.attribute('href').equals('/posts/delete/1');
        
        browser.end();
    });
});
