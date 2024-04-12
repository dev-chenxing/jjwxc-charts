const getNovelItem = require("./novel");

const getNovelChart = (novelUrls, genre) => {
    return new Promise(async (resolve, reject) => {
        let novelChart = [];

        for (const index in novelUrls) {
            const url = novelUrls[index];
            await getNovelItem(url, genre, index)
                .then((novel) => { novelChart.push(novel); })
                .catch((err) => {
                    console.log(err);
                });
        }

        resolve(novelChart);
    });
};

module.exports = getNovelChart;