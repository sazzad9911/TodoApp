const getTimeFromDate = (date: Date): string => {
    let hours: number = date.getHours();
    let minutes: number | string = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Pad minutes with leading zeros if they are less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${minutes} ${ampm}`;
  };
  
  export default getTimeFromDate;
  