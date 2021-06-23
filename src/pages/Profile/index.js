import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { PageWrapper } from "../../globalStyles";
import { LogoWrapper } from "./styles";
import { signoff } from "../../utils/LocalStorageToken";
import { Redirect } from "react-router-dom";
import { UsersSignOff } from "../../store/user/userActions";
import { redirect } from "../../store";


const Profile = () => {

  const dispatch = useDispatch();
  const redirectData = useSelector(state => state.redirect);

  const {
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmitSignOff = () => {
    signoff();
    dispatch(redirect("/"));
    dispatch(UsersSignOff());
  }

  if(redirectData.path !== '' ) {
    return <Redirect to= {{ pathname: redirectData.path }} />
  }

  return (
    <PageWrapper>
      
      <LogoWrapper>
        <img src="./assets/logo-color.png" alt="logo" />
      </LogoWrapper>

      <form onSubmit={handleSubmit(onSubmitSignOff)}>
        <Button type="submit" text="Sign off"/>
      </form>
      
    </PageWrapper>
  );
};
export default Profile;
