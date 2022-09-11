require('dotenv').config();
const tools = require('../tools/tools.js');
const regex = require('../tools/regex.js');
const {VM} = require('vm2');

module.exports = {
	name: 'eval',
	ping: false,
	description: 'This command will let you execute js code in the bot and make it return the result. (The message gets checked for massping, banphrases etc.). Example: "bb eval "lole ".repeat(10);"',
	permission: 1500,
	category: 'Random command',
	execute: async (channel, user, input, perm) => {
		try {
			if (module.exports.permission > perm) {
				return;
			}
			input = input.splice(2);
			let msg = input.join(' ');

			msg.replace(regex.invisChar, '');

            const vm = new VM({
                timeout: 10000,
                allowAsync: false,
                wasm: false,
                eval: false,
                console: 'off',
                sandbox: {}
            });

            msg = msg.toString().split(';');
            if(!/\breturn\b/.test(msg[msg.length - 1])) { msg[msg.length - 1] = `return ${msg[msg.length - 1].trim()}`; }

            msg = await vm.run(`(() => { ${msg.join(';')} })()`).toString();

            if (tools.isMod(user, channel) === false && perm < 2000 && msg.match(/[&|$|/|.|?|-]|\bkb\b|^\bmelon\b/g)) { // ignores &, $, kb, /, ., ?, !, - bot prefixes (. and / are twitch reserved prefixes)  
				msg = msg.charAt(0) + '\u{E0000}' + msg.substring(1);
			}
			if (msg.match(/!/g)) {
				msg = '❗ ' + msg.substring(1);
			}

			if (perm < 2000 && msg.match(/(\.|\/)color/g)) {
				return 'cmonBruh don\'t change my color';
			}

			if (msg.toLowerCase().startsWith(`/ban ${process.env.TWITCH_OWNERNAME}`) || msg.toLowerCase().startsWith(`/timeout ${process.env.TWITCH_OWNERNAME}`) || msg.toLowerCase().startsWith(`/unmod ${process.env.TWITCH_USER}`)) {
				return `nymnWeird too far @${user.username}`;
			}

			return msg;
		} catch (err) {
			console.log(err);
			return 'FeelsDankMan ' + err.toString().split('\n')[0];
		}
	}
};