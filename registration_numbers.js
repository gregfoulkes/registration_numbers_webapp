module.exports = function(pool) {

    var regMap = {};

    if (pool) {
      for (var i = 0; i < pool.length; i++) {
        var regNumber = pool[i];
        regMap[regNumber] = 0
      }
    }

    async function addRegistrationNumbers(regNumber) {

      var regList = ['CA ', 'CY ', 'CL ', 'CAW ', 'CJ']

      let townTag = regNumber.substring(0, 2).trim();

      if (regNumber != '') {

        for (var i = 0; i < regList.length; i++) {
          if (regNumber.startsWith(regList[i])) {

            let result = await pool.query('SELECT * FROM reg_numbers WHERE reg = $1', [regNumber])

            if (result.rowCount === 0) {

              let townID = await pool.query('SELECT id FROM towns WHERE town = $1', [townTag]);

              result = await pool.query('INSERT INTO reg_numbers (reg, town_tag) VALUES ($1, $2)', [regNumber, townID.rows[0].id]);

              return true;
            }
            return false;
          }
        }
      }
    }

      async function filterRegBy(town) {
        var regNumbers = await pool.query('select reg from reg_numbers')
        var list = []
        if (town === 'All') {
          return regNumbers.rows
        }

        var filteredList = regNumbers.rows.filter(function(regNum) {

          return regNum.reg.startsWith(town)
        });

        return filteredList;

      }

      async function registrationMap() {
        var result = await pool.query('select reg from reg_numbers')
        return result.rows
        //return Object.keys(regMap);
      }

      async function deleteRegNumbers() {
        var result = await pool.query('delete from reg_numbers')
        return result.rows
      }

      async function deleteTownsData() {
        var result = await pool.query('delete from reg_numbers')
        return result.rows
      }


      return {
        mapReg: registrationMap,
        addRegistration: addRegistrationNumbers,
        filterReg: filterRegBy,
        deleteReg: deleteRegNumbers,
        deleteTowns: deleteTownsData
      }
    }
