const shape = document.querySelector('.shape');
const bigContainer = document.querySelector('.big-container');
const btnLanjut = document.querySelector('#btn-lanjut');
const btnSubmit = document.querySelector('#btn-submit');
const counterContainer = document.querySelector('.counter-container');
const formHasil = document.querySelector('#hasil');
const valNama = document.querySelector('#nama');
const valKondisi = document.querySelector('#kondisi');
const valWaktu = document.querySelector('#waktu');

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

const alert_success = document.querySelector(".alert_success");
const alert_error = document.querySelector(".alert_error");
const alert_wrapper = document.querySelector(".alert_wrapper");
const alert_wrapper1 = document.querySelector(".alert_wrapper1");
const close_btns = document.querySelectorAll(".close");

let selesai = false, skorBenar = 0, skorSalah = 0, randomSebelumnya;

randomWaktu = (min, max) => {
    return Math.round(Math.random() * (max - min) + min );
}

pilihShape = (tipe) => {
    shape.classList.add(tipe);
    if (valKondisi.value === "bugar"){
        setTimeout(() => {
            shape.classList.remove(tipe);
            if (!selesai) {
                tampilShape()}
        }, randomWaktu(750,1000));
    }
    else if (valKondisi.value === "letih"){
        setTimeout(() => {
            shape.classList.remove(tipe);
            if (!selesai) {
                tampilShape()}
        }, randomWaktu(1000,1500));
    }
    HKondisi.value = valKondisi.value;
}

    let keyboard;

window.addEventListener('keydown', function (e) {
    keyboard = e.keyCode || e.which
})

selectionFunc = bentuk => {
    if ( bentuk === 'circle' || keyboard == 32){
        console.log(keyboard);
        skorBenar = skorBenar + 1;
        shape.classList.remove(bentuk);
        console.log("ini skor benar " + skorBenar);
    }
    else {
        skorSalah = skorSalah + 1;
        shape.classList.remove(bentuk);
        console.log("ini skor salah " + skorSalah);
    }

    HSkorBenar.value = skorBenar;
    HSkorSalah.value = skorSalah;
    console.log("total benar " + HSkorBenar.value);
    console.log("total salah " + HSkorSalah.value);
}

function randomShape()  {
    let randomShape = Math.floor(Math.random() * 5);

    if ( randomShape == randomSebelumnya ){
        randomShape = Math.floor(Math.random() * 5);
    } 
    randomSebelumnya = randomShape
    return randomShape;
}


tampilShape = () => {
    
    
    switch (randomShape()) {
        case 0:
            pilihShape('circle');
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
                break;
    }

    
    console.log(randomShape());
}

myFunction = (kondisi) => {
    HKondisi.value = kondisi;
  }

mulai = (waktu) => {
    selesai = false;
    skorBenar = 0;
    skorBenar = 0;
    tampilShape();
    setTimeout(() => {
        selesai = true;
        HNama.value = valNama.value;
        HWaktu.value = valWaktu.value / 1000;
        // HSkorBenar.value = skorBenar;
        // // HSkorSalah.value = skorSalah;

        // console.log(HNama.value);
        // console.log(HKondisi.value);
        // console.log(HWaktu.value);
        

        formHasil.style.display = "flex";
    }, waktu)
    
}

// Google Spreadsheet

    //  data = https://docs.google.com/spreadsheets/d/1BRkI38PD9SnUkRuRPxiMNIql2SPzSnsmh_P08iua4d4/edit
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwiZad4JPHba3YJfqBlN-ySfuncKv-p30yHiZFhBvyTz1iMFzk/exec'
    const form = document.forms['submit-to-google-sheet']
    const formAwal = document.forms['form-awal'];

    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
          if (response.ok ) {
              // reset form
              form.reset()
              formAwal.reset();
              formHasil.style.display = "none";
              bigContainer.style.display = "flex";
              alert_wrapper.classList.add("active");
              alert_success.style.top = "50%";
          } else if (!response.ok){
            alert_wrapper1.classList.add("active");
            alert_error.style.top = "50%";
          }
          })
        .catch(error => console.error('Error!', error.message))
    })
        
        btnLanjut.addEventListener('click', function(){
            setTimeout(() => {
                bigContainer.style.display = "none";
                runAnimation();
            }, 400);
            
          document.body.appendChild(counterContainer);
          setTimeout(() => {
              mulai(valWaktu.value);
          }, 4000);
          
        });

        // function resetDOM() {
        //     counter.classList.remove('hide');
        //     finalMessage.classList.remove('show');
            
        //     nums.forEach(num => {
        //         num.classList.value = '';
        //     });

        //     nums[0].classList.add('in');
        // }

        runAnimation = () => {
            nums.forEach((num, idx) => {
                const penultimate = nums.length - 1;
                num.addEventListener('animationend', (e) => {
                    if(e.animationName === 'goIn' && idx !== penultimate){
                        num.classList.remove('in');
                        num.classList.add('out');
                    } else if (e.animationName === 'goOut' && num.nextElementSibling){
                        num.nextElementSibling.classList.add('in');
                    } else {
                        counter.classList.add('hide');
                        finalMessage.classList.add('show');
                        setTimeout(() => {
                            counterContainer.style.display = 'none';
                        }, 1000)
                        
                    }
                });
            });
        }

        // repl.addEventListener('click', () => {
        //     resetDOM();
        //     runAnimation();
        // });
      
        // alert
       

        // btns.forEach(function(btn, btn_index){
        //     btn.addEventListener("click", function(){
        //         alert_wrapper.classList.add("active");

        //         alert_items.forEach(function(alert_item, alert_index){
        //             if(btn_index == alert_index){
        //                 alert_item.style.top = "50%";
        //             }
        //             else{
        //                 alert_item.style.top = "-100%";
        //             }
        //         })
        //     })
        // })

        close_btns.forEach(function(close, close_index){
            close.addEventListener("click", function(){
                alert_wrapper.classList.remove("active");
    
                alert_items.forEach(function(alert_item, alert_index){
                alert_item.style.top = "-100%";
                })
            })
        })