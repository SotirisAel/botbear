const tools = require("../tools/tools.js");
const got = require("got");

module.exports = {
    name: "cookie",
    ping: true,
    description: "Notifies you when you have a cookie availavle from 'ThePositiveBot'",
    permission: 100,
    execute: async (channel, user, input, perm) => {
        try {
            if (this.permission > perm) {
                return;
            }
            switch (input[2]) {
                case "register":
                    const register = await tools.query(`SELECT * FROM Cookies WHERE User=?`, [user.username]);

                    if (!register.length) {
                        await tools.query('INSERT INTO Cookies (User) values (?)', [user.username]);

                        return 'You are now registered for cookie notifications';

                    } else {
                        return 'You are already registered for cookie notifications';
                    }
                    break;
                case "unregister":
                    const unregister = await tools.query(`SELECT * FROM Cookies WHERE User=?`, [user.username]);

                    if (unregister.length) {
                        await tools.query(`DELETE FROM Cookies WHERE User=?`, [user.username]);

                        return 'You are now unregistered for cookie notifications';
                    } else {
                        return 'You are not registered for cookie notifications';
                    }
                    break;
                case "status":
                    const status = await tools.query(`SELECT * FROM Cookies WHERE User=?`, [user.username]);

                    if (status.length) {
                        if (status[0].RemindTime !== null) {
                            let cd = status[0].RemindTime - new Date().getTime();
                            cd = tools.humanizeDuration(cd);

                            return `There is no cookie for you right now, your next cookie is available in ${cd}`
                        } else {
                            return 'You have a cookie wating for you :)';
                        }
                    } else {
                        let cookieCD = await got(`https://api.roaringiron.com/cooldown/${user.username}`, { timeout: 10000 });

                        if (cookieCD["error"]) {
                            return cookieCD["error"];
                        }
                        console.log(cookieCD["can_claim"])
                        if (cookieCD["can_claim"] === true) {
                            return 'You have a cookie wating for you :)';
                        } else {
                            let cd = cookieCD["seconds_left"] * 1000;
                            cd = tools.humanizeDuration(cd);

                            return `There is no cookie for you right now, your next cookie is available in ${cd}`;
                        }
                    }
                default:
                    return 'Available cookie commands: "bb cookie register", "bb cookie unregister", "bb cookie status"'
            }

        } catch (err) {
            console.log(err);
            return ` Error FeelsBadMan `;
        }
    }
}