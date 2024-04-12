const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const isEmpty = (line) => {
    if (line === "") {
        return true;
    } else if (line === "八仙自然榜规则：发文时间在第21-80天内的按照积分排行，81天后下榜，最多显示前200名的数据") {
        return true;
    } else {
        return false;
    }
};

const cleanData = (data) => {
    let cleanedData = [];
    for (let index = 0; index < data.length; index++) {
        let line = data[index].trim();
        if (!isEmpty(line)) {
            cleanedData.push(line);
        }
    }
    return cleanedData;
};

const getNovelItem = (url) => {
    return new Promise(async (resolve, reject) => {
        let novel = {};
        let returnData = { novel };
        await axios.get(url, { responseType: "arraybuffer" })
            .then((response) => {
                // if no data returned, return cache
                if (!response) reject({ ...returnData });

                // decode non-utf8 response
                const htmlString = iconv.decode(response.data, "gbk");

                if (!htmlString) reject({ ...returnData });

                // parse the html string
                const $ = cheerio.load(htmlString);

                novel["author"] = $("span[itemprop='author']").text();
                novel["title"] = $("span[itemprop='articleSection']").text();
                novel["genre"] = $("span[itemprop='genre']").text().trim();
                novel["status"] = $("span[itemprop='updataStatus']").text();
                novel["wordCount"] = $("span[itemprop='wordCount']").text();
                novel["credits"] = $("span[itemprop='collectedCount']")[0].next.next.next.data.trim().split('：').slice(-1)[0]

                resolve({ ...returnData });
            })
            .catch((err) => {
                console.log(`axois.get(${url}) errored.`);
            });
    });
};

module.exports = getNovelItem;