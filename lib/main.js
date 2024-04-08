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

const getNovelChart = () => {
    return new Promise(async (resolve, reject) => {
        const novelChartUrl = "https://www.jjwxc.net/channeltoplist.php?rchannelid=109&rankgroup=3&subchannelid=10904";
        let novels = [];
        let headers = [];
        let returnData = { novels };

        axios.get(novelChartUrl, { responseType: "arraybuffer" }).then((response) => {
            // if no data returned, return cache
            if (!response) reject({ ...returnData });

            // decode non-utf8 response
            htmlString = iconv.decode(response.data, "gbk");

            if (!htmlString) reject({ ...returnData });

            // parse the html string
            const $ = cheerio.load(htmlString);
            let tbody = $("tbody").first();
            let data = tbody.text().split("\n");

            // clean the data
            data = cleanData(data);
            const num_of_columns = 8;

            // get headers
            headers = data.slice(0, num_of_columns);

            data = data.slice(num_of_columns, data.length);

            // make object and store in list
            for (let i = 0; i < data.length; i++) {
                let val = data[i];
                const row = Math.floor(i / num_of_columns);
                const column = i % num_of_columns;
                switch (column) {
                    case 0:
                        novels[row] = {};
                    case 1:
                        novels[row]["author"] = val;
                    case 2:
                        novels[row]["title"] = val;
                    case 3:
                        novels[row]["genre"] = val;
                    case 4:
                        novels[row]["status"] = val;
                    case 5:
                        novels[row]["wordCount"] = val;
                    case 6:
                        novels[row]["credits"] = val;
                    case 7:
                    default:
                }
            }

            $("a.tooltip").each(function (i) {
                novels[i]["url"] = this.attribs["href"];
            });

            resolve({ ...returnData });
        });
    });
};

module.exports = getNovelChart;
