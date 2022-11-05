require('dotenv').config();
const { got } = require('./../got');

module.exports = {
	name: 'dalle',
	ping: true,
	description: 'Make any image you can think of using the power of dalle2 ai! - The cooldown on this is 2 min.',
	permission: 100,
	cooldown: 120,
	category: 'Random command',
	execute: async (channel, user, input, perm) => {
		try {
			const {FormData, Blob} = (await import('formdata-node'));

			if (module.exports.permission > perm) {
				return;
			}
			if (channel !== 'nymn' && channel !== 'hottestbear' && channel !== 'elina' && channel !== 'pajlada' && !(perm >= 1500)) {
				return 'This command is currently disabled :)';
			}

            input = input.splice(2);
			let msg = input.join(' ');

			const url = 'https://api.openai.com/v1/images/generations';
			const params = {
				'prompt': msg,
				'n': 1,
				'size': '1024x1024',
				'response_format': 'b64_json'
			};
			const headers = {
				'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type' : 'application/json'
			};

			


			try {
				
				const response = await got.post(url, { json: params, headers: headers }).json();

				const b64toBlob = (dataURI) => {
    
					var byteString = atob(dataURI);
					var ab = new ArrayBuffer(byteString.length);
					var ia = new Uint8Array(ab);
					
					for (var i = 0; i < byteString.length; i++) {
						ia[i] = byteString.charCodeAt(i);
					}
					return new Blob([ab], { type: 'image/png' });
				};

				const image = await b64toBlob(response.data[0].b64_json);
				const formData = await new FormData();
				formData.append('file', await image);


                const imageURL =  await got.post('https://i.hotbear.org/upload', {
					headers: {
						'Authorization': process.env.hotbearIMG,
					},
					body: await formData
				});

				console.log(imageURL);
				return `"${msg}": ` + await response.data[0].url;
			} catch (err) {
				console.log(err);
				if (err.response.statusCode === 429) {
					return 'Nime you have used all of this months bb ask';
				}
			}
		} catch (err) {
			console.log(err);
			return 'FeelsDankMan Error';
		}
	}
};