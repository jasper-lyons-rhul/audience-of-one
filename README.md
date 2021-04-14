# Audience of One

A project built as part of Enrol Yourself Maker's Marathon. Also found at https://audienceofone.herokuapp.com/.

![image](https://images.squarespace-cdn.com/content/v1/5fbab6bc04e61e79d7d1e43c/1612731671048-45T8XZE2C8B11OVOETNS/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/conceptual+illustration+%238_audience+of+one.jpg)

## What is this?

The idea is that people will be able to sign up (using their email or phone number, TBC) to receive a personal one-time-only hyperlink, on which there will be an audio recording.

They'll receive the link at a random time, depending on how much music making I've been doing, and can listen to it whenever they want – but only once.

By creating this one time only, audience of one, the hope is that the listener can be truly present when listening, knowing that they can't re-listen, potentially creating a mini-moment for them.

Crucially too it will help me overcome the overthinking that hampers my music making process, and instead I'll try to 'just ship it'.

## How it's meant to work

I'm a junior level developer, so my implementation of the 'one time only' files shared via URL will be fairly basic – this is fine, since it's a fun side project, rather than designed for encryption or security or whatnot.

This is a NodeJS app which uses ExpressJS. `app.js` is the server and holds the logic for routing, whereas the files that will be shared (mp3 files mainly) live in the `assets` directory.

The basic idea for making the user experience a one-time-only use of each URL is to run an 'if statement' when they access that specific route, _Edit 14-Apr: refactored to use a simpler 'counter' rather than an array with IP address._ ~~checking their IP address.~~

~~If they have not visited the URL before, their IP address won't be found, and they will be able to access the file specified and listen to that track. This is enabled through ExpressJS `res.SendFile`.~~

~~At this point their IP address will be stored in an array/'map', meaning that if they refresh the page, the check triggered by the 'if statement' will show they have visited before, and will serve an HTML page instead of the audio file.~~

I now use a simpler `var count = 0` and `count++` implementation to avoid collecting IP addresses.

The `count++` is triggered on the first time a URL is viewed, and the if statement means that if the user tries to view that URL again, instead of `res.SendFile` being used to send the track, a 'Time's Up' page will be rendered (`sorry.ejs`).

In the future I hope to investigate adding further checks using sessions and cookies and may implement a database.

## What's not working

For some reason, the `res.SendFile` command is not working where both the file is an audio or video file, AND there is an additional function as part of the if statement (here this additional function is `map.set`, in order to add the IP address to the array/map).

The page attempts to load the file, and then when refreshed will display the 'sorry' message – as expected – BUT the audio player is unable to play the file, as it looks like the file isn't properly loaded.

_Update: Now I've deployed to Heroku it appears erratic – sometimes it works as expected with audio, sometimes not._ 🤷‍♀️

You can view this buggy behaviour at http://localhost:8000/audionotworking.

I guess this is something to do with the async nature of the two functions existing together in the if statement, but when I've tried to fix this with a Promise or other workarounds it hasn't worked.

In terms of debugging, I can see that:

* When there is no if statement, the audio file works as expected (http://localhost:8000/worksbutdoesntdisappear) – but then does not 'disappear' when reloaded.

* When loading a non-audio or video file (PDF, .png etc.), the app works as expected (http://localhost:8000/pictureworking).

I've tried these in Chrome and Safari and it acts the same way across both browsers.

So clearly it's an issue with audio and video files caused by `res.SendFile` interacting with another function within the if statement.

Any help much appreciated!


## Helpful documentation

From the ExpressJS documentation, more on `res.SendFile`:
https://expressjs.com/en/4x/api.html#res.sendFile
