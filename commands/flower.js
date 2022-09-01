module.exports = {
	name: 'flower',
	ping: true,
	description: 'This command will let a user give flower to someone.',
	permission: 100,
	category: 'Random command',
	execute: async (channel, user, input, perm) => {
		try {
			if (module.exports.permission > perm) {
				return;
			}
			const flowers=['💐','🌸','💮','🏵️','🌹','🌺','🌻','🌼','🌷'];
			return `${user} gave a flower to ${input[2]} ${flowers[~~(Math.random() * flowers.length)]}.`;
			//example --> bb flower yourmom

		} catch (err) {
			console.log(err);
			return 'FeelsDankMan Error';
		}
	}
};