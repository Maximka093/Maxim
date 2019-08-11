'use strict';   // ES6

let startBtn = document.querySelector('#start'),

    resultBudget = document.getElementsByClassName('budget-value')[0],   // Доход       
    resultDayBudget = document.getElementsByClassName('daybudget-value')[0],    // Бюджет на 1 день
    resultLevel = document.getElementsByClassName('level-value')[0],            // Уровень дохода
    resultExpenses = document.getElementsByClassName('expenses-value')[0],      // Обязательные расходы
    resultOptional = document.getElementsByClassName('optionalexpenses-value')[0], // Возможные траты
    resultIncome = document.getElementsByClassName('income-value')[0],          // Дополнительный доход
    resultMonth = document.getElementsByClassName('monthsavings-value')[0], // Накопления за 1 месяц
    resultYear = document.getElementsByClassName('yearsavings-value')[0],   // Накопления за 1 год 

    inputExpItem = document.getElementsByClassName('expenses-item'), // Введите обязательные расходы

    btnExp = document.getElementsByTagName('button')[0],     // Утвердить обязательные расходы   
    btnOpt = document.getElementsByTagName('button')[1],     // Утвердить необязательные расходы   
    btnCount = document.getElementsByTagName('button')[2],   // Расчет дневного бюджета   

    optExpensItem = document.querySelectorAll('.optionalexpenses-item'), // Введите необязательные расходы

    inpChooseIncome = document.querySelector('.choose-income'), // Введите статьи возможного дохода через запятую

    checkBoxSave = document.querySelector('#savings'),            // Есть ли накопления
    inpChooseSum = document.querySelector('.choose-sum'),        // Сумма
    inpChoosePercent = document.querySelector('.choose-percent'), // Процент

    inpYearVal = document.querySelector('.year-value'),           // Год  
    inpMonthVal = document.querySelector('.month-value'),         // Месяц  
    inpDayVal = document.querySelector('.day-value');             // День



let money, time;

startBtn.addEventListener('click', function() {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while (money == null || money == '' || isNaN(money)) {  // Пока что то не произошло мы задалбаем этим вопросои
           money = +prompt('Ваш бюджет на месяц?', '');     // isNaN() возвращает true когда попадают не цифры 
    }
    appData.budget = money;
    appData.timeData = time;
    resultBudget.textContent = money.toFixed();  // Доход
    // У Объекта Date есть метод parse()
    inpYearVal.value = new Date(Date.parse(time)).getFullYear(); //Получаем год
    inpMonthVal.value = new Date(Date.parse(time)).getMonth() + 1;   //Получаем месяц с нуля
    inpDayVal.value = new Date(Date.parse(time)).getDate(); //Получаем день
    
});
    
btnExp.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < inputExpItem.length; i++) {
        console.log('ok');
        let a = inputExpItem[i].value,
            b = inputExpItem[++i].value;    

        if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;      // Все b складываються      
        } else {            
            i--;
        }
    } 
    resultExpenses.textContent = sum;
});

btnOpt.addEventListener('click', function() {
    for (let i = 0; i < optExpensItem.length; i++) {
        let opt = optExpensItem[i].value;        
        appData.optionalExpenses[i] = opt;
        resultOptional.textContent += appData.optionalExpenses[i] + ', ';  
    }
});

btnCount.addEventListener('click', function() {

    if (appData.budget != undefined) {

        appData.moneyPerDay = (appData.budget / 30).toFixed(1);
        resultDayBudget.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
                resultLevel.textContent ='минимальный доход! ' ;
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                resultLevel.textContent = 'Средний доход! ' ;
            } else if (appData.moneyPerDay > 2000) {
                resultLevel.textContent = 'Приличный доход! ' ;
            } else {
                resultLevel.textContent = 'Произошла ошибка';
            }
    } else {
        resultDayBudget.textContent = 'Произошла ошибка';
    }           
});

inpChooseIncome.addEventListener('input', function() {
    let items = inpChooseIncome.value;    
    appData.income = items.split(', ');
    resultIncome.textContent = appData.income;    
});

checkBoxSave.addEventListener('click', function() {    
    if (appData.saving == true ) {
        console.log(appData.saving);
        appData.saving = false;        
        console.log(appData.saving);
    } else {
        appData.saving = true;
        console.log(appData.saving);
         
    }      
});

inpChooseSum.addEventListener('input', function() {
    if (appData.saving == true) {
        let sum = +inpChooseSum.value,
            percent = +inpChoosePercent.value;

            appData.monthIncome = sum/100/12*percent;
            appData.YearIncome = sum/100*percent;
            resultMonth.textContent = appData.monthIncome.toFixed(1);
            resultYear.textContent = appData.YearIncome.toFixed(1);
    }     
});

inpChoosePercent.addEventListener('input', function() {
    if (appData.saving == true) {
        let sum = +inpChooseSum.value,
            percent = +inpChoosePercent.value;

            appData.monthIncome = sum/100/12*percent;
            appData.YearIncome = sum/100*percent;
            resultMonth.textContent = appData.monthIncome.toFixed(1);
            resultYear.textContent = appData.YearIncome.toFixed(1);
    }
});

let appData = {
        budget: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: '',
        saving: false,
        
}




    

