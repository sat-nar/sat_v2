const shape = document.querySelector('.shape');
const bigContainer = document.querySelector('.big-container');
const btnLanjut = document.querySelector('#btn-lanjut');
const counterContainer = document.querySelector('.counter-container');
const valNama = document.querySelector('#nama');
const HNama = document.querySelector('#Hnama');

let selesai = false, skorBenar = 0, skorSalah = 0;

function randomWaktu(min ,max) {
    return Math.round(Math.random() * (max - min) + min );
}

function pilihShape(tipe) {
    shape.classList.add(tipe);
    const rWaktu = randomWaktu(500,2000);

    setTimeout(() => {
        shape.classList.remove(tipe);
        if (!selesai) {
            tampilShape()}
    }, rWaktu);
}

function tampilShape() {
    const randomShape = Math.floor(Math.random() * 5);
    
    switch (randomShape) {
        case 0:
            pilihShape('circle');
            shape.addEventListener('click' , function() {
                const i = shape.classList.item(1);
                if (i === "circle"){ // masih belum selesai
                    skorBenar = skorBenar + 1;
                    shape.classList.remove('circle');
                    console.log("ini skor benar " + skorBenar);
                }
                else {
                    skorSalah = skorSalah + 1;
                    shape.classList.remove(i);
                    console.log("ini skor salah " + skorSalah);
                    
                }
            });
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

    
    console.log(randomShape);
}

function mulai() {
    selesai = false;
    skorBenar = 0;
    skorBenar = 0;
    tampilShape();
    setTimeout(() => {
        selesai = true
        HNama.value = valNama.value;
        console.log(HNama.value);
    }, 10000)
    
}

// Google Spreadsheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbzqY3afgrGeQzLdYu3qMLBALBDg32GLExsPenIz/exec'
      const form = document.forms['submit-to-google-sheet']
      const sendBtn = document.querySelector('.btn-send')
      const loadingBtn = document.querySelector('.btn-loading')
      const myAlert = document.querySelector('.my-alert')

      

      form.addEventListener('submit', e => {
        e.preventDefault()
        
        // tamplikan tombol loading , hilangkan tombol kirim
        loadingBtn.classList.toggle('d-none')
        sendBtn.classList.toggle('d-none')

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
          .then(response => {
            if (response.ok == true ) {
              // tamplikan tombol kirim , hilangkan tombol loading
              loadingBtn.classList.toggle('d-none')
              sendBtn.classList.toggle('d-none')
              // ketika tombol submit diklik
              myAlert.classList.toggle('d-none')
              // reset form
              form.reset()
            }
            })
          .catch(error => console.error('Error!', error.message))
      })

        btnLanjut.addEventListener('click', function(){
          bigContainer.style.display = "none";
          setTimeout(() => {
              document.body.appendChild(counterContainer);
              mulai()
          }, 5000);
          
        });

        // Counter
        const nums = document.querySelectorAll('.nums span');
        const counter = document.querySelector('.counter');
        const finalMessage = document.querySelector('.final');
        // const repl = document.getElementById('replay');

        runAnimation();

        function resetDOM() {
            counter.classList.remove('hide');
            finalMessage.classList.remove('show');
            
            nums.forEach(num => {
                num.classList.value = '';
            });

            nums[0].classList.add('in');
        }

        function runAnimation() {
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
             
      