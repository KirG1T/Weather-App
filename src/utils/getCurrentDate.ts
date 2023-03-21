const getCurrentDate = () => {
    const currentDate = new Date();

    const getCurDayNum = () => {
        return currentDate.getDate();
    };

    const getCurDayName = () => {
        return currentDate.toLocaleString('en-US', {
            weekday: 'long',
        });
    };

    const getDayName = (data: string, characters?: number) => {
        const date = new Date(data);
        const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const dayName = daysOfWeek[date.getDay()].slice(0, characters);
        return dayName;
    };

    const getCurMonthName = () => {
        return currentDate
            .toLocaleString('en-US', {
                month: 'long',
            })
            .slice(0, 3);
    };

    const getCurYearName = () => {
        return currentDate.toLocaleString('en-US', {
            year: 'numeric',
        });
    };

    return {
        currentDate,
        getDayName,
        getCurDayNum,
        getCurDayName,
        getCurMonthName,
        getCurYearName,
    };
};

export default getCurrentDate;
