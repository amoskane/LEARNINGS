//It should
// return true if the meeting falls entirely within the work day (according to the times specified in dayStart and dayEnd);
// return false if the meeting violates the work day bounds.

const dayStart = '07:30';
const dayEnd = '17:45';

function scheduleMeeting(startTime, durationMinutes) {
  // ..TODO..

  const convertInput = (input) => {
    const dsh = input.split(':')[0];
    const ddsh = dsh.length === 1 ? `0${dsh}` : `${dsh}`;
    const dsm = input.split(':')[1];
    return ddsh + '.' + dsm;
  };

  const ds = convertInput(dayStart);
  const de = convertInput(dayEnd);
  const st = convertInput(startTime);

  //console.log(ds);
  //console.log(st);

  const isItTooLong = (st, durationMinutes) => {
    const stArr = st.split('.');
    const newMins = parseInt(stArr[1], 10) + parseInt(durationMinutes, 10);
    //console.log(newMins);

    if (newMins < 60) {
      const et = stArr[0] + newMins;
      if (et > de) {
        console.log('pass ' + et);
      } else {
        console.log('not, ends after day ends');
      }
    } else if (newMins === 60) {
      const newHour = parseInt(stArr[0], 10) + 1;
      const newEt = newHour + 00;
      if (newEt < de) {
        console.log('pass ' + newEt);
      } else {
        console.log(
          'not, ends after day ends, after adding 60minutes to hours'
        );
      }
    } else if (newMins === 90) {
      const newHourr = parseInt(stArr[0], 10) + 1;
      const newEtt = newHourr.toString() + 30;
      //console.log(newHourr);

      if (newEtt < de) {
        console.log('pass ' + newEtt);
      } else {
        console.log(
          'not, ends after day ends, after adding 90 minutes to hours' + newEtt
        );
      }
    }
  };

  if (st >= ds) {
    //console.log('starts after beginning');
    if (st < de) {
      //console.log('starts before end');
      //console.log('pass ' + st);
      isItTooLong(st, durationMinutes);
    } else {
      console.log('not, starts after day end');
    }
  } else {
    console.log('not, starts too early');
  }
}

scheduleMeeting('7:00', 15); // false
scheduleMeeting('07:15', 30); // false
scheduleMeeting('7:30', 30); // true
scheduleMeeting('11:30', 60); // true
scheduleMeeting('17:00', 45); // true
scheduleMeeting('17:30', 30); // false
scheduleMeeting('18:00', 15); // false
