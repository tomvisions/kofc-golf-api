// Create the promise and SES service object

// Import required AWS SDK clients and commands for Node.js
import { SESClient, SendEmailCommand }  from "@aws-sdk/client-ses";
//import { sesClient } from "./libs/sesClient.js";

// Set the parameters
const params = {
    Destination: {
        /* required */
        CcAddresses: [
            /* more items */
        ],
        ToAddresses: [
            "tcruicksh@gmail.com", //RECEIVER_ADDRESS
            /* more To-email addresses */
        ],
    },
    Message: {
        /* required */
        Body: {
            /* required */
            Html: {
                Charset: "UTF-8",
                Data: "HTML_FORMAT_BODY",
            },
            Text: {
                Charset: "UTF-8",
                Data: "TEXT_FORMAT_BODY",
            },
        },
        Subject: {
            Charset: "UTF-8",
            Data: "EMAIL_SUBJECT",
        },
    },
    Source: "tomc@tomvisions.com", // SENDER_ADDRESS
    ReplyToAddresses: [
        /* more items */
    ],
};

const run = async () => {
    try {
        const sesClient = new SESClient({'region': 'us-east-1'})
        console.log(params)
        console.log(params.Message.Body)

        const data = await sesClient.send(new SendEmailCommand(params));
        console.log("Success", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
        return false;
    }
};
run();
