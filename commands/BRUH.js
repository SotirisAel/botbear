module.exports = {
        name: "BRUH",
        ping: false,
        description: 'This command will check if the person passes the BRUH test(50/50)',
        permission: 100,
        category: "Random command",
        execute: async (channel, user, input, perm) => {
            try {
                if (module.exports.permission > perm) {
                    return;
                }
                input.shift()
                input.shift()
    
                let msg = input.toString();
                msg = msg.replaceAll(",", " ")

                function getRandomInt() {
                    return Math.floor(Math.random() < 0.5);
                }
    
                let responses = ["did not pass the BRUH test... Bruhge TeaTime","passed the BRUH test, BRUH :thumbsup:"]

                const masspinged = await tools.massping(msg.toLowerCase(), channel);
                if (masspinged != "null") {
                    return "[MASS PING]";
                }                
    
                return `/me ${msg} ${responses[getRandomInt()]}`;
    
            } catch (err) {
                console.log(err);
                return `FeelsDankMan Error`;        
            }
        }
    }