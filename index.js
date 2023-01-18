// Your code here
function createEmployeeRecord(employee){
    return{
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(employees){
    return employees.map(employee => createEmployeeRecord(employee))
}
function createTimeInEvent(employeeRecord, dateStamp){
     let [date, hour] = dateStamp.split(" ")
     let  eventObj = {
         type: "TimeIn",
         hour: parseInt(hour, 10),
         date
     }
    employeeRecord.timeInEvents.push(eventObj)
    return employeeRecord
}
function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    let  eventObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    }
   employeeRecord.timeOutEvents.push(eventObj)
   return employeeRecord
}
function hoursWorkedOnDate(employeeRecord, date){
    let hours;
    
    for (let i=0; i<employeeRecord.timeInEvents.length; i++){
        if (employeeRecord.timeInEvents[i].date === date){
            if (employeeRecord.timeOutEvents[i].date === date){
                hours = employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour
            }
        }
    }

    return hours/100
}
function wagesEarnedOnDate(employeeRecord, date){
    return (hoursWorkedOnDate(employeeRecord, date)) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    let allPay = [];
    let allDates = [];

    for (let i = 0; i < employeeRecord.timeInEvents.length; i++){
        allDates.push(employeeRecord.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(employeeRecord, date))
    });

    return allPay.reduce(( previousValue, currentValue ) => previousValue + currentValue)
}

function calculatePayroll(arrOfEmployeeRecord){
    let payroll = [];

    arrOfEmployeeRecord.forEach(employee => {
        payroll.push(allWagesFor(employee)) 
    });

    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}
