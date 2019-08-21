import React, {useState, useEffect} from "react";
import moment from "moment";
import PropTypes from "prop-types";
import {
    CalendarBaseDayOfWeekNameWrapper,
    CalendarDataWrapper,
    CalendarDaysInnerWrapper,
    CalendarDaysWrapper,
    CalendarDayWrapper,
    CalendarHeaderContainer,
    CalendarHeaderText,
    CalendarHeaderWrapper,
    CalendarSwitchMonthContainer,
    CalendarSwitchMonthWrapper,
    CalendarWeekWrapper,
    CalendarWrapper,
    SmallCalendarDayWrapper,
    SmallCalendarSwitchMonthTextContainer,
    SmallCalendarSwitchMonthTextMonth,
    SmallCalendarSwitchMonthTextYear,
    SmallIconLeftArrow,
    SmallIconRightArrow
} from "./controls";

const WEEK_LENGTH = 7;
const shortDaysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Get next week (7 days) from start date.
 * @param date - start date.
 * @returns {Array} - array of days.
 */
const getNextWeek = (date) => {

    let currentDate = moment(date);
    let res = [];

    for (let weekDayNum = 0; weekDayNum < WEEK_LENGTH; weekDayNum += 1) {
        res.push({date: moment(currentDate)});
        currentDate = currentDate.add(1, "days");
    }

    return res;
};

/**
 * Get weeks of months. First and last weeks may include days from previous and next months.
 * @param date - start date.
 * @returns {Array} - array of weeks.
 */
const getCalendarDaysForMonth = date => {

    const firstDayOfMonthInWeekNum = +date.format("e");
    const weeksOfMonth = [];
    let firstDayOfWeek = moment(date).add(-1 * firstDayOfMonthInWeekNum, "days");
    let isFirstWeek = true;

    while (isFirstWeek || firstDayOfWeek.get("months") === date.get("months")) {
        weeksOfMonth.push(getNextWeek(firstDayOfWeek));
        firstDayOfWeek.add(7,"days");
        isFirstWeek = false;
    }

    return weeksOfMonth;
};
const UniversalCalendar = (props) => {

    const [currMonth, setCurrMonth] = useState(props.initDate);
    const [days, setDays] = useState([]);

    // only once
    useEffect(() => {
        const monthStartMoment = moment(moment().date(1));
        setCurrMonth(monthStartMoment);
        setDays(getCalendarDaysForMonth(monthStartMoment))
    }, []);


    const handleSwipeMonth = direction => {
        currMonth.add(direction, "months");
        setCurrMonth(currMonth);
        setDays(getCalendarDaysForMonth(currMonth));
    };

    return (
        <CalendarWrapper>
            <CalendarHeaderWrapper>
                {props.renderHeader(currMonth)}
            </CalendarHeaderWrapper>
            <CalendarSwitchMonthWrapper>
                {props.renderSwitchMonth(
                    currMonth,
                    () => handleSwipeMonth(-1),
                    () => handleSwipeMonth(1)
                )}
            </CalendarSwitchMonthWrapper>
            <CalendarDaysWrapper
                style={props.dateAreaStyle}>
                <CalendarDataWrapper>
                    <CalendarDaysInnerWrapper>
                        <CalendarWeekWrapper>
                            {Array.from(Array(WEEK_LENGTH), (x, index) => index).map((idx, val) => (
                                <CalendarDayWrapper key={`hd-${Math.random()}`}>
                                    {props.renderDayOfWeekName(idx)}
                                </CalendarDayWrapper>
                            ))}
                        </CalendarWeekWrapper>
                        {days && days.map(week => (
                            <CalendarWeekWrapper key={`week-${Math.random()}`}>
                                {week.map(day => (
                                    <CalendarDayWrapper
                                        style={props.cellStyle}
                                        key={`day-${Math.random()}`}>
                                        {props.renderDate(day.date, currMonth)}
                                    </CalendarDayWrapper>
                                ))}
                            </CalendarWeekWrapper>
                        ))}
                    </CalendarDaysInnerWrapper>
                </CalendarDataWrapper>
            </CalendarDaysWrapper>
        </CalendarWrapper>
    );

}

UniversalCalendar.propTypes = {
    initDate: PropTypes.instanceOf(moment),
    renderHeader: PropTypes.func,
    renderSwitchMonth: PropTypes.func,
    dateAreaStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
    renderDayOfWeekName: PropTypes.func,
    cellStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
    renderDate: PropTypes.func
};

UniversalCalendar.defaultProps = {
    initDate: moment(),
    renderHeader: () =>
        <CalendarHeaderContainer>
            <CalendarHeaderText>Calendar</CalendarHeaderText>
        </CalendarHeaderContainer>,
    renderSwitchMonth: (date, swipeLeft, swipeRight) => <CalendarSwitchMonthContainer>
        <SmallIconLeftArrow
            onClick={() => {
                swipeLeft();
            }}
        />
        <SmallCalendarSwitchMonthTextContainer>
            <SmallCalendarSwitchMonthTextMonth>
                {date.format("MMMM")}
            </SmallCalendarSwitchMonthTextMonth>
            <SmallCalendarSwitchMonthTextYear>
                {date.format("YYYY")}
            </SmallCalendarSwitchMonthTextYear>
        </SmallCalendarSwitchMonthTextContainer>
        <SmallIconRightArrow
            onClick={() => {
                swipeRight();
            }}
        />
    </CalendarSwitchMonthContainer>,
    dateAreaStyle: {},
    renderDayOfWeekName: dayOfWeekNum => (
        <CalendarBaseDayOfWeekNameWrapper>
            {shortDaysOfWeek[dayOfWeekNum]}
        </CalendarBaseDayOfWeekNameWrapper>
    ),
    cellStyle: {},
    renderDate: (date, currMonth) => (
        <CalendarBaseDayOfWeekNameWrapper>
            <SmallCalendarDayWrapper
                isPast={date.get("months") === currMonth.get("months") && date.isBefore(moment())}
                isToday={date && date.format("D.MM.yyyy") === moment().format("D.MM.yyyy")}>
                {date.get("months") === currMonth.get("months") && date.format("D")}
            </SmallCalendarDayWrapper>
        </CalendarBaseDayOfWeekNameWrapper>
    )
};
export default UniversalCalendar;
