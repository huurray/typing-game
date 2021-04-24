import 'regenerator-runtime/runtime';
import { requestAPI } from './api/index';
import Loading from './components/Loading';

window.addEventListener('load', init);

const loading = new Loading();

// DOM Elements
const $main = document.querySelector('.main');
const $result = document.querySelector('.result');
const $input = document.querySelector('.input');
const $button = document.querySelector('.button');
const $word = document.querySelector('.board-word');
const $time = document.querySelector('.board-time');
const $score = document.querySelector('.board-score');
const $resultScore = document.querySelector('.result-score');
const $resultAverage = document.querySelector('.result-average');
const $restartButton = document.querySelector('.restart-button');
// data
let words = [];
let answerTimes = [];
let score = 0;
let originTime = 0;
let time = 0;
let answer = '';
let started = false;
let timer = null;

function init() {
  $button.addEventListener('click', onStart);
  $input.addEventListener('input', onChange);
  $input.addEventListener('keypress', onSubmit);
  $restartButton.addEventListener('click', onStart);
}

async function onStart() {
  if (started) {
    reset();
    $button.innerText = '시작';
  } else {
    loading.open();
    const newWords = await requestAPI('/words');
    loading.close();
    if (newWords && newWords.length > 0) {
      words = newWords;
      started = true;
      $button.innerText = '초기화';
      next(true);
    }
  }
}

function onChange(e) {
  answer = e.target.value;
}

function onSubmit(e) {
  if (e.key !== 'Enter') return;

  $input.value = '';
  if (answer === words[0].text) {
    answerTimes.push(originTime - time);
    score++;
    $score.innerText = score;
    next();
  }
}

function next(isInit) {
  if (!isInit) {
    clearInterval(timer);
    words.shift();
  }
  if (words.length === 0) {
    finish();
    return;
  }

  const target = words[0];
  $word.innerText = target.text;
  $time.innerText = target.second;
  time = target.second;
  originTime = target.second;

  timer = setInterval(() => {
    if (time > 0) {
      time--;
    } else if (time === 0) {
      next();
    }
    $time.innerText = time;
  }, 1000);
}

function reset() {
  words = [];
  score = 0;
  answer = '';
  $input.value = '';
  started = false;
  $word.innerText = '문제 단어';
  $time.innerText = 0;
  $score.innerText = 0;
  clearInterval(timer);
  $main.style.display = 'flex';
  $result.style.display = 'none';
}

function getAverage(array) {
  if (!array || array.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

function finish() {
  clearInterval(timer);
  $main.style.display = 'none';
  $result.style.display = 'flex';
  $resultScore.innerText = score;
  $resultAverage.innerText = getAverage(answerTimes);
}
