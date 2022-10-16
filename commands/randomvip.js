const tools = require('../tools/tools.js');

module.exports = {
	name: 'randomvip',
	ping: true,
	description: 'This command will give you the name if a random vip in a given channel',
	permission: 100,
	category: 'Info command',
	opt_outable: true,
	execute: async (channel, user, input, perm) => {
		try {
			if (module.exports.permission > perm) {
				return;
			}
			let realchannel = channel;
			if (input[2]) {
				realchannel = input[2];
			}
			let vips = await tools.getVips(realchannel);
			vips = await tools.optOutList(vips, module.exports.name, true);
			if (!vips.length) {
				return 'This channel has no vips';
			}
			let number = Math.floor(Math.random() * (vips.length - 0) + 0);

			let ms = new Date().getTime() - Date.parse(vips[number].grantedAt);
			return `Random vip😬 in #${realchannel[0]}\u{E0000}${realchannel.slice(1)} 👉  ${vips[number].displayName}, they were added ${tools.humanizeDuration(ms)} ago.`;

		} catch (err) {
			console.log(err);
			if (err.name) {
				if (err.name === 'TimeoutError') {
					return `FeelsDankMan api error: ${err.name}`;
				}
			}
			return 'FeelsDankMan Error';
		}
	}
};