import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from 'hooks/useAuth/useAuth';

import UserDataItem from '../UserDataItem/UserDataItem';
import noAvatar from '../../images/userData/no-image.jpeg';
import logoutIcon from '../../images/userData/logout-icon.png';

import {
  UserTitle,
  EditImageBtn,
  EditImageIcon,
  ImageContainer,
  InputFile,
  InputWrapper,
  StyledImage,
  Wrapper,
  ImageWrapper,
  LogoutBtn,
  LogoutIcon,
  UserItemWrapper,
  CloseBtnWrapper,
  CloseCircleLine,
  RotatSpeinnerCont,
  EditText,
} from './UserData.styled.jsx';
import { useDispatch } from 'react-redux';
import {
  logOut,
  updateUser,
  deleteUsersAvatar,
} from '../../redux/auth/operations';

const imageExtensions = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'jfif',
  'pjpeg',
  'pjp',
  'webp',
];

export default function UserData({ user }) {
  const dispatch = useDispatch();
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const { email, name, birthday, phone, city, avatarURL } = user;
  const { isPending } = useAuth();

  const handleFileChange = async e => {
    const splitToFindExtension = e.target.value.split('.');
    const fileExtension = splitToFindExtension[splitToFindExtension.length - 1];

    if (!imageExtensions.includes(fileExtension)) {
      toast.error(
        'Avatar should be an image: png, jpg, jpeg, gif, jfif, pjpeg, pjp, webp',
        { autoClose: 5000 }
      );
      return;
    }

    const imgFile = e.target.files[0];

    if (imgFile) {
      const value = { avatarURL: imgFile };
      await dispatch(updateUser({ value }));
    }
  };

  return (
    <>
      <UserTitle>My information:</UserTitle>
      <Wrapper>
        <ToastContainer position="top-right" autoClose={5000} theme="colored" />
        <ImageContainer>
          <ImageWrapper>
            <StyledImage
              alt="user-photo"
              src={
                avatarURL === null ||
                avatarURL === undefined ||
                avatarURL === ''
                  ? noAvatar
                  : avatarURL
              }
            />
            {avatarURL && (
              <CloseBtnWrapper
                onClick={async () => {
                  await dispatch(deleteUsersAvatar());
                }}
              >
                <CloseCircleLine />
              </CloseBtnWrapper>
            )}
          </ImageWrapper>

          <InputWrapper>
            <InputFile type="file" onChange={handleFileChange} />
            <EditImageBtn>
              <EditImageIcon />
              <EditText>Edit photo</EditText>
            </EditImageBtn>
          </InputWrapper>
        </ImageContainer>

        {isPending && (
          <RotatSpeinnerCont>
            <RotatingLines
              strokeColor="#F59256"
              strokeWidth="2"
              animationDuration="0.75"
              width="100%"
              visible={true}
            />
          </RotatSpeinnerCont>
        )}
        <UserItemWrapper>
          <UserDataItem
            setIsDisabledBtn={setIsDisabledBtn}
            isDisabledBtn={isDisabledBtn}
            field="name"
            initValue={{ name }}
            setUser={async value => {
              if (value.name === name) {
                return;
              }
              await dispatch(updateUser({ value }));
            }}
          ></UserDataItem>
          <UserDataItem
            setIsDisabledBtn={setIsDisabledBtn}
            isDisabledBtn={isDisabledBtn}
            field="email"
            initValue={{ email }}
            setUser={async value => {
              if (value.email === email) {
                return;
              }
              await dispatch(updateUser({ value }));
            }}
          ></UserDataItem>
          <UserDataItem
            setIsDisabledBtn={setIsDisabledBtn}
            isDisabledBtn={isDisabledBtn}
            field="birthday"
            initValue={{
              birthday:
                birthday === null || birthday === '00.00.0000'
                  ? '00.00.0000'
                  : getBirthdayString(birthday),
            }}
            setUser={async value => {
              if (value.birthday === birthday) {
                return;
              }
              await dispatch(updateUser({ value }));
            }}
          ></UserDataItem>
          <UserDataItem
            setIsDisabledBtn={setIsDisabledBtn}
            isDisabledBtn={isDisabledBtn}
            field="phone"
            initValue={{ phone }}
            setUser={async value => {
              if (value.phone === phone) {
                return;
              }
              await dispatch(updateUser({ value }));
            }}
          ></UserDataItem>
          <UserDataItem
            setIsDisabledBtn={setIsDisabledBtn}
            isDisabledBtn={isDisabledBtn}
            field="city"
            initValue={{ city }}
            setUser={async value => {
              if (value.city === city) {
                return;
              }
              await dispatch(updateUser({ value }));
            }}
          ></UserDataItem>
          <LogoutBtn
            onClick={async () => {
              await dispatch(logOut());
              document.location.reload();
            }}
          >
            <LogoutIcon alt="logout user" src={logoutIcon} /> Log Out
          </LogoutBtn>
        </UserItemWrapper>
      </Wrapper>
    </>
  );
}

function getBirthdayString(birthday) {
  const date = new Date(birthday);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  return `${day < 10 ? `0${day}` : day}.${
    month < 10 ? `0${month}` : month
  }.${date.getFullYear()}`;
}

UserData.propTypes = {
  userData: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      city: PropTypes.string,
      birthday: PropTypes.string,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};
