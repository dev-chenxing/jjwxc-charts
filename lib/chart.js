const fs = require("fs");
const getNovelItem = require("./novel");
const utils = require("./utils");

const writeJson = (novelChart, genre) => {
    const lastUpdated = utils.getDate(Date.now());

    fs.writeFileSync(`./json/${genre}.json`, JSON.stringify([novelChart, lastUpdated], null, 4), "utf-8");
};

const compareCredits = (novel1, novel2) => Number(novel2.credits.replace(/,/g, "")) - Number(novel1.credits.replace(/,/g, ""));

const getNovelChart = (novelUrls, genre) => {
    return new Promise(async (resolve, reject) => {
        let novelChart = [];

        for (const index in novelUrls) {
            const url = novelUrls[index];
            console.log(`getting novel item for ${genre}-${index}`);
            await getNovelItem(url, genre, index)
                .then((novel) => {
                    const title = novel["title"];
                    if (title && title !== "") novelChart.push(novel);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        novelChart = [...novelChart].sort(compareCredits);
        resolve(novelChart);
        writeJson(novelChart, genre);
    });
};

module.exports = getNovelChart;
