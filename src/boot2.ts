import {MailMapper} from "./mapper/mail.mapper";
import {MailController} from "./controllers/mail.controller";

async function Run() {
    const test = {
    "email": "tcricksh@gmail.com",
    "name" : "tom",
    "body": "Would like to discuss something that is really cool. Woot!",
    "email_type": "contact-us",
    "subject": "Requesting time to check things blah blah",
    "phone": "613-111-1111"
    };
    const body = {}
    body['body'] = test;

   // const mail = await new MailController();
    const retval = await MailController.apiPostSendMail(body, null, null);
    console.log(retval);
//                params = `{"${PARAMS_ID}":"${req.body[PARAMS_ID]}","${PARAMS_GAME}":"${req.body[PARAMS_GAME]}"}`;
// const gameObject = await MailMapper.apiSendMail(id, game);
//          console.log('the game');
//  console.log(gameObject)
//            return res.status(200).json({result: "success", message: `an issue here ${util.inspect(test)}`});
   // await MailController.apiSendMail()
}

Run();
