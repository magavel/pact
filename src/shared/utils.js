export default {
    dateBetween(startDate, endDate) {
        let currentDate = startDate;
        let dates = [];
        endDate = new Date(endDate);
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = new Date(currentDate);
            currentDate.setDate(currentDate.getDate()+1)
        }
        return dates;
    },
}
