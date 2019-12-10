#!/usr/bin/env node

const shellExec = require('shell-exec');

const USER_ID = '3258104107540071';
const FIELDS = 'end_time';
const ACCESS_TOKEN = 'EAAGLakOhBHsBAKy0WpZBuk7qUbzN4jsWuARJ71kTbjASZCSLyZBfXT8aizQ6hW4dLEOXMNvwF6Q8iUEK1sCmqkRc1ydPeFWQnKrZBDoXWURccBnSp9dHWf95F2w6t1gj0FNV5O8ELCP3QpZAGefUiAYvzL01T8vAnmtXgIC0Q9SaYnt5ZCAQs1Ih8SpZC6UC3pP1vIVFDb8MgZDZD';

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
        "event_name": RAW_EVENT_DATA.data['name'],
        "start_time": RAW_EVENT_DATA.start_time,
        "end_time": RAW_EVENT_DATA.end_time,
        "cover": RAW_EVENT_DATA.cover,
        "days_before_token_expiration": RAW_EVENT_DATA.days_before_token_expiration,
    };
    console.log(WANTED_EVENT_DATA);
    console.log("\n");
    //console.log(RAW_EVENT_DATA);
});