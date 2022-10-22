const Markov = require('markov-strings').default;
const redisC = require('../tools/markovLogger.js').redisC;
const tools = require('../tools/tools.js');

module.exports = {
	name: 'markov',
	ping: false,
	description: 'Markov',
	permission: 100,
	cooldown: 120, //in seconds
	category: 'Random command',
	opt_outable: false, 
	// eslint-disable-next-line no-unused-vars
	execute: async (channel, user, input, perm, aliascommand) => {
		try {
			if (module.exports.permission > perm) {
				return;
			}

            input = input.splice(2);
            this.channel = input.filter(x => x.startsWith('channel:'))[0]?.split(':')[1] ?? channel;
            input = input.filter(x  => x !== `channel:${this.channel}`);
            let msg = input.join(' ');

            console.log(msg);
            let result = await new Promise(async (resolve) => {  await redisC.get(`Markov:${this.channel.toLowerCase()}`, async function (err, reply) {
                try {
                let data = JSON.parse(reply);
                    console.log(data.length);
                const markov = new Markov({ stateSize: 1 });

                
                    markov.addData(data);
                
                const options = {
                    maxTries: 10000,
                    prng: Math.random,
                    filter: (result) => {return result.score > 5 && result.refs.filter(x => x.string.toLowerCase().includes(msg.toLowerCase())).length > 0 && result.string.split(' ').length >= 10;}
                  };

                this.result = markov.generate(options);

                resolve(await this.result);

            } catch(err) {
                console.log(err);
                resolve({ string: 'Failed to generate markov string' });
            }
            }); 
        });
        console.log(await result);

        result.string = await tools.unpingString(result.string, channel);

        console.log(result.string);

        return '🔖 '  + await result.string;
		} catch (err) {
			console.log(err);
			return 'FeelsDankMan Error';
		}
	}
};
