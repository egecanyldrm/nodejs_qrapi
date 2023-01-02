
exports.get404Page = (req, res) => {
    res.status(404).json({ message: 'Page Not Found' });
} 