/* Your Code Here */
function createEmployeeRecord(testEmployee){
    let employeeObject = {}
    for(let item of testEmployee )
    {
        employeeObject["firstName"] = testEmployee[0]
        employeeObject["familyName"]  = testEmployee[1]
        employeeObject["title"] = testEmployee[2]
        employeeObject["payPerHour"] = testEmployee[3]
    }
    employeeObject["timeInEvents"] = [ ]
    employeeObject["timeOutEvents"] = [ ]
return employeeObject
}
function createEmployeeRecords(myArray){
    let arrayReturned = []
    myArray.forEach(element => {
            arrayReturned.push(createEmployeeRecord(element))    
    });
 return arrayReturned       
}

function createTimeInEvent(eRecordWithoutTimeIn,dateStamp = "YYYY-MM-DD HHMM"){
    let[thisDay, thisTime] = dateStamp.split(" ")
    eRecordWithoutTimeIn.timeInEvents.push({
    type : "TimeIn",
    hour : parseInt(thisTime),
    date :  thisDay
})
 return  eRecordWithoutTimeIn
}
function createTimeOutEvent(eRecordWithoutTimeOut,dateStamp = "YYYY-MM-DD HHMM"){
    let [thisDay, thisTime] = dateStamp.split(" ")
    eRecordWithoutTimeOut.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(thisTime),
        date : thisDay
    })

return eRecordWithoutTimeOut
}
function hoursWorkedOnDate(employeeRecord, dateWorked){
let employeeTimeInEvent = employeeRecord.timeInEvents.find( (employeeRecord) =>{return employeeRecord.date === dateWorked})
let employeeTimeOutEvent = employeeRecord.timeOutEvents.find((employeeRecord)=>{return employeeRecord.date === dateWorked})
return (employeeTimeOutEvent.hour - employeeTimeInEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, dateWorked){
    let earnedWages = hoursWorkedOnDate(employeeRecord, dateWorked) * employeeRecord.payPerHour
    return parseFloat(earnedWages.toString())
}

function allWagesFor(employeeRecord){
    let DatesPaid = employeeRecord.timeInEvents.map((employeeRecord)=>{return employeeRecord.date})
    let pay = DatesPaid.reduce((data, date)=>{return data + wagesEarnedOnDate(employeeRecord,date)}, 0)
return pay
}
function calculatePayroll(arrayOfEmployeeRecords){return arrayOfEmployeeRecords.reduce((data, record)=>{
        return data + allWagesFor(record)}, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

