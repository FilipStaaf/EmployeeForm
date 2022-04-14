import db from "../firebase";
import {
  ref,
  set,
  get,
  update,
  remove,
} from "firebase/database";


//variable which is used in different ways in different functions, 
//to initialize or to target a fields name value in firebase
let employeeNR;

//key values for localStorage
const KEYS = {
  employees: "employees",
  employeeId: "employeeId",
};
//a container of a collection with deparment titles that have an corresponding id for each title
export const getDepartmentCollection = () => [
  { id: "1", title: "Development" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" },
];

//generates an id for a newly created employee 
export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null) {
    localStorage.setItem(KEYS.employeeId, "0");
  }
  var id = parseInt(localStorage.getItem(KEYS.employeeId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

//creates a new employee field in localstorage and in firebase
export function insertEmployee(data) {
  let employees = getAllEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
  employeeNR = "employee" + data["id"]; 
  set(ref(db, "Employees/" + employeeNR), {
    data,
  });
}

//updates an employee field in localstorage and in firebase
export function updateEmployee(data) {
  let employees = getAllEmployees();
  let recordIndex = employees.findIndex((x) => x.id === data.id);
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
  employeeNR = "employee" + employees[recordIndex].id;
  update(ref(db, `Employees/${employeeNR}`), {
    data,
  });
}
//makes an array with data id values for each field in localstorages 
export function getDataIdValuesLS() {
  var tem = [];
  var pull = JSON.parse(localStorage.getItem(KEYS.employees));
  for (var i = 0; i < pull.length; i++) {
    tem.push(pull[i].id);
  }
  return tem;
}
//gets all employee fields in localStorage and navigates each employee field to a department title by using the fields deparmentId
export function getAllEmployees() {
  compareAndUpdateLsDataWithFbData();
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  let departments = getDepartmentCollection();
  return employees.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1].title,
  }));
}

// delete specific employee from the localstorage and from Firebase
export function deleteEmployee(id) {
  let employees = getAllEmployees();
  let employee = employees.filter((x) => x.id !== id);
  employeeNR = "employee" + id;
  localStorage.setItem(KEYS.employees, JSON.stringify(employee));
  remove(ref(db, `Employees/${employeeNR}/`));
}

// delete all employees from the localstorage and from Firebase
export function clearLocalStorage() {
  localStorage.clear();
  remove(ref(db, "Employees/"));
}


/* 
compares all the fields data in LocalStorage, with all the fields data in Firebase Realtime Database, with the fields data id.
If there'r fields existing in Firebase that doesn't exist in LocalStorage, then LocalStorage gets updated with those fields data.
*/
export async function compareAndUpdateLsDataWithFbData() {
  var temLS = getDataIdValuesLS();
  var temFb = await getAllFieldValuesFb();

  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));

  for (let index = 0; index < temFb.length; index++) {
    const element = temFb[index];

    if (temLS.findIndex((obj) => obj === element.id) === -1) {
      console.log("Not found:", element);

      employees.push(element);
      localStorage.setItem(KEYS.employees, JSON.stringify(employees));
    }
  }
}

//gets all the fields in Firebase and initiialize an array with the values 
export async function getAllFieldValuesFb() {
  const tem = [];
  var allEmployeesInFb = ref(db, "Employees/");
  const res = await get(allEmployeesInFb);
  res.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    var empIdStrFb = childData.data;
    tem.push(empIdStrFb);
  });
  return tem;
}

//-------------------------------------- FB exempel syntax----------------------------------------------------------

/*
  var allEmployeesInFb = ref(db, "Employees/");
  onValue(
    allEmployeesInFb,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        var empIdStrFb = childData.data.id;
        var empIdIntFb = empIdStrFb;
        console.log(empIdIntFb);
        tem.push(empIdIntFb);
      });
    },
    {
      onlyOnce: true,
    }
  );*/

//------------------------------------------------------------------------------------------------------------------

/*  //-------- kolla olike typeOf metoder --------------
  //--------------------FB log checking typeOf status-------------------------

  // "Represents an array"
  if (fbEmpId instanceof Array) console.log(" fbEmpId Represents an array");
  else console.log("fbEmpId Does not represent an array");
  // "Undefined value"
  if (typeof fbEmpId == "undefined") console.log("fbEmpId Undefined value");
  else console.log("fbEmpId Defined value");
  // "Null value"
  if (fbEmpId === null) console.log("fbEmpId Null value");
  else console.log("fbEmpId Not null value");
  // "Numeric value"
  if (typeof fbEmpId == "number") console.log("fbEmpId Numeric value");
  else console.log("fbEmpId Not a number");
  // "String value"
  if (typeof fbEmpId == "string") console.log("fbEmpId String value");
  else console.log("fbEmpId Not a string");
  // "Object"
  if (typeof fbEmpId == "object") console.log("fbEmpId Object");
  else console.log("fbEmpId Not an object");
  //---------------------------------------------------------------------------

  //--------------------LS log checking typeOf status-------------------------
  
  // "Represents an array"
  if (lsEmpId instanceof Array) console.log(" lsEmpId Represents an array");
  else console.log(" lsEmpId Does not represent an array");
  // "Undefined value"
  if (typeof lsEmpId == "undefined") console.log("lsEmpId Undefined value");
  else console.log("lsEmpId Defined value");
  // "Null value"
  if (lsEmpId === null) console.log("lsEmpId Null value");
  else console.log("lsEmpId Not null value");
  // "Numeric value"
  if (typeof lsEmpId == "number") console.log("lsEmpId Numeric value");
  else console.log("lsEmpId Not a number");
  // "String value"
  if (typeof lsEmpId == "string") console.log("lsEmpId String value");
  else console.log("lsEmpId Not a string");
  // "Object"
  if (typeof lsEmpId == "object") console.log("lsEmpId Object");
  else console.log("lsEmpId Not an object");
  //---------------------------------------------------------------------------

*/
