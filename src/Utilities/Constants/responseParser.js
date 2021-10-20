import { dp_url, banner_url } from './../API/endpoints.js';
export const parseError=(err)=>{
  let res =  err?.response?.data?.message ||  'Oops! Something went wrong.';
  return res;
  // try {
  //   let {response:{data:{message}}} = err;
  //   return message;
  // } catch (error) {
  //   return 'Oops! Something went wrong.';    
  // }
  // if(err && err.response && err.response.data && err.response.data.message) return err.response.data.message;
}

/** User token saver */
export const saveTK=(tk)=>{
  if(!tk || !window) return;
  try {
    localStorage.UTK= JSON.stringify(tk);
  } catch (error) {
    return;
  }
}

export const getTk=()=>{
  if(!window) return null;
  try {
    if(!localStorage.UTK) return null;
   let tk= atob(atob(JSON.parse(localStorage.UTK)));
   return tk;
  } catch (error) {
    return null;
  }
}

export const saveAU=(au)=>{
  if(!au|| !window) return;
  try {
    localStorage.AU= btoa(btoa(JSON.stringify(au)));
  } catch (error) {
    return;
  }
};

export const getAU=()=>{
  if(!window) return null;
  try {
    if(!localStorage.AU) return window.location.replace('/account/login');;
   let au= JSON.parse(atob(atob(localStorage.AU)));
   return au;
  } catch (error) {
    // console.log({error});
    return window.location.replace('/account/login');
  }
}
/** Concatenates article banner  file url to file name from db */
export const bannerPic=(data)=>{
  return `${banner_url}${data}`;
}

/** Concatenates user profile pictyre file url to file name from db */
export const dpPic=(data)=>{
  return `${dp_url}${data}`;
}

/** Parse out authorization toking from local storage */
export const hToken=()=>{
  if(!window) return null;
  let tk = getTk();
  if(!tk) return window.location.replace('/account/login');
  return {
    Authorization: `Bearer ${tk}`
  }
}


/**Calculates the read time of an article from word length added to description of an article */
export const readtime=(data)=>{
  if(!data) return '';
  data = data.match(/\[\[\d*\]\]/);
  if (!data) return '';
  data=data.toString();
  data= data.slice(2, data.length-2);
  let time = Number(data);
  if(isNaN(time)) return '';
  let _time = Math.round(time/200);
  if(_time) return _time + ' min read';
  // console.log(Math.round(((time/200)-0)*60));
  return Math.round(((time/200)-0)*60) +' sec read';
};

export const parseSearch=(str="")=>{
  return str.toString().trim().toLowerCase();
}


/** Add the  world readTime to description to get read time during renduring */
export const parseReadTime=(data, readTime)=>{
  data = data.replace(/\[\[\d*\]\]/g, "");
  return data + `[[${readTime}]]`
}

/** Remove readtime added to description of an articles */
export const removedReadTime=(data)=>{
  return data.replace(/\[\[\d*\]\]/g, "");
}

export const computeErrorpage=(err, goto)=>{
  try {
    let {response:{status}} = err;
    status = Number(status);
    if(isNaN(status)) return;
    const routes = ['internal-serve-error', 'page-not-found', 'page-not-found', 'unauthorized'];
    let index = [500,404,400,401].indexOf(status);
    if(index < 0) return;
    return goto('/'+routes[index]);
  } catch (error) {
    return;
  }
}