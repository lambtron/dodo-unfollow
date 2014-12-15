Dodo
====

![](http://fxcnews.com/wp-content/uploads/2014/11/dodo_bird.jpg)

> Periodically unfollow Twitter users in a private Twitter list.

### How to use

1. Create a [list](https://support.twitter.com/articles/76460-using-twitter-lists) on Twitter with the word 'Dodo' in its title
2. Go to [Dodo](http://dodo-twitter.herokuapp.com/) and authorize your Twitter account
3. Follow Twitter users and add them to your 'Dodo' list
4. Every month, this app will automatically unfollow them for you

### Running Locally

Make sure you have `node 0.11.x` installed, as [Koa](http://koajs.com/) requires generators.

#### Getting `node 0.11.x` and `mongoDB`

- You can install `node 0.10.33` (or the latest stable version of `node`) [here](http://nodejs.org/download/)
- Then install [`n`](https://www.npmjs.org/package/n), a nifty node management tool, with `npm install -g n` in your terminal
- Once `n` is installed, then run `n 0.11.14`
- Install `mongoDB` [here](http://docs.mongodb.org/manual/installation/)

#### Running the server

Afterwards, run the following commands:

```
$ git clone git@github.com:lambtron/node-koa-mongo-swig-seed.git
$ cd node-koa-mongo-swig-seed
$ mongod
$ make
```

You should see:

```
listening on port 3000
```

Then, point your browser to `localhost:3000`.

### Deploying to Heroku

Make sure you have a [Heroku](http://www.heroku.com) account and you have Heroku's [CLI](https://toolbelt.heroku.com/) installed. Afterwards, run the following commands.

```
$ heroku create
Creating polar-escarpment-5726... done, stack is cedar-14
https://polar-escarpment-5726.herokuapp.com/ | git@heroku.com:polar-escarpment-5726.git
Git remote heroku added
$ git push heroku master
```

Then, point your browser to `https://polar-escarpment-5726.herokuapp.com/`.

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Copyright (c) 2014

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
