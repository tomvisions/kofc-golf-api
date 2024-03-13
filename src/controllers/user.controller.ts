import { userMapper } from "../mapper/";

export class UserController {

    /**
     * Function that determins if your username and password are correct
     * @param req
     * @param res
     * @param next
     */
    public static async apiPostSignIn(req: any, res: any, next: any) {
        try {
            console.log('here')
            if (req.body[userMapper.PARAMS_USERNAME] && req.body[userMapper.PARAMS_PASSWORD]) {
                const user = await userMapper.getUserBasedOnPassword(req.body);
                console.log('user');
                console.log(user);
                if (typeof(user) !== "object") {

                    return res.status(500).json({ error: "Username and/or Password incorrect" })
                }



                return res.status(200).json({"user":user, "token":userMapper.generateJWTToken()});
            } else {
                console.log("Missing either Username and/or password");
                return res.status(500).json({ error: "Missing either Username and/or password" })
            }
        } catch (error) {
            return res.status(500).json({ error: error.toString() })
        }

    }
/*

    server.post(`${apiPrefix}/sign-in`, (schema, { requestBody }) => {
        const { userName, password } = JSON.parse(requestBody)
        const user = schema.db.signInUserData.findBy({
            accountUserName: userName,
            password,
        })
        console.log('user', user)
        if (user) {
            const { avatar, userName, email, authority } = user
            return {
                user: { avatar, userName, email, authority },
                token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
            }
        }
        return new Response(
            401,
            { some: 'header' },
            { message: 'Invalid email or password!' }
        )
    })
*/


    /**
     * Sign up to Service functionality
     * @param req
     * @param res
     * @param next
     */
    public static async apiPostSignUp(req: any, res: any, next: any) {
        try {
            if (req.body[userMapper.PARAMS_EMAIL] && req.body[userMapper.PARAMS_PASSWORD] && req.body[userMapper.PARAMS_USERNAME]) {
                console.log('hre');

                const user = await userMapper.apiSignUp(req.body);
                console.log('there');
                console.log(user);
                if (!user) {
                    return res.status(500).json({ error: "Username already exists" })
                }

                return res.status(200).json({ result: "success", message: "User has been created" });
            }
        } catch (error) {

            return res.status(500).json({ error: error.toString() })
        }
    }

    public static async patchUpdateUser(req: any, res: any, next: any) {
        try {
            if (req.body[userMapper.PARAMS_ID] && req.body[userMapper.PARAMS_USER]) {
                const userUpdate = true; //await userMapper.apiUpdateUser(req.body);

                if (!userUpdate) {

                    return res.status(500).json({ result: "error", message: "User has not been successfully updated" })
                }

                return res.status(200).json({ result: "success", message: "User has been successfully updated" });
            }

            return res.status(500).json({ result: "error", message: "Missing parameters to access this function" })

        } catch (error) {
            return res.status(500).json({ result: "error", message: error.toString() })
        }
    }

    /**
     * Get All Users
     * @param req
     * @param res
     * @param next
     */
    public static async getAllUsers(req: any, res: any, next: any) {
        try {
            //         if (!userMapper.checkAuthenication(req.headers.authorization)) {
            //           return res.status(500).json({error: 'Not Authorized to access the API'})
            //     }

            const users = await userMapper.getAllUsers();

            if (typeof users === 'string') {
                return res.status(500).json({ error: users })
            }

            const paginationResults = userMapper.prepareListResults(users, req.query);

            return res.status(200).json(paginationResults)
        } catch (error) {

            return res.status(500).json({ error: error.toString() })
        }

    }
}
