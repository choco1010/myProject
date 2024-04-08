$(document).ready(function() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

    const updateCalendar = () => {
        // 使用 months 陣列來獲取中文月份，並直接使用 currentYear 作為年份
        $('.monthYear').text(`${months[currentMonth]}${currentYear}年`);
        let daysHtml = '';
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const disableEndDate = new Date(today);
        disableEndDate.setDate(today.getDate() + 2);

        const enableEndDate = new Date(today);
        enableEndDate.setDate(today.getDate() + 30);

        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            daysHtml += '<div class="day disabled"></div>';
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            let current = new Date(currentYear, currentMonth, i);
            let dayClass = ' past-day disabled';
            
            if(current > disableEndDate && current <= enableEndDate){
                dayClass = '';
            }

            daysHtml += `<div class="day${dayClass}">${i}</div>`;
        }

        $('.days').html(daysHtml);

        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        $('.weekdays').html(weekdays.map(day => `<span>${day}</span>`).join(''));
    };

    updateCalendar();

    $('.calendar').on('click', '.day:not(.disabled)', function() {
        $('.day').removeClass('highlight');
        $(this).addClass('highlight');
    });

    $('.calendar').on('click', '.prev-month, .next-month', function() {
        if($(this).hasClass('prev-month')) {
            currentMonth--;
        } else {
            currentMonth++;
        }
        
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
});