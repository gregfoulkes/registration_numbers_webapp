module.exports = function(storage) {

  var regMap = {};

  if (storage) {
    for (var i = 0; i < storage.length; i++) {
      var regNumber = storage[i];
      regMap[regNumber] = 0
    }
  }

  function addRegistrationNumbers(reg) {

    var regList = ['CA ', 'CY ', 'CL ', 'CAW ']

    if (reg != '') {
      if (regMap[reg] === undefined) {
        for (var i = 0; i < regList.length; i++) {
          if (reg.startsWith(regList[i])) {

            regMap[reg] = 0;
            return true;
          }
        }
      }
      return false;
    }
  }

  function filterRegBy(town) {

    var regNumbers = Object.keys(regMap);

    if (town === 'All') {
      return regNumbers
    }

    var filteredList = regNumbers.filter(function(regNum, storedReg) {

      return regNum.startsWith(town)
    });

    //location.hash = town;

    return filteredList;

  }

  function registrationMap(storage) {
    return Object.keys(regMap);
  }



  return {
    mapReg: registrationMap,
    addRegistration: addRegistrationNumbers,
    filterReg: filterRegBy,
  }
}
