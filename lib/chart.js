const getNovelItem = require("./novel");

const getNovelChart = (novelUrls) => {
    console.log("getNovelChart")
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
        console.log(novelChart);
    });
};

module.exports = getNovelChart;