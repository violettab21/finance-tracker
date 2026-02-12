import { StyledFlexWrapper } from '../../../styled/flex';
import Button from '../../Button/Button';
import Checkbox from '../../Input/Checkbox/Checkbox';
import Input from '../../Input/Input';
import Password from '../../Input/Password/Password';
import Separator from '../../Separator/Separator';
import { useWatch } from 'react-hook-form';
import { PasswordComplexity } from '../../PasswordComplexity/PasswordComplexity';

import { useSignUp } from './hooks/useSignUp';
import { useAuth } from '../hooks/useAuth';
import { StyledLinkForm, StyledTitle } from '../styles';

export default function RegisterForm() {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isValid,
    control,
    signUpError,
  } = useSignUp();

  const { signUpWithGoogle, googleSignInError } = useAuth();

  const password = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  return (
    <StyledFlexWrapper width="50%" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledTitle>Create an account</StyledTitle>
          <p>
            Already have an account?{' '}
            <StyledLinkForm to="/login">Log in</StyledLinkForm>
          </p>
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
            error={errors.password ? errors.password?.message || null : null}
          />
          {password && <PasswordComplexity password={password} />}
          <Checkbox
            {...register('terms')}
            labelText="I agree to the Terms & Conditions"
            error={errors.terms ? errors.terms?.message || null : null}
          />

          <Button primary disabled={!isValid}>
            Create Account
          </Button>
          <Separator text="Or sign up with" />
          <Button secondary onClick={signUpWithGoogle}>
            Google
          </Button>
          {signUpError ||
            (googleSignInError && <p>{signUpError || googleSignInError}</p>)}
        </StyledFlexWrapper>
      </form>
    </StyledFlexWrapper>
  );
}
