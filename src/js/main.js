window.addEventListener('DOMContentLoaded', ()=>{


///////////////////////////////////////////////////////////////////////////tabs////////////////////////////////////////////////////////////////////////////////////////
const Contentus = document.querySelectorAll('.tabcontent');
const itemList  = document.querySelectorAll('.tabheader__item');
const itemListParent = document.querySelector('.tabheader__items');

function hideTab (){
    Contentus.forEach((item)=>{
    item.style.display = 'none'
    })
   
    
}
function showTab (i=0){
    Contentus.forEach((item,index) =>{
        if(i == index){
            Contentus[i].style.display = 'block'
        }
        
    
    })
   
}
hideTab()
showTab()

itemListParent.addEventListener('click', (event)=>{
    const target = event.target;

    if(target.classList.contains('tabheader__item')){
    itemList.forEach((item,index)=>{
        if(target == item){
            hideTab()
            showTab(index)
        }
    })
    }
})
      
/////////////////////////////////////////////////////////////////Недоработан класс активности////////////////////////////////////////////////////



 /////////////////////////////////////////////////////////////////Создание счётчика////////////////////////////////////////////////////       

const deadline = '2021-12.31';

function getTimeRemaining (endtime){
   const t       = Date.parse(endtime) - Date.parse(new Date ()),
         days    = Math.floor( t / (1000 * 60 * 60 * 24)),
         hours   = Math.floor( t / (1000 * 60 * 60 ) % 24),
         minutes = Math.floor( t / 1000 / 60 % 60 ),
         seconds = Math.floor( (t / 1000) % 60);

    return {
        total   : t,
        days    : days,
        hours   : hours,
        minutes : minutes,
        seconds : seconds,
    }
}
function getZero (num){
    if(num >= 0 && num < 10 ){
        return `0${num}`;
    }
    else {
        return num;}
}

function setClock (selector,endtime){
    const timer   = document.querySelector(selector),
          days    = timer.querySelector('#days'),
          hours   = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

updateClock()          
          function updateClock(){
              const t = getTimeRemaining(endtime);

              days.innerHTML = getZero(t.days);
              hours.innerHTML = getZero(t.hours);
              minutes.innerHTML = getZero(t.minutes);
              seconds.innerHTML = getZero(t.seconds);
              if(t.total <=0){
                  clearInterval(timeInterval)
              }
          }
}

setClock('.timer',deadline);


////////////////////////////////////////////////////////////////////Модальное окно///////////////////////////////////////////////////////


const modal = document.querySelector('.modal'),
      modal__close = document.querySelector('.modal__close'),
      btns = document.querySelectorAll('[data-btn]')
      
function modalOpen() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'
    clearInterval(timeout)
}


btns.forEach((item)=>{
    item.addEventListener('click', ()=>{
        modalOpen();
    })
});

function modalClose(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow =''
    
}


modal.addEventListener('click',(e)=>{
    if(e.target === modal || e.target.getAttribute('.modal__close')== ''){
        modalClose()
    }
})
document.addEventListener('keydown',(e)=>{
    if(e.code === 'Escape' && modal.classList.contains('show')){
        modalClose()
    }
})
const timeout = setTimeout(modalOpen, 100000);

window.addEventListener('scroll', showModalByScroll)

function showModalByScroll (){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ){
        modalOpen()
        window.removeEventListener('scroll',showModalByScroll)
    }
}
showModalByScroll()
    


///menu card

class Menu {
    constructor(src, alt, title, desc,price, parentSelector, ...rest){
        this.src  = src;
        this.alt = alt;
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.selector = document.querySelector(parentSelector)
        this.rest = rest;
    }
    render(){
        const element = document.createElement('div');
        this.rest.forEach(className => element.classList.add(className))
        element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`
                    
        this.selector.append(element)
    }
}
new Menu(
    'img/tabs/vegy.jpg',
    '"Фитнес"',
    '"Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    '500',
    '.menu .container',
    'menu__item'
).render()

new Menu(
    'img/tabs/elite.jpg',
    'elite',
    '"Элит"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    '999',
    '.menu .container',
    'menu__item'
).render()


new Menu(
    'img/tabs/post.jpg',
    'post',
    '"Химия"',
    'Меню “Химия” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    '999',
    '.menu .container',
    'menu__item'
).render()

//Отправка данных на сервер - XMLHttpRequest + formData


const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    Success: 'Операция прошла успешно!',
    failure: 'Что то пошло не так',
};

  forms.forEach((item)=>{
    PostData(item)
})

function PostData (form){
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        
      

        const request = new XMLHttpRequest();

        request.open('POST', 'server.php');

        const formData = new FormData(form);
        request.send(formData);

       request.addEventListener('load', ()=>{
           if(request.status===200){
                
            const load = document.createElement('img');
            load.src = message.loading;
            load.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(load);
               
             

           }
           else{showThanksModa(message.failure)}
       });

       
       
    })

 
}
function showThanksModa (message){
           const prevModalDialo = document.querySelector('.modal__dialog');

           prevModalDialo.classList.add('hide')
          
           modalOpen  ();
           
           const thanksModal = document.createElement('div');
           thanksModal.classList.add('modal__dialog');
           thanksModal.innerHTML = `
           <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
           </div>
           `;

           document.querySelector('.modal').append(thanksModal);
           setTimeout(()=>{
               thanksModal.remove();
               prevModalDialo.classList.add('show');
               prevModalDialo.classList.remove('hide');
               modalClose();
           },5000)
       }
    

    })


