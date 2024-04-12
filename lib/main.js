const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getNovelUrls = (url) => {
    return new Promise(async (resolve, reject) => {
        let novelUrls = [];
        let returnData = { novelUrls };

        axios.get(url, { responseType: "arraybuffer" }).then((response) => {
            // if no data returned, return cache
            if (!response) reject({ ...returnData });

            // decode non-utf8 response
            const htmlString = iconv.decode(response.data, "gbk");

            if (!htmlString) reject({ ...returnData });

            // parse the html string
            const $ = cheerio.load(htmlString);

            $("a.tooltip").each(function (i) {
                const url = `https://www.jjwxc.net/${this.attribs["href"]}`;
                novelUrls.push(url);
            });

            resolve({ ...returnData });
        });
    });
};

module.exports = getNovelUrls;
