const getNovelItem = require("./novel");

const getNovelChart = (novelUrls) => {
    return new Promise(async (resolve, reject) => {
        let novelChart = [];

        for (const url of novelUrls) {
            getNovelItem(url)
                .then((novel) => { novelChart.push(novel); })
        }

        resolve(novelUrls);
    });
};

module.exports = getNovelChart;
