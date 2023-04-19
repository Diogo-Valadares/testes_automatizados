import { render, fireEvent, act} from '@testing-library/react';
import SignUp from '../RoutesPages/signUp';
import Login from '../RoutesPages/login';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import mockAxios from "jest-mock-axios";

jest.mock("axios");

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
  }));

describe('Login component', () => {    
  const navigateMock = useNavigate();
  beforeEach(() => {
    localStorage.clear();
  });

  it('should submit user data when the login form is submitted', async () => {
    mockAxios.post.mockResolvedValueOnce({ status: 200, data: 'token' });

    const { getByLabelText, getByText } = render(
        <Login/>
    );

    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByText('Log in');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
      fireEvent.click(submitButton);
    });

    expect(mockAxios.post).toHaveBeenCalledWith('/api/login', {
      email: 'test@test.com',
      password: 'testpassword'
    });
  });

  it('should change page when receiving a successful response from the backend', async () => {
    mockAxios.post.mockResolvedValueOnce({ status: 200, data: 'token' });

    const { getByLabelText, getByText } = render(
        <Login/>
    );

    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByText('Log in');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
      fireEvent.click(submitButton);
    });

    expect(navigateMock).toHaveBeenCalledWith('/Store');
  });

  it('should display an error message when receiving an unsuccessful response from the backend', async () => {
    mockAxios.post.mockRejectedValueOnce({error: { response: { statusText: 'Unauthorized' } }});

    const { getByLabelText, getByText } = render(
        <Login/>
    );

    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByText('Log in');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
      fireEvent.click(submitButton);
    });

    expect(getByText('Unauthorized')).toBeInTheDocument();
  });
});