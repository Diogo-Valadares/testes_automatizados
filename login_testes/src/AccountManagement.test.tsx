import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from './RoutesPages/signUp';
import Login from './RoutesPages/login';

describe('SignUp  Tests', () => {
  it('should render all input fields and a submit button', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const emailInput = getByLabelText('Email:') as HTMLInputElement;
    const nameInput = getByLabelText('Name:') as HTMLInputElement;
    const passwordInput = getByLabelText('Password:') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password:') as HTMLInputElement;
    const submitButton = getByText('Submit') as HTMLButtonElement;

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should show an error message if name is too short on submit', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const nameInput = getByLabelText('Name:') as HTMLInputElement;
    const passwordInput = getByLabelText('Password:') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password:') as HTMLInputElement;
    const submitButton = getByText('Submit') as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: 'abc' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    const errorMessage = getByText('Name is too short(less than 4 characters)') as HTMLParagraphElement;
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show an error message if name is not composed by at least 2 words on submit', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const nameInput = getByLabelText('Name:') as HTMLInputElement;
    const passwordInput = getByLabelText('Password:') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password:') as HTMLInputElement;
    const submitButton = getByText('Submit') as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: 'Bruno' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    const errorMessage = getByText('Name needs to be composed by at least 2 words') as HTMLParagraphElement;
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show an error message if passwords do not match on submit', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const nameInput = getByLabelText('Name:') as HTMLInputElement;
    const passwordInput = getByLabelText('Password:') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password:') as HTMLInputElement;
    const submitButton = getByText('Submit') as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: 'Bruno da silva' } });
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });
    fireEvent.click(submitButton);

    const errorMessage = getByText('Passwords do not match') as HTMLParagraphElement;
    expect(errorMessage).toBeInTheDocument();
  });

  it('should test if invalid e-mails are not allowed', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const emailInput = getByLabelText('Email:') as HTMLInputElement;    
    const submitButton = getByText('Submit');

    const nameInput = getByLabelText('Name:') as HTMLInputElement;
    const passwordInput = getByLabelText('Password:') as HTMLInputElement;
    const confirmPasswordInput = getByLabelText('Confirm Password:') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Bruno da silva' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    fireEvent.change(emailInput, { target: { value: 'Brunonaovalido' } });       
    expect(emailInput.validity.valid).toBeFalsy();
    fireEvent.change(emailInput, { target: { value: 'Brunonaovalido@' } });   
    expect(emailInput.validity.valid).toBeFalsy();
    fireEvent.change(emailInput, { target: { value: '@Brunonaovalido' } });   
    expect(emailInput.validity.valid).toBeFalsy();
    fireEvent.change(emailInput, { target: { value: 'Brunonão@valido' } });   
    expect(emailInput.validity.valid).toBeFalsy();
    expect(submitButton).toBeInTheDocument();
  });

});
describe('Login  Tests',()=>{
  test('prevents user from submitting blank spaces for email', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByText('Submit');
    fireEvent.change(emailInput, { target: { value: '  ' } });
    fireEvent.change(passwordInput, { target: { value: '231231241234' } });
    fireEvent.click(submitButton);
    expect(submitButton).toBeInTheDocument();
  });
  test('prevents user from submitting blank spaces for password', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'a@a.com' } });
    fireEvent.change(passwordInput, { target: { value: '  ' } });
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeInTheDocument();
  });
});