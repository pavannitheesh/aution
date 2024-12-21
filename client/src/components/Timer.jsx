import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { timeConverter } from '../utils/timeConverter';

const Timer = ({endTime}) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

useEffect(() => {
   if (endTime) {
       const end = moment(endTime)
       const interval = setInterval(() => {
         const now = moment();
        const difference = end.diff(now);

          if (difference <= 0) {
          clearInterval(interval);
          setTimeRemaining('Auction Ended');
           } else {
             setTimeRemaining(timeConverter(difference));
           }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [endTime]);

  return (
     <div className="text-gray-700">
      {timeRemaining && <span>{timeRemaining}</span>}
     </div>
  );
};

export default Timer;