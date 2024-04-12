const getNovelItem = require("./novel");

const getNovelChart = (novelUrls, genre) => {
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
        //console.log(`getNovelChart(.., ${genre}`)
        //console.log(novelChart);
    });
};

module.exports = getNovelChart;