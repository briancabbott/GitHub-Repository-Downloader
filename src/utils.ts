
// File/Folder suffix format for repo downloader
//    - (date-millis-uuid)
// datestr - milliseconds - uuid

export function createFileFolderSuffix(date: Date, uuid: string): string {
    // return "--date(" + createFormattedDateString(date) + ")--millis(" + date.getMilliseconds().toString() + ")--uuid(" + uuid + ")";

    return createFormattedDateString(date) + "--" + uuid;
}

export function createFormattedDateString(date: Date) {
    let dateString = `${padDate(date.getMonth() + 1, 2)}-${padDate(date.getDate(), 2)}-${date.getFullYear()}`;
    return dateString;
}

export function padDate(num, places): string {
    if (num < 10) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;    
    } 
    return num.toString();
}