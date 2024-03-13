const os = require('node:os');

export class EmailMessaging
{
    static EMAIL_TYPE_CONTACT = 'contact';

    static CONTACT_SUBJECT = '%s';
    static CONTACT_CONTENT_TEXT = `You have received a message from the Contact Form:\\n%s`;
    static CONTACT_CONTENT_HTML = '<p>You have received a message from the Contact Form:</p><p>%s</p>';
}
