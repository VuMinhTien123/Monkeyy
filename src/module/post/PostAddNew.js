import slugify from "slugify";
import { Button } from "../../conponents/button";
import Radio from "../../conponents/checkbox/Radio";
import { Dropdown } from "../../conponents/dropdown";
import { Field, FieldCheckboxes } from "../../conponents/field";
import { Input } from "../../conponents/input";
import { Label } from "../../conponents/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postStatus } from "../../utils/constants";
import ImageUpload from "../../conponents/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../conponents/toggle/Toggle";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../firebase-apps/firebase-config";
import { forEach } from "lodash";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import DashboardHeading from "../dashboard/DashboardHeading";



const PostAddNewStyles = styled.div``;

// const PostAddNew = () => {
//   const {userInfo} = useAuth()
//   const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
//     mode: "onChange",
//     defaultValues: {
//         title: "",
//         slug: "",
//       status: 2,
//       categoryId: "",
//       hot: false
//     },
//   });
//   const watchStatus = watch("status");
//   const watchHot = watch("hot")
//   const [categories, setCategories] = useState([])
//   const [selectCategory, setSelectCategory] = useState("")
//   const [loading, setLoading] = useState(false)
//   const {image,handleResetUpload, progress, handleDeleteImage, handleSelectImage} = useFirebaseImage(setValue, getValues);
  
//   // const watchCategory = watch("category");

//   const addPostHandler = async(values) => {
//     setLoading(true)
//       try{
//         const cloneValues = {...values};
//         cloneValues.slug = slugify( values.slug || values.title, {lower: true})
//         cloneValues.status = Number(values.status)  
//         const colRef = collection(db, 'posts');
//         await addDoc(colRef,{
//           ...cloneValues,
//           image,
//           userId: userInfo.uid,
//           createAt: serverTimestamp(),
//         })
//         toast.success("đã post mới thành công");
//         reset({
//           title: "",
//           slug: "",
//           status: 2,
//           categoryId: "",
//           hot: false,
//           image: ""
//         });
//         handleResetUpload()
//         setSelectCategory({})
//       } catch(error) {
//         setLoading(false)
//       } finally {
//         setLoading(false)
//       }
    
//   }

//   useEffect(() => {

//     const getData = async() => {
//       const colRef = collection(db, 'categories');
//     const q  = query(colRef, where("status", "==", 1))
//     const querySnapshot = await getDoc(q);
//     let result = [];
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, "=>", doc.data( ))
//       result.push({
//         id: doc.id,
//         ...doc.data(),
//       })
//     })
//     setCategories(result)
//     };
//     getData()
//   }, [])

//   useEffect(() => {
// document.title = "Monkey Blog- Add new post"
//   }, [])

//   const handleClickOption = (item) => {
//     setValue("categoryId", item.id);
//     setSelectCategory(item)
//   }

//   return (
//     <PostAddNewStyles>
//       <h1 className="dashboard-heading">Add new post</h1>
//       <form onSubmit={handleSubmit(addPostHandler)}>
//         <div className="grid grid-cols-2 gap-x-10 mb-10">
//           <Field>
//             <Label>Title</Label>
//             <Input
//               control={control}
//               placeholder="Enter your title"
//               name="title"
//               required
//             ></Input>
//           </Field>
//           <Field>
//             <Label>Slug</Label>
//             <Input
//               control={control}
//               placeholder="Enter your slug"
//               name="slug"
//             ></Input>
//           </Field>
//         </div>
//         <div className="grid grid-cols-2 gap-x-10 mb-20">
//           <Field>
//             <Label>Image</Label>
//             <ImageUpload onChange = {handleSelectImage}
//              className='h-[250px]'
//              progress={progress}
//              image={image}
//              handleDeleteImage = {handleDeleteImage}
//              ></ImageUpload>
//           </Field>
//           <Field>
//             <Label>Category</Label>
//             <Dropdown>
//               <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
//               <Dropdown.List>
//                 {categories.length > 0 &&
//                   categories.map((item) => (
//                     <Dropdown.Option
//                       key={item.id}
//                       onClick={() => handleClickOption(item)}
//                     >
//                       {item.name}
//                     </Dropdown.Option>
//                   ))}
//               </Dropdown.List>
//             </Dropdown>
//             {selectCategory?.name && (
//               <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
//                 {selectCategory?.name}
//               </span>
//             )}
//           </Field>
//         </div>
//         <div className="grid grid-cols-2 gap-x-10 mb-10">
//           <Field>
//             <Label>Feature post</Label>
//             <Toggle on = {watchHot === true}
//             onClick={() => setValue('hot', !watchHot)}
//             ></Toggle>
//           </Field>
          
//           <Field>
//             <Label>Status</Label>
//             <div className="flex items-center gap-x-5">
//               <Radio
//                 name="status"
//                 control={control}
//                 checked={Number(watchStatus) === postStatus.APPROVED}
//                 // onClick={() => setValue("status", "approved")}
//                 value= {postStatus.APPROVED}
//               >
//                 Approved
//               </Radio>
//               <Radio
//                 name="status"
//                 control={control}
//                 checked={Number(watchStatus) === postStatus.PENDING}
//                 onClick={() => setValue("status", "pending")}
//                 value={postStatus.PENDING}
//               >
//                 Pending
//               </Radio>
//               <Radio
//                 name="status"
//                 control={control}
//                 checked={Number(watchStatus) === postStatus.REJECTED}
//                 onClick={() => setValue("status", "reject")}
//                 value={postStatus.REJECTED}
//               >
//                 Reject
//               </Radio>
//             </div>
//           </Field>
//           <Field>
//             <Label>Author</Label>
//             <Input control={control} placeholder="Find the author"></Input>
//           </Field>
//         </div>
//         <Button type="submit" className="mx-auto w-[250px]" isLoading = {loading} disabled = {loading}>
//           Add new post
//         </Button>
//       </form>
//     </PostAddNewStyles>
//   );
// };

// export default PostAddNew;

const PostAddNew = () => {
  const { userInfo } = useAuth();
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      category: {},
      user: {},
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);
  const addPostHandler = async (values) => {
    // if (userInfo?.role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        category: {},
        hot: false,
        image: "",
        user: {},
      });
      handleResetUpload();
      setSelectCategory({});
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  useEffect(() => {
    document.title = "Monkey Blogging - Add new post";
  }, []);

  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };

  return (
    <>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new post
        </Button>
      </form>
    </>
  );
};

export default PostAddNew;