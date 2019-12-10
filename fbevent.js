#!/usr/bin/env node

const shellExec = require('shell-exec');

const USER_ID = '3258104107540071';
const FIELDS = 'events';
const ACCESS_TOKEN = 'EAAGLakOhBHsBAE44W3elZAcwUgHEMORSzhQ6vatAvvrtBHktZCBCdmTnuEyss1cRjifR6QWb7AZAe5uMaFTQNdMdDExtvkvyi5qHu6LRr89SmbVkbeJqsdLnDXHv1yAjPCZCRh7N15nHNReDhQIiN6ER1ToL5dfuvXDvQhiZBcTgqc8QkJy4A7knI5RvidLUZD';

shellExec(
    "curl \"https://graph.facebook.com/" +
    USER_ID +
    "/events" +
    "?" +
    //"fields=" +
    //FIELDS +
    "limit=999" +
    "&" +
    "access_token=" +
    ACCESS_TOKEN +
    "\""
).then((stdout) => {
    console.log(
        //JSON.stringify(stdout.stdout, null, 4)
        stdout.stdout
);
});