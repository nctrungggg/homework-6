import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../configs/routes";
import { STORAGE_KEY } from "../../../constants/constants";
import SignInPage from "../../../pages/SignInPage";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { generateAvatarUpload } from "../../../utils/upload";
import { getInfoUser, logout } from "../redux/AuthSlice";
import "react-image-crop/dist/ReactCrop.css";
import userApi from "../../../api/userApi";
import { toast } from "react-toastify";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = sessionStorage.getItem("access_token");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const userInfo = useSelector((state: any) => state.auth.currentUser);
  const [image, setImage] = useState(userInfo?.avatar);
  const [openModal, setOpenModal] = useState(false);
  const imgRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>();
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const previewCanvasRef = useRef<any>(null);

  if (!authToken) {
    toast.error("You are not logged in!!");
    return <Navigate to={ROUTES.login} />;
  }

  useEffect(() => {
    (async () => {
      const resultAction = await dispatch<any>(getInfoUser());
      unwrapResult(resultAction);
    })();
  }, []);

  const handleLogout = () => {
    dispatch(logout());

    navigate(ROUTES.login);
  };

  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click();
  };

  const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as any);
    };

    if (files !== null && files.length) reader.readAsDataURL(files[0]);

    setOpenModal(true);
  };

  const onLoad = (img: any) => {
    console.log(img);

    imgRef.current = img;
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(
      previewCanvasRef.current,
      completedCrop
    );
    console.log(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: sessionStorage.getItem(STORAGE_KEY.TOKEN) || "",
        },
      };

      const json = await userApi.updateInfoUser(formData, config);

      if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
        const resultAction = await dispatch<any>(getInfoUser());
        console.log(resultAction.payload);

        unwrapResult(resultAction);
      }
    }
  };

  return (
    <div className="pt-20">
      <div className="flex justify-center">
        <div className="relative rounded-xl w-[450px] shadow-md h-[600px] py-10 px-14">
          <h1 className="mb-8 text-5xl font-semibold text-center">Profile</h1>

          <div className="bg-[#111] mx-auto relative group  w-[150px] h-[150px] mb-10 rounded-full">
            <img
              className="w-full h-full transition-all duration-500 object-cover rounded-full group-hover:opacity-[0.5]"
              src={
                userInfo &&
                `http://api.training.div3.pgtest.co/${userInfo?.avatar}`
              }
              alt="user avatar"
            />
            {location.pathname === ROUTES.profile && (
              <div
                className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-white opacity-0 cursor-pointer group-hover:!opacity-100 "
                onClick={changeAvatar}
              >
                <input
                  ref={avatarInputRef}
                  hidden
                  type="file"
                  onChange={onChooseAvatar}
                  accept="image/*"
                />
                <span className="uppercase text-sm font-medium text-center">
                  Upload
                </span>
              </div>
            )}
          </div>
          <div className="mb-10 text-center ">
            <label htmlFor="">Email</label>
            <p className="text-xl mb-3 font-medium">{userInfo?.email}</p>
            <label htmlFor="">Name</label>

            <p className="text-xl mb-3 font-medium">{userInfo?.name}</p>
            <label htmlFor="">Gender</label>

            <p className="text-xl mb-3 font-medium">{userInfo?.gender}</p>
          </div>
          <button
            className="absolute cursor-pointer bottom-4 right-0 p-2rounded-xl w-[100px] block text-sm  text-slate-600"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>

        <div className="w-[450px] rounded-xl shadow-xl h-[600px] hidden lg:block">
          <img
            className="object-cover w-full h-full rounded-xl"
            src="https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
      </div>
      <div>
        <Modal
          show={openModal}
          onHide={() => {
            setOpenModal(false);
          }}
        >
          <Modal.Header>
            <Modal.Title>Upload</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ReactCrop
              crop={crop}
              src={image || ""}
              onChange={(newCrop: any) => {
                setCrop(newCrop);
              }}
              onImageLoaded={onLoad}
              onComplete={(c) => setCompletedCrop(c)}
            >
              {/* <img src={image} /> */}
            </ReactCrop>
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0),
                }}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Close
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => {
                setOpenModal(false);
                uploadAvatar();
              }}
            >
              Save Image
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UserProfile;
