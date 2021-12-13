const shape = document.querySelector('.shape');
const bigContainer = document.querySelector('.big-container');
const btnLanjut = document.querySelector('#btn-lanjut');
const btnSubmit = document.querySelector('#btn-submit');
const counterContainer = document.querySelector('.counter-container');
const formHasil = document.querySelector('#hasil');
const valNama = document.querySelector('#nama');
const valKondisi = document.querySelector('#kondisi');
const valWaktuMenit = document.querySelector('#waktuMenit');

// Counter
const nums = document.querySelectorAll('.nums span');
const counter = document.querySelector('.counter');
const finalMessage = document.querySelector('.final');
// const repl = document.getElementById('replay');
const HNama = document.querySelector('#Hnama');
const HKondisi = document.querySelector('#Hkondisi');
const HSkorBenar = document.querySelector('#Hskor-berhasil');
const HSkorSalah = document.querySelector('#Hskor-gagal');
const HWaktu = document.querySelector('#HWaktu');
const H850 = document.querySelector('#H850');
const HSkorMiss = document.querySelector('#Hskor-miss');
const HTampil = document.querySelector('#Htampil');
const HGambarTampil = document.querySelector('#Hgambar-tampil');

const div = document.querySelector('#shape');
const labelInfo = document.getElementById('info');

let selesai = false,
  skorBenar = 0,
  skorSalah = 0,
  skorMiss = 0,
  jmlLingkaranTampil = 0,
  jmlGambarTampil = 0,
  jmlDiatas850 = 0,
  randomSebelumnya = 0,
  berjalan = false,
  isStimulus = false,
  startTime = 0,
  occurTime = 0,
  arrJawaban = [];

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

if (getDeviceType() === 'desktop') {
  labelInfo.innerHTML = 'Tekan tombol spasi / klik gambar LINGKARAN!';
} else if (getDeviceType() === 'mobile' || getDeviceType() === 'tablet') {
  labelInfo.innerHTML = 'Sentuh Gambar Lingkaran!';
} else {
  labelInfo.innerHTML = 'Tekan tombol space / Klik / sentuh  ketika gambar LINGKARAN muncul!';
}

randomWaktu = (min, max) => Math.round(Math.random() * (max - min) + min);

pilihShape = (tipe) => {
  let temp = randomWaktu(1000, 2000);
  occurTime = Date.now();
  shape.classList.add(tipe);

  setTimeout(() => {
    shape.classList.remove(tipe);
  }, temp);

  setTimeout(() => {
    if (!selesai) {
      tampilShape();
    }
  }, temp + 500);
};

var audio = document.getElementById('audio');

selectionFunc = (e, bentuk) => {
  audio.pause();
  audio.currentTime = 0;
  let delay = Date.now() - occurTime;
  audio.play();
  arrJawaban.push(delay);

  if (bentuk === 'circle' && berjalan) {
    skorBenar = skorBenar + 1;
    shape.classList.remove(bentuk);
  } else if (bentuk == null) {
    skorMiss = skorMiss + 1;
  } else {
    skorSalah = skorSalah + 1;
    shape.classList.remove(bentuk);
  }
};

keyboardFunc = (e, bentuk) => {
  let delay = Date.now() - occurTime;
  audio.play();
  arrJawaban.push(delay);
  if (e.key === ' ' && berjalan) {
    if (bentuk === 'circle') {
      skorBenar = skorBenar + 1;
      shape.classList.remove(bentuk);
    } else if (bentuk == null) {
      skorMiss = skorMiss + 1;
    } else {
      skorSalah = skorSalah + 1;
      shape.classList.remove(bentuk);
    }
  }
};

function randomShape() {
  let randomShape = Math.floor(Math.random() * 5);

  if (randomShape == randomSebelumnya) {
    randomShape = Math.floor(Math.random() * 5);
  }
  randomSebelumnya = randomShape;
  return randomShape;
}

function tampilShape() {
  jmlGambarTampil++;
  // occurTime = Date.now();
  switch (randomShape()) {
    case 0:
      pilihShape('circle');
      jmlLingkaranTampil++;
      break;
    case 1:
      pilihShape('rectangle');
      break;
    case 2:
      pilihShape('triangle');
      break;
    case 3:
      pilihShape('square');
      break;
    case 4:
      pilihShape('oval');
      break;
    // case 5:
    //     pilihShape('trapesium');
    //     break;
    // case 6:
    //     pilihShape('jajar-genjang');
    //     break;
    // case 7:
    //     pilihShape('cone');
    //     break;
    // case 8:
    //     pilihShape('pentagon');
    //     break;
    // case 9:
    //     pilihShape('diamond-square');
    //     break;
    default:
      pilihShape('circle');
      break;
  }
}

// Google Spreadsheet

//  data = https://docs.google.com/spreadsheets/d/1BRkI38PD9SnUkRuRPxiMNIql2SPzSnsmh_P08iua4d4/edit
const scriptURL = 'https://script.google.com/macros/s/AKfycbwiZad4JPHba3YJfqBlN-ySfuncKv-p30yHiZFhBvyTz1iMFzk/exec';
const form = document.forms['submit-to-google-sheet'];
const formAwal = document.forms['form-awal'];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.loader-container').style.display = 'block';
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
      document.querySelector('.loader-container').style.display = 'none';
      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Data Berhasil disubmit',
          icon: 'success',
          confirmButtonText: 'Cool',
        }).then((r) => {
          if (r.isConfirmed) {
            window.location.reload();
          }
        });
      } else if (!response.ok) {
        document.body.classList.remove('container-loader');
        Swal.fire({
          title: 'Error!',
          text: 'Data Gagal disubmit',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    })
    .catch((error) => console.error('Error!', error.message));
});

// jalan pertama

btnLanjut.addEventListener('click', function () {
  if (!valNama.value) {
    Swal.fire({
      title: 'Oopss!',
      text: 'Tolong isi nama',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    return;
  }

  let totalWaktu = valWaktuMenit.value * 60 * 1000;
  HKondisi.value = valKondisi.value;
  let radios = document.getElementsByName('Mkondisi');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      HKondisi.value = radios[i].value;
      break;
    }
  }

  HNama.value = valNama.value;

  setTimeout(() => {
    bigContainer.style.display = 'none';
    runAnimation();
  }, 400);

  document.body.appendChild(counterContainer);
  setTimeout(() => {
    mulai(totalWaktu);
  }, 4000);
});

function alert(kondisi, gambar = 'img/healthy.png', pesan = 'ok') {
  Swal.fire({
    title: `Anda dalam kondisi ${kondisi}`,
    text: `${pesan}`,
    imageUrl: `img/${gambar}.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: 'Custom image',
    confirmButtonText: 'Detail',
  });
}

function hitungResponseMoreThan850() {
  let temp = 0;
  for (let i = 0; i < arrJawaban.length; i++) {
    if (arrJawaban[i] > 850) {
      temp++;
      console.log(arrJawaban[i]);
    }
  }
  return temp;
}

// jalan kedua
mulai = (waktu) => {
  selesai = false;
  berjalan = true;
  skorBenar = 0;
  skorSalah = 0;
  jmlLingkaranTampil = 0;
  jmlGambarTampil = 0;
  skorMiss = 0;
  occurTime = 0;

  HWaktu.value = waktu / 1000;

  if (!selesai) {
    tampilShape();
    div.focus();
  }

  setTimeout(() => {
    berjalan = false;
    selesai = true;
    occurTime = 0;
    jmlDiatas850 = hitungResponseMoreThan850();
    shape.style.display = 'none';

    HSkorBenar.value = skorBenar;
    HSkorSalah.value = skorSalah;
    H850.value = jmlDiatas850;
    HSkorMiss.value = skorMiss;
    HTampil.value = jmlLingkaranTampil;
    HGambarTampil.value = jmlGambarTampil;

    formHasil.style.display = 'flex';
    formHasil.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        console.log('ok');
      }
    });
  }, waktu);
};

runAnimation = () => {
  nums.forEach((num, idx) => {
    const penultimate = nums.length - 1;
    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== penultimate) {
        num.classList.remove('in');
        num.classList.add('out');
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in');
      } else {
        counter.classList.add('hide');
        finalMessage.classList.add('show');
        setTimeout(() => {
          counterContainer.style.display = 'none';
        }, 1000);
      }
    });
  });
};

valWaktuMenit.addEventListener('keyup', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    btnLanjut.click();
  }
});
