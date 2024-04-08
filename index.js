const fs = require("fs");
const getNovelChart = require("./lib/main");

const generateReadme = (novelChart) => {
    let content = `# 晋江文学城[排行榜] - 百合\n\n`;

    content += `<h4 align="center">\n\t<a href="https://github.com/amaliegay/jjwxc-charts/blob/main/都市情缘.md">都市情缘</a> |\n\t<b>穿越时空</b> |\n\t<a href="https://github.com/amaliegay/jjwxc-charts/blob/main/天赐良缘.md">天赐良缘</a>\n</h4>\n`;

    content += `\n`;

    content += "| 序号 | 作者 | 作品 | 类型 | 进度 | 字数 | 积分 |\n";
    content += "|-----|------|------|-----|------|------|-----|\n";
    novelChart.novels.forEach((novel, index) => {
        content += `| ${index + 1} | ${novel.author} | [${novel.title}](${novel.url}) | ${novel.genre} | ${novel.status} | ${novel.wordCount} | ${novel.credits} |\n`;
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
