const scheduledMessages = [
    {
        id: 1,
        message: 'Kraj casa!',
        time: {
            hours: '00',
            minutes: '00',
            seconds: '05'
        }
    },
    {
        id: 2,
        message: 'Happy New Year!',
        time: {
            hours: '00',
            minutes: '10',
            seconds: '05'
        }
    },

];

const msgCols = ['id', 'time', 'message', 'action'];

const addScheduledMessageBtn = document.getElementById('addScheduledMessageBtn');
const closeBtn = document.getElementById('closeBtn');
const saveBtn = document.getElementById('saveBtn');

const addModal = document.getElementById('addModal');

const messageError = document.getElementById('messageError');
const timeError = document.getElementById('timeError');
const timeNumError = document.getElementById('timeNumError');

const message = document.getElementById('message');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const table = document.querySelector('.table');

let tbody = document.createElement('tbody');

let timeout;

addScheduledMessageBtn.addEventListener('click', () => {
    openModal();
});

closeBtn.addEventListener('click', () => {
    closeModal();
});

saveBtn.addEventListener('click', () => {
    if(validateInput()){
        addMessage();
        closeModal();
        showTable();
    }
});

function showTable(){
    
    tbody.innerHTML = '';

    scheduledMessages.forEach( i => {
        let row = document.createElement('tr');
        msgCols.forEach( e => {
            let col = document.createElement('td');
            if(e === 'time'){
                col.innerText = `${i[e].hours}:${i[e].minutes}:${i[e].seconds}`;
            } else if(e === 'action'){
                let startBtn = document.createElement('button');
                let delBtn = document.createElement('button');
                startBtn.innerText = 'START';
                delBtn.innerText = 'DELETE';

                startBtn.addEventListener('click', () => {
                    startTimer(i.time, i.message);
                });

                delBtn.addEventListener('click', () => {
                    deleteMsg(i);
                });

                col.appendChild(startBtn);
                col.appendChild(delBtn);
            } else{
                col.innerText = i[e];
            }
            row.appendChild(col);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    
}

function addMessage(){
    let obj = {
        id : Math.floor(Math.random()*100),
        message : message.value,
        time : {
            hours : hours.value,
            minutes : minutes.value,
            seconds : seconds.value
        }
    }
    scheduledMessages.push(obj);

    message.value = '';
    hours.value = '';
    minutes.value = '';
    seconds.value = '';
}

function deleteMsg(msg){
    scheduledMessages.splice(scheduledMessages.indexOf(msg), 1);
    showTable();
}

function startTimer(time, message){
    let milisecs = ((parseInt(time.hours) * 60 * 60 + parseInt(time.minutes) * 60 + parseInt(time.seconds)) * 1000)
    console.log(milisecs);
    timeout = setTimeout(() => {
        alert(message);
        deleteMsg(message);
    }, milisecs);
}



function validateInput(){
    let isValid = 1;

    if(!message.value){
        messageError.classList.remove('hide');
        isValid = 0;
    } else{
        messageError.classList.add('hide');
        isValid = 1;
    }

    if(!hours.value || !minutes.value || !seconds.value){
        timeError.classList.remove('hide');
        isValid = 0;
    } else{
        timeError.classList.add('hide');
        isValid = 1;
    }

    if(isNaN(hours.value) || isNaN(minutes.value) || isNaN(seconds.value)){
        timeNumError.classList.remove('hide');
        isValid = 0;
    } else{
        timeNumError.classList.add('hide');
        isValid = 1;
    }

    return isValid;
}

function openModal(){
    addModal.classList.add('show');
    addModal.style.display = 'block';
}

function closeModal(){
    addModal.classList.remove('show');
    addModal.style.display = 'none';
}

showTable();