const getNovelItem = require("./novel");

const getNovelChart = (novelUrls) => {
    console.log("getNovelChart(novelUrls)");
    console.log("novelUrls = ");
    console.log(novelUrls)
    const novelChart = [];

    for (const url of novelUrls) {
        getNovelItem(url)
            .then((novel) => { novelChart.push(novel); })
    }

    return novelChart;
};

module.exports = getNovelChart;