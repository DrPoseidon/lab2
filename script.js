const btnCreate = document.querySelector('.btnCreateVertex');
const btnOutMatrix = document.querySelector('.outMatrixs');
const dataEntry = document.querySelector('.dataEntry');
const td = document.querySelectorAll('td');
const tableB = document.querySelector('.tableOfMatrixB');
const vertexValue = document.querySelector('.vertexInput');
const containerForG = document.querySelector('.container_for_G')
const inputOfNum = document.querySelector('.inputOfNumbers')
btnCreate.addEventListener('click', getValue);

function getValue() {
    dataEntry.textContent = ''
    tableB.textContent =''
    const valueOfInput = vertexValue.value;
    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>-</sup>(${i}) </div>
            <input type="text" class="inputOfNumbers">
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';
    btnOutMatrix.addEventListener('click', test);
    btnOutMatrix.addEventListener('click',outMatrixB)
}

function test(){
    btnOutMatrix.style.display = 'none';
    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    let a = [];
    let sumOfArcs;
    for (let t = 0; t < dataOfInputs.length; t++) {
        a[t] = dataOfInputs[t].split(' ');
    }
    for (let el in a) {
        a[el] = a[el].map(parseFloat);
        a[el] = a[el].filter(Number);
    }
    //let a = [[],[0,6,8],[1,5],[1,4,5],[9],[7],[0,7,9],[9],[9],[]];
    //a = [[3],[1,5,7],[],[5,7],[3],[2,4],[3]]
    for(let i = 0; i < a.length; i++){
        for(let j = 0; j < a[i].length; j++){
            a[i][j] -= 1;
        }
    }
    let b = [];
    let c = [];
    t = 0;
    let newArray = a.map(item =>{
        if(item.length == 0){
            c.push(a.indexOf(item));
        }
        
    })
    b.push(c);
    c = []

for(x = 0; x < 20; x++){
for(let i = 0; i < a.length; i++){
    t = 0;
    if(b.flat().length != a.length){
    for(let k = 0; k < a[i].length; k++){
        for(let j = 0; j < b.flat().length; j++){
            if(b.flat().indexOf(i) == -1){
            if(a[i][k] == b.flat()[j]){
                t++;
                if(t == a[i].length){
                    c.push(i)
                }
        }
    }

            }

        }
    }
    else{
        x = 20;
    }
    }
b.push(c);
c = [];
}
b.pop();
tmp = 0;
let per;
dataEntry.innerHTML = ''
for(let i = 0; i < b.length; i++){
    dataEntry.innerHTML += 'Уровень ' + i + ' [';
    for(let j = 0; j < b[i].length; j++){
        per = b[i][j]+1
        tmp1 = tmp +1
        dataEntry.innerHTML +=  ' '+tmp1+ ` <sup>(${per})</sup> `
        tmp++;
    }
    dataEntry.innerHTML += ']<br>'
}
tmp = 0;
for(let i = 0; i < b.length; i++){
    for(let j = 0; j < b[i].length; j++){
        b[i][j] += `|${tmp}`;
        tmp++;
    }
}
tmp = 0;

for(let i = 0; i < a.length; i++){
    for(let j = 0; j < a[i].length; j++){
        for(let k = 0; k < b.length; k++){
            for(let t = 0; t < b[k].length; t++){
                if(b[k][t].slice(0,1) == a[i][j]){
                    a[i][j] = b[k][t];
                }

            }
        }
    }
}
for(let i = 0; i < a.length; i++){
    for(let j = 0; j < a[i].length; j++){
        a[i][j] = a[i][j].slice(-1)
        }
    }
    for (let el in a) {
        a[el] = a[el].map(parseFloat);
    }
    arr = []
    for(let i = 0; i < a.length; i++){
        arr.push([])
    }
    for(let i = 0; i < a.length; i++){
            for(let k = 0; k < b.length; k++){
                for(let t = 0; t < b[k].length; t++){
                    if(b[k][t].slice(0,1) == i){
                        arr[b[k][t].slice(-1)] = a[i]
                    }
    
                }
            }
        }
        for(let i = 0; i < arr.length; i++){
            for(let k = 0; k < arr[i].length; k++){
                    arr[i][k]  = arr[i][k] +1;
                }
        }
        outMatrixB(arr)
}

function outMatrixB(arr) {

    sumOfArcs = [].concat(...arr);
    sumOfArcs = sumOfArcs.filter(Number);
    let lineMas = sumOfArcs.filter(Number);
    sumOfArcs = sumOfArcs.length; 


    let numberOfArcs = [];
    let iteration = 1;
    numberOfArcs = arr.map(el => {
        return el.map(() => {
            return iteration++;
        });
    })
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length + 1; i++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < sumOfArcs + 1; c++) {
            if (i === 0) { 
                const th = document.createElement('th');
                if (c === 0) {
                    th.textContent = ' '; 
                }
                else {
                    th.textContent = c; 
                }
                tr.appendChild(th);
            }
            else { 
                if (c == 0) { 
                    const th = document.createElement('th');
                    th.textContent = i;
                    tr.appendChild(th);
                }
                else {
                    const td = document.createElement('td');
                    td.textContent = 0;
                    if (numberOfArcs[i - 1].indexOf(c) != -1) { 
                        td.textContent = -1;
                    }
                    else if (lineMas[c - 1] == i){
                        td.textContent = 1;
                    }

                    tr.appendChild(td);
                    
                }
            }
        }
        fragment.appendChild(tr); 
    }
    tableB.textContent = '';
    tableB.appendChild(fragment);
}






