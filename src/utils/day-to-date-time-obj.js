export function dayToDateTimeObj(day) {
    const ts = day * 24 * 60 * 60 * 1000;
    return new Date(ts);
}

export function toDateString(d) {
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join(".");
}
