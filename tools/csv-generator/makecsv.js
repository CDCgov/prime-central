// prototyping
// hey btw I'm not a programmer can you tell?
// right now this outputs to stdout

const fs = require("fs");
const faker = require("faker");
const program = require("commander");

program
  .usage("[options]")
  .option(
    "-f, --schemafile <schemafile",
    "json schema file",
    "patient.schema.json"
  )
  .option("-n, --numlines <numlines>", "number of CSV lines to generate", 10)
  .option("-tf, --testfile", "boolean flag", false)
  .parse(process.argv);

try {
  let fileContents = fs.readFileSync(program.schemafile, "utf8");
  let data = JSON.parse(fileContents);
  var schema = data.properties;
  var csvHead = Object.keys(schema).join(",");

  // If this is a test file, we need to generate error cases for each field, starting with
  // empty fields. This means we may have to override numlines.
  if (program.testfile && program.numlines < Object.keys(schema).length) {
    console.error(
      "WARNING: test file is set and numlines " +
        program.numlines +
        " is too low, overriding to appropriate value of " +
        (Object.keys(schema).length + 1)
    );
    program.numlines = Object.keys(schema).length + 1;
  }

  // output header
  console.log(csvHead);

  // For prototype, we're going to loop a few times and PREPOPULATE presumed fields, then pull
  // that data into the output if it's still in the schema. This is a super weak sauce way of
  // handling forwards compatibility with changes to the schema until changes are modified
  // here.
  //
  // why this way? I dunno it seemed like the easiest way to deal with changes
  //
  // NOTE: this method won't generate "connected" fake attributes (i.e. the address might not be
  // in the state and the zip code won't match)
  //
  // probably need to add a CSV validator and formatter to make sure it's proper on output
  // instead of stdout

  for (var x = 0; x <= program.numlines; x++) {
    var f = {};
    f.patientID = faker.random.uuid();
    f.patientLastName = faker.name.lastName();
    f.patientFirstName = faker.name.firstName();
    f.patientMiddleName = faker.name.firstName();
    f.patientGender = faker.name.gender();
    f.patientSuffix = faker.name.suffix();
    f.patientDOB = faker.date.past();
    f.patientGender = faker.name.gender();
    f.patientStreet = faker.address.streetAddress();
    f.patientStreet2 = faker.address.secondaryAddress();    
    f.patientCity = faker.address.city();
    f.patientCounty = faker.address.county();    
    f.patientState = faker.address.stateAbbr();
    f.patientZipCode = faker.address.zipCode();
    f.patientPhoneNumber = faker.phone.phoneNumber();
    f.patientEmail = faker.internet.email();
    f.patientAge = faker.random.number({'max': 120});
    
    var thisRow = [];
    Object.keys(schema).forEach(function (col) {
      if (f[col]) {
        thisRow.push(f[col]);
      } else {
        thisRow.push(faker.random.word());
      }
    });
    // If testfile is set, we're going to null out each column one by one
    // at some point we can add more advanced cases like fake email addresses etc.
    if (program.testfile && x <= Object.keys(schema).length + 1) {
      thisRow[x] = "";
    }

    console.log(thisRow.join(","));
  }
} catch (e) {
  console.log(e);
}
