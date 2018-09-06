export default function* (req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: true }));
};