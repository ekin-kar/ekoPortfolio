"use server";
export const newTransaction = async (formData) => {
  const a = formData.get("coin");
  const b = formData.get("quantity");
  console.log(formData);
};
