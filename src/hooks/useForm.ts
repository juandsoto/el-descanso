import { SelectChangeEvent } from "@mui/material";
import React from "react";

const useForm = <T>(initialState: T | (() => T)) => {
  const [form, setForm] = React.useState<T>(initialState);

  const handleSelectChange = (e: SelectChangeEvent) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formSubmit: form });
  };

  const reset = () => setForm(initialState);

  return {
    form,
    handleChange,
    handleSubmit,
    handleSelectChange,
    reset,
  };
};

export default useForm;
