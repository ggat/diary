export function dayToDateTimeObj(day) {
    const ts = day * 24 * 60 * 60 * 1000;
    return new Date(ts);
}

export function toDateString(d) {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let month = "" + monthNames[d.getMonth()];
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${month} ${day}, ${year}`;
}
