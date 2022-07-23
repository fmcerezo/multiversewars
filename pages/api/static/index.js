export default function handler(req, res) {
    res.status(200).json({ greeting: 'Hello from the STATIC route!' });
}