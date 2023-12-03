import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { object, string, number, ref, boolean, ValidationError } from 'yup';
import styles from './Uncontrolled.module.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { FormErrors } from '../../entities';

const Uncontrolled = () => {
  const [pictureInBase64, setPictureInBase64] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  const userSchema = object({
    name: string()
      .matches(/^[A-Z]/, 'First letter must be uppercase')
      .required('Name is required'),
    age: number().min(1).required('Age is required'),
    email: string().email('Invalid email').required('Email is required'),
    password: string()
      .matches(passwordRegex, 'Your password is weak!')
      .required('Password is required'),
    confirmPassword: string()
      .matches(passwordRegex, 'Your password is weak!')
      .oneOf([ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    gender: string().oneOf(['male', 'female']).required('Gender is required'),
    terms: boolean().isTrue('You must accept the Terms and Conditions'),
    picture: string(),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const userInput = {
      name: nameRef?.current?.value,
      age: ageRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      confirmPassword: confirmPasswordRef?.current?.value,
      gender: maleRef?.current?.checked ? 'male' : 'female',
      terms: termsRef?.current?.checked,
      pictureInBase64: pictureInBase64,
    };

    try {
      userSchema.validateSync(userInput, { abortEarly: false });
      setFormErrors({});
      dispatch(addUser(userInput));
      navigate('/');
      console.log('Form submitted successfully:', userInput);
    } catch (error) {
      if (ValidationError.isError(error)) {
        const errors: FormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        setFormErrors(errors);
        console.error('Form validation failed:', errors);
      }
    }
  };

  const handlePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPictureInBase64(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="e.g. Almas"
          id="name"
        />
        {formErrors.name && <p className={styles.error}>Enter your name!</p>}

        <label htmlFor="age">Age:</label>
        <input
          ref={ageRef}
          type="text"
          name="age"
          placeholder="e.g. 18"
          id="age"
        />
        {formErrors.age && <p className={styles.error}>Enter your age!</p>}

        <label htmlFor="email">Email:</label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          placeholder="e.g. example@gmail.com"
          id="email"
        />
        {formErrors.email && (
          <p className={styles.error}>Enter a valid email!</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="text"
          name="password"
          placeholder="e.g. ^AMbWGK,)5"
          id="password"
        />
        {formErrors.password && (
          <p className={styles.error}>Your password are weak or not matched!</p>
        )}

        <label htmlFor="confirm-password">Confirm Your Password</label>
        <input
          ref={confirmPasswordRef}
          type="text"
          name="confirm-password"
          placeholder="e.g. ^AMbWGK,)5"
          id="confirm-password"
        />
        {formErrors.confirmPassword && (
          <p className={styles.error}>Your password are weak or not matched!</p>
        )}

        <label htmlFor="gender">Select Gender</label>
        <div className={styles.option}>
          <input
            ref={maleRef}
            type="radio"
            name="gender"
            id="male"
            value={'male'}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className={styles.option}>
          <input
            ref={femaleRef}
            type="radio"
            name="gender"
            id="female"
            value={'female'}
          />
          <label htmlFor="female">Female</label>
        </div>

        <div className={styles.option}>
          <input ref={termsRef} type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">Accept for Terms and Conditions</label>
        </div>

        <input
          onChange={handlePicture}
          type="file"
          id="picture"
          name="picture"
          accept=".png, .jpeg"
        />

        <input type="submit" value={'Submit Person'} />
      </form>
    </div>
  );
};

export default Uncontrolled;
