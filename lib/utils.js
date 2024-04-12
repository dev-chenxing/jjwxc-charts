const getDate = (unix) => {
    return `${new Date(unix).toLocaleString("en-CA", { dateStyle: "short", timeStyle: "long", timeZone: "Asia/Shanghai", hourCycle: "h23" })}`;
};

module.exports = { getDate };
