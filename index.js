const fs = require("fs");
const getNovelChart = require("./lib/main");

const saveBase64ToFile = (base64Data, filename) => {
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(filename, buffer);
};

const generateReadme = (novelChart) => {
    let content = `# 晋江文学城[排行榜] - 百合\n\n`;

    content += `<h4 align="center">\n\t<a href="https://github.com/amaliegay/jjwxc-charts/blob/main/都市情缘.md">都市情缘</a> |\n\t<b>穿越时空</b> |\n\t<a href="https://github.com/amaliegay/jjwxc-charts/blob/main/天赐良缘.md">天赐良缘</a>\n</h4>\n`;

    content += `\n`;

    content += "| 序号 | 作者 | 作品 | 类型 | 进度 | 字数 | 积分 |\n";
    content += "|-----|------|------|-----|------|------|-----|\n";
    novelChart.novels.forEach((novel, index) => {
        content += `| ${index} | ${novel.author} | [${novel.title}](${novel.url}) | ${novel.genre} | ${novel.status} | ${novel.wordCount} | ${novel.credits} |\n`;
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

        fs.writeFileSync("json/data.json", JSON.stringify([novelChart, lastUpdated], null, 4), "utf-8");
        // Save the novel chapters
        /* novelChart.novels.forEach((novel, _) => {
            const data = novel.data_base64;
            saveBase64ToFile(data, `./novels/novel_${novel.id}_${novel.title}.jpg`);
        });*/

        // update the readme
        generateReadme(novelChart);
    })
    .catch((err) => {
        console.log(err);
    });
