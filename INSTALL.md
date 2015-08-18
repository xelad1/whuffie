Build your own local version of Whuffie on OS X
--------------------------------------

First, you will need install Meteor:
```bash
curl https://install.meteor.com | /bin/sh   # installs Meteor and MongoDB
```

After installing Meteor, clone down the repo:
```bash
git clone https://github.com/sunny-g/whuffie
```

Install and build the dependencies with [gulp](http://gulpjs.com/) (currently only [stellar-lib](https://github.com/stellar/stellar-lib)):
```bash
cd whuffie/.gulp
npm install
gulp
```

Go back to the root directory of the repo, then run and Meteor. Enjoy!
```bash
cd ..
meteor
```
