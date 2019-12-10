#!/usr/bin/env node

const shellExec = require('shell-exec');

const USER_ID = '3258104107540071';
const FIELDS = 'end_time';
const ACCESS_TOKEN = 'EAAGLakOhBHsBAHK7eniZBRSnOyiJkdkI4VYC0sEwxGmdRbYiIHhXZAwcCrqRyMfs6YaqNXKVCknr10IpsPXspg2ygZAyNdoROqYPZBF0AG7eOYffhaqItTgAB8hrx1GZCUA2wsoW0ZBRYBL3HtDLu5PJOyAPnhwiwXrPkqe13m3ZCS75xOcIKZA3dCbQdcTJAVpnyH1y7UeU3UgnPZCLkaCx1DwBHWQe3YDwZD';

const CURL_REQUEST = "curl \"https://graph.facebook.com/" +
    USER_ID +
    "/events" +
    "?" +
    //"fields=" +
    //FIELDS +
    "limit=100" +
    "&" +
    "access_token=" +
    ACCESS_TOKEN +
    "\"";

function parse(shellOutput) {
    return JSON.parse(shellOutput).data[0];
}

function rearrangeDataAsPerWantedFormat(RAW_EVENT_DATA) {
    return {
        "event_name": RAW_EVENT_DATA.name,
        "start_time": RAW_EVENT_DATA.start_time,
        "end_time": RAW_EVENT_DATA.end_time,
        "cover": RAW_EVENT_DATA.cover,
        "days_before_token_expiration": RAW_EVENT_DATA.days_before_token_expiration,
    };
}

function displayEventData(RAW_EVENT_DATA, WANTED_EVENT_DATA) {
    console.log(RAW_EVENT_DATA);
    console.log("\n");
    console.log(WANTED_EVENT_DATA);
}

shellExec(CURL_REQUEST).then((shellOutput) => {
    const RAW_EVENT_DATA = parse(shellOutput.stdout);
    const WANTED_EVENT_DATA = rearrangeDataAsPerWantedFormat(RAW_EVENT_DATA);

    displayEventData(RAW_EVENT_DATA, WANTED_EVENT_DATA);
});