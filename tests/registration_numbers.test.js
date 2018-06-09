const Reg = require('../registration_numbers.js');
//const registration = Reg()
let assert = require("assert");



describe('Filter registration numbers', function() {
  it('Should return registrations from Cape Town only ', function() {
    var registration = Reg();

    registration.addRegistration('CA 1234')
    registration.addRegistration('CA 4321')
    registration.addRegistration('CAW 4321')
    registration.addRegistration('CD 4321')




    //var storedReg = registration.mapReg()


    assert.deepEqual(registration.filterReg('CA '), ['CA 1234', 'CA 4321'])

  });


  it('Should return registrations from Bellville only ', function() {
    var registration = Reg();

    registration.addRegistration('CA 1234')
    registration.addRegistration('CY 1234')
    registration.addRegistration('CL 1234')
    registration.addRegistration('CD 4321')


    //var storedReg = registration.mapReg()

    assert.deepEqual(registration.filterReg('CY '), ['CY 1234'])

  });

  it('Should return registrations from George only ', function() {
    var registration = Reg();

    registration.addRegistration('CA 1234')
    registration.addRegistration('CY 1234')
    registration.addRegistration('CAW 1234')
    registration.addRegistration('CD 4321')

    //var storedReg = registration.mapReg()

    assert.deepEqual(registration.filterReg('CAW '), ['CAW 1234'])

  });

  it('Should return registrations from Stellenbosch only ', function() {
    var registration = Reg();

    registration.addRegistration('CA 1234')
    registration.addRegistration('CY 1234')
    registration.addRegistration('CL 1234')
    registration.addRegistration('CD 4321')

    //var storedReg = registration.mapReg()

    assert.deepEqual(registration.filterReg('CL '), ['CL 1234'])

  });

  it('Should return all registrations', function() {
    var registration = Reg();

    registration.addRegistration('CA 1234')
    registration.addRegistration('CY 1234')
    registration.addRegistration('CL 1234')
    registration.addRegistration('CD 4321')

    //var storedReg = registration.mapReg()

    assert.deepEqual(registration.filterReg('All'), ['CA 1234', 'CY 1234', 'CL 1234'])

  });
});

describe('Map registration numbers', function() {
  it('Should Map registration numbers from CA', function() {
    var registration = Reg();

    registration.addRegistration('CA 1234')
    registration.addRegistration('CD 4321')


    assert.deepEqual(registration.mapReg(), [
      'CA 1234']
    )
  });
  it('Should return registrations from CA and registrations from CY', function() {

    var registration = Reg();
    registration.addRegistration('CA 1234')
    registration.addRegistration('CY 1234')
    registration.addRegistration('CD 4321')


    assert.deepEqual(registration.mapReg(), [
      'CA 1234',
      'CY 1234'
    ])
  });

  it('Should return registrations from CA, CY and CL', function() {

    var registration = Reg();
    registration.addRegistration('CA 1234')
    registration.addRegistration('CY 1234')
    registration.addRegistration('CL 1234')
    registration.addRegistration('CD 4321')

    assert.deepEqual(registration.mapReg(), [
      'CA 1234',
      'CY 1234',
      'CL 1234'
    ])
  });
});

describe('Sort registration numbers', function() {
  it('Should return true if registration number from CA', function() {
    var registration = Reg();

    assert.equal(registration.addRegistration('CA 1234'), true)
  });

  it('Should return true if registration number from CY', function() {
    var registration = Reg();

    assert.equal(registration.addRegistration('CY 1234'), true)
  });

  it('Should return true if registration number from CL', function() {
    var registration = Reg();

    assert.equal(registration.addRegistration('CL 1234'), true)
  });

  it('Should return true if registration number from CAW', function() {
    var registration = Reg();

    assert.equal(registration.addRegistration('CAW 1234'), true)
  });

  it('Should return false if registration number from anywhere else', function() {
    var registration = Reg();

    assert.equal(registration.addRegistration('CJ 1234'), false)
  });
});

describe('Initialize Map Reg Numbers', function() {
  it('Should return initialised map', function(){

        var registration = Reg(['CA 1234',
          'CA 4321',
          'CAW 4321',
          'CD 4321']);


        assert.deepEqual(registration.mapReg(), ['CA 1234',
          'CA 4321',
          'CAW 4321',
          'CD 4321']);

      });
});
