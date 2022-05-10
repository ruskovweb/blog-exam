import config from "./config.js";

describe('All posts', function() {

    it('should contains a table', function(browser) {
        browser.url(`${config.baseUrl}/posts`);
        
        browser.waitForElementPresent('main .container', 1000);

        // Table
        browser.verify.textEquals('main .container > table thead tr:nth-child(1) th:nth-child(1)', 'ID');
        browser.verify.textEquals('main .container > table thead tr:nth-child(1) th:nth-child(2)', 'Title');
        browser.verify.textEquals('main .container > table thead tr:nth-child(1) th:nth-child(3)', 'Description');
        browser.verify.textEquals('main .container > table thead tr:nth-child(1) th:nth-child(4)', 'Actions');

        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) th:nth-child(1)', '1');
        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) td:nth-child(2)', 'This is my first blog post');
        browser.verify.textEquals('main .container > table tbody tr:nth-child(1) td:nth-child(3)', 'Hello and Welcome to my first blog post!');

        // Create button
        browser.verify.visible('main .container > a.btn.btn-primary');
        browser.verify.textEquals('main .container > a:nth-child(1)', 'Create');
        browser.verify.attributeEquals('main .container > a:nth-child(1)', 'href', '/posts/create');

        // Details button
        browser.verify.visible('main .container table tbody tr:nth-child(1) td:nth-child(4) > a.btn.btn-info');
        browser.verify.textEquals('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(1)', 'Details');
        browser.verify.attributeEquals('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(1)', 'href', '/posts/details/1');

        // Edit button
        browser.verify.visible('main .container table tbody tr:nth-child(1) td:nth-child(4) > a.btn.btn-warning');
        browser.verify.textEquals('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(2)', 'Edit');
        browser.verify.attributeEquals('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(2)', 'href', '/posts/edit/1');

        // Delete button
        browser.verify.visible('main .container table tbody tr:nth-child(1) td:nth-child(4) > a.btn.btn-danger');
        browser.verify.textEquals('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(3)', 'Delete');
        browser.verify.attributeEquals('main .container table tbody tr:nth-child(1) td:nth-child(4) > a:nth-child(3)', 'href', '/posts/delete/1');
        
        browser.end();
    });
});
