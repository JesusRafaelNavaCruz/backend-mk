const testing = async (req, res) => {
    res.status(200).send({
        data: 'Testing...'
    })
};

module.exports = {
    testing,
};