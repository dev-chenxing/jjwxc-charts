const fs = require("fs");
const getNovelChart = require("./lib/main");

const getTagString = (genre, isCurrentGenre) => {
    if (isCurrentGenre) {
        `\t<b>${genre}</b> |\n`;
    } else {
        return `\t<a href="https://github.com/amaliegay/jjwxc-charts/blob/main/${genre}.md">${genre}</a> |\n`;
    }
};

const genres = ["重生", "幻想未来", "架空历史", "都市情缘", "穿越时空", "天赐良缘", "时尚娱乐", "奇幻异闻", "系统快穿", "宫廷侯爵", "业界精英", "情有独钟"];

const getLanguagesNavBar = (currentGenre) => {
    let navBar = `<h4 align="center">\n`;
    for (const genre of genres) {
        navBar += getTagString(genre, genre === currentGenre);
    }
    navBar += `</h4>\n`;
    return navBar;
};

const generateReadme = (novelChart) => {
    let content = `# 晋江文学城[排行榜] - 百合\n\n`;

    content += getLanguagesNavBar("穿越时空");

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

    fs.writeFileSync("README.md", content);
};

const getDate = (unix) => {
    return `${new Date(unix).toLocaleString("en-CA", { dateStyle: "short", timeStyle: "long", timeZone: "Asia/Shanghai", hourCycle: "h23" })}`;
};

// Make sure the novels directory exists
if (!fs.existsSync("./novels")) {
    fs.mkdirSync("./novels");
}

getNovelChart()
    .then((novelChart) => {
        novels = novelChart.novels;
        lastUpdated = getDate(Date.now());

        fs.writeFileSync("data.json", JSON.stringify([novelChart, lastUpdated], null, 4), "utf-8");

        // update the readme
        generateReadme(novelChart);
    })
    .catch((err) => {
        console.log(err);
    });
