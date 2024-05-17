const fs = require("fs");
const getNovelUrls = require("./lib/main");
const getNovelChart = require("./lib/chart");
const utils = require("./lib/utils");

const getTagString = (genre, isCurrentGenre) => {
    if (isCurrentGenre) {
        if (genre === "情有独钟") {
            return "\t<b>情有独钟</b>\n";
        } else {
            return `\t<b>${genre}</b> |\n`;
        }
    } else if (genre === "穿越时空") {
        return '\t<a href="https://github.com/dev-chenxing/jjwxc-charts/blob/main/README.md">穿越时空</a> |\n';
    } else if (genre === "情有独钟") {
        return '\t<a href="https://github.com/dev-chenxing/jjwxc-charts/blob/main/情有独钟.md">情有独钟</a>\n';
    } else {
        return `\t<a href="https://github.com/dev-chenxing/jjwxc-charts/blob/main/${genre}.md">${genre}</a> |\n`;
    }
};

const genres = { 重生: 10901, 幻想未来: 10905, 架空历史: 10903, 都市情缘: 10906, 穿越时空: 10904, 天赐良缘: 10907, 时尚娱乐: 10908, 奇幻异闻: 10902, 系统快穿: 10911, 宫廷侯爵: 10909, 业界精英: 10910, 情有独钟: 10912 };

const getLanguagesNavBar = (currentGenre) => {
    let navBar = `<h5 align="center">\n`;
    for (const genre in genres) {
        navBar += getTagString(genre, genre === currentGenre);
    }
    navBar += `</h5>\n`;
    return navBar;
};

const getFileName = (genre) => {
    if (genre === "穿越时空") {
        return "README.md";
    } else {
        return `${genre}.md`;
    }
};

const generateReadme = (novelChart, genre) => {
    const fileName = getFileName(genre);
    // console.log(`generating ${fileName}`);

    let content = `# 晋江文学城[排行榜] - 百合\n\n`;

    content += getLanguagesNavBar(genre);

    content += `\n`;

    content += "| 序号 | 作者 | 作品 | 类型 | 字数 | 积分 | 最新更新 | \n";
    content += "|-----|------|------|-----|------|------|---------|\n";
    novelChart.forEach((novel, index) => {
        content += `| ${index + 1} | ${novel.author} | [${novel.title}](${novel.url}) | ${novel.genre} | ${novel.wordCount} | ${novel.credits} | ${novel.latestUpdates} | \n`;
    });

    content += `\n`;

    content += `### Copyright By 晋江文学城 www.jjwxc.net All rights reserved\n\n`;
    content += `---\n\n`;
    content += `最后生成：${utils.getDate(Date.now())}.\n\n`;
    content += "**[⬆ 回到顶部](#晋江文学城排行榜---百合)**\n\n";

    fs.writeFileSync(fileName, content);
};

const novelChartUrlBase = "https://www.jjwxc.net/channeltoplist.php?rchannelid=109&rankgroup=3&subchannelid=";

for (const genre in genres) {
    const novelChartUrl = `${novelChartUrlBase}${genres[genre]}`;
    getNovelUrls(novelChartUrl, genre)
        .then((novelUrls) => {
            getNovelChart(novelUrls, genre)
                .then((novelChart) => {
                    // update the readme
                    generateReadme(novelChart, genre);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}
