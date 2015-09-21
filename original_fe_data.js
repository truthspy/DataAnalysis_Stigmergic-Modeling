var model = [{
      "Course": [{
        "code": [{
          "name": "code",
          "type": "string"
        }],
        "credit": [{
          "name": "credit",
          "type": "float"
        }],
        "description": [{
          "name": "description",
          "type": "Text"
        }],
        "capacity": [{
          "name": "capacity",
          "type": "int"
        }],
        "character": [{
          "name": "character",
          "type": "CourseCharacter"
        }],
        "name": [{
          "name": "name",
          "type": "string"
        }],
        "availability": [{
          "name": "availability",
          "type": "CourseAvailability"
        }]
      }, {
        "order": ["name", "code", "credit", "description", "capacity", "character", "availability"]
      }],
      "CourseActivity": [{
        "startTime": [{
          "name": "startTime",
          "type": "Time"
        }],
        "endTime": [{
          "name": "endTime",
          "type": "Time"
        }],
        "place": [{
          "name": "place",
          "type": "string"
        }],
        "date": [{
          "name": "date",
          "type": "SchoolDate"
        }],
        "weekNum": [{
          "name": "weekNum",
          "type": "int"
        }]
      }, {
        "order": ["startTime", "endTime", "place", "date", "weekNum"]
      }],
      "CourseAvailability": [{
        "undergraduateAvailable": [{
          "name": "undergraduateAvailable",
          "type": "boolean"
        }],
        "masterStudentAvailable": [{
          "name": "masterStudentAvailable",
          "type": "boolean"
        }],
        "phDStudentAvailable": [{
          "name": "phDStudentAvailable",
          "type": "boolean"
        }]
      }, {
        "order": ["undergraduateAvailable", "masterStudentAvailable", "phDStudentAvailable"]
      }],
      "CourseCharacter": [{
        "compulsory": [{
          "name": "compulsory"
        }],
        "elective": [{
          "name": "elective"
        }],
        "limited": [{
          "name": "limited"
        }]
      }, {
        "order": ["compulsory", "elective", "limited"]
      }],
      "Date": [{
        "day": [{
          "name": "day"
        }],
        "month": [{
          "name": "month"
        }],
        "year": [{
          "name": "year"
        }]
      }, {
        "order": ["day", "month", "year"]
      }],
      "DayOfWeek": [{
        "sunday": [{
          "name": "sunday"
        }],
        "monday": [{
          "name": "monday"
        }],
        "tuesday": [{
          "name": "tuesday"
        }],
        "wednsday": [{
          "name": "wednsday"
        }],
        "thursday": [{
          "name": "thursday"
        }],
        "friday": [{
          "name": "friday"
        }],
        "saturday": [{
          "name": "saturday"
        }]
      }, {
        "order": ["sunday", "monday", "tuesday", "wednsday", "thursday", "friday", "saturday"]
      }],
      "Department": [{
        "requiredCreditOfM": [{
          "name": "requiredCreditOfM",
          "type": "RequiredCredit"
        }],
        "requiredCreditOfB": [{
          "name": "requiredCreditOfB",
          "type": "RequiredCredit"
        }],
        "requiredCreditOfD": [{
          "name": "requiredCreditOfD",
          "type": "RequiredCredit"
        }],
        "name": [{
          "name": "name",
          "type": "string"
        }],
        "code": [{
          "name": "code",
          "type": "string"
        }]
      }, {
        "order": ["name", "code", "requiredCreditOfM", "requiredCreditOfB", "requiredCreditOfD"]
      }],
      "Examination": [{
        "supervisor": [{
          "name": "supervisor",
          "type": "string"
        }]
      }, {
        "order": ["supervisor"]
      }],
      "ExerciseLesson": [{
        "teachingAssistant": [{
          "name": "teachingAssistant",
          "type": "string"
        }]
      }, {
        "order": ["teachingAssistant"]
      }],
      "Image": [{
        "height": [{
          "name": "height",
          "type": "int"
        }],
        "width": [{
          "name": "width",
          "type": "int"
        }],
        "imageURL": [{
          "name": "imageURL",
          "type": "string"
        }]
      }, {
        "order": ["height", "width", "imageURL"]
      }],
      "Lecture": [{
        "lecturer": [{
          "name": "lecturer",
          "type": "string"
        }]
      }, {
        "order": ["lecturer"]
      }],
      "MasterStudent": [{}, {
        "order": []
      }],
      "PhDStudent": [{}, {
        "order": []
      }],
      "RequiredCredit": [{
        "limitedCredit": [{
          "name": "limitedCredit",
          "type": "float"
        }],
        "electiveCredit": [{
          "name": "electiveCredit",
          "type": "float"
        }],
        "compulsoryCredit": [{
          "name": "compulsoryCredit",
          "type": "float"
        }]
      }, {
        "order": ["limitedCredit", "electiveCredit", "compulsoryCredit"]
      }],
      "SchoolCalender": [{}, {
        "order": []
      }],
      "SchoolDate": [{
        "week": [{
          "name": "week",
          "type": "Week"
        }],
        "semester": [{
          "name": "semester",
          "type": "Semester"
        }],
        "schoolYear": [{
          "name": "schoolYear",
          "type": "SchoolYear"
        }],
        "dayOfWeek": [{
          "name": "dayOfWeek",
          "type": "DayOfWeek"
        }]
      }, {
        "order": ["week", "semester", "schoolYear", "dayOfWeek"]
      }],
      "SchoolYear": [{
        "startYear": [{
          "name": "startYear",
          "type": "Year"
        }],
        "endYear": [{
          "name": "endYear",
          "type": "Year"
        }]
      }, {
        "order": ["startYear", "endYear"]
      }],
      "Semester": [{
        "spring": [{
          "name": "spring"
        }],
        "fall": [{
          "name": "fall"
        }],
        "summer": [{
          "name": "summer"
        }]
      }, {
        "order": ["spring", "fall", "summer"]
      }],
      "Student": [{
        "code": [{
          "name": "code",
          "type": "string"
        }],
        "enrollmentDate": [{
          "name": "enrollmentDate",
          "type": "Date"
        }]
      }, {
        "order": ["code", "enrollmentDate"]
      }],
      "StudentAssessment": [{
        "paperScore": [{
          "name": "paperScore",
          "type": "float"
        }],
        "attendenceScore": [{
          "name": "attendenceScore",
          "type": "float"
        }],
        "projectScore": [{
          "name": "projectScore",
          "type": "float"
        }],
        "midtermExamScore": [{
          "name": "midtermExamScore",
          "type": "float"
        }],
        "finalExamScore": [{
          "name": "finalExamScore",
          "type": "float"
        }],
        "finalAssessment": [{
          "name": "finalAssessment",
          "type": "float"
        }]
      }, {
        "order": ["paperScore", "attendenceScore", "projectScore", "midtermExamScore", "finalExamScore", "finalAssessment"]
      }],
      "Teacher": [{
        "facultyCode": [{
          "name": "facultyCode",
          "type": "string"
        }],
        "title": [{
          "name": "title",
          "type": "Title"
        }]
      }, {
        "order": ["facultyCode", "title"]
      }],
      "Text": [{
        "str": [{
          "name": "str",
          "type": "string",
          "multiplicity": "*",
          "ordering": "True"
        }]
      }, {
        "order": ["str"]
      }],
      "Time": [{
        "minute": [{
          "name": "minute"
        }],
        "hour": [{
          "name": "hour"
        }],
        "second": [{
          "name": "second"
        }]
      }, {
        "order": ["hour", "minute", "second"]
      }],
      "Title": [{
        "professor": [{
          "name": "professor"
        }],
        "associateProfessor": [{
          "name": "associateProfessor"
        }],
        "assistantProfessor": [{
          "name": "assistantProfessor"
        }],
        "lecturer": [{
          "name": "lecturer"
        }]
      }, {
        "order": ["professor", "associateProfessor", "assistantProfessor", "lecturer"]
      }],
      "Undergraduate": [{
        "email": [{
          "name": "email",
          "type": "string"
        }],
        "username": [{
          "name": "username",
          "type": "string"
        }],
        "photo": [{
          "name": "photo",
          "type": "Image"
        }],
        "password": [{
          "name": "password",
          "type": "string"
        }],
        "birthDate": [{
          "name": "birthDate",
          "type": "Date"
        }],
        "name": [{
          "name": "name",
          "type": "string"
        }]
      }, {
        "order": ["name", "birthDate", "username", "password", "email", "photo"]
      }],
      "User": [{}, {
        "order": []
      }],
      "Week": [{
        "weekOne": [{
          "name": "weekOne"
        }],
        "weekTwo": [{
          "name": "weekTwo"
        }],
        "weekThree": [{
          "name": "weekThree"
        }]
      }, {
        "order": ["weekOne", "weekTwo", "weekThree"]
      }],
      "Year": [{}, {
        "order": []
      }]
    }, {
      "PhDStudent-Student": [{
        "550ad58d004b148de2988710": [{
          "role": ["father", "child"],
          "class": ["Student", "PhDStudent"],
          "multiplicity": ["1", "1"],
          "type": ["Generalization", ""]
        }]
      }, {
        "order": ["550ad58d004b148de2988710"]
      }],
      "Course-CourseActivity": [{
        "550ad3f9004b1404070f6798": [{
          "type": ["Composition", ""],
          "role": ["whole", "part"],
          "class": ["Course", "CourseActivity"],
          "multiplicity": ["1", "*"]
        }]
      }, {
        "order": ["550ad3f9004b1404070f6798"]
      }],
      "Course-Department": [{
        "550ad444004b14d17ab88919": [{
          "type": ["Association", ""],
          "role": ["a", "a"],
          "class": ["Course", "Department"],
          "multiplicity": ["*", "1"]
        }]
      }, {
        "order": ["550ad444004b14d17ab88919"]
      }],
      "Course-Student": [{
        "550ad49a004b14d17ab8891a": [{
          "type": ["Association", ""],
          "role": ["a", "a"],
          "class": ["Course", "Student"],
          "multiplicity": ["0..*", "*"]
        }]
      }, {
        "order": ["550ad49a004b14d17ab8891a"]
      }],
      "Course-Teacher": [{
        "550ad4c3004b14d17ab8891b": [{
          "type": ["Association", ""],
          "role": ["a", "a"],
          "class": ["Course", "Teacher"],
          "multiplicity": ["0..*", "1..*"]
        }]
      }, {
        "order": ["550ad4c3004b14d17ab8891b"]
      }],
      "CourseActivity-Examination": [{
        "550ad4d6004b14d17ab8891c": [{
          "role": ["father", "child"],
          "class": ["CourseActivity", "Examination"],
          "multiplicity": ["1", "1"],
          "type": ["Generalization", ""]
        }]
      }, {
        "order": ["550ad4d6004b14d17ab8891c"]
      }],
      "CourseActivity-ExerciseLesson": [{
        "550ad4fb004b148de298870a": [{
          "role": ["father", "child"],
          "class": ["CourseActivity", "ExerciseLesson"],
          "multiplicity": ["1", "1"],
          "type": ["Generalization", ""]
        }]
      }, {
        "order": ["550ad4fb004b148de298870a"]
      }],
      "CourseActivity-Lecture": [{
        "550ad506004b148de298870b": [{
          "role": ["father", "child"],
          "class": ["CourseActivity", "Lecture"],
          "multiplicity": ["1", "1"],
          "type": ["Generalization", ""]
        }]
      }, {
        "order": ["550ad506004b148de298870b"]
      }],
      "Date-SchoolCalender": [{
        "550ad51a004b148de298870c": [{
          "type": ["Aggregation", ""],
          "role": ["owner", "ownee"],
          "class": ["Date", "SchoolCalender"],
          "multiplicity": ["1", "*"]
        }]
      }, {
        "order": ["550ad51a004b148de298870c"]
      }],
      "Teacher-User": [{
        "550ad5e3004b1407c7fd8718": [{
          "role": ["father", "child"],
          "class": ["User", "Teacher"],
          "multiplicity": ["1", "1"],
          "type": ["Generalization", ""]
        }]
      }, {
        "order": ["550ad5e3004b1407c7fd8718"]
      }],
      "Student-User": [{
        "550ad5dc004b1407c7fd8717": [{
          "role": ["father", "child"],
          "class": ["User", "Student"],
          "multiplicity": ["1", "1"],
          "type": ["Generalization", ""]
        }]
      }, {
        "order": ["550ad5dc004b1407c7fd8717"]
      }],
      "Department-Student": [{
        "550ad530004b148de298870d": [{
          "type": ["Association", ""],
          "role": ["a", "a"],
          "class": ["Department", "Student"],
          "multiplicity": ["1..*", "*"]
        }]
      }, {
        "order": ["550ad530004b148de298870d"]
      }],
      "Department-Teacher": [{
        "550ad55f004b148de298870e": [{
          "type": ["Association", ""],
          "role": ["a", "a"],
          "class": ["Department", "Teacher"],
          "multiplicity": ["1..*", "*"]
        }]
      }, {
        "order": ["550ad55f004b148de298870e"]
      }],
      "RequiredCredit-Student": [{
        "550ad56c004b148de298870f": [{
          "role": ["father", "child"],
          "class": ["Student", "RequiredCredit"],
          "multiplicity": ["1", "1"],
          "type": ["Generalization", ""]
        }]
      }, {
        "order": ["550ad56c004b148de298870f"]
      }],
      "SchoolCalender-SchoolDate": [{
        "550ad5af004b148de2988711": [{
          "type": ["Aggregation", ""],
          "role": ["owner", "ownee"],
          "class": ["SchoolCalender", "SchoolDate"],
          "multiplicity": ["1", "*"]
        }]
      }, {
        "order": ["550ad5af004b148de2988711"]
      }],
      "Student-Undergraduate": [{
        "550ad5cf004b1407c7fd8716": [{
          "role": ["father", "child"],
          "class": ["Student", "Undergraduate"],
          "multiplicity": ["1", "1"],
          "type": ["Generalization", ""]
        }]
      }, {
        "order": ["550ad5cf004b1407c7fd8716"]
      }]
    }]