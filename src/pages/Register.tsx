import Button from '../components/Button/Button';

export default function Register() {
  return (
    <div>
      <Button primary onClick={() => console.log('btn clicked')}>
        Create Account
      </Button>
      <Button secondary onClick={() => console.log('btn clicked')}>
        Create Account
      </Button>
    </div>
  );
}
