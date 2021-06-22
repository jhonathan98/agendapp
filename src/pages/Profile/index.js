import React from "react";
import { Button } from "../../components/Button";
import { PageWrapper } from "../../globalStyles";
import { LogoWrapper } from "./styles";


const Profile = () => {

  return (
    <PageWrapper>
      
      <LogoWrapper>
        <img src="./assets/logo-color.png" alt="logo" />
      </LogoWrapper>
      {
        //userData.error && <LabelError>Email or Password incorrect</LabelError>
      }
      <Button type="button" text="Sign off"/>
    </PageWrapper>
  );
};
export default Profile;
