import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdOutlineFastfood,
  MdDriveFolderUpload,
  MdDelete,
  MdOutlineMonitorWeight,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "../features/Loader";
import { storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { saveCreatedItem } from "../utils/firebaseFunction";

const Create = () => {
  const [isFields, setIsFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadImg, setIsUploadImg] = useState(true);
  const [imgAsset, setImgAsset] = useState(null);
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState();

  console.log(category);
  /// Upload image
  const uploadImgHandler = (e) => {
    setIsLoading(true);
    const imgFile = e.target.files[0];
    console.log(imgFile);
    const storageRef = ref(storage, `/images/${Date.now()}-${imgFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setIsFields(true);
        setAlertStatus("danger");
        setMessage("Upload failed. Please try again...");
        setTimeout(() => {
          setIsFields(false);
          setIsLoading(false);
        }, 2000);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoading(false);
          setImgAsset(downloadURL);
          setIsFields(true);
          setAlertStatus("other");
          setMessage("Upload successfully!");
          setIsUploadImg(false);
          setTimeout(() => {
            setIsFields(false);
          }, 2000);
        });
      }
    );
  };

  /// Delete image
  const deleteImgHandler = () => {
    const desertRef = ref(storage, imgAsset);

    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        setIsLoading(true);
        setImgAsset(null);
        setIsFields(true);
        setMessage("File deleted successfully");
        setTimeout(() => {
          setIsLoading(false);
          setIsFields(false);
          setIsUploadImg(true);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setIsFields(true);
        setAlertStatus("danger");
        setMessage("Can not deleted. Please try again...");
        setTimeout(() => {
          setIsFields(false);
          setIsLoading(false);
        }, 2000);
      });
  };

  /// Save details
  const saveHandler = () => {
    try {
      if (!name || !category || !imgAsset || !weight || !price) {
        setIsFields(true);
        setAlertStatus("danger");
        setMessage("Missing information!!");
        setTimeout(() => {
          setIsFields(false);
          setIsLoading(false);
        }, 2000);
      } else {
        const clearData = () => {
          setName("");
          setCategory("");
          setImgAsset(null);
          setWeight("");
          setPrice("");
        };
        const createdItem = {
          id: `${Date.now()}`,
          name: name,
          category: category,
          imgAsset: imgAsset,
          weight: weight,
          price: price,
          qty: 1,
        };
        saveCreatedItem(createdItem);
        setIsFields(true);
        setAlertStatus("other");
        setMessage("Item uploaded successfully!");
        setTimeout(() => {
          clearData();
          setIsUploadImg(true);
          setIsFields(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setIsFields(true);
      setAlertStatus("danger");
      setMessage("Error while uploading. Please try again...");
      setTimeout(() => {
        setIsFields(false);
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="p-4 w-[90%] md:w-[75%] gap-4 flex flex-col justify-center items-center rounded-lg border border-gray-300 shadow-lg">
        {isFields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold round-xl ${
              alertStatus === "danger"
                ? "text-red-700 bg-red-400"
                : "text-yellow-700 bg-yellow-400"
            }`}
          >
            {message}
          </motion.p>
        )}
        <div className="w-full border-b border-gray-300 py-2 flex items-center gap-2">
          <MdOutlineFastfood className="text-xl" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Give a name"
            className="w-full bg-transparent outline-none"
          />
        </div>
        <div className="w-full">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full outline-none border-b border-gray-300 p-2 cursor-pointer rounded-lg"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories &&
              categories.map(({ category, id, paramUrl }) => (
                <option
                  key={id}
                  value={paramUrl}
                  className="bg-transparent outline-none text-base text-headingColor capitalize"
                >
                  {category}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full h-[225px] flex justify-center items-center flex-col border-2 border-gray-200">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isUploadImg ? (
                <>
                  <label className="w-full h-full flex justify-center items-center cursor-pointer">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <MdDriveFolderUpload className="text-2xl text-gray-400" />
                      <p className="text-gray-400 text-md">
                        Choose an image to upload
                      </p>
                    </div>
                    <input
                      className="w-0 h-0"
                      type="file"
                      name="uploadImg"
                      accept="/images/*"
                      onChange={uploadImgHandler}
                    />
                  </label>
                </>
              ) : (
                <div className="h-full relative">
                  <img
                    src={imgAsset}
                    alt="upload-img"
                    className="w-[200px] max-h-[200px] object-contain"
                  />
                  <button
                    onClick={deleteImgHandler}
                    className="absolute bottom-3 right-3 p-4 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-lg transition-all duration-100 ease-in-out"
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-full border-b border-gray-300 py-2 flex items-center gap-2">
          <MdOutlineMonitorWeight className="text-xl" />
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            placeholder="Net weight"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="w-full border-b border-gray-300 py-2 flex items-center gap-2">
          <MdAttachMoney className="text-xl" />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Price"
            className="w-full bg-transparent outline-none"
          />
        </div>
        <div className="w-full">
          <button
            onClick={saveHandler}
            className="w-full border-none outline-none bg-emerald-400 rounded-xl py-2 text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
