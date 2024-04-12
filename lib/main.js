const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getNovelUrls = (url, genre) => {
    return new Promise(async (resolve, reject) => {

        let novelUrls = [];

        await axios.get(url, { responseType: "arraybuffer" })
            .then((response) => {
                // if no data returned, return cache
                if (!response) reject(novelUrls);

                // decode non-utf8 response
                const htmlString = iconv.decode(response.data, "gbk");

                if (!htmlString) reject(novelUrls);

                // parse the html string
                const $ = cheerio.load(htmlString);

                $("a.tooltip").each(function (i) {
                    const url = `https://www.jjwxc.net/${this.attribs["href"]}`;
                    novelUrls.push(url);
                });

                resolve(novelUrls);

                console.log(`getNovelUrls(${url}, ${genre})`);
                console.log(novelUrls);
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

module.exports = getNovelUrls;
