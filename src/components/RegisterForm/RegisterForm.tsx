import { useState } from 'react';
import { StyledFlexWrapper } from '../../styled/flex';
import Button from '../Button/Button';
import Checkbox from '../Input/Checkbox/Checkbox';
import Input from '../Input/Input';
import Password from '../Input/Password/Password';
import Separator from '../Separator/Separator';
import { RegistrationFormWrapper, StyledTitle } from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationSchema } from './validation';
import { PasswordComplexity } from '../PasswordComplexity/PasswordComplexity';

interface RegistrationFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormInput>({
    resolver: zodResolver(ValidationSchema),
    mode: 'onBlur',
  });
  const onSubmit = (data: RegistrationFormInput) => console.log(data);

  const password = watch('password', '');

  return (
    <RegistrationFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="20%" gap="10px">
          <StyledTitle>Create an account</StyledTitle>
          <p>Already have an account? Log in</p>
          <StyledFlexWrapper gap="10px">
            <Input
              placeholder="Name"
              {...register('firstName')}
              error={
                errors.firstName ? errors.firstName?.message || null : null
              }
            ></Input>

            <Input
              placeholder="Surname"
              {...register('lastName')}
              error={errors.lastName ? errors.lastName?.message || null : null}
            ></Input>
          </StyledFlexWrapper>
          <Input
            placeholder="Email"
            type="email"
            {...register('email')}
            error={errors.email ? errors.email?.message || null : null}
          ></Input>

          <Password
            {...register('password')}
            placeholder="Password"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={(event) => {
              event.preventDefault();
              setIsPasswordVisible(!isPasswordVisible);
            }}
            error={errors.password ? errors.password?.message || null : null}
          />
          {password && <PasswordComplexity password={password} />}
          <Checkbox
            {...register('terms')}
            labelText="I agree to the Terms & Conditions"
            error={errors.terms ? errors.terms?.message || null : null}
          />

          <Button primary onClick={() => console.log('btn clicked')}>
            Create Account
          </Button>
          <Separator text="Or sign up with" />
          <Button secondary>Google</Button>
        </StyledFlexWrapper>
      </form>
    </RegistrationFormWrapper>
  );
}
