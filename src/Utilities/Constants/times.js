

export const zoned=(time)=>{
  
  if(!window.luxon || !time) return '';
  const local = luxon.DateTime.local();
  let utc = luxon.DateTime.utc(time);
   const ms = luxon.DateTime.fromISO(utc, {zone: 'Africa/Accra'});
  const rezoned = ms.setZone(local.zoneName);
  return rezoned;  
}

export const sqlTime=(time, format)=>{  
  if(!window.luxon || !time) return ''; 
  return luxon.DateTime.fromSQL(time).toString().toFormat(format);
}


export const toFullMonth=(time)=>{
  if(!window.luxon) return '';  
  return luxon.DateTime.fromISO(zoned(time).toString()).toFormat('DDD');
}