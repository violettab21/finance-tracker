import { useState } from 'react';
import { StyledFlexWrapper } from '../../styled/flex';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import Password from '../Password/Password';
import Separator from '../Separator/Separator';
import { RegistrationFormWrapper, StyledTitle } from './styles';

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <RegistrationFormWrapper>
      <form>
        <StyledFlexWrapper direction="column" width="30%" gap="10px">
          <StyledTitle>Create an account</StyledTitle>
          <p>Already have an account? Log in</p>
          <StyledFlexWrapper gap="10px">
            <Input placeholder="Name"></Input>

            <Input placeholder="Surname"></Input>
          </StyledFlexWrapper>
          <Input placeholder="Email" type="email"></Input>
          <Password
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={(event) => {
              event.preventDefault();
              setIsPasswordVisible(!isPasswordVisible);
            }}
          />
          <Checkbox labelText="I agree to the Terms & Conditions" />
          <Button primary onClick={() => console.log('btn clicked')}>
            Create Account
          </Button>
          <Separator text="Or sign up with" />
          <Button secondary onClick={() => console.log('btn clicked')}>
            Google
          </Button>
        </StyledFlexWrapper>
      </form>
    </RegistrationFormWrapper>
  );
}
