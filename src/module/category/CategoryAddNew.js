
import React from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Field, FieldCheckboxes } from "../../conponents/field";
import { Label } from "../../conponents/label";
import { Input } from "../../conponents/input";
import Radio from "../../conponents/checkbox/Radio";
import { Button } from "../../conponents/button";
import slugify from "slugify";
import { categoryStatus } from "../../utils/constants";
// import { db } from "firebase-app/firebase-config";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-apps/firebase-config";
import { useNavigate } from "react-router-dom";


const CategoryAddNew = () => {
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,

  } = useForm({
    mode: "onChange",
    defaultValues: {
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
    }
  });

  const navigate = useNavigate()
  const handleAddNewCategory = async (values) => {
    if(!isValid) return;
    const newValues = {...values};
    newValues.slug = slugify(newValues.name || newValues.slug, {lower: true});

    newValues.status = Number(newValues.status);
    const colRef = collection(db, 'categories');
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Thêm mới thành công");
      navigate("/manage/category")

    } catch (error) {
      toast.error(error.message)
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      })
    }
    
  }

  const watchStatus = watch("status")
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio name="status"
               control={control}
                checked={Number(watchStatus) === 1}
                value = {categoryStatus.APPROVED}
                >
                Approved
              </Radio>
              <Radio name="status"
               control={control}
                checked={Number(watchStatus) === 2}
                value = {categoryStatus.UNAPPROVED}
                >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]" type = "submit"
         disabled = {isSubmitting}
         isLoading = {isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
