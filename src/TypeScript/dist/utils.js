"use strict";
// File/Folder suffix format for repo downloader
//    - (date-millis-uuid)
// datestr - milliseconds - uuid
Object.defineProperty(exports, "__esModule", { value: true });
exports.padDate = exports.createFormattedDateString = exports.createFileFolderSuffix = void 0;
function createFileFolderSuffix(date, uuid) {
    // return "--date(" + createFormattedDateString(date) + ")--millis(" + date.getMilliseconds().toString() + ")--uuid(" + uuid + ")";
    return createFormattedDateString(date) + "--" + uuid;
}
exports.createFileFolderSuffix = createFileFolderSuffix;
function createFormattedDateString(date) {
    let dateString = `${padDate(date.getMonth() + 1, 2)}-${padDate(date.getDate(), 2)}-${date.getFullYear()}`;
    return dateString;
}
exports.createFormattedDateString = createFormattedDateString;
function padDate(num, places) {
    if (num < 10) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    return num.toString();
}
exports.padDate = padDate;
