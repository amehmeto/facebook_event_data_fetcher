#!/usr/bin/env node

const shellExec = require('shell-exec');

const USER_ID = '3258104107540071';
const APP_ID = '434763494130811';
const APP_SECRET = 'dad836674857ce18e9dfd7e7bed2f890';
const USER_ACCESS_TOKEN = 'EAAGLakOhBHsBAHK7eniZBRSnOyiJkdkI4VYC0sEwxGmdRbYiIHhXZAwcCrqRyMfs6YaqNXKVCknr10IpsPXspg2ygZAyNdoROqYPZBF0AG7eOYffhaqItTgAB8hrx1GZCUA2wsoW0ZBRYBL3HtDLu5PJOyAPnhwiwXrPkqe13m3ZCS75xOcIKZA3dCbQdcTJAVpnyH1y7UeU3UgnPZCLkaCx1DwBHWQe3YDwZD';

/*

curl -i -X GET "https://graph.facebook.com/{graph-api-version}/oauth/access_token?
grant_type=fb_exchange_token&
client_id={app-id}&
client_secret={app-secret}&
fb_exchange_token={your-access-token}"

{
"access_token":"{long-lived-user-access-token}",
 "token_type": "bearer",
 "expires_in": 5183944 //The number of seconds until the token expires
 }

*/

function parse(shellOutput) {
    return JSON.parse(shellOutput).data[0];
}

function convertToReadableFormat(time) {
    const FACEBOOK_DATE_PATTERN = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
    const DATE = time.match(FACEBOOK_DATE_PATTERN);

    return DATE[3] + '/' + DATE[2] + '/' + DATE[1] + ' ' + DATE[4] + ':' + DATE[5] ;
}

function getAccessTokenObject() {
    const CURL_REQUEST = "curl \"https://graph.facebook.com/" + "v5.0" +
        "/oauth/access_token?grant_type=fb_exchange_token&client_id=" + APP_ID +
        "&client_secret=" + APP_SECRET +
        "&fb_exchange_token=" + USER_ACCESS_TOKEN + "\"";

    /*let result = null;
    return shellExec(CURL_REQUEST).then((shellOutput) => {
        result = JSON.parse(shellOutput.stdout);
        console.log('Days before expiration = ');
        console.log(result);
    }).catch((e) => console.log(e));*/

    return {
        access_token: 'EAAGLakOhBHsBANfRn4GwAEND3rnLZCiAIkZBoZAOOqXwN9emu7pHpZAD4aKUwOkRp8pzooFhZASIPrDB1g4CKdyckIZB508HtZCZCk5Xo9bZAOOU2zQ90lXs6PpLl5Hv38Nivld2mJTTBoEi7vtNJfHWKGpxBq14wZCooDjMFGWAHMRoozjZBkLWxUi',
        token_type: 'bearer'
    };
}

function rearrangeDataAsPerWantedFormat(rawEventData) {
    return {
        "event_name": rawEventData.name,
        "start_time": convertToReadableFormat(rawEventData.start_time),
        "end_time": convertToReadableFormat(rawEventData.end_time),
        "cover": rawEventData.cover.source,
        "days_before_token_expiration": ACCESS_TOKEN_OBJECT.expires_in,
    };
}

const ACCESS_TOKEN_OBJECT = getAccessTokenObject();
const CURL_REQUEST = "curl \"https://graph.facebook.com/" + USER_ID + "/events" +
    "?" + "fields=name,start_time,end_time,cover" + "&" + "access_token=" + ACCESS_TOKEN_OBJECT.access_token + "\"";

shellExec(CURL_REQUEST).then((shellOutput) => {
    const RAW_EVENT_DATA = parse(shellOutput.stdout);
    const WANTED_EVENT_DATA = rearrangeDataAsPerWantedFormat(RAW_EVENT_DATA);

    console.log(WANTED_EVENT_DATA);
});