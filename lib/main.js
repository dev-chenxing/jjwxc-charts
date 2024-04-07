import { get } from "axios";
const getNovelChart = () => {
    return new Promise(async (resolve, reject) => {
        const novelChartUrl = "https://www.jjwxc.net/channeltoplist.php?rchannelid=109&rankgroup=3&subchannelid=10904";
        let novels = [];
        let headers = [];
        let returnData = { novels };

        let { data } = await get(novelChartUrl);
        // if no data returned, return cache
        if (!data) reject({ ...returnData });

        // split lines
        data = data.split("\n");
        // if no data returned, return cache
        if (data.length < 2) reject({ ...returnData });

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
        console.log(data);
        resolve({ ...returnData });
    });
};

export default getNovelChart;
