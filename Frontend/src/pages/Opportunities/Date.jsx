import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";

const DateTimeWrapper = styled.div`
  font-size: 1.5rem;
  color: #4a90e2;
  background: #f0f0f0;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const DateTime = () => {
  const [dateTime, setDateTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DateTimeWrapper>
      {dateTime}
    </DateTimeWrapper>
  );
};

export default DateTime;
