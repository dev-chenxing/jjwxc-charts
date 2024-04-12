const getNovelItem = require("./novel");

const getNovelChart = (novelUrls) => {
    const novelChart = [];

    for (const url of novelUrls) {
        getNovelItem(url)
            .then((novel) => { novelChart.push(novel); })
    }

    return novelChart;
};

module.exports = getNovelChart;