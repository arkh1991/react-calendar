import styled from "styled-components";
import ArrowLeftIcon from "../assets/arrow-left.png";
import PropTypes from "prop-types";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const JustifyCenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;


export const CalendarWrapper = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 15px;
`;

export const CalendarWeekWrapper = styled.tr`
  justify-content: center;
`;

export const CalendarDayWrapper = styled.td`
  justify-content: center;
  border-collapse: collapse;
  width: 14.3%;
`;

export const CalendarBaseDayOfWeekNameWrapper = styled(JustifyCenterContainer)`
  flex: 1;
  margin: 3px;
  font-family: roboto;
  font-size: 12px;
  cursor: pointer;
`;

export const SmallCalendarDayWrapper = styled(JustifyCenterContainer)`
  height: 20px;
  width: 20px;
  align-items: center;
  ${props =>
    props.isPast &&
    `
    opacity:0.7;
    `} ${props =>
    props.isToday &&
    `
    opacity:1;
    font-weight:600;
 `};
 
`;
SmallCalendarDayWrapper.propTypes = {
    isPast: PropTypes.bool,
    isToday: PropTypes.bool
};

SmallCalendarDayWrapper.defaultProps = {
    isPast: false,
    isToday: false
};

export const CalendarDataWrapper = styled.table`
  width: 100%;
`;

export const CalendarDaysWrapper = styled.div`
  padding: 15px;
`;

export const CalendarHeaderText = styled.span`
  font-size: 28px;
`;

export const CalendarHeaderContainer = styled(JustifyCenterContainer)`
  padding: 10px;
  height: 45px;
  align-items: center;
`;

export const CalendarHeaderWrapper = styled.div`
  width: 100%;
`;

export const CalendarSwitchMonthWrapper = styled.div`
  width: 100%;
`;

export const CalendarDaysInnerWrapper = styled.tbody``;

export const CalendarSwitchMonthContainer = styled(RowContainer)`
  padding: 10px;
  height: 35px;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f7fc;
`;

export const SmallIconLeftArrow = styled.div`
  background: url(${ArrowLeftIcon}) no-repeat;
  height: 11px;
  width: 6px;
  cursor: pointer;
  background-size: contain;
`;

export const SmallIconRightArrow = styled(SmallIconLeftArrow)`
  transform: rotate(-180deg);
`;

export const SmallCalendarSwitchMonthTextContainer = styled(ColumnContainer)`
  align-items: center;
  font-family: roboto;
`;

export const SmallCalendarSwitchMonthTextMonth = styled(ColumnContainer)`
  align-items: center;
  text-transform: uppercase;
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
`;

export const SmallCalendarSwitchMonthTextYear = styled(ColumnContainer)`
  align-items: center;
  font-size: 10px;
  line-height: 11px;
  color: #b8b8b8;
`;

