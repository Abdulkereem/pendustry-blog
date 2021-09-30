
export const zoned=(time)=>{
  if(!window || !window.luxon || !time) return '';
  // time="2021-09-29 09:16:52.230679";
  const local = luxon.DateTime.local();
  let sq = luxon.DateTime.fromSQL(time);
   const ms = luxon.DateTime.fromISO(sq, {zone: 'Africa/Accra'});
  const rezoned = ms.setZone(local.zoneName);
  console.log({rezoned, 'string': rezoned.toString()});
  return rezoned;  
}

export const sqlTime=(time, format)=>{  
  if(!window || !window.luxon || !time) return ''; 
  return luxon.DateTime.fromSQL(time).toString().toFormat(format);
}


export const toFullMonth=(time)=>{
  if(!window || !window.luxon) return '';  
  let tfm = zoned(time);
  return tfm?tfm.toLocaleString(luxon.DateTime.DATE_FULL):tfm;
}