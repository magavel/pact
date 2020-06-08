import moment from "moment";

export default {
    dateBetween: function(startDate, endDate) {
        console.log('dates ds utils',startDate, endDate)
        let currentDate = startDate;
        let dates = [];
        endDate = new Date(endDate);
        console.log('dates ds utils',startDate, endDate)
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = new Date(currentDate);

            currentDate.setDate(currentDate.getDate()+1)

        }
        return dates;
    },
}
