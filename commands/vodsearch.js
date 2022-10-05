const { got } = require('./../got');
const requireDir = require('require-dir');
const date = require('date-and-time');


module.exports = {
	name: 'vodsearch',
	ping: true,
	description: 'This command will give you a list of vods that correlates to the given date and time input. Input should be: "bb vodsearch yyyy-mm-dd time=*time in CET*"(The time is not needed if you just wish to find the vod with no timestamp). Example: "bb vodsearch nymn 2021-09-30 time=16:00" or  "bb vodsearch nymn 2021-09-30"',
	permission: 100,
	category: 'Info command',
	execute: async (channel, user, input, perm) => {
		try {
			if (module.exports.permission > perm) {
				return;
			}
			let realchannel = input[2];
			let voddate = input[3];
			let vodtime = null;

			if (input[4]) {
				if (input[4].startsWith('time')) {
					vodtime = input[4].split('=')[1];
				} else {
					return 'To specify time, do: "time=hh:mm" at the end (Time should be in CET)';
				}
			}

			const userID = await got(`https://api.ivr.fi/twitch/resolve/${realchannel}`).json();

			if (userID.status === 404) {
				return `Could not find user: "${realchannel}"`;
			}

			let vodList = await got('https://api.twitch.tv/helix/videos', {
				headers: {
					'client-id': process.env.TWITCH_CLIENTID,
					'Authorization': process.env.TWITCH_AUTH
				},
                searchParams: {
                    'user_id': userID.id,
                    'type': 'archive',
                    'first': 100
                }
			}).json();

			if (!vodList.data.length) {
				return 'That user has no vods';
			}

			let vodfound = 0;
			let urls = [];


			for (const vod of vodList.data) {
				let newCreatedat = new Date(vod.created_at);
				newCreatedat = date.addHours(newCreatedat, 2);
				newCreatedat = newCreatedat.toISOString();

				if (newCreatedat.split('T')[0] === voddate) {
					vodfound = 1;
					urls.push(vod.url);
					break;
				}
			}
			if (vodfound === 0) {
				return 'No vod was found on that date [only the last 100 vods are available] (date format should be "yyyy-mm-dd")';
			}

			if (vodtime === null) {
				return `${urls.length} vod('s) were found on that date: ${urls.toString().replaceAll(',', ' - ')}`;
			}

			const findTime = requireDir('../commands');

            for (const url of urls) {
                let result = await findTime['vodtime'].execute(channel, user, ['bb', 'vodtime', url, vodtime], perm);

                if (!result.startsWith(vodtime)) {
                    return result;
                }
            }

            return `No vod were found at that time, but here are the vod('s) from that date: ${urls.toString().replaceAll(',', ' - ')}`;
		} catch (err) {
			console.log(err);
			if (err.name) {
				if (err.name === 'TimeoutError') {
					return `FeelsDankMan api error: ${err.name}`;
				}
			}
			return `FeelsDankMan Error: ${err.response.data.error}`;
		}
	}
};