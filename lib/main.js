const axios = require("axios");
const cheerio = require("cheerio");

const isEmpty = (line) => {
    return line === "";
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

        axios.get(novelChartUrl).then((response) => {
            // if no data returned, return cache
            if (!response) reject({ ...returnData });

            htmlString = response.data;
            if (!htmlString) reject({ ...returnData });

            // parse the html string
            const $ = cheerio.load(htmlString);
            let data = $("tbody").text().split("\n");
            data = cleanData(data);
            console.log("data = ");
            console.log(data);

            // get headers
            /*headers = data[1].split(",");
            headers[0] = headers[0].slice(1);
            let a = headers[headers.length - 1];
            headers[headers.length - 1] = a.split("\r")[0];

            // Clean up the data
            data = data.slice(2, data.length - 2);

            // make object and store in list
            data.forEach((vpn) => {
                let val = vpn.split(",");
                countries[val[6].toLowerCase()] = val[5];
                let obj = {};
                for (let j = 0; j < val.length; j++) {
                    obj[headers[j].toLowerCase()] = val[j];
                }
                servers.push(obj);
            });*/

            resolve({ ...returnData });
        });
    });
};

module.exports = getNovelChart;
