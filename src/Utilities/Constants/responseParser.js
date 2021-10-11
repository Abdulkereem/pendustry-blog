
export const parseError=(err)=>{
  console.log({err});
  if(err && err.response && err.response.data && err.response.data.message) return err.response.data.message;
  return 'Oops! Something went wrong.';
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
   let au= JSON.parse(atob(atob(localStorage.UTK)));
   return au;
  } catch (error) {
    return window.location.replace('/account/login');
  }
}


export const hToken=()=>{
  if(!window) return null;
  let tk = getTk();
  if(!tk) return window.location.replace('/account/login');
  return {
    Authorization: `Bearer ${tk}`
  }
}