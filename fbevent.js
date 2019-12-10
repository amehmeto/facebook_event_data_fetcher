#!/usr/bin/env node

const shellExec = require('shell-exec');

const USER_ID = '3258104107540071';
const ACCESS_TOKEN = 'EAAGLakOhBHsBAHK7eniZBRSnOyiJkdkI4VYC0sEwxGmdRbYiIHhXZAwcCrqRyMfs6YaqNXKVCknr10IpsPXspg2ygZAyNdoROqYPZBF0AG7eOYffhaqItTgAB8hrx1GZCUA2wsoW0ZBRYBL3HtDLu5PJOyAPnhwiwXrPkqe13m3ZCS75xOcIKZA3dCbQdcTJAVpnyH1y7UeU3UgnPZCLkaCx1DwBHWQe3YDwZD';

const CURL_REQUEST = "curl \"https://graph.facebook.com/" + USER_ID + "/events" +
    "?" + "fields=name,start_time,end_time,cover" + "&" + "access_token=" + ACCESS_TOKEN + "\"";

function parse(shellOutput) {
    return JSON.parse(shellOutput).data[0];
}

function convertToReadableFormat(time) {
    const FACEBOOK_DATE_PATTERN = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
    const DATE = time.match(FACEBOOK_DATE_PATTERN);

    return DATE[3] + '/' + DATE[2] + '/' + DATE[1] + ' ' + DATE[4] + ':' + DATE[5] ;
}

function rearrangeDataAsPerWantedFormat(RAW_EVENT_DATA) {
    return {
        "event_name": RAW_EVENT_DATA.name,
        "start_time": convertToReadableFormat(RAW_EVENT_DATA.start_time),
        "end_time": convertToReadableFormat(RAW_EVENT_DATA.end_time),
        "cover": RAW_EVENT_DATA.cover.source,
        "days_before_token_expiration": RAW_EVENT_DATA.days_before_token_expiration,
    };
}

shellExec(CURL_REQUEST).then((shellOutput) => {
    const RAW_EVENT_DATA = parse(shellOutput.stdout);
    const WANTED_EVENT_DATA = rearrangeDataAsPerWantedFormat(RAW_EVENT_DATA);

    console.log(WANTED_EVENT_DATA);
});