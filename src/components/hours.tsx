import * as React from "react";
import Modal from "react-modal";
import Holidayhour from "../components/Holidayhour";
type Hours = {
  title?: string;
  hours: Week;
  deliveryHours: any;
  children?: React.ReactNode;
  timezone?: any;
};
var today:any = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
// document.write(today);
interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

const todayIndex = new Date().getDay();

function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }

  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}

const renderHours = (week: Week, deliveryHours: any) => {
  const dayDom: JSX.Element[] = [];

  let sortDeliveryHours = sortByDay(deliveryHours);

  for (let [k, v, i = 0] of Object.entries(sortByDay(week))) {
    i++;
    let delTime: any = "";
    let delk: any = "";
    for (let [dk, dv] of Object.entries(sortDeliveryHours)) {
      if (dk == k) {
        delTime = dv;
        delk = dk;
      }
    }

    dayDom.push(
      <DayRow
        key={k}
        dayName={k}
        day={v}
        isToday={isDayToday(k)}
        delKey={delk}
        delDayName={delk}
        delDay={delTime}
        delIsToday={isDayToday(delk)}
      />
    );
  }

  return <>{dayDom}</>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

function convertTo12HourFormat(time: string, includeMeridiem: boolean): string {
  const timeParts = time.split(":");
  let hour: any = Number(timeParts[0]);
  const minutesString = timeParts[1];

  const meridiem = hour < 12 || hour === 24 ? "" : ""; // Set AM/PM
  hour = hour % 24 || 24; // Adjust hours

  if (hour == 24) {
    hour = "00";
    return (
      hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
    );
  }

  if (hour < 10) {
    hour = "0" + hour;
    return (
      hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
    );
  } else {
    return (
      hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
    );
  }
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  delKey: string;
  delDayName: string;
  delDay: Day;
  delIsToday?: boolean;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, delKey, delDayName, delDay, delIsToday } =
    props;

  let both = false;
  if (day && day.isClosed) {
    if (delDay && delDay.isClosed) {
      both = true;
    }
  }

  return (
    
    <div className={`${isToday ? "currentDay" : ""} time-row`}>
      <div className="capitalize day">{dayName}</div>
      {day && !day.isClosed ? (
        <>
          {day && !day.isClosed && day.openIntervals.length > 1 ? (
            <>
              <div className="store-time">
              <span className="mr-2" >{convertTo12HourFormat(day.openIntervals[0].start, true)} </span>{" "}
                {convertTo12HourFormat(day.openIntervals[0].end, true)}
                <span className="ml-2">|</span>
                {convertTo12HourFormat(day.openIntervals[1].start, true)} -{" "}
                {convertTo12HourFormat(day.openIntervals[1].end, true)}
              </div>
            </>
          ) : (
            <>
              <>
                <div className="store-time">
                  {convertTo12HourFormat(day.openIntervals[0].start, true)} -{" "}
                  {convertTo12HourFormat(day.openIntervals[0].end, true)}
                </div>
              </>
            </>
          )}
        </>
      ) : // <>
      //   <div className="store-time">
      //     {convertTo12HourFormat(day.openIntervals[0].start, true)} -{" "}
      //     {convertTo12HourFormat(day.openIntervals[0].end, true)}
      //   </div>
      // </>
      !both ? (
        <div className="store-time closed">
          <span>Closed</span>
        </div>
      ) : (
        ""
      )}

      {delDay && !delDay.isClosed ? (
        <>
          <div className="store-time">
            {convertTo12HourFormat(delDay.openIntervals[0].start, true)} -{" "}
            {convertTo12HourFormat(delDay.openIntervals[0].end, true)}
          </div>
        </>
      ) : (
        <>
          {Object.keys(delDay).length > 0 ? (
            !both ? (
              <div className="store-time closed">
                <span>Closed</span>
              </div>
            ) : (
              ""
            )
          ) : (
            <></>
          )}
        </>
      )}

      {both ? (
        <div className="store-time closed both-closed">
          <span>Closed</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const Hours = (props: Hours) => {
  console.log(props, "props");
  // const { hours, deliveryHours } = props;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  }

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }
  function handleCloseModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <div className="box store-timing">
        {props.hours && props.hours.reopenDate ? (
          <>
            <h2> The Store will reopen at {props.hours.reopenDate}</h2>
          </>
        ) : (
          <>
            <div className="inner-box">
              <div className="flex justify-between">
                <h2 className="text-[1.375rem] "> Store Timing</h2>
                {props.hours && props.hours.holidayHours ? (
                  <>
                  {props.hours.holidayHours >= today && <button
                      className="current-location underline hide-mob font-bold "
                      onClick={openModal}
                    >
                      {" "}
                      Holiday Hours{" "}
                    </button>}
                    
                  </>
                ) : (
                  <></>
                )}
              </div>
              {props.hours && props.hours.holidayHours ? (
                <>
                  <Modal
                    onRequestClose={handleCloseModal}
                    shouldCloseOnOverlayClick={false}
                    isOpen={modalIsOpen}
                    style={customStyles}
                  >
                    <a
                      onClick={closeModal}
                      type="button"
                      id="closeButton"
                      data-modal-toggle="allergens-pdf"
                      className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.953"
                        height="20.953"
                        viewBox="0 0 20.953 20.953"
                      >
                        <path
                          id="Icon_ionic-md-close"
                          data-name="Icon ionic-md-close"
                          d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                          transform="translate(-7.523 -7.523)"
                          fill="#B1B1B1"
                        />
                      </svg>
                    </a>

                    <span className="text-xl font-extrabold">
                      Holiday Hours Calendar
                    </span>
                    <div className="pop-up-holyhrs">
                      <div>Date</div>

                      <div>Day</div>
                      <div> Delivery Hours</div>
                    </div>
                    {props.hours.holidayHours && (
                      <Holidayhour hours={props.hours.holidayHours} />
                    )}
                  </Modal>
                </>
              ) : (
                <></>
              )}

              <div className="hours">
                <div className="time-row">
                  <div className="day"></div>
                  <div className="store-time">In-Store</div>
                  {props.deliveryHours ? (
                    <>
                      {" "}
                      {Object.keys(props.deliveryHours).length > 0 ? (
                        <div className="delivery-time">Pick-Up Hours</div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {renderHours(props.hours, props.deliveryHours)}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Hours;