import React, { useEffect } from "react";

import { Grid } from "@material-ui/core";

import { useForm, Form } from "../../components/useForm";

import Controls from "../../components/controls/Controls";
import * as EmployeeService from "../../services/EmployeeService";


const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFvalues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

export default function EmployeeForm(props) {
  const {addOrEdit, recordForEdit} = props;

  const validate = (fieldValues = values) => {
    let temp = {...errors};
    if ("fullName" in fieldValues) {
      temp.fullName = fieldValues.fullName
        ? ""
        : "You need to write your full name.";
    }
    if ("email" in fieldValues) {
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    }
    if ("mobile" in fieldValues) {
      temp.mobile =
      fieldValues.mobile.length > 9 ? "" : "Minimum 10 digits requierd.";
    }
    if ("departmentId" in fieldValues) {
      temp.departmentId =
      fieldValues.departmentId.length !== 0 ? "" : "Please select your department.";
    }

    setErrors({
      ...temp,
    });
    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
    
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFvalues, true, validate);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  }

 
  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit
      })
    }
  },[recordForEdit])
 
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item sx={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name="mobile"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            name="city"
            label="City"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item sx={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />

          <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={EmployeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
            <Controls.Button text="Clear local storage" onClick={EmployeeService.clearLocalStorage} /> 
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
