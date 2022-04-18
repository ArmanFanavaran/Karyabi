var moment = require("moment-jalaali");

// export function datepickerToServer(date) {
//     let converted = moment(date, 'YYYY/MM/DD').format('YYYY-MM-DD');
//     return converted;
// }
//
// export function serverTimeToDatepickerWithoutTime(time) {
//     let shamsi = moment(time, 'YYYY-MM-DD HH:mm:ss').format('jYYYY-jMM-jDD')
//     return shamsi;
// }

// export function serverTimeToDatepickerWithTime(time) {
//     let shamsi = moment(time, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
//     return shamsi;
// }

// export function serverTimeToNewsDate(time) {
//     let shamsi = moment(time, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jMM/jDD HH:mm')
//     return shamsi;
// }
//
// export function datepickerToStandardMildaiDateForServer(date) {
//     date = date.slice(0, -3);
//     let converted = moment(date, 'YYYY/MM/DD').format('YYYY-MM-DD');
//     return converted;
// }

// export function ConvertToJalali(date) {
//     // console.log(date)
//     let shamsi = moment(date, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
//     // console.log(shamsi + "sss")
//     return shamsi
//
// }

// export function getNowDatePicker() {
//     let day = new Date().getDate();
//     let month = new Date().getMonth() + 1;
//     let year = new Date().getFullYear();
//     let time = year + "-" + month + "-" + day;
//     let shamsi = moment(time, 'YYYY-MM-DD').format('jYYYY-jMM-jDD')
//     return shamsi;
// }

// export function yearToServer(year) {
//     let converted = moment(year, 'YYYY').format('YYYY-MM-DD');
//     return converted;
// }

// export function serverTimeToJalaliOnlyYear(time) {
//     let shamsi = moment(time, 'YYYY-MM-DD HH:mm:ss').format('jYYYY')
//     return shamsi;
// }

// export function nowYear() {
//     let year = new Date().getFullYear();
//     let shamsi = moment(year, 'YYYY').format('jYYYY')
//     return shamsi;
// }

// export function JYearToServer(year) {
//     let converted = moment(year, 'jYYYY').format('YYYY');
//     return converted;
// }

export function convertToMiladi(date){
    let converted = moment('1396/7/6', 'jYYYY/jM/jD').format('YYYY-MM-DD');

    return converted
}