const { con } = require('../../sql');

module.exports = (function () {
    const router = require('express').Router();
    const { got } = require('./../../got');

    /* /suggestions */
    router.get('/', async (req, res) => {
        let emotes = await got('https://bot-api.gempir.com/api/emotelog?channel=nymn&limit=1000').json();

        emotes.push({ 
            EmoteCode: 'AlienPls',
            EmoteID: '60e8677677b18d5dd3800410',
            AddedBy: 'kurrekts',
            Type: 'election',
            CreatedAt: '2023-01-02T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'DOCING',
            EmoteID: '603cd0152c7b4500143b46db',
            AddedBy: 'soaral',
            Type: 'election',
            CreatedAt: '2023-01-02T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'NymN',
            EmoteID: '60ae546c9986a00349ea35d5',
            AddedBy: 'cycionetm',
            Type: 'election',
            CreatedAt: '2023-01-02T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'Clueless',
            EmoteID: '6154ecd36251d7e000db18a0',
            AddedBy: 'cycionetm',
            Type: 'election',
            CreatedAt: '2023-01-01T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'Aware',
            EmoteID: '6145e8b10969108b671957ec',
            AddedBy: 'cybo_',
            Type: 'election',
            CreatedAt: '2023-01-01T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'LULE',
            EmoteID: '605305868c870a000de38b6f',
            AddedBy: 'dagaugl',
            Type: 'election',
            CreatedAt: '2023-01-01T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'Cat',
            EmoteID: '60b5917d22b0373436c28ac0',
            AddedBy: 'fawcan',
            Type: 'election',
            CreatedAt: '2022-12-31T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'nymn123',
            EmoteID: '6162d21ef7b7a929341244dd',
            AddedBy: 'aiterace',
            Type: 'election',
            CreatedAt: '2022-12-31T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'pokiDance',
            EmoteID: '60a1de4aac2bcb20efc751fb',
            AddedBy: 'gempir',
            Type: 'election',
            CreatedAt: '2022-12-31T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'POGPLANT',
            EmoteID: '60b4fd124eb0019aa6ed4ec7',
            AddedBy: 'fawcan',
            Type: 'election',
            CreatedAt: '2022-12-31T00:00:00.000000Z'
         });

         emotes.push({ 
            EmoteCode: 'PagMan',
            EmoteID: '60ae9a57ac03cad60771b2d8',
            AddedBy: 'gempir',
            Type: 'election',
            CreatedAt: '2022-12-31T00:00:00.000000Z'
         });

         const nymnEmotes = [
            {
                EmoteCode: 'Excel',
                EmoteID: '61fe824dd771ca5bf0379bb2',
                CreatedAt: '2023-01-11T00:00:00.000000Z'
            },
            {
                EmoteCode: 'peepoChat',
                EmoteID: '63438a743d1bc89e0ff9e400',
                CreatedAt: '2023-01-10T00:00:00.000000Z'
            },
            {
                EmoteCode: 'veryFors',
                EmoteID: '62af8dd26f979a8714748dd2',
                CreatedAt: '2023-01-09T00:00:00.000000Z'
            },
            {
                EmoteCode: 'Buhh',
                EmoteID: '61d679c83d52bb5c33c4f9a6',
                CreatedAt: '2023-01-08T00:00:00.000000Z'
            },
            {
                EmoteCode: 'docLeave',
                EmoteID: '60a7c696928d15c10b4de1d9',
                CreatedAt: '2023-01-06T00:00:00.000000Z'
            },
            {
                EmoteCode: 'docL',
                EmoteID: '6350bab5462cfc442024c27c',
                CreatedAt: '2023-01-05T00:00:00.000000Z'
            },
            {
                EmoteCode: 'TimeToNime',
                EmoteID: '6329beb61c85cd937753ec61',
                CreatedAt: '2023-01-03T00:00:00.000000Z'
            },
            {
                EmoteCode: 'Okayeg',
                EmoteID: '603caa69faf3a00014dff0b1',
                CreatedAt: '2023-01-02T00:00:00.000000Z'
            },
            {
                EmoteCode: 'FloppaJAM',
                EmoteID: '60af0116a564afa26e3a7e86',
                CreatedAt: '2023-01-01T00:00:00.000000Z'
            }
        ];

        const modsEmotes = [
            {
                EmoteCode: 'pepeW',
                EmoteID: '63072162942ffb69e13d703f',
                CreatedAt: '2023-01-04T00:00:00.000000Z'
            }
        ];
    
        res.render('newemotes', { emotes: emotes, nymnEmotes: nymnEmotes, modsEmotes: modsEmotes });
    });

    return router;
})();