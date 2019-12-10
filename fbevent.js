#!/usr/bin/env node

const shellExec = require('shell-exec');

const USER_ID = '3258104107540071';
const FIELDS = 'end_time';
const ACCESS_TOKEN = 'EAAGLakOhBHsBAHK7eniZBRSnOyiJkdkI4VYC0sEwxGmdRbYiIHhXZAwcCrqRyMfs6YaqNXKVCknr10IpsPXspg2ygZAyNdoROqYPZBF0AG7eOYffhaqItTgAB8hrx1GZCUA2wsoW0ZBRYBL3HtDLu5PJOyAPnhwiwXrPkqe13m3ZCS75xOcIKZA3dCbQdcTJAVpnyH1y7UeU3UgnPZCLkaCx1DwBHWQe3YDwZD';

shellExec(
    "curl \"https://graph.facebook.com/" +
    USER_ID +
    "/events" +
    "?" +
    //"fields=" +
    //FIELDS +
    //"limit=999" +
    //"&" +
    "access_token=" +
    ACCESS_TOKEN +
    "\""
).then((stdout) => {
    const RAW_EVENT_DATA = JSON.parse(stdout.stdout);

    const WANTED_EVENT_DATA = {
        "event_name": RAW_EVENT_DATA.data,
        "start_time": RAW_EVENT_DATA.start_time,
        "end_time": RAW_EVENT_DATA.end_time,
        "cover": RAW_EVENT_DATA.cover,
        "days_before_token_expiration": RAW_EVENT_DATA.days_before_token_expiration,
    };
    console.log(WANTED_EVENT_DATA);
    console.log("\n");
    console.log(RAW_EVENT_DATA);
});