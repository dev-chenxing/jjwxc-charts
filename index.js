const fs = require("fs");
const getNovelChart = require("./lib/main");

const getTagString = (genre, isCurrentGenre) => {
    if (isCurrentGenre) {
        return `\t<b>${genre}</b> |\n`;
    } else {
        return `\t<a href="https://github.com/amaliegay/jjwxc-charts/blob/main/${genre}.md">${genre}</a> |\n`;
    }
};

const genres = { 重生: 10901, 幻想未来: 10905, 架空历史: 10903, 都市情缘: 10906, 穿越时空: 10904, 天赐良缘: 10907, 时尚娱乐: 10908, 奇幻异闻: 10902, 系统快穿: 10911, 宫廷侯爵: 10909, 业界精英: 10910, 情有独钟: 10912 };

const getLanguagesNavBar = (currentGenre) => {
    let navBar = `<h4 align="center">\n`;
    for (const genre in genres) {
        navBar += getTagString(genre, genre === currentGenre);
    }
    navBar += `</h4>\n`;
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
    let content = `# 晋江文学城[排行榜] - 百合\n\n`;

    content += getLanguagesNavBar(genre);

    content += `\n`;

    content += "| 序号 | 作者 | 作品 | 类型 | 进度 | 字数 | 积分 |\n";
    content += "|-----|------|------|-----|------|------|-----|\n";
    novelChart.novels.forEach((novel, index) => {
        const url = `https://www.jjwxc.net/${novel.url}`;
        content += `| ${index + 1} | ${novel.author} | [${novel.title}](${url}) | ${novel.genre} | ${novel.status} | ${novel.wordCount} | ${novel.credits} |\n`;
    });

    content += `\n`;

    content += `### Copyright By 晋江文学城 www.jjwxc.net All rights reserved\n\n`;
    content += `---\n\n`;
    content += `最后生成：${getDate(Date.now())}.\n\n`;

    const fileName = getFileName(genre);
    fs.writeFileSync(fileName, content);
};

const getDate = (unix) => {
    return `${new Date(unix).toLocaleString("en-CA", { dateStyle: "short", timeStyle: "long", timeZone: "Asia/Shanghai", hourCycle: "h23" })}`;
};

const novelChartUrlBase = "https://www.jjwxc.net/channeltoplist.php?rchannelid=109&rankgroup=3&subchannelid=";

for (const genre in genres) {
    const novelChartUrl = `${novelChartUrlBase}${genres[genre]}`;
    getNovelChart(novelChartUrl)
        .then((novelChart) => {
            novels = novelChart.novels;
            lastUpdated = getDate(Date.now());

            fs.writeFileSync(`json/${genre}.json`, JSON.stringify([novelChart, lastUpdated], null, 4), "utf-8");

            // update the readme
            generateReadme(novelChart, genre);
        })
        .catch((err) => {
            console.log(err);
        });
}
