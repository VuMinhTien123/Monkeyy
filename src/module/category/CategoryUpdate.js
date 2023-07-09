import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashboardHeading from '../dashboard/DashboardHeading';
import { Field, FieldCheckboxes } from '../../conponents/field';
import { Label } from '../../conponents/label';
import { Input } from '../../conponents/input';
import Radio from '../../conponents/checkbox/Radio';
import { Button } from '../../conponents/button';
import { useForm } from 'react-hook-form';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-apps/firebase-config';
import { categoryStatus } from '../../utils/constants';
import { update } from 'lodash';
import slugify from 'slugify';
import { toast } from 'react-toastify';

const CategoryUpdate = () => {
    const {control, reset, watch, handleSubmit, formState: {isSubmitting}} = useForm({
        mode: 'onChange',
        defaultValues: {},
    })
    const [params] = useSearchParams();
    const categoryId = params.get("id");
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async() => {
            const colRef = doc(db, "categories", categoryId);
            const singleDoc = await getDoc(colRef);
            reset(singleDoc.data());
        }
        fetchData()
    },[categoryId, reset]);
    const watchStatus = watch("status");
    const handleUpdateCategory = async (values) => {
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        name:  values.name,
        slug: slugify(values.slug || values.name, {lower: true}) ,
        status: Number(values.status),
      });
      toast.success("Update thành công");
      navigate("/manage/category")
    }
    if(!categoryId) return null;
  return (
    <div>
      <DashboardHeading title='Update Category' desc= {`Update your category id: ${categoryId}`}
       ></DashboardHeading>

<form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
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
        disabled = {isSubmitting} isLoading = {isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div> 
  )
}

export default CategoryUpdate
