'use strict';

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

let max = 0, min = 0, payOut = 0;
let accX = 0.0, accY = 0.0, accZ = 0.0;
let running = false;

const timeLimit = 10; // seconds

// The payload that gets sent to the smart contact
let body = {
  '$class': 'io.clause.demo.fragileGoods.DeliveryUpdate',
  'startTime':'',
  'finishTime':'',
  'status':'IN_TRANSIT',
  'accelerometerReadings':[] // Readings accumulate in here
};

$('#cost').hide();
$('#costValue').hide();
$('.collapseExample').collapse('show');

/**
 * Updates the Accelerometer values on the page
 */
function updatePage(){
  $('#accX').html(accX);
  $('#accY').html(accY);
  $('#accZ').html(accZ);
}

if (window.DeviceMotionEvent !== undefined) {
  /**
   * Tracks the maximum acceleration between each submission to the smart contact.
   * @param {*} e the DeviceMotionEvent
   */
  window.ondevicemotion = function(e) {

    if(e.acceleration.x > max) { max = e.acceleration.x;}
    if(e.acceleration.y > max) { max = e.acceleration.y;}
    if(e.acceleration.z > max) { max = e.acceleration.z;}
    if(e.acceleration.x < min) { min = e.acceleration.x;}
    if(e.acceleration.y < min) { min = e.acceleration.y;}
    if(e.acceleration.z < min) { min = e.acceleration.z;}

    if(e.acceleration.x && e.acceleration.y && e.acceleration.z){
      accX = Number.parseFloat(Math.abs(e.acceleration.x)).toFixed(1);
      accY = Number.parseFloat(Math.abs(e.acceleration.y)).toFixed(1);
      accZ = Number.parseFloat(Math.abs(e.acceleration.z)).toFixed(1);
    }

    updatePage();
  };
} else {
  // TODO Add a notice to the page that this demo won't work on this device
}

/**
 * Sends an accelerometer event to the smart contact.
 *
 * @param {function} callback A callback function to invoke after the event has been sent
 */
function sendEvent(callback){
  body.finishTime = new Date();
  let tempBody = body;
  $.ajax({
    type: 'POST',
    url: $('#executionUrl').val(),
    headers: {
      'Authorization': 'Bearer ' + $('#token').val(),
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(tempBody)
  }).then(function(data){
    payOut = (data.amount.doubleValue)? data.amount.doubleValue: data.amount;
    updatePage();
    if(callback){ callback(payOut); }
  });
}

/**
 * Start the count-down timer
 */
function start() {
  body.startTime = new Date();
  body.finishTime = new Date();
  $('#startButton').attr('disabled', 'disabled');
  $('#finishButton').removeAttr('disabled');
  $('#cost').hide();
  running = true;
}

/**
 * Stop the count-down timer.
 */
function finish() {

  $('#cost').show();
  $('#costSpinner').show();

  running = false;
  body.finishTime = new Date();
  body.status = 'ARRIVED';
  $('#startButton').removeAttr('disabled');
  $('#finishButton').attr('disabled', 'disabled');

  sendEvent(function(payOut){
    $('#costValue').show();
    $('#costSpinner').hide();
    $('#payOut').html(payOut);
  });
}

/**
 * Reset the page so that we can run the demo again.
 */
function reset() {
  body.startTime = new Date();
  running = false;
  max = 0, min = 0, payOut = 0;
  body = {
    '$class': 'io.clause.demo.fragileGoods.DeliveryUpdate',
    'startTime':'',
    'finishTime':'',
    'status':'IN_TRANSIT',
    'accelerometerReadings':[]
  };
  $('#cost').hide();
  $('#costValue').hide();
  $('#timer').html(timeLimit);
  $('#payOut').html(0.0);
}

/**
 * Send an accelerometer reading every 2.5 secs.
 */
setInterval(function(){
  if(running){
    body.accelerometerReadings.push(max);
    body.accelerometerReadings.push(min);

    min = 0;
    max = 0;

    sendEvent();
  }
},2500);

/**
 * Update the timer on the page.
 */
setInterval(function(){
  let now = new Date();
  let timeLeft =Number.parseFloat((timeLimit-((now.getTime() - new Date(body.startTime).getTime())/1000))).toFixed(1);
  if(running){
    $('#timer').html(timeLeft);
  }

},100);

/* eslint-enable no-undef */
/* eslint-enable no-unused-vars */
