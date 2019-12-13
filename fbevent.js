#!/usr/bin/env node

const shellExec = require('shell-exec');

const USER_ID = '3258104107540071';
const APP_ID = '434763494130811';
const APP_SECRET = 'dad836674857ce18e9dfd7e7bed2f890';
const USER_ACCESS_TOKEN = 'EAAGLakOhBHsBAHK7eniZBRSnOyiJkdkI4VYC0sEwxGmdRbYiI' +
    'HhXZAwcCrqRyMfs6YaqNXKVCknr10IpsPXspg2ygZAyNdoROqYPZBF0AG7eOYffhaqItTgAB' +
    '8hrx1GZCUA2wsoW0ZBRYBL3HtDLu5PJOyAPnhwiwXrPkqe13m3ZCS75xOcIKZA3dCbQdcTJA' +
    'VpnyH1y7UeU3UgnPZCLkaCx1DwBHWQe3YDwZD';

function parse(shellOutput) {
    return JSON.parse(shellOutput).data[0];
}

function convertToReadableFormat(time) {
    const FACEBOOK_DATE_PATTERN = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
    const DATE = time.match(FACEBOOK_DATE_PATTERN);

    return DATE[3] + '/' + DATE[2] + '/' + DATE[1] + ' ' + DATE[4] + ':'
        + DATE[5] ;
}

async function getAccessTokenObject() {
    const CURL_REQUEST = "curl \"https://graph.facebook.com/" + "v5.0" +
        "/oauth/access_token?grant_type=fb_exchange_token&client_id=" + APP_ID +
        "&client_secret=" + APP_SECRET +
        "&fb_exchange_token=" + USER_ACCESS_TOKEN + "\"";

    const SHELL_OUTPUT = await shellExec(CURL_REQUEST);
    return JSON.parse(SHELL_OUTPUT.stdout);
}

function rearrangeFormat(rawEvent, accessToken) {
    return {
        "event_name": rawEvent.name,
        "start_time": convertToReadableFormat(rawEvent.start_time),
        "end_time": convertToReadableFormat(rawEvent.end_time),
        "cover": rawEvent.cover.source,
        "days_before_token_expiration": accessToken.expires_in,
    };
}

getAccessTokenObject().then(token => {
    const ACCESS_TOKEN_OBJECT = token;
    const CURL_REQUEST = "curl \"https://graph.facebook.com/"
        + USER_ID + "/events" + "?" +
        "fields=name,start_time,end_time,cover" + "&" +
        "access_token=" + ACCESS_TOKEN_OBJECT.access_token + "\"";

    shellExec(CURL_REQUEST).then(shellOutput => {
        const RAW_EVENT = parse(shellOutput.stdout);
        const WANTED_EVENT = rearrangeFormat(RAW_EVENT, ACCESS_TOKEN_OBJECT);

        console.log(WANTED_EVENT);
    });
});
