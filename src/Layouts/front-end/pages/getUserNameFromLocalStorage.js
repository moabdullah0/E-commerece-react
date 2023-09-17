export function getUserNameFromLocalStorage() {

    let userName = '';
    if (localStorage.getItem('user-info') !== null) {
      const storedData = localStorage.getItem('user-info');
      const parsedData = JSON.parse(storedData);
  
      // Check if 'name' exists in the parsedData object
      if (parsedData && parsedData && parsedData.name ) {
        userName = parsedData.name;
        console.warn(userName); // Make sure you see the correct name in the console
      }
      else  if (parsedData && parsedData["0"] && parsedData["0"].name) {
        userName = parsedData["0"].name;
       ;
        
      }
    }
    return userName;
}