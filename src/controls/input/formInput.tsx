import React from "react";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export interface FormInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>,
  label?: string,
  control?: Control<TFieldValues>
  type? : React.HTMLInputTypeAttribute 
}

function FormInputText<TFieldValues extends FieldValues>(props: FormInputProps<TFieldValues>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          type={props.type}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={props.label}
          variant="outlined"
        />
      )}
    />
  );
};

export interface FormSelectInputOption {
  name: string,
  value: string
}

export interface FormSelectInputProps<TFieldValues extends FieldValues> extends FormInputProps<TFieldValues> {
  options: Array<FormSelectInputOption>
  defaultValue: string
}

export function FormInputDropdown<TFieldValues extends FieldValues> ({
  options,
  name,
  control,
  label,
  defaultValue
} : FormSelectInputProps<TFieldValues>) {
  const generateSingleOptions = () => {
    return options.map((option: FormSelectInputOption) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl size={"small"}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <TextField select label={label} defaultValue={defaultValue} onChange={onChange} value={value}>
            {generateSingleOptions()}
          </TextField>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

export default FormInputText;