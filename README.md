# Clause Demo Application

<img src="docs/app.png" width="350">

A demo client application that invokes a smart clause hosted on [Clause Hub](https://hub.clause.io). This app uses the [Fragile Goods sample](https://github.com/accordproject/cicero-template-library/tree/master/fragile-goods) template from the Cicero template library.

A hosted version of this app is available at [https://clause-fragile-goods.herokuapp.com](https://clause-fragile-goods.herokuapp.com)

## Running this demo on your machine

1. Download this repository.

You can either [download the latest release archive](https://github.com/clauseHQ/fragile-goods-app/archive/master.zip) or if you have `git` installed simply `git clone` the repository:

```
git clone https://github.com/clauseHQ/fragile-goods-app.git
```

2. Install the dependencies.

> You need NPM and Node run this app. You can download both from [here](https://nodejs.org/).

``` 
npm install 
```

3. Start the app.

```
npm start
```
You should see the following output.
```
mattmbp:fragile-goods-app matt$ npm start

> fragile-goods-app@0.0.1 start /Users/matt/dev/clauseHQ/fragile-goods-app
> node index.js

App running at http://localhost:5000

```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

5. Create an instance of the Fragile Goods clause in your Clause Hub account.

In the template library choose the following template.

<img src="docs/fragile-goods-template.png" width="350">

Click `Create Contract`.

When you are in the contract editor, select the Fragile Goods clause in the right pane.

![](docs/execution-url.png)
 
5. Scroll to the triggers section of the clause to see the execution URL. Paste in your execution URL from Clause Hub into the `Execution URL` field in the demo app.

6. Click the `Start` button in the app to begin the timer.

> Note that your device must have an accelerometer for this demo to pick up readings. Why not try this from your mobile phone?
> 
> If you don't have an accelerometer you can vary the delivery price by stopping the timer before / after it reaches 0 seconds. Late deliveries also impose a penalty.

7. You can reset the timer by clicking reset.

&copy; Copyright 2019, Clause Inc. 
