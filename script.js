const shape = document.querySelector('.shape');
const bigContainer = document.querySelector('.big-container');
const btnLanjut = document.querySelector('#btn-lanjut');
const btnSubmit = document.querySelector('#btn-submit');
const counterContainer = document.querySelector('.counter-container');
const formHasil = document.querySelector('#hasil');
const valNama = document.querySelector('#nama');
const valKondisi = document.querySelector('#kondisi');
const valWaktuMenit = document.querySelector('#waktuMenit');
const valWaktuDetik = document.querySelector('#waktuDetik');

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

const div = document.getElementById('shape');
const labelInfo = document.getElementById('info');

let selesai = false,
  skorBenar = 0,
  skorSalah = 0,
  jmlLingkaranTampil = 0,
  randomSebelumnya;

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
  labelInfo.innerHTML = 'Tekan tombol space atau Klik </br> ketika gambar LINGKARAN muncul!';
} else if (getDeviceType() === 'mobile' || getDeviceType() === 'tablet') {
  labelInfo.innerHTML = 'Sentuh Gambar Lingkaran!';
} else {
  labelInfo.innerHTML = 'Tekan tombol space atau Klik atau sentuh </br> ketika gambar LINGKARAN muncul!';
}

randomWaktu = (min, max) => Math.round(Math.random() * (max - min) + min);

pilihShape = (tipe) => {
  shape.classList.add(tipe);

  setTimeout(() => {
    shape.classList.remove(tipe);
    if (!selesai) {
      tampilShape();
    }
  }, randomWaktu(500, 1500));
};

selectionFunc = (bentuk) => {
  if (bentuk === 'circle') {
    skorBenar = skorBenar + 1;
    shape.classList.remove(bentuk);
  } else {
    skorSalah = skorSalah + 1;
    shape.classList.remove(bentuk);
  }
};

keyboardFunc = (e, bentuk) => {
  if (bentuk === 'circle' && e.key === ' ') {
    skorBenar = skorBenar + 1;
    div.classList.remove(bentuk);
  } else {
    skorSalah = skorSalah + 1;
    div.classList.remove(bentuk);
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
      pilihShape('heart');
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
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => {
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
        Swal.fire({
          title: 'Error!',
          text: 'Data Gagal disubmit',
          icon: 'error',
          confirmButtonText: 'Cool',
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

  let totalWaktu = valWaktuMenit.value * 60000 + valWaktuDetik.value * 1000;
  HKondisi.value = valKondisi.value;

  setTimeout(() => {
    bigContainer.style.display = 'none';
    runAnimation();
  }, 400);

  document.body.appendChild(counterContainer);
  setTimeout(() => {
    mulai(totalWaktu);
  }, 4000);
});

function alert(kondisi, gambar, pesan) {
  Swal.fire({
    title: `Selamat! Anda dalam kondisi ${kondisi}`,
    text: `${pesan}`,
    imageUrl: `img/${gambar}.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: 'Custom image',
    confirmButtonText: 'Detail',
  });
}

// jalan kedua

mulai = (waktu) => {
  selesai = false;
  skorBenar = 0;
  skorSalah = 0;
  jmlLingkaranTampil = 0;

  HNama.value = valNama.value;
  HWaktu.value = waktu / 1000;

  if (!selesai) {
    tampilShape();
    div.focus();
  }

  setTimeout(() => {
    HSkorBenar.value = skorBenar;
    HSkorSalah.value = skorSalah;
    selesai = true;
    let totalBenar = parseInt(HSkorBenar.value) - parseInt(HSkorSalah.value);
    let persentaseBenar = (totalBenar / jmlLingkaranTampil) * 100;

    // bugar
    if (HKondisi.value === 'bugar') {
      // benar banyak
      if (persentaseBenar >= 70) {
        alert('Bugar', 'healthy', 'Anda dapat melanjutkan aktivitas');
        // benar sedikit
      } else if (persentaseBenar < 70) {
        alert('Letih', 'letih', 'Jaga Kondisi anda');
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Silahkan test ulang!',
          confirmButtonText: 'ulang',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    }

    // letih
    else if (HKondisi.value === 'letih') {
      // benar banyak
      if (persentaseBenar >= 70) {
        alert('Bugar', 'healthy', 'Anda masih bisa melanjutkan aktivitas');
        // benar sedikit
      } else if (persentaseBenar < 70) {
        alert('Letih', 'letih', 'Jaga kondisi, anda benar-benar letih');
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Silahkan test ulang!',
          confirmButtonText: 'ulang',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    }

    // durasi lama, benar banyak
    // durasi lama, benar sedikit
    // durasi sebentar, benar banyak
    // durasi sebentar, benar sedikit

    formHasil.style.display = 'flex';
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
