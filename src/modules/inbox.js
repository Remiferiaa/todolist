import { projList } from "./todo";
import isToday from 'date-fns/isToday'
import parseISO from 'date-fns/parseISO'
import isThisWeek from 'date-fns/isThisWeek'

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '/' + mm + '/' + dd

function isThisToday() {
    projList[1].content = []
    for (let i = 0; i < projList.length; i++) {
        if (i == 1 || i == 2) {
            continue
        }
        for (let j = 0; j < projList[i].content.length; j++) {
            let x = projList[i].content[j];
            if (isToday(parseISO(x.duedate)) === true) {
                projList[1].content.push(x)
            }
        }
    }
}

function isCurrentWeek() {
    projList[2].content = []
    for (let i = 0; i < projList.length; i++) {
        if (i == 1 || i == 2) {
            continue
        }
        for (let j = 0; j < projList[i].content.length; j++) {
            let x = projList[i].content[j];
            if (isThisWeek(parseISO(x.duedate), { weekStartsOn: 1 }) === true) {
                projList[2].content.push(x)
            }
        }
    }
}

export { isThisToday, isCurrentWeek }