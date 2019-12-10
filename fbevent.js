#!/usr/bin/env node

const shellExec = require('shell-exec');

shellExec(
    "curl \"https://graph.facebook.com/3258104107540071?fields=id,name&access_token=EAAGLakOhBHsBANeXasflWeTqHLWU7exnktSi1jrCDb4DSy6HlCdn0UxKB8l7JAFaeFsTqH0huV4RGa6OcXNZCZCULok2zh2fpU5TWleKEB77itqKgTgOSbLm0XU2JBUlgt5Bs9TtlgsWE3tuvJ6f2fzVS7CMzfEuOh3Suebg9WAQ3n9QqJNQWdisAb47wZD\""
).then((stdout) => {
    console.log(stdout.stdout);
});