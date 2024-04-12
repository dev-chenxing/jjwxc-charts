const getNovelItem = require("./novel");

const getNovelChart = (novelUrls) => {
    return new Promise(async (resolve, reject) => {
        let novelChart = [];

        for (const url of novelUrls) {
            await getNovelItem(url)
                .then((novel) => { novelChart.push(novel); })
                .catch((err) => {
                    console.log(err);
                });
        }

        resolve(novelUrls);
        console.log("getNovelChart")
        console.log(novelChart);
    });
};

module.exports = getNovelChart;