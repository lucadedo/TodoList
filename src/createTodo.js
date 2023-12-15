// import {render} from './index'

const displayTask = require('./index')

function newProj() {
        const localData = localStorage.getItem('Work') ? JSON.parse(localStorage.getItem('Work')) : [{title: "Get a job", date: "2023-12-13"},{title: "freelance jobs search", date: "2023-12-12"}];
        localStorage.setItem("Work", JSON.stringify(localData));
        console.log("Work " ,localData);
        reRender(localData);
}

function reRender(localData) {
    for (let i = 0; i < localData.length; i++) {
        displayTask(localData[i]); 
    }
}


