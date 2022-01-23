import { Availability, reserved1} from './data.js';




export const isValid = (date) => {

  let x = Availability.length
  let y = Availability[x-1];
  const convert = y.map((convert) => {
    return { startDate :new Date(convert.StartDate),
             endDate: new Date(convert.EndDate)}
  })
   


  const hours = new Date(date).toLocaleTimeString();

  const localeDate = new Date(date).toLocaleDateString();

 
  const checkk = convert.map((reserved) => {

    if(reserved.startDate.toLocaleDateString() === localeDate && localeDate === reserved.endDate.toLocaleDateString()){



      if (hours >= reserved.startDate.toLocaleTimeString()  && hours < reserved.endDate.toLocaleTimeString()  ){
        
        return false;
      }else return true
      
    }else return true
  });



 return checkk.filter((checing) => checing === false).length > 0;



}


export const reserve = (date) => {
  const hours = new Date(date).toLocaleTimeString();
  const localeDate = new Date(date).toLocaleDateString();

  let x = reserved1.length
  let y = reserved1[x-1];
  const convert = y.map((convert) => {
    return { text: convert.text,
             startDate :new Date(convert.StartDate),
             endDate: new Date(convert.EndDate)}
  })


  const checkk = convert.map((reserved) => {
    if(reserved.startDate.toLocaleDateString() === localeDate && reserved.endDate.toLocaleDateString()){
      if (hours >= reserved.startDate.toLocaleTimeString()  && hours < reserved.endDate.toLocaleTimeString()  ){
        return false

      }else return true
      
    }else return true
  });



 return checkk.filter((checing) => checing === false).length > 0;
}



export const isValidAppointment = (component, appointmentData) =>{
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = component.option('cellDuration');
    
    return isValidAppointmentInterval(startDate, endDate, cellDuration);
}

export const isValidAppointmentInterval = (startDate, endDate, cellDuration) => {
    const edgeEndDate = new Date(endDate.getTime() - 1);




    if(isValidAppointmentDate(edgeEndDate) &&  isValidInterval(edgeEndDate)){
      return true;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (!isValidAppointmentDate(date) &&  !isValidInterval(date)) {
        return true;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return false;
}


export const isValidAppointmentDate = (date) => {
  
    
    
    return !isValid(date) 
  }

export const isValidInterval = (date) => {
    return !reserve(date);
  }






